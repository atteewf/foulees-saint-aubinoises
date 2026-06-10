"use client";

import { supabase } from "@/app/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

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
    <div
      style={{
        width: "100%",
        background: "#0f0f0f",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "420px",
          padding: "1.5rem",
        }}
      >
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <p
            className="font-barlow-condensed uppercase tracking-widest text-xs"
            style={{ color: "#e8186d", marginBottom: "0.5rem" }}
          >
            FSA · Saint-Aubin-d'Aubigné
          </p>
          <h1 className="font-bebas text-4xl" style={{ color: "#fff" }}>
            Espace Administration
          </h1>
        </div>

        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            padding: "2rem",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div>
              <label
                className="font-barlow-condensed uppercase text-xs tracking-widest"
                style={{
                  color: "rgba(255,255,255,0.3)",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "0.75rem 1rem",
                  color: "#fff",
                  fontSize: "0.9rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                className="font-barlow-condensed uppercase text-xs tracking-widest"
                style={{
                  color: "rgba(255,255,255,0.3)",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "0.75rem 1rem",
                  color: "#fff",
                  fontSize: "0.9rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {errorMessage && (
              <p
                className="font-barlow text-sm text-center"
                style={{ color: "#ef4444" }}
              >
                {errorMessage}
              </p>
            )}

            <button
              onClick={Connection}
              disabled={loading}
              className="font-barlow-condensed uppercase tracking-widest text-sm"
              style={{
                width: "100%",
                background: loading ? "rgba(232,24,109,0.5)" : "#e8186d",
                color: "#fff",
                border: "none",
                borderRadius: "999px",
                padding: "0.75rem 1.5rem",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: "0.5rem",
              }}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
