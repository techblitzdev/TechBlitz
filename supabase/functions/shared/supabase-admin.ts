import { createClient } from 'npm:@supabase/supabase-js'

export const supabase = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_ANON_KEY')
)