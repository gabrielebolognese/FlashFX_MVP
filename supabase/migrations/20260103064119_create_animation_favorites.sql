/*
  # Create animation favorites table

  1. New Tables
    - `animation_favorites`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `animation_id` (text, the ID of the animation effect)
      - `created_at` (timestamptz)
      - Composite unique constraint on (user_id, animation_id)

  2. Security
    - Enable RLS on `animation_favorites` table
    - Add policy for users to read their own favorites
    - Add policy for users to insert their own favorites
    - Add policy for users to delete their own favorites
*/

CREATE TABLE IF NOT EXISTS animation_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  animation_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, animation_id)
);

ALTER TABLE animation_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON animation_favorites
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON animation_favorites
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON animation_favorites
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_animation_favorites_user_id ON animation_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_animation_favorites_animation_id ON animation_favorites(animation_id);
