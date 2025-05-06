import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Access the environment variables with the VITE_ prefix
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const SUPABASE_PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;

// Use the URL directly with the project ID
const dynamicSupabaseURL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;

export const supabase = createClient<Database>(dynamicSupabaseURL, SUPABASE_PUBLISHABLE_KEY);
