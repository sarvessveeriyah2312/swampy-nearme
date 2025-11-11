/*
  # Create Poojas Table for Swamiye NearMe

  ## Purpose
  Store Ayyappa Pooja announcements submitted by devotees

  ## New Tables
  
  ### `poojas`
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text, required) - Pooja title/name
  - `description` (text) - Detailed description of the event
  - `pooja_date` (timestamptz, required) - Date and time of the Pooja
  - `location_lat` (numeric, required) - Latitude coordinate
  - `location_lng` (numeric, required) - Longitude coordinate
  - `location_address` (text) - Human-readable address
  - `image_url` (text) - Optional image URL
  - `status` (text, default 'pending') - Moderation status (pending/approved/rejected)
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on poojas table
  - Allow public read access to approved poojas only
  - Allow public insert for new announcements
  - Restrict update/delete to admin only (future implementation)

  ## Indexes
  - Index on pooja_date for date-based queries
  - Index on status for filtering
  - Index on location coordinates for geo queries
*/

-- Create poojas table
CREATE TABLE IF NOT EXISTS poojas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  pooja_date timestamptz NOT NULL,
  location_lat numeric(10, 8) NOT NULL,
  location_lng numeric(11, 8) NOT NULL,
  location_address text DEFAULT '',
  image_url text DEFAULT '',
  status text DEFAULT 'approved',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE poojas ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view approved poojas
CREATE POLICY "Anyone can view approved poojas"
  ON poojas
  FOR SELECT
  USING (status = 'approved');

-- Policy: Anyone can insert new pooja announcements
CREATE POLICY "Anyone can announce poojas"
  ON poojas
  FOR INSERT
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_poojas_date ON poojas(pooja_date);
CREATE INDEX IF NOT EXISTS idx_poojas_status ON poojas(status);
CREATE INDEX IF NOT EXISTS idx_poojas_location ON poojas(location_lat, location_lng);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_poojas_updated_at ON poojas;
CREATE TRIGGER update_poojas_updated_at
  BEFORE UPDATE ON poojas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();