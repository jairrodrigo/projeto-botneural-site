-- =============================================
-- BOTNEURAL ADMIN PANEL - DATABASE SCHEMA
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- LEADS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  segment TEXT,
  origin TEXT NOT NULL CHECK (origin IN ('landing', 'blog', 'contact')),
  status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'em_contato', 'qualificado', 'proposta', 'cliente')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_origin ON leads(origin);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- =============================================
-- POSTS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category_id TEXT NOT NULL,
  featured_image TEXT,
  image_alt TEXT,
  author TEXT DEFAULT 'BotNeural',
  published_at TIMESTAMP WITH TIME ZONE,
  reading_time INTEGER,
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  is_draft BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_is_draft ON posts(is_draft);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category_id);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on leads table
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Authenticated users can manage all leads
CREATE POLICY "Authenticated users can manage leads"
ON leads FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Public (anonymous) can insert leads (for forms)
CREATE POLICY "Public can insert leads"
ON leads FOR INSERT
TO anon
WITH CHECK (true);

-- Enable RLS on posts table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Authenticated users can manage all posts
CREATE POLICY "Authenticated users can manage posts"
ON posts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Public can read published posts only
CREATE POLICY "Public can read published posts"
ON posts FOR SELECT
TO anon
USING (is_draft = false);

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for leads table
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for posts table
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- INITIAL DATA (Optional)
-- =============================================

-- Insert sample lead for testing (optional)
-- INSERT INTO leads (name, whatsapp, email, segment, origin, status)
-- VALUES ('João Silva', '11999999999', 'joao@example.com', 'E-commerce', 'landing', 'novo');

-- =============================================
-- QUERIES FOR REFERENCE
-- =============================================

-- Get all leads
-- SELECT * FROM leads ORDER BY created_at DESC;

-- Get leads by status
-- SELECT * FROM leads WHERE status = 'novo' ORDER BY created_at DESC;

-- Get leads count by status
-- SELECT status, COUNT(*) as count FROM leads GROUP BY status;

-- Get leads by month
-- SELECT DATE_TRUNC('month', created_at) as month, COUNT(*) as count
-- FROM leads
-- GROUP BY month
-- ORDER BY month DESC;

-- Get all published posts
-- SELECT * FROM posts WHERE is_draft = false ORDER BY published_at DESC;

-- Get posts by category
-- SELECT * FROM posts WHERE category_id = 'automacao-whatsapp' ORDER BY created_at DESC;
