-- Supabase Database Schema for Full Stack Portfolio CMS (Prefixed with pf_)

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Hero Section Table
CREATE TABLE IF NOT EXISTS pf_hero_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL DEFAULT 'I''m Ayan Manna',
  subtitle TEXT NOT NULL DEFAULT 'Full-Stack Engineer',
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Available Immediately',
  code_snippets JSONB NOT NULL DEFAULT '[]'::jsonb,
  achievements JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. About Section Table
CREATE TABLE IF NOT EXISTS pf_about_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bio TEXT NOT NULL,
  resume_url TEXT,
  hobbies JSONB NOT NULL DEFAULT '[]'::jsonb,
  quick_facts JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS pf_projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  video TEXT,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  demo_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  accent_color TEXT DEFAULT 'from-indigo-500 to-purple-600',
  status TEXT DEFAULT 'Live',
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS pf_skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INT DEFAULT 85,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Experience / Timeline Table
CREATE TABLE IF NOT EXISTS pf_experience (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights JSONB DEFAULT '[]'::jsonb,
  type TEXT DEFAULT 'work',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Education Table
CREATE TABLE IF NOT EXISTS pf_education (
  id SERIAL PRIMARY KEY,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  period TEXT NOT NULL,
  grade TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Certificates Table
CREATE TABLE IF NOT EXISTS pf_certificates (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  credential_url TEXT,
  image TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Testimonials Table
CREATE TABLE IF NOT EXISTS pf_testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  quote TEXT NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Contact & Socials Table
CREATE TABLE IF NOT EXISTS pf_contact_socials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT DEFAULT 'ayanmanna.work@gmail.com',
  phone TEXT DEFAULT '+91 98765 43210',
  location TEXT DEFAULT 'Kolkata, India',
  social_links JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS) and grant public read access
ALTER TABLE pf_hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE pf_about_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE pf_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE pf_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE pf_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE pf_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE pf_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE pf_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE pf_contact_socials ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public Read Hero" ON pf_hero_section FOR SELECT USING (true);
CREATE POLICY "Public Read About" ON pf_about_section FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON pf_projects FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON pf_skills FOR SELECT USING (true);
CREATE POLICY "Public Read Experience" ON pf_experience FOR SELECT USING (true);
CREATE POLICY "Public Read Education" ON pf_education FOR SELECT USING (true);
CREATE POLICY "Public Read Certificates" ON pf_certificates FOR SELECT USING (true);
CREATE POLICY "Public Read Testimonials" ON pf_testimonials FOR SELECT USING (true);
CREATE POLICY "Public Read Contact" ON pf_contact_socials FOR SELECT USING (true);

-- Storage Bucket Setup Instructions:
-- 1. Create a public storage bucket named 'portfolio-assets' in Supabase Dashboard.
-- 2. Set Public policy to allow SELECT for everyone, and INSERT/UPDATE/DELETE for authenticated/service role.
