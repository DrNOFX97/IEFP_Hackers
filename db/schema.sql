-- ================================================================
-- CET Cibersegurança — IEFP Faro
-- Schema PostgreSQL 15 — Segurança de Dados
-- ================================================================
--
-- Conceitos de SGBD demonstrados neste schema:
--
--   1. ROLES e PRIVILÉGIOS MÍNIMOS
--      → Cada role tem apenas as permissões de que necessita.
--      → A aplicação nunca corre como superuser.
--
--   2. ROW-LEVEL SECURITY (RLS)
--      → Cada utilizador só acede aos seus próprios dados,
--        mesmo que a query não tenha WHERE clause.
--
--   3. AUDITORIA COM TRIGGERS
--      → Todas as operações em dados sensíveis são registadas
--        automaticamente. Os logs são imutáveis (só INSERT).
--
--   4. CONSTRAINTS E VALIDAÇÃO
--      → A base de dados rejeita dados inválidos mesmo que
--        a aplicação falhe na validação.
--
--   5. SEPARAÇÃO DE FUNÇÕES
--      → Alunos, formadores e admins têm vistas diferentes
--        dos mesmos dados.
--
--   6. CONTROLO DE SESSÕES
--      → Registo de sessões ativas e histórico de login.
--
-- ================================================================


-- ── EXTENSÕES ──────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS pgcrypto;   -- UUIDs seguros + hashing
CREATE EXTENSION IF NOT EXISTS pg_stat_statements; -- análise de queries lentas


-- ── SCHEMA DEDICADO ────────────────────────────────────────────
-- Isola as tabelas da aplicação do schema public.
-- Boa prática em ambientes multi-tenant.
CREATE SCHEMA IF NOT EXISTS cet;
SET search_path = cet, public;


-- ================================================================
-- ROLES — Princípio do menor privilégio
-- ================================================================
-- Nunca dar permissões diretamente a utilizadores de login.
-- Usar roles intermédios para facilitar gestão.

DO $$ BEGIN
    CREATE ROLE app_aluno    NOLOGIN;
    CREATE ROLE app_formador NOLOGIN;
    CREATE ROLE app_admin    NOLOGIN;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Utilizador de login da aplicação (Cloud Run API)
-- Tem apenas os privilégios de app_aluno por defeito.
-- Privilégios elevados são concedidos via SET ROLE na sessão.
DO $$ BEGIN
    CREATE ROLE app_api LOGIN PASSWORD 'ALTERAR_EM_PRODUCAO';
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

GRANT app_aluno TO app_api;


-- ================================================================
-- TABELA: users
-- ================================================================
-- Espelho dos utilizadores do Firebase Auth.
-- firebase_uid é a chave de ligação entre os dois sistemas.
-- Criado automaticamente no primeiro login.

