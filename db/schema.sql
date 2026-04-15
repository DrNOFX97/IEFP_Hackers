-- ================================================================
-- CET Cibersegurança — IEFP Faro
-- Schema PostgreSQL 15 — Segurança de Dados
-- ================================================================
--
-- Conceitos de segurança demonstrados neste schema:
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
--   5. PRINCÍPIO DA SEPARAÇÃO DE FUNÇÕES
--      → Alunos, formadores e admins têm vistas diferentes
--        dos mesmos dados.
--
-- ================================================================


-- ── EXTENSÕES ──────────────────────────────────────────────────
-- pgcrypto: UUIDs seguros + funções de encriptação
CREATE EXTENSION IF NOT EXISTS pgcrypto;


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
                             CHECK (role IN ('aluno', 'formador', 'admin')),
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login   TIMESTAMPTZ
);

-- Índice: lookup por firebase_uid é a operação mais frequente
CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON cet.users(firebase_uid);

-- Privilégios: aluno pode ler e atualizar o seu próprio perfil
GRANT SELECT, INSERT, UPDATE(display_name, last_login) ON cet.users TO app_aluno;
-- Formador pode ver todos os utilizadores (para gestão da turma)
GRANT SELECT ON cet.users TO app_formador;
-- Admin tem controlo total
GRANT ALL ON cet.users TO app_admin;


-- ================================================================
-- TABELA: notes
-- ================================================================
-- Apontamentos privados por utilizador e por UC.
-- RLS garante isolamento total entre utilizadores.

CREATE TABLE IF NOT EXISTS notes (
    id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID        NOT NULL REFERENCES cet.users(id) ON DELETE CASCADE,
    -- Validação do código de UC na base de dados (dupla camada com a API)
    uc_code    TEXT        NOT NULL
                           CHECK (uc_code ~ '^(UC\d{5}|FPCT)$'),
    content    TEXT        NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    -- Um aluno tem no máximo uma nota por UC
    UNIQUE(user_id, uc_code)
);

CREATE INDEX IF NOT EXISTS idx_notes_user_uc ON cet.notes(user_id, uc_code);

GRANT SELECT, INSERT, UPDATE, DELETE ON cet.notes TO app_aluno;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA cet TO app_aluno;


-- ── ROW-LEVEL SECURITY em notes ─────────────────────────────────
-- Esta é a proteção mais importante:
-- mesmo que um bug na API faça SELECT sem WHERE,
-- o PostgreSQL garante que cada utilizador só vê as suas notas.

ALTER TABLE cet.notes ENABLE ROW LEVEL SECURITY;

-- A API define app.current_user_id antes de cada query:
--   SET LOCAL app.current_user_id = '<uuid>';
CREATE POLICY notes_owner_isolation ON cet.notes
    USING (user_id = current_setting('app.current_user_id', true)::UUID);

-- Formadores e admins veem tudo (sem RLS)
ALTER TABLE cet.notes FORCE ROW LEVEL SECURITY;
CREATE POLICY notes_formador_all ON cet.notes TO app_formador USING (true);
CREATE POLICY notes_admin_all    ON cet.notes TO app_admin    USING (true);


-- ================================================================
-- TABELA: materials
-- ================================================================
-- Materiais de estudo partilhados por UC.
-- Qualquer aluno autenticado pode ler e adicionar.
-- Só o autor ou um formador/admin pode apagar.

