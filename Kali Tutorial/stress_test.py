"""
Stress test para a API TypeSafe / Jev.
Mede latência, consistência, escalabilidade e fiabilidade.
"""
from __future__ import annotations

import os
import statistics
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass, field

from dotenv import load_dotenv

load_dotenv()

from typesafe_sdk import Choice, Noul, Score, TypeSafeClient  # noqa: E402

# ---------------------------------------------------------------------------
# Configuração
# ---------------------------------------------------------------------------

STATE = (
    "Hi, I've been trying to connect my Stripe account for 3 days and the "
    "integration keeps failing. I'm losing sales. Please help ASAP."
)

# 8 perguntas atómicas — o cenário realista de triagem
QUESTIONS_8 = {
    "department": Choice(
        instructions="Which team should handle this?",
        criteria={
            "billing": "Payment or subscription issues",
            "technical": "Bugs or integration problems",
            "sales": "Pricing or account questions",
        },
    ),
    "frustration": Score(
        instructions="How frustrated does the customer appear?",
        criteria=[
            "Calm, just stating facts",
            "Frustrated but civil",
            "Very angry, strong language",
        ],
    ),
    "is_urgent": Noul(instructions="Does the message convey urgency?"),
    "requests_refund": Noul(
        instructions="Does the customer request a refund or credit?"
    ),
    "mentions_deadline": Noul(
        instructions="Does the message mention a specific deadline?"
    ),
    "is_business_critical": Noul(
        instructions="Does this affect business operations or revenue?"
    ),
    "sentiment_score": Score(
        instructions="Overall sentiment of the message",
        criteria=["Very negative", "Negative", "Neutral", "Positive"],
    ),
    "requires_human": Noul(
        instructions="Does this require a human agent rather than automation?"
    ),
}

# 1 e 4 perguntas para medir escalabilidade
QUESTIONS_1 = {"is_urgent": QUESTIONS_8["is_urgent"]}
QUESTIONS_4 = {k: QUESTIONS_8[k] for k in list(QUESTIONS_8)[:4]}


# ---------------------------------------------------------------------------
# Estruturas
# ---------------------------------------------------------------------------

@dataclass
class Result:
    latency_ms: float
    input_tokens: int
    output_tokens: int
    error: str | None = None


@dataclass
class Report:
    label: str
    results: list[Result] = field(default_factory=list)

    @property
    def ok(self) -> list[Result]:
        return [r for r in self.results if r.error is None]

    @property
    def errors(self) -> list[Result]:
        return [r for r in self.results if r.error is not None]

    def latencies(self) -> list[float]:
        return sorted(r.latency_ms for r in self.ok)

    def percentile(self, p: float) -> float:
        lat = self.latencies()
        if not lat:
            return float("nan")
        k = max(0, min(len(lat) - 1, int(round((p / 100) * len(lat) + 0.5)) - 1))
        return lat[k]

    def summary(self) -> str:
        if not self.ok:
            return f"{self.label}: todos os pedidos falharam ({len(self.errors)} erros)"
        lat = self.latencies()
        inp = [r.input_tokens for r in self.ok]
        out = [r.output_tokens for r in self.ok]
        return (
            f"{self.label}\n"
            f"  pedidos:    {len(self.ok)} ok / {len(self.errors)} erros\n"
            f"  latência:   min={lat[0]:.0f}ms  "
            f"p50={self.percentile(50):.0f}ms  "
            f"p90={self.percentile(90):.0f}ms  "
            f"p99={self.percentile(99):.0f}ms  "
            f"max={lat[-1]:.0f}ms\n"
            f"  média:      {statistics.mean(lat):.0f}ms  "
            f"desvio: {statistics.pstdev(lat):.0f}ms\n"
            f"  tokens in:  média={statistics.mean(inp):.0f}  max={max(inp)}\n"
            f"  tokens out: média={statistics.mean(out):.0f}  max={max(out)}"
        )


# ---------------------------------------------------------------------------
# Execução
# ---------------------------------------------------------------------------

