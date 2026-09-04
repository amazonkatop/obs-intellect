-- =============================================================================
-- Runtime chat / leads / integrations / admin (Timeweb PostgreSQL)
-- Run after db/schema.sql. Do not change pulse_* columns — reserved for OBS Pulse.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.ai_chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    pulse_sync_status TEXT DEFAULT 'not_applicable',
    pulse_client_id UUID
);

CREATE INDEX IF NOT EXISTS ai_chat_sessions_created_idx
  ON public.ai_chat_sessions (created_at DESC);

CREATE TABLE IF NOT EXISTS public.ai_chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.ai_chat_sessions(id),
    role TEXT CHECK (role IN ('user','assistant')),
    content TEXT,
    created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ai_chat_messages_session_idx
  ON public.ai_chat_messages (session_id, created_at);

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    phone TEXT,
    email TEXT,
    message TEXT,
    consent_personal_data BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_name TEXT UNIQUE,
    is_enabled BOOLEAN DEFAULT false,
    config JSONB,
    updated_at TIMESTAMP DEFAULT now()
);

INSERT INTO public.integrations (service_name, is_enabled, config)
VALUES (
  'ai_assistant',
  false,
  '{"provider":"deepseek","api_key":"","model":"deepseek-chat"}'::jsonb
)
ON CONFLICT (service_name) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE,
    password_hash TEXT,
    created_at TIMESTAMP DEFAULT now()
);

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'obs_build') THEN
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE
      public.ai_chat_sessions,
      public.ai_chat_messages,
      public.leads,
      public.integrations,
      public.admin_users
      TO obs_build;
  END IF;
END
$$;
