import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isDummy =
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl.includes('dummy') ||
  supabaseUrl.includes('your-project') ||
  supabaseAnonKey.includes('dummykey') ||
  supabaseAnonKey.length < 40

export const SUPABASE_CONFIGURED = !isDummy

export const supabase = SUPABASE_CONFIGURED
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