def one_call(client: TypeSafeClient, questions: dict) -> Result:
    t0 = time.perf_counter()
    try:
        resp = client.system_one(state=STATE, questions=questions)
        dt = (time.perf_counter() - t0) * 1000
        return Result(
            latency_ms=dt,
            input_tokens=resp.usage.input_tokens,
            output_tokens=resp.usage.output_tokens,
        )
    except Exception as e:  # noqa: BLE001
        dt = (time.perf_counter() - t0) * 1000
        return Result(latency_ms=dt, input_tokens=0, output_tokens=0, error=repr(e))


def run_sequential(
    client: TypeSafeClient, label: str, questions: dict, n: int
) -> Report:
    report = Report(label)
    for i in range(n):
        r = one_call(client, questions)
        report.results.append(r)
        status = "ok" if r.error is None else f"ERRO {r.error[:60]}"
        print(f"  [{label}] {i+1}/{n}  {r.latency_ms:6.0f}ms  {status}")
    return report


def run_parallel(
    client: TypeSafeClient, label: str, questions: dict, n: int, workers: int = 10
) -> Report:
    report = Report(label)
    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = [pool.submit(one_call, client, questions) for _ in range(n)]
        for i, fut in enumerate(as_completed(futures), 1):
            r = fut.result()
            report.results.append(r)
            status = "ok" if r.error is None else f"ERRO {r.error[:60]}"
            print(f"  [{label}] {i}/{n}  {r.latency_ms:6.0f}ms  {status}")
    return report


# ---------------------------------------------------------------------------
# Testes específicos
# ---------------------------------------------------------------------------

def test_consistency(client: TypeSafeClient, n: int = 20) -> None:
    """Corre o mesmo pedido N vezes e vê se as respostas são estáveis."""
    print(f"\n=== Consistência ({n} execuções) ===")
    nouls, choices, scores = [], [], []
    for i in range(n):
        try:
            resp = client.system_one(state=STATE, questions=QUESTIONS_4)
            nouls.append(resp.answers["is_urgent"].noul)
            choices.append(resp.answers["department"].choice)
            scores.append(resp.answers["frustration"].score)
            print(f"  {i+1}/{n}  noul={nouls[-1]:.3f}  "
                  f"choice={choices[-1]}  score={scores[-1]:.2f}")
        except Exception as e:  # noqa: BLE001
            print(f"  {i+1}/{n}  ERRO {e!r}")

    if nouls:
        print(f"\n  noul:  min={min(nouls):.3f}  max={max(nouls):.3f}  "
              f"média={statistics.mean(nouls):.3f}  "
              f"desvio={statistics.pstdev(nouls):.3f}")
    if scores:
        print(f"  score: min={min(scores):.2f}  max={max(scores):.2f}  "
              f"média={statistics.mean(scores):.2f}  "
              f"desvio={statistics.pstdev(scores):.2f}")
    if choices:
        from collections import Counter
        print(f"  choice: {dict(Counter(choices))}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    if not os.environ.get("TYPESAFE_API_KEY"):
        raise SystemExit("TYPESAFE_API_KEY não encontrada no ambiente")

    client = TypeSafeClient()
    reports: list[Report] = []

    # --- 1. Escalabilidade por nº de perguntas (sequencial) ---
    print("\n=== 1. Escalabilidade: 1 vs 4 vs 8 perguntas (10x cada) ===")
    for label, qs in [("1q", QUESTIONS_1), ("4q", QUESTIONS_4), ("8q", QUESTIONS_8)]:
        reports.append(run_sequential(client, label, qs, n=10))

    # --- 2. Carga paralela ---
    print("\n=== 2. Carga paralela: 50 pedidos, 10 workers ===")
    reports.append(run_parallel(client, "par50", QUESTIONS_8, n=50, workers=10))

    # --- 3. Carga paralela agressiva ---
    print("\n=== 3. Carga paralela agressiva: 100 pedidos, 25 workers ===")
    reports.append(run_parallel(client, "par100", QUESTIONS_8, n=100, workers=25))

    # --- 4. Consistência ---
    test_consistency(client, n=20)

    # --- Sumário ---
    print("\n" + "=" * 60)
    print("SUMÁRIO")
    print("=" * 60)
    for r in reports:
        print()
        print(r.summary())


if __name__ == "__main__":
    main()