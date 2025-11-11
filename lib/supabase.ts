import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Pooja = {
  id: string;
  title: string;
  description: string;
  pooja_date: string;
  location_lat: number;
  location_lng: number;
  location_address: string;
  image_url: string;
  status: string;
  created_at: string;
  updated_at: string;
};
