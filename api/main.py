"""
CET Cibersegurança — API Backend
FastAPI + PostgreSQL (Cloud SQL)

Boas práticas de segurança:
  - Autenticação via Firebase JWT em todos os endpoints
  - Queries parametrizadas (nunca f-strings com input do utilizador)
  - RLS no PostgreSQL (SET LOCAL app.current_user_id)
  - Validação de input com Pydantic
  - Rate limiting por IP
  - Separação de roles: aluno / formador / admin
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
    version="2.0.0",
    lifespan=lifespan,
    # Desativa docs em produção
    docs_url=None if os.environ.get("ENV") == "production" else "/docs",
    redoc_url=None,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
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


async def get_user_role(user_id: str) -> str:
    """Devolve o role do utilizador ('aluno', 'formador', 'admin')."""
    async with pool.acquire() as conn:
        role = await conn.fetchval(
            "SELECT role FROM cet.users WHERE id = $1", user_id
        )
    return role or "aluno"


async def require_role(user, min_role: str) -> str:
    """
    Verifica se o utilizador tem pelo menos o role indicado.
    Ordem: aluno < formador < admin
    Devolve o user_id interno.
    """
    ROLE_RANK = {"aluno": 0, "formador": 1, "admin": 2}
    user_id = await get_or_create_user(
        user["uid"], user.get("email", ""), user.get("name", "")
    )
    role = await get_user_role(user_id)
    if ROLE_RANK.get(role, 0) < ROLE_RANK.get(min_role, 0):
        raise HTTPException(
            status_code=403,
            detail=f"Acesso restrito a utilizadores com role '{min_role}' ou superior."
        )
    return user_id


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


class RoleIn(BaseModel):
    role: str

    @field_validator("role")
    @classmethod
    def valid_role(cls, v):
        if v not in {"aluno", "formador", "admin"}:
            raise ValueError("Role inválido. Use: aluno, formador, admin.")
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
                await conn.execute(
                    """INSERT INTO cet.notes (user_id, uc_code, content)
                       VALUES ($1, $2, $3)
                       ON CONFLICT (user_id, uc_code)
                       DO UPDATE SET content = EXCLUDED.content""",
                    user_id, uc_code, body.content
                )
            else:
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


# ── ADMIN — Utilizadores ───────────────────────────────────────────

@app.get("/admin/users")
@limiter.limit("20/minute")
async def list_users(
    request: Request,
    user=Depends(get_current_user),
):
    """Lista todos os utilizadores. Requer role formador ou admin."""
    admin_id = await require_role(user, "formador")

    rows = await pool.fetch(
        """SELECT id, firebase_uid, email, display_name, role, created_at, last_login
           FROM cet.users
           ORDER BY last_login DESC NULLS LAST"""
    )
    return [dict(r) for r in rows]


@app.patch("/admin/users/{target_user_id}/role", status_code=200)
@limiter.limit("10/minute")
async def change_user_role(
    request: Request,
    target_user_id: str,
    body: RoleIn,
    user=Depends(get_current_user),
):
    """Altera o role de um utilizador. Requer role admin."""
    admin_id = await require_role(user, "admin")

    # Admin não pode revogar o seu próprio role
    if target_user_id == admin_id:
        raise HTTPException(status_code=400, detail="Não podes alterar o teu próprio role.")

    async with pool.acquire() as conn:
        result = await conn.execute(
            "UPDATE cet.users SET role = $1 WHERE id = $2",
            body.role, target_user_id
        )

    if result == "UPDATE 0":
        raise HTTPException(status_code=404, detail="Utilizador não encontrado.")

    # Audit log
    async with pool.acquire() as conn:
        await conn.execute(
            """INSERT INTO cet.audit_log (user_id, action, table_name, record_id, new_data)
               VALUES ($1, 'ROLE_CHANGE', 'users', $2, $3::jsonb)""",
            admin_id, target_user_id,
            f'{{"new_role": "{body.role}"}}'
        )

    return {"ok": True, "role": body.role}


# ── ADMIN — Audit log ──────────────────────────────────────────────

@app.get("/admin/audit")
@limiter.limit("10/minute")
async def get_audit_log(
    request: Request,
    uc_code: Optional[str] = None,
    action: Optional[str]  = None,
    limit: int = 100,
    offset: int = 0,
    user=Depends(get_current_user),
):
    """Acesso ao log de auditoria. Requer role formador ou admin."""
    admin_id = await require_role(user, "formador")

    params  = [min(limit, 500), offset]
    filters = []

    if uc_code:
        validate_uc(uc_code)
        params.append(uc_code)
        filters.append(f"(a.new_data->>'uc_code' = ${len(params)} OR a.old_data->>'uc_code' = ${len(params)})")

    if action:
        params.append(action.upper())
        filters.append(f"a.action = ${len(params)}")

    where = "WHERE " + " AND ".join(filters) if filters else ""

    query = f"""
        SELECT a.id, u.email, u.display_name, a.action,
               a.table_name, a.record_id, a.old_data, a.new_data,
               a.ip_address, a.created_at
        FROM cet.audit_log a
        LEFT JOIN cet.users u ON u.id = a.user_id
        {where}
        ORDER BY a.created_at DESC
        LIMIT $1 OFFSET $2
    """
    rows = await pool.fetch(query, *params)
    return [dict(r) for r in rows]


# ── ADMIN — Estatísticas ───────────────────────────────────────────

@app.get("/admin/stats")
@limiter.limit("10/minute")
async def get_stats(
    request: Request,
    user=Depends(get_current_user),
):
    """Estatísticas do sistema. Requer role formador ou admin."""
    await require_role(user, "formador")

    async with pool.acquire() as conn:
        stats = await conn.fetchrow("""
            SELECT
                COUNT(*)                                         AS total_users,
                COUNT(*) FILTER (WHERE role = 'aluno')          AS alunos,
                COUNT(*) FILTER (WHERE role = 'formador')       AS formadores,
                COUNT(*) FILTER (WHERE role = 'admin')          AS admins,
                COUNT(*) FILTER (WHERE last_login >= NOW() - INTERVAL '24h') AS active_24h
            FROM cet.users
        """)
        note_stats = await conn.fetchrow("""
            SELECT
                COUNT(*)                    AS total_notes,
                COUNT(DISTINCT user_id)     AS users_with_notes,
                COUNT(DISTINCT uc_code)     AS ucs_with_notes
            FROM cet.notes
        """)
        audit_today = await conn.fetchval("""
            SELECT COUNT(*) FROM cet.audit_log
            WHERE created_at >= CURRENT_DATE
        """)

    return {
        "users":    dict(stats),
        "notes":    dict(note_stats),
        "audit_today": audit_today,
    }


# ── ADMIN — Vista de atividade ─────────────────────────────────────

@app.get("/admin/activity")
@limiter.limit("10/minute")
async def get_activity(
    request: Request,
    user=Depends(get_current_user),
):
    """Atividade por UC e por utilizador. Requer role formador ou admin."""
    await require_role(user, "formador")

    async with pool.acquire() as conn:
        uc_rows   = await conn.fetch("SELECT * FROM cet.uc_activity ORDER BY ultima_nota DESC NULLS LAST")
        user_rows = await conn.fetch("SELECT * FROM cet.user_activity ORDER BY last_login DESC NULLS LAST")

    return {
        "uc_activity":   [dict(r) for r in uc_rows],
        "user_activity": [dict(r) for r in user_rows],
    }
