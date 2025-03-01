-- Create enum for booking status
CREATE TYPE booking_status AS ENUM (
  'pending',
  'pending_payment',
  'confirmed',
  'cancelled'
);

-- Create enum for tour types
CREATE TYPE tour_type AS ENUM (
  'standard',
  'premium',
  'vip'
);

-- Create tours table
CREATE TABLE IF NOT EXISTS tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  destination VARCHAR(100) NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  duration_hours INTEGER NOT NULL,
  max_participants INTEGER NOT NULL,
  included TEXT[],
  not_included TEXT[],
  meeting_point TEXT,
  important_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tour_id UUID REFERENCES tours(id),
  user_id UUID REFERENCES auth.users(id),
  booking_date DATE NOT NULL,
  tour_type tour_type NOT NULL DEFAULT 'standard',
  participants INTEGER NOT NULL,
  extras JSONB,
  total_price DECIMAL(10,2) NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  payment_intent_id VARCHAR(255),
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_tours_updated_at
  BEFORE UPDATE ON tours
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Create indexes
CREATE INDEX idx_tours_destination ON tours(destination);
CREATE INDEX idx_bookings_tour_id ON bookings(tour_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(booking_date);

-- Create RLS policies
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Tours policies
CREATE POLICY "Tours are viewable by everyone" 
ON tours FOR SELECT 
TO authenticated, anon
USING (true);

CREATE POLICY "Tours are insertable by admin" 
ON tours FOR INSERT 
TO authenticated
USING (auth.uid() IN (
  SELECT id FROM auth.users WHERE auth.email() IN (SELECT unnest(current_setting('app.admin_emails')::text[]))
));

-- Bookings policies
CREATE POLICY "Users can view their own bookings" 
ON bookings FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookings" 
ON bookings FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending bookings" 
ON bookings FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id AND status = 'pending');
