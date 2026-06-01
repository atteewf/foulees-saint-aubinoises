"use client";
import { supabase } from "@/app/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const Connection = async () => {
    setLoading(true);
    setErrorMessage("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMessage("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }
    router.push("/admin");
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm h-fit">
      <h2 className="font-bebas text-2xl text-fsa-noir mb-6">
        FSA — Espace Administration
      </h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors"
          />
        </div>

        <div>
          <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors"
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

        <button
          onClick={Connection}
          disabled={loading}
          className="w-full bg-fsa-rose text-white py-3 rounded-xl font-barlow-condensed uppercase tracking-widest text-sm hover:bg-fsa-rose/90 transition-colors mt-2"
        >
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>
      </div>
    </div>
  );
}
