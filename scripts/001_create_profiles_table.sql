-- AgroV1n3 Profiles Table
-- This creates the profiles table with all necessary fields for user management

-- Create custom enum types for roles and communities
CREATE TYPE user_role AS ENUM (
  'admin',
  'regular', 
  'lgpa',
  'scc',
  'gcm',
  'agro_executive'
);

CREATE TYPE community_type AS ENUM (
  'crop_farming',
  'animal_farming',
  'agro_marketing',
  'agro_processing',
  'management_legislation',
  'agro_tourism',
  'agro_technology',
  'agro_health_care',
  'agro_media_branding',
  'agro_security',
  'agro_literature',
  'motivation_training',
  'agro_real_estate',
  'agro_logistics'
);

CREATE TYPE local_government AS ENUM (
  'barkin_ladi',
  'bassa',
  'bokkos',
  'jos_east',
  'jos_north',
  'jos_south',
  'kanam',
  'kanke',
  'langtang_north',
  'langtang_south',
  'mangu',
  'mikang',
  'pankshin',
  'quaan_pan',
  'riyom',
  'shendam',
  'wase'
);

-- Create the profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  -- Primary key linked to auth.users
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Cool Agro ID: Format "V1N3-XXXX-XXXX" where X is alphanumeric
  -- Generated automatically, unique identifier for the platform
  agro_id VARCHAR(14) UNIQUE NOT NULL,
  
  -- Username: Auto-generated on register, can only be changed once
  -- Format: adjective_noun_number (e.g., "swift_farmer_42", "bold_harvester_99")
  username VARCHAR(30) UNIQUE NOT NULL,
  username_changed BOOLEAN DEFAULT FALSE,
  username_changed_at TIMESTAMPTZ,
  
  -- Personal Information
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  bio TEXT,
  
  -- Role & User Type
  role user_role DEFAULT 'regular',
  is_verified BOOLEAN DEFAULT FALSE,
  
  -- Location & Community
  community community_type,
  local_government local_government,
  state VARCHAR(50) DEFAULT 'Plateau',
  
  -- Wallet
  wallet_balance DECIMAL(15, 2) DEFAULT 0.00,
  v1n3_tokens DECIMAL(15, 4) DEFAULT 0.0000,
  
  -- Ratings & Statistics
  weekly_rating DECIMAL(3, 2) DEFAULT 0.00,
  total_earnings DECIMAL(15, 2) DEFAULT 0.00,
  completed_tasks INTEGER DEFAULT 0,
  
  -- Account Status
  is_active BOOLEAN DEFAULT TRUE,
  is_suspended BOOLEAN DEFAULT FALSE,
  suspension_reason TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,
  
  -- Constraints
  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30),
  CONSTRAINT agro_id_format CHECK (agro_id ~ '^V1N3-[A-Z0-9]{4}-[A-Z0-9]{4}$')
);

-- Create indexes for better query performance
CREATE INDEX idx_profiles_agro_id ON public.profiles(agro_id);
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_community ON public.profiles(community);
CREATE INDEX idx_profiles_local_government ON public.profiles(local_government);
CREATE INDEX idx_profiles_created_at ON public.profiles(created_at);

-- Function to generate a cool Agro ID (V1N3-XXXX-XXXX format)
CREATE OR REPLACE FUNCTION generate_agro_id()
RETURNS VARCHAR(14) AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- Excluding similar chars (0,O,1,I)
  result VARCHAR(14);
  i INTEGER;
  part1 VARCHAR(4) := '';
  part2 VARCHAR(4) := '';
BEGIN
  -- Generate first 4 characters
  FOR i IN 1..4 LOOP
    part1 := part1 || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  
  -- Generate second 4 characters  
  FOR i IN 1..4 LOOP
    part2 := part2 || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  
  result := 'V1N3-' || part1 || '-' || part2;
  
  -- Check for uniqueness
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE agro_id = result) LOOP
    part1 := '';
    part2 := '';
    FOR i IN 1..4 LOOP
      part1 := part1 || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    FOR i IN 1..4 LOOP
      part2 := part2 || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    result := 'V1N3-' || part1 || '-' || part2;
  END LOOP;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to generate a cool username (adjective_noun_number format)
