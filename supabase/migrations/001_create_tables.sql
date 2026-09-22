-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS comments_post_id_idx ON comments(post_id);

-- Enable RLS (Row Level Security) - Optional but recommended
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies to allow all operations (for public board)
-- Allow anyone to read posts
CREATE POLICY "Enable read access for all users" ON posts
  FOR SELECT USING (true);

-- Allow anyone to insert posts
CREATE POLICY "Enable insert for all users" ON posts
  FOR INSERT WITH CHECK (true);

-- Allow anyone to update posts
CREATE POLICY "Enable update for all users" ON posts
  FOR UPDATE USING (true);

-- Allow anyone to delete posts
CREATE POLICY "Enable delete for all users" ON posts
  FOR DELETE USING (true);

-- Allow anyone to read comments
CREATE POLICY "Enable read access for all users" ON comments
  FOR SELECT USING (true);

-- Allow anyone to insert comments
CREATE POLICY "Enable insert for all users" ON comments
  FOR INSERT WITH CHECK (true);

-- Allow anyone to delete comments
CREATE POLICY "Enable delete for all users" ON comments
  FOR DELETE USING (true);
