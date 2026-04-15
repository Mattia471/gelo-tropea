import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { signInWithMagicLink, signOut } from "@/lib/auth";
import { Mail, Loader2, LogOut, User as UserIcon } from "lucide-react";

export function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithMagicLink(email);
      setSent(true);
    } catch (error: any) {
      alert("Errore: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 1. Schermata di Conferma Invio
  if (sent) {
    return (
      <div className="text-center p-8 bg-white rounded-[2.5rem] shadow-xl space-y-4 animate-in zoom-in-95">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <Mail size={32} />
        </div>
        <h2 className="text-xl font-bold">Controlla la tua mail!</h2>
        <p className="text-sm text-gray-500">
          Ti abbiamo inviato un link magico per accedere a GeloTropea.
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-[#8B2132] font-bold text-sm"
        >
          Usa un'altra email
        </button>
      </div>
    );
  }

  // 2. Schermata di Login (Form Email)
  if (!user) {
    return (
      <div className="p-8 bg-white rounded-[3rem] shadow-xl space-y-6 animate-in fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold italic font-serif">Welcome back</h2>
          <p className="text-xs text-gray-400">
            Inserisci la tua mail per ordinare in spiaggia
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
              size={18}
            />
            <input
              type="email"
              placeholder="latuamail@esempio.it"
              required
              className="w-full h-14 pl-12 pr-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#8B2132]/20 transition-all outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-[#8B2132] text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Invia Link Magico"
            )}
          </button>
        </form>
      </div>
    );
  }

  // 3. Schermata Profilo Loggato
  return (
    <div className="space-y-8 animate-in fade-in text-center">
      <div className="w-24 h-24 bg-[#8B2132]/10 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-lg">
        <UserIcon size={40} className="text-[#8B2132]" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">Il tuo Account</h2>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>
      <button
        onClick={signOut}
        className="w-full p-4 text-gray-400 font-bold flex items-center justify-center gap-2 hover:text-[#8B2132]"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}
