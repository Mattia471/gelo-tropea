import { supabase } from "./supabase";

export async function signInWithMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      // Dove deve tornare l'utente dopo aver cliccato sul link nella mail
      emailRedirectTo: window.location.origin,
    },
  });

  if (error) {
    throw error;
  }
  return true;
}

export async function signOut() {
  await supabase.auth.signOut();
}
