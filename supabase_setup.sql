-- Nailsbyvic Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Create availabilities table
CREATE TABLE IF NOT EXISTS availabilities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, time)
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  customer_name TEXT NOT NULL,
  contact_method TEXT NOT NULL CHECK (contact_method IN ('email', 'phone', 'instagram')),
  contact_detail TEXT NOT NULL,
  service TEXT NOT NULL,
  addons TEXT[] DEFAULT '{}',
  inspiration_photo_url TEXT,
  estimated_total NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('natural', 'french', 'gel', 'acrylic', 'nailart', 'other')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_availabilities_date ON availabilities(date);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_created_at ON portfolio(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE availabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (all tables)
CREATE POLICY "Allow public read access on availabilities"
  ON availabilities FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on portfolio"
  ON portfolio FOR SELECT
  USING (true);

-- Allow public insert on bookings (for customer bookings)
CREATE POLICY "Allow public insert on bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

-- Note: For admin operations (insert/update/delete), you'll need to use the service role key
-- or create authenticated policies based on your auth setup

-- Create storage bucket for portfolio images (run in SQL editor or use Supabase dashboard)
-- This is a comment - you may need to create the bucket manually in Supabase Storage UI
-- Bucket name: portfolio-images
-- Public access: enabled
