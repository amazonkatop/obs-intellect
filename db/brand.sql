-- =============================================================================
-- Brand documents (internal admin only — not a public page)
-- Run after db/schema.sql. Seed markdown with: node scripts/seed-brandbook.mjs
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.brand_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE,
    title TEXT,
    content_markdown TEXT,
    updated_at TIMESTAMP DEFAULT now()
);

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'obs_build') THEN
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.brand_documents TO obs_build;
  END IF;
END
$$;
