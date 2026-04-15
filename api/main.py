"""
CET Cibersegurança — API Backend
FastAPI + PostgreSQL (Cloud SQL)

Demonstra boas práticas de segurança:
  - Autenticação via Firebase JWT em todos os endpoints
  - Queries parametrizadas (nunca f-strings com input do utilizador)
  - RLS no PostgreSQL (SET LOCAL app.current_user_id)
  - Validação de input com Pydantic
  - Rate limiting por IP
"""

import os
import re
from contextlib import asynccontextmanager
from typing import Optional

import asyncpg
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from auth import get_current_user

# ── Config ────────────────────────────────────────────────────────
DB_HOST    = os.environ.get("DB_HOST", "localhost")
DB_PORT    = int(os.environ.get("DB_PORT", "5432"))
DB_NAME    = os.environ.get("DB_NAME", "ciberseg")
DB_USER    = os.environ.get("DB_USER", "app_api")
DB_PASS    = os.environ.get("DB_PASS", "")
DB_SCHEMA  = "cet"

ALLOWED_ORIGINS = os.environ.get(
    "ALLOWED_ORIGINS",
    "https://iefp-hackers.web.app,http://localhost:8000"
).split(",")

UC_CODE_RE = re.compile(r'^(UC\d{5}|FPCT)$')

# ── Rate limiter ──────────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)


# ── Database pool ─────────────────────────────────────────────────
pool: asyncpg.Pool = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global pool
    pool = await asyncpg.create_pool(
        host=DB_HOST, port=DB_PORT,
        database=DB_NAME, user=DB_USER, password=DB_PASS,
        min_size=2, max_size=10,
        command_timeout=10,
        server_settings={"search_path": DB_SCHEMA},
    )
    yield
    await pool.close()


# ── App ───────────────────────────────────────────────────────────
app = FastAPI(
    title="CET Cibersegurança API",
    version="1.0.0",
    lifespan=lifespan,
    # Desativa docs em produção — não expor schema da API publicamente
    docs_url=None if os.environ.get("ENV") == "production" else "/docs",
    redoc_url=None,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)


# ── Helpers ────────────────────────────────────────────────────────
def validate_uc(uc_code: str):
    if not UC_CODE_RE.match(uc_code):
        raise HTTPException(status_code=400, detail="Código UC inválido.")
    return uc_code


async def get_or_create_user(firebase_uid: str, email: str, display_name: str) -> str:
    """
    Devolve o UUID interno do utilizador, criando-o se não existir.
    Queries parametrizadas — nunca interpolação de strings.
    """
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            "SELECT id FROM cet.users WHERE firebase_uid = $1",
            firebase_uid
        )
        if row:
            await conn.execute(
                "UPDATE cet.users SET last_login = NOW(), display_name = $2 WHERE firebase_uid = $1",
                firebase_uid, display_name
            )
            return str(row["id"])

        row = await conn.fetchrow(
            """INSERT INTO cet.users (firebase_uid, email, display_name)
               VALUES ($1, $2, $3) RETURNING id""",
            firebase_uid, email, display_name or email
        )
        return str(row["id"])


# ── Models ────────────────────────────────────────────────────────
class NoteIn(BaseModel):
    content: str

    @field_validator("content")
    @classmethod
    def max_length(cls, v):
        if len(v) > 50_000:
            raise ValueError("Nota demasiado longa (máx. 50 000 caracteres).")
        return v


class MaterialIn(BaseModel):
    type:  str
    label: str
    url:   Optional[str] = None
    size:  Optional[str] = None

    @field_validator("type")
    @classmethod
    def valid_type(cls, v):
        allowed = {"link", "pdf", "doc", "video", "slide", "outro"}
        if v not in allowed:
            raise ValueError(f"Tipo inválido. Deve ser um de: {allowed}")
        return v

    @field_validator("label")
    @classmethod
    def label_length(cls, v):
        if not v or len(v) > 200:
            raise ValueError("Label deve ter entre 1 e 200 caracteres.")
        return v

    @field_validator("url")
    @classmethod
    def safe_url(cls, v):
        if v and not re.match(r'^https?://', v):
            raise ValueError("URL deve começar com http:// ou https://")
        return v


# ── Endpoints ─────────────────────────────────────────────────────

@app.get("/health")
async def health():
    return {"status": "ok"}


# ── NOTES ─────────────────────────────────────────────────────────

@app.get("/notes/{uc_code}")
@limiter.limit("60/minute")
async def get_note(
    request: Request,
    uc_code: str,
    user=Depends(get_current_user),
):
    validate_uc(uc_code)
    user_id = await get_or_create_user(
        user["uid"], user.get("email", ""), user.get("name", "")
    )

    async with pool.acquire() as conn:
        async with conn.transaction():
            await conn.execute(
                "SELECT set_config('app.current_user_id', $1, true)", user_id
            )
            row = await conn.fetchrow(
                "SELECT content, updated_at FROM cet.notes WHERE user_id=$1 AND uc_code=$2",
                user_id, uc_code
            )

    if not row:
        return {"note": "", "updated_at": None}
    return {"note": row["content"], "updated_at": row["updated_at"]}


