-- Freya Pilates — Supabase Schema
-- Run this in the Supabase SQL Editor

-- Blog Posts
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null default '',
  excerpt text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Contact Submissions
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  inquiry_type text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security

-- blog_posts: public can read published posts; authenticated users can do everything
alter table blog_posts enable row level security;

create policy "Public can read published posts"
  on blog_posts for select
  using (status = 'published');

create policy "Authenticated users have full access"
  on blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- contact_submissions: only authenticated users can read; anyone can insert
alter table contact_submissions enable row level security;

create policy "Anyone can submit contact form"
  on contact_submissions for insert
  with check (true);

create policy "Authenticated users can read submissions"
  on contact_submissions for select
  using (auth.role() = 'authenticated');