CREATE TABLE IF NOT EXISTS materials (
    id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    uc_code    TEXT        NOT NULL
                           CHECK (uc_code ~ '^(UC\d{5}|FPCT)$'),
    type       TEXT        NOT NULL DEFAULT 'link'
                           CHECK (type IN ('link','pdf','doc','video','slide','outro')),
    label      TEXT        NOT NULL CHECK (length(label) BETWEEN 1 AND 200),
    -- URL deve começar com http:// ou https://
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
-- Em produção, considerar WORM storage ou replicação para exterior.

CREATE TABLE IF NOT EXISTS audit_log (
    id         BIGSERIAL   PRIMARY KEY,
    user_id    UUID        REFERENCES cet.users(id) ON DELETE SET NULL,
    action     TEXT        NOT NULL,   -- 'INSERT' | 'UPDATE' | 'DELETE' | 'LOGIN'
    table_name TEXT,
    record_id  TEXT,
    -- old_data e new_data em JSONB para flexibilidade
    -- Nunca guardar conteúdo completo das notas — apenas metadados
    old_data   JSONB,
    new_data   JSONB,
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Só INSERT — logs são imutáveis
-- app_aluno pode escrever logs (via SECURITY DEFINER nos triggers)
GRANT INSERT ON cet.audit_log TO app_aluno;
GRANT USAGE  ON cet.audit_log_id_seq TO app_aluno;
-- Apenas formadores e admins podem ler logs
GRANT SELECT ON cet.audit_log TO app_formador;
GRANT SELECT ON cet.audit_log TO app_admin;

-- Ninguém pode UPDATE ou DELETE nos logs
-- (sem GRANT, o acesso é negado por defeito)


-- ================================================================
-- TRIGGER: updated_at automático
-- ================================================================
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


-- ================================================================
-- TRIGGER: auditoria em notes
-- ================================================================
-- SECURITY DEFINER: a função corre com os privilégios do seu criador
-- (superuser), não do utilizador atual. Necessário para poder
-- escrever em audit_log mesmo quando o utilizador só tem INSERT.
--
-- Atenção: SECURITY DEFINER é uma ferramenta poderosa — usar com
-- cuidado. A função deve ser o mais simples possível.

CREATE OR REPLACE FUNCTION cet.audit_notes()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_user UUID;
BEGIN
    v_user := COALESCE(NEW.user_id, OLD.user_id);

    IF TG_OP = 'INSERT' THEN
        INSERT INTO cet.audit_log(user_id, action, table_name, record_id, new_data)
        VALUES (v_user, 'INSERT', 'notes', NEW.id::TEXT,
                jsonb_build_object('uc_code', NEW.uc_code,
                                   'content_length', length(NEW.content)));

    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO cet.audit_log(user_id, action, table_name, record_id, old_data, new_data)
        VALUES (v_user, 'UPDATE', 'notes', NEW.id::TEXT,
                jsonb_build_object('content_length', length(OLD.content)),
                jsonb_build_object('content_length', length(NEW.content)));

    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO cet.audit_log(user_id, action, table_name, record_id, old_data)
        VALUES (v_user, 'DELETE', 'notes', OLD.id::TEXT,
                jsonb_build_object('uc_code', OLD.uc_code));
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE OR REPLACE TRIGGER notes_audit
    AFTER INSERT OR UPDATE OR DELETE ON cet.notes
    FOR EACH ROW EXECUTE FUNCTION cet.audit_notes();


-- ================================================================
-- TRIGGER: auditoria em materials
-- ================================================================
CREATE OR REPLACE FUNCTION cet.audit_materials()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO cet.audit_log(user_id, action, table_name, record_id, new_data)
        VALUES (NEW.added_by, 'INSERT', 'materials', NEW.id::TEXT,
                jsonb_build_object('uc_code', NEW.uc_code,
                                   'type',    NEW.type,
                                   'label',   NEW.label));

    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO cet.audit_log(user_id, action, table_name, record_id, old_data)
        VALUES (OLD.added_by, 'DELETE', 'materials', OLD.id::TEXT,
                jsonb_build_object('uc_code', OLD.uc_code,
                                   'label',   OLD.label));
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE OR REPLACE TRIGGER materials_audit
    AFTER INSERT OR DELETE ON cet.materials
    FOR EACH ROW EXECUTE FUNCTION cet.audit_materials();


-- ================================================================
-- VIEWS para formadores e admins
-- ================================================================

-- Vista de atividade por UC (quantos alunos têm notas, quantos materiais)
CREATE OR REPLACE VIEW cet.uc_activity AS
SELECT
    COALESCE(n.uc_code, m.uc_code)          AS uc_code,
    COUNT(DISTINCT n.user_id)               AS alunos_com_notas,
    COUNT(DISTINCT m.id)                    AS total_materiais,
    MAX(n.updated_at)                       AS ultima_nota
FROM cet.notes n
FULL OUTER JOIN cet.materials m USING (uc_code)
GROUP BY COALESCE(n.uc_code, m.uc_code);

GRANT SELECT ON cet.uc_activity TO app_formador;
GRANT SELECT ON cet.uc_activity TO app_admin;

-- Vista de atividade por utilizador (para formadores verem progresso da turma)
CREATE OR REPLACE VIEW cet.user_activity AS
SELECT
    u.display_name,
    u.email,
    u.role,
    COUNT(DISTINCT n.uc_code)  AS ucs_com_notas,
    u.last_login
FROM cet.users u
LEFT JOIN cet.notes n ON n.user_id = u.id
GROUP BY u.id, u.display_name, u.email, u.role, u.last_login;

GRANT SELECT ON cet.user_activity TO app_formador;
GRANT SELECT ON cet.user_activity TO app_admin;
