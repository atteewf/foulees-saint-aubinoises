import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

const isBrowser = typeof window !== "undefined";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = isBrowser
  ? createBrowserClient(supabaseUrl, supabaseAnonKey)
  : createClient(supabaseUrl, supabaseAnonKey);
