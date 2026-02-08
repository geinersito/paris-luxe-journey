-- Security hardening: tighten privileges for public.profiles
REVOKE ALL ON TABLE public.profiles FROM anon;
REVOKE ALL ON TABLE public.profiles FROM authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.profiles TO authenticated;