CREATE OR REPLACE FUNCTION generate_username()
RETURNS VARCHAR(30) AS $$
DECLARE
  adjectives TEXT[] := ARRAY[
    'swift', 'bold', 'green', 'golden', 'mighty', 'noble', 'brave', 'wise',
    'keen', 'agile', 'prime', 'elite', 'royal', 'stellar', 'dynamic',
    'cosmic', 'vibrant', 'radiant', 'epic', 'super', 'ultra', 'mega',
    'turbo', 'hyper', 'alpha', 'omega', 'delta', 'sigma', 'apex', 'zenith'
  ];
  nouns TEXT[] := ARRAY[
    'farmer', 'harvester', 'grower', 'planter', 'cultivator', 'rancher',
    'trader', 'pioneer', 'innovator', 'leader', 'champion', 'guardian',
    'explorer', 'builder', 'creator', 'mentor', 'eagle', 'lion', 'tiger',
    'phoenix', 'falcon', 'wolf', 'bear', 'hawk', 'panther', 'cobra',
    'vine', 'oak', 'cedar', 'maple', 'palm', 'bamboo', 'willow', 'sage'
  ];
  result VARCHAR(30);
  adj TEXT;
  noun TEXT;
  num INTEGER;
BEGIN
  -- Select random adjective, noun, and number
  adj := adjectives[floor(random() * array_length(adjectives, 1) + 1)::int];
  noun := nouns[floor(random() * array_length(nouns, 1) + 1)::int];
  num := floor(random() * 999 + 1)::int;
  
  result := adj || '_' || noun || '_' || num::text;
  
  -- Check for uniqueness
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = result) LOOP
    adj := adjectives[floor(random() * array_length(adjectives, 1) + 1)::int];
    noun := nouns[floor(random() * array_length(nouns, 1) + 1)::int];
    num := floor(random() * 999 + 1)::int;
    result := adj || '_' || noun || '_' || num::text;
  END LOOP;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to handle username change and admin promotion
CREATE OR REPLACE FUNCTION handle_username_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if username was actually changed
  IF OLD.username IS DISTINCT FROM NEW.username THEN
    -- Check if username has already been changed
    IF OLD.username_changed = TRUE THEN
      RAISE EXCEPTION 'Username can only be changed once';
    END IF;
    
    -- Mark username as changed
    NEW.username_changed := TRUE;
    NEW.username_changed_at := NOW();
    
    -- Special case: First user to change to 'mantim' becomes admin
    IF LOWER(NEW.username) = 'mantim' THEN
      -- Check if mantim doesn't already exist
      IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE LOWER(username) = 'mantim' AND id != NEW.id) THEN
        NEW.role := 'admin';
      END IF;
    END IF;
  END IF;
  
  -- Update the updated_at timestamp
  NEW.updated_at := NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for username changes
DROP TRIGGER IF EXISTS trigger_username_change ON public.profiles;
CREATE TRIGGER trigger_username_change
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_username_change();

-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    agro_id,
    username,
    full_name,
    email,
    phone,
    community,
    local_government,
    role
  )
  VALUES (
    NEW.id,
    generate_agro_id(),
    generate_username(),
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'New User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'phone', NULL),
    CASE 
      WHEN NEW.raw_user_meta_data ->> 'community' IS NOT NULL 
      THEN (NEW.raw_user_meta_data ->> 'community')::community_type
      ELSE NULL
    END,
    CASE 
      WHEN NEW.raw_user_meta_data ->> 'local_government' IS NOT NULL 
      THEN (NEW.raw_user_meta_data ->> 'local_government')::local_government
      ELSE NULL
    END,
    'regular'
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Create trigger for new user signups
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update last login
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles 
  SET last_login_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comment on table and columns for documentation
COMMENT ON TABLE public.profiles IS 'User profiles for the AgroV1n3 platform';
COMMENT ON COLUMN public.profiles.agro_id IS 'Unique cool ID in format V1N3-XXXX-XXXX';
COMMENT ON COLUMN public.profiles.username IS 'Auto-generated username, can only be changed once';
COMMENT ON COLUMN public.profiles.username_changed IS 'Flag indicating if username has been changed';
COMMENT ON COLUMN public.profiles.role IS 'User role: admin, regular, lgpa, scc, gcm, agro_executive';
COMMENT ON COLUMN public.profiles.community IS 'One of 14 agriculture communities';
COMMENT ON COLUMN public.profiles.local_government IS 'One of 17 LGAs in Plateau State';
COMMENT ON COLUMN public.profiles.v1n3_tokens IS 'V1n3 token balance for rewards';
