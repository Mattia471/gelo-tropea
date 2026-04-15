import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Se mancano, stampiamo un errore più leggibile invece di bloccare tutto subito
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "⚠️ Configurazione Supabase mancante! Controlla il tuo file .env.local",
  );
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");
