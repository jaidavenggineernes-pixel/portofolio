-- ==========================================================
-- SUPABASE COMPLETE DATABASE SCHEMA FOR PERSONAL PORTFOLIO
-- ==========================================================

-- 1. Create PROFILES Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  nickname TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  motto TEXT NOT NULL,
  age INTEGER NOT NULL DEFAULT 21,
  location TEXT NOT NULL,
  education TEXT NOT NULL,
  hobbies TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  goals TEXT NOT NULL,
  typing_text TEXT[] DEFAULT '{}',
  cv_url TEXT,
  avatar_url TEXT,
  cover_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Create PROJECTS Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  thumbnail TEXT NOT NULL,
  category TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  year TEXT NOT NULL,
  status TEXT CHECK (status IN ('Completed', 'In Progress', 'Featured')) DEFAULT 'Completed',
  demo_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Create CERTIFICATES Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE NOT NULL,
  credential_url TEXT,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Create GALLERY / DOCUMENTATION Table
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Create SKILLS Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('Frontend', 'Backend', 'UI Design', 'Database', 'Editing', 'Photography', 'AI Tools')) NOT NULL,
  percentage INTEGER CHECK (percentage BETWEEN 0 AND 100) NOT NULL,
  icon_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. Create SOCIAL LINKS Table
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  username TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. Create MESSAGES Table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. Create SETTINGS Table
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL DEFAULT 'Personal Portfolio',
  logo_text TEXT NOT NULL DEFAULT 'JaiAsis.',
  primary_color TEXT NOT NULL DEFAULT '#0f172a',
  accent_color TEXT NOT NULL DEFAULT '#3b82f6',
  default_theme TEXT NOT NULL DEFAULT 'dark',
  enable_cursor BOOLEAN DEFAULT true,
  enable_sound BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies: Public Read Access
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Social Links" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Public Insert Messages" ON public.messages FOR INSERT WITH CHECK (true);

-- Admin Full Access Policies
CREATE POLICY "Admin Full Access Profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Certificates" ON public.certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Social Links" ON public.social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Messages" ON public.messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Settings" ON public.settings FOR ALL USING (auth.role() = 'authenticated');

-- Storage Buckets Configuration Note:
-- Create public storage buckets in Supabase Storage Dashboard:
-- 1. 'projects' (Public)
-- 2. 'gallery' (Public)
-- 3. 'certificate' (Public)
-- 4. 'avatar' (Public)
-- 5. 'cover' (Public)