@app.post("/notes/{uc_code}", status_code=200)
@limiter.limit("30/minute")
async def save_note(
    request: Request,
    uc_code: str,
    body: NoteIn,
    user=Depends(get_current_user),
):
    validate_uc(uc_code)
    user_id = await get_or_create_user(
        user["uid"], user.get("email", ""), user.get("name", "")
    )

    async with pool.acquire() as conn:
        async with conn.transaction():
            await conn.execute(
                "SELECT set_config('app.current_user_id', $1, true)", user_id
            )
            if body.content.strip():
                # UPSERT — INSERT ou UPDATE se já existir
                await conn.execute(
                    """INSERT INTO cet.notes (user_id, uc_code, content)
                       VALUES ($1, $2, $3)
                       ON CONFLICT (user_id, uc_code)
                       DO UPDATE SET content = EXCLUDED.content""",
                    user_id, uc_code, body.content
                )
            else:
                # Apagar nota vazia
                await conn.execute(
                    "DELETE FROM cet.notes WHERE user_id=$1 AND uc_code=$2",
                    user_id, uc_code
                )

    return {"ok": True}


# ── MATERIALS ─────────────────────────────────────────────────────

@app.get("/materials/{uc_code}")
@limiter.limit("60/minute")
async def get_materials(
    request: Request,
    uc_code: str,
    user=Depends(get_current_user),
):
    validate_uc(uc_code)
    rows = await pool.fetch(
        """SELECT id, type, label, url, file_size AS size, created_at
           FROM cet.materials
           WHERE uc_code = $1
           ORDER BY created_at""",
        uc_code
    )
    return [dict(r) for r in rows]


@app.post("/materials/{uc_code}", status_code=201)
@limiter.limit("20/minute")
async def add_material(
    request: Request,
    uc_code: str,
    body: MaterialIn,
    user=Depends(get_current_user),
):
    validate_uc(uc_code)
    user_id = await get_or_create_user(
        user["uid"], user.get("email", ""), user.get("name", "")
    )

    async with pool.acquire() as conn:
        async with conn.transaction():
            await conn.execute(
                "SELECT set_config('app.current_user_id', $1, true)", user_id
            )
            row = await conn.fetchrow(
                """INSERT INTO cet.materials (uc_code, type, label, url, file_size, added_by)
                   VALUES ($1, $2, $3, $4, $5, $6)
                   RETURNING id""",
                uc_code, body.type, body.label, body.url, body.size, user_id
            )

    return {"id": str(row["id"])}


@app.delete("/materials/{uc_code}/{material_id}", status_code=200)
@limiter.limit("20/minute")
async def delete_material(
    request: Request,
    uc_code: str,
    material_id: str,
    user=Depends(get_current_user),
):
    validate_uc(uc_code)
    user_id = await get_or_create_user(
        user["uid"], user.get("email", ""), user.get("name", "")
    )

    async with pool.acquire() as conn:
        async with conn.transaction():
            await conn.execute(
                "SELECT set_config('app.current_user_id', $1, true)", user_id
            )
            # Só o autor ou admin pode apagar
            result = await conn.execute(
                """DELETE FROM cet.materials
                   WHERE id=$1 AND uc_code=$2
                   AND (added_by=$3 OR EXISTS (
                       SELECT 1 FROM cet.users WHERE id=$3 AND role IN ('formador','admin')
                   ))""",
                material_id, uc_code, user_id
            )

    if result == "DELETE 0":
        raise HTTPException(status_code=403, detail="Sem permissão para apagar este material.")
    return {"ok": True}


# ── ADMIN — Audit log ──────────────────────────────────────────────

@app.get("/admin/audit")
@limiter.limit("10/minute")
async def get_audit_log(
    request: Request,
    uc_code: Optional[str] = None,
    limit: int = 100,
    user=Depends(get_current_user),
):
    user_id = await get_or_create_user(
        user["uid"], user.get("email", ""), user.get("name", "")
    )

    async with pool.acquire() as conn:
        role = await conn.fetchval(
            "SELECT role FROM cet.users WHERE id=$1", user_id
        )

    if role not in ("formador", "admin"):
        raise HTTPException(status_code=403, detail="Acesso restrito a formadores e admins.")

    query = """
        SELECT a.id, u.email, u.display_name, a.action,
               a.table_name, a.record_id, a.old_data, a.new_data, a.created_at
        FROM cet.audit_log a
        LEFT JOIN cet.users u ON u.id = a.user_id
        ORDER BY a.created_at DESC
        LIMIT $1
    """
    rows = await pool.fetch(query, min(limit, 500))
    return [dict(r) for r in rows]
