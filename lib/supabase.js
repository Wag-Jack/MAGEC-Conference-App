import {createClient} from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
    console.warn('Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseKey)   