CREATE TABLE IF NOT EXISTS users (
    id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    firebase_uid TEXT        UNIQUE NOT NULL,
    email        TEXT        NOT NULL
                             CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'),
    display_name TEXT,
    -- role define o que o utilizador pode fazer na aplicação
    role         TEXT        NOT NULL DEFAULT 'aluno'
                             CHECK (role IN ('aluno', 'formador', 'admin', 'blocked')),
    -- is_active permite desativar um utilizador sem o apagar
    is_active    BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login   TIMESTAMPTZ,
    -- metadata extra (tema, preferências, etc.)
    metadata     JSONB       NOT NULL DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON cet.users(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_users_email        ON cet.users(lower(email));
CREATE INDEX IF NOT EXISTS idx_users_role         ON cet.users(role);

-- Privilégios granulares
GRANT SELECT, INSERT ON cet.users TO app_aluno;
GRANT UPDATE(display_name, last_login, metadata) ON cet.users TO app_aluno;
GRANT SELECT ON cet.users TO app_formador;
GRANT ALL ON cet.users TO app_admin;


-- ================================================================
-- TABELA: sessions
-- ================================================================
-- Registo de sessões ativas (para controlo de acessos concorrentes
-- e para poder revogar sessões específicas).

CREATE TABLE IF NOT EXISTS sessions (
    id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID        NOT NULL REFERENCES cet.users(id) ON DELETE CASCADE,
    firebase_uid TEXT        NOT NULL,
    -- token_hash: hash do Firebase ID token (para revogação)
    -- Nunca guardar o token em claro
    token_hash   TEXT        NOT NULL,
    ip_address   INET,
    user_agent   TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at   TIMESTAMPTZ NOT NULL,
    -- revoked: true se a sessão foi terminada pelo admin
    revoked      BOOLEAN     NOT NULL DEFAULT FALSE,
    revoked_at   TIMESTAMPTZ,
    revoked_by   UUID        REFERENCES cet.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id    ON cet.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token_hash ON cet.sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_sessions_active     ON cet.sessions(user_id, revoked, expires_at);

GRANT SELECT, INSERT ON cet.sessions TO app_aluno;
GRANT UPDATE(revoked, revoked_at, revoked_by) ON cet.sessions TO app_admin;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA cet TO app_aluno;


-- ================================================================
-- TABELA: login_log
-- ================================================================
-- Histórico detalhado de logins.
-- Imutável — só INSERT. Separado do audit_log por volume.

CREATE TABLE IF NOT EXISTS login_log (
    id           BIGSERIAL   PRIMARY KEY,
    user_id      UUID        REFERENCES cet.users(id) ON DELETE SET NULL,
    email        TEXT,
    ip_address   INET,
    user_agent   TEXT,
    provider     TEXT        CHECK (provider IN ('google', 'microsoft', 'email', 'other')),
    success      BOOLEAN     NOT NULL DEFAULT TRUE,
    fail_reason  TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_login_log_user_id   ON cet.login_log(user_id);
CREATE INDEX IF NOT EXISTS idx_login_log_created   ON cet.login_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_log_ip        ON cet.login_log(ip_address);

GRANT INSERT ON cet.login_log TO app_aluno;
GRANT USAGE ON cet.login_log_id_seq TO app_aluno;
GRANT SELECT ON cet.login_log TO app_formador;
GRANT SELECT ON cet.login_log TO app_admin;


-- ================================================================
-- TABELA: notes
-- ================================================================
CREATE TABLE IF NOT EXISTS notes (
    id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID        NOT NULL REFERENCES cet.users(id) ON DELETE CASCADE,
    uc_code    TEXT        NOT NULL
                           CHECK (uc_code ~ '^(UC\d{5}|FPCT)$'),
    content    TEXT        NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, uc_code)
);

CREATE INDEX IF NOT EXISTS idx_notes_user_uc ON cet.notes(user_id, uc_code);

GRANT SELECT, INSERT, UPDATE, DELETE ON cet.notes TO app_aluno;


-- ── ROW-LEVEL SECURITY em notes ──────────────────────────────────
ALTER TABLE cet.notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY notes_owner_isolation ON cet.notes
    USING (user_id = current_setting('app.current_user_id', true)::UUID);

ALTER TABLE cet.notes FORCE ROW LEVEL SECURITY;
CREATE POLICY notes_formador_all ON cet.notes TO app_formador USING (true);
CREATE POLICY notes_admin_all    ON cet.notes TO app_admin    USING (true);


-- ================================================================
-- TABELA: materials
-- ================================================================
CREATE TABLE IF NOT EXISTS materials (
    id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    uc_code    TEXT        NOT NULL
                           CHECK (uc_code ~ '^(UC\d{5}|FPCT)$'),
    type       TEXT        NOT NULL DEFAULT 'link'
                           CHECK (type IN ('link','pdf','doc','video','slide','outro')),
    label      TEXT        NOT NULL CHECK (length(label) BETWEEN 1 AND 200),
    url        TEXT        CHECK (url IS NULL OR url ~ '^https?://'),
    file_size  TEXT,
    added_by   UUID        REFERENCES cet.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_materials_uc ON cet.materials(uc_code);

GRANT SELECT, INSERT, DELETE ON cet.materials TO app_aluno;
GRANT ALL ON cet.materials TO app_formador;
GRANT ALL ON cet.materials TO app_admin;


-- ================================================================
-- TABELA: audit_log
-- ================================================================
-- Registo imutável de operações sensíveis.
-- NINGUÉM pode alterar ou apagar entradas — só INSERT.

CREATE TABLE IF NOT EXISTS audit_log (
    id          BIGSERIAL   PRIMARY KEY,
    user_id     UUID        REFERENCES cet.users(id) ON DELETE SET NULL,
    action      TEXT        NOT NULL,
                -- INSERT | UPDATE | DELETE | LOGIN | LOGOUT | ROLE_CHANGE
                -- MATERIAL_ADD | MATERIAL_DELETE | NOTE_WRITE | NOTE_DELETE
    table_name  TEXT,
    record_id   TEXT,
    old_data    JSONB,
    new_data    JSONB,
    ip_address  INET,
    user_agent  TEXT,
    session_id  UUID        REFERENCES cet.sessions(id) ON DELETE SET NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_user_id  ON cet.audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_action   ON cet.audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_created  ON cet.audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_table    ON cet.audit_log(table_name);

-- Só INSERT — logs são imutáveis
GRANT INSERT ON cet.audit_log TO app_aluno;
GRANT USAGE ON cet.audit_log_id_seq TO app_aluno;
GRANT SELECT ON cet.audit_log TO app_formador;
GRANT SELECT ON cet.audit_log TO app_admin;
-- Sem UPDATE nem DELETE (negado por defeito)


-- ================================================================
-- TRIGGERS
-- ================================================================

-- updated_at automático
CREATE OR REPLACE FUNCTION cet.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER notes_updated_at
    BEFORE UPDATE ON cet.notes
    FOR EACH ROW EXECUTE FUNCTION cet.set_updated_at();


-- Auditoria em notes
-- SECURITY DEFINER: a função corre com os privilégios do criador,
-- não do utilizador atual — necessário para escrever em audit_log.
CREATE OR REPLACE FUNCTION cet.audit_notes()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_user UUID;
BEGIN
    v_user := COALESCE(NEW.user_id, OLD.user_id);

    IF TG_OP = 'INSERT' THEN
        INSERT INTO cet.audit_log(user_id, action, table_name, record_id, new_data)
        VALUES (v_user, 'NOTE_WRITE', 'notes', NEW.id::TEXT,
                jsonb_build_object('uc_code', NEW.uc_code,
                                   'content_length', length(NEW.content)));

    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO cet.audit_log(user_id, action, table_name, record_id, old_data, new_data)
        VALUES (v_user, 'NOTE_WRITE', 'notes', NEW.id::TEXT,
                jsonb_build_object('content_length', length(OLD.content)),
                jsonb_build_object('content_length', length(NEW.content)));

    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO cet.audit_log(user_id, action, table_name, record_id, old_data)
        VALUES (v_user, 'NOTE_DELETE', 'notes', OLD.id::TEXT,
                jsonb_build_object('uc_code', OLD.uc_code));
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE OR REPLACE TRIGGER notes_audit
    AFTER INSERT OR UPDATE OR DELETE ON cet.notes
    FOR EACH ROW EXECUTE FUNCTION cet.audit_notes();


-- Auditoria em materials
CREATE OR REPLACE FUNCTION cet.audit_materials()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO cet.audit_log(user_id, action, table_name, record_id, new_data)
        VALUES (NEW.added_by, 'MATERIAL_ADD', 'materials', NEW.id::TEXT,
                jsonb_build_object('uc_code', NEW.uc_code,
                                   'type',    NEW.type,
                                   'label',   NEW.label));

    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO cet.audit_log(user_id, action, table_name, record_id, old_data)
        VALUES (OLD.added_by, 'MATERIAL_DELETE', 'materials', OLD.id::TEXT,
                jsonb_build_object('uc_code', OLD.uc_code,
                                   'label',   OLD.label));
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE OR REPLACE TRIGGER materials_audit
    AFTER INSERT OR DELETE ON cet.materials
    FOR EACH ROW EXECUTE FUNCTION cet.audit_materials();


-- Auditoria em users (alteração de role)
CREATE OR REPLACE FUNCTION cet.audit_users()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    IF TG_OP = 'UPDATE' AND OLD.role IS DISTINCT FROM NEW.role THEN
        INSERT INTO cet.audit_log(user_id, action, table_name, record_id, old_data, new_data)
        VALUES (NEW.id, 'ROLE_CHANGE', 'users', NEW.id::TEXT,
                jsonb_build_object('role', OLD.role),
                jsonb_build_object('role', NEW.role));
    END IF;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER users_audit
    AFTER UPDATE ON cet.users
    FOR EACH ROW EXECUTE FUNCTION cet.audit_users();


-- ================================================================
-- VIEWS
-- ================================================================

-- Atividade por UC
CREATE OR REPLACE VIEW cet.uc_activity AS
SELECT
    COALESCE(n.uc_code, m.uc_code)      AS uc_code,
    COUNT(DISTINCT n.user_id)           AS alunos_com_notas,
    COUNT(DISTINCT m.id)                AS total_materiais,
    MAX(n.updated_at)                   AS ultima_nota
FROM cet.notes n
FULL OUTER JOIN cet.materials m USING (uc_code)
GROUP BY COALESCE(n.uc_code, m.uc_code);

GRANT SELECT ON cet.uc_activity TO app_formador;
GRANT SELECT ON cet.uc_activity TO app_admin;


-- Atividade por utilizador
CREATE OR REPLACE VIEW cet.user_activity AS
SELECT
    u.id,
    u.display_name,
    u.email,
    u.role,
    u.is_active,
    COUNT(DISTINCT n.uc_code)   AS ucs_com_notas,
    u.last_login,
    u.created_at
FROM cet.users u
LEFT JOIN cet.notes n ON n.user_id = u.id
GROUP BY u.id, u.display_name, u.email, u.role, u.is_active, u.last_login, u.created_at;

GRANT SELECT ON cet.user_activity TO app_formador;
GRANT SELECT ON cet.user_activity TO app_admin;


-- Sessões ativas (não expiradas, não revogadas)
CREATE OR REPLACE VIEW cet.active_sessions AS
SELECT
    s.id          AS session_id,
    u.email,
    u.display_name,
    u.role,
    s.ip_address,
    s.user_agent,
    s.created_at,
    s.expires_at
FROM cet.sessions s
JOIN cet.users u ON u.id = s.user_id
WHERE s.revoked = FALSE
  AND s.expires_at > NOW();

GRANT SELECT ON cet.active_sessions TO app_admin;


-- Dashboard de administração
CREATE OR REPLACE VIEW cet.admin_dashboard AS
SELECT
    (SELECT COUNT(*) FROM cet.users)                                     AS total_users,
    (SELECT COUNT(*) FROM cet.users WHERE role = 'aluno')                AS total_alunos,
    (SELECT COUNT(*) FROM cet.users WHERE role = 'formador')             AS total_formadores,
    (SELECT COUNT(*) FROM cet.users WHERE role = 'admin')                AS total_admins,
    (SELECT COUNT(*) FROM cet.users WHERE last_login >= NOW() - INTERVAL '24h') AS active_24h,
    (SELECT COUNT(*) FROM cet.notes)                                     AS total_notes,
    (SELECT COUNT(*) FROM cet.materials)                                 AS total_materials,
    (SELECT COUNT(*) FROM cet.audit_log WHERE created_at >= CURRENT_DATE) AS audit_today,
    (SELECT COUNT(*) FROM cet.login_log WHERE created_at >= CURRENT_DATE) AS logins_today,
    (SELECT COUNT(*) FROM cet.active_sessions)                           AS active_sessions;

GRANT SELECT ON cet.admin_dashboard TO app_admin;


-- ================================================================
-- FUNÇÃO: revogar sessão
-- ================================================================
-- Admin pode revogar qualquer sessão.
-- Usada para forçar logout de utilizadores comprometidos.

CREATE OR REPLACE FUNCTION cet.revoke_session(
    p_session_id UUID,
    p_admin_id   UUID
)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    UPDATE cet.sessions
    SET revoked    = TRUE,
        revoked_at = NOW(),
        revoked_by = p_admin_id
    WHERE id = p_session_id;

    -- Audit log
    INSERT INTO cet.audit_log(user_id, action, table_name, record_id, new_data)
    VALUES (p_admin_id, 'SESSION_REVOKE', 'sessions', p_session_id::TEXT,
            jsonb_build_object('revoked_by', p_admin_id));
END;
$$;
