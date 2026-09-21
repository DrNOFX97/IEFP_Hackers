from typesafe_sdk import Noul, Choice, Score, TypeSafeClient
from dotenv import load_dotenv
load_dotenv()  # carrega .env para variáveis de ambiente

client = TypeSafeClient()  # lê TYPESAFE_API_KEY do ambiente

resp = client.system_one(
    state="O meu pagamento falhou há 3 dias e estou a perder vendas. Ajuda urgente!",
    questions={
        "urgente": Noul(instructions="A mensagem transmite urgência?"),
        "departamento": Choice(
            instructions="Que equipa deve tratar disto?",
            criteria={
                "billing": "Pagamentos, facturas, reembolsos",
                "technical": "Bugs, integrações, falhas",
                "sales": "Preços, upgrades, contas novas",
            },
        ),
        "frustracao": Score(
            instructions="Quão frustrado está o cliente?",
            criteria=["Calmo", "Frustrado mas civil", "Muito irritado"],
        ),
    },
)

print(resp.answers["urgente"].noul)          # 1.0
print(resp.answers["departamento"].choice)   # "billing"
print(resp.answers["frustracao"].score)      # 1.0