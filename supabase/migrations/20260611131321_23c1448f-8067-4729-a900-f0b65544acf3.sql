
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- Site content (key/value JSON)
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  published_content JSONB NOT NULL DEFAULT '{}'::jsonb,
  draft_content JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'published',
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content" ON public.site_content
  FOR SELECT USING (true);
CREATE POLICY "Admins can insert site content" ON public.site_content
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site content" ON public.site_content
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site content" ON public.site_content
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_site_content_updated
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Versions
CREATE TABLE public.content_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL,
  content JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  note TEXT
);
GRANT SELECT, INSERT, DELETE ON public.content_versions TO authenticated;
GRANT ALL ON public.content_versions TO service_role;
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage versions" ON public.content_versions
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_versions_section ON public.content_versions(section_key, created_at DESC);

-- Activity logs
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.activity_logs TO authenticated;
GRANT ALL ON public.activity_logs TO service_role;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read activity" ON public.activity_logs
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated insert activity" ON public.activity_logs
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_activity_created ON public.activity_logs(created_at DESC);

-- Media files
CREATE TABLE public.media_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media_files TO anon;
GRANT SELECT, INSERT, DELETE ON public.media_files TO authenticated;
GRANT ALL ON public.media_files TO service_role;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads media" ON public.media_files FOR SELECT USING (true);
CREATE POLICY "Admins insert media" ON public.media_files
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete media" ON public.media_files
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Seed initial editable sections
INSERT INTO public.site_content (section_key, label, published_content, draft_content) VALUES
  ('hero', 'Hero Section', '{"title":"","subtitle":"","cta":""}'::jsonb, '{"title":"","subtitle":"","cta":""}'::jsonb),
  ('services', 'Services', '{"items":[]}'::jsonb, '{"items":[]}'::jsonb),
  ('about', 'About', '{"title":"","body":""}'::jsonb, '{"title":"","body":""}'::jsonb),
  ('contact', 'Contact', '{"email":"info@sitevyro.com","phone1":"0765804568","phone2":"0732505039"}'::jsonb, '{"email":"info@sitevyro.com","phone1":"0765804568","phone2":"0732505039"}'::jsonb),
  ('footer', 'Footer', '{"address":"","rights":""}'::jsonb, '{"address":"","rights":""}'::jsonb);
