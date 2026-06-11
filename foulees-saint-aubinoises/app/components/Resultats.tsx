"use client";

import { Resultats } from "../types/database";
import { useState } from "react";
import { supabase } from "../lib/supabase";
type Badge = {
  id: string;
  label: string;
  image: string;
  condition: (resultats: Resultats[]) => boolean;
};

const BADGES: Badge[] = [
  {
    id: "podium",
    label: "Podium",
    image: "/badges/podium.png",
    condition: (r) => r.some((x) => x.classement !== null && x.classement <= 3),
  },
  {
    id: "regulier",
    label: "Régulier",
    image: "/badges/regulier.png",
    condition: (r) => {
      const mois = new Date().getMonth();
      const annee = new Date().getFullYear();
      return (
        r.filter((x) => {
          const d = new Date(x.date);
          return d.getMonth() === mois && d.getFullYear() === annee;
        }).length >= 3
      );
    },
  },
  {
    id: "trailer",
    label: "Trailer",
    image: "/badges/trailer.png",
    condition: (r) =>
      r.some((x) => x.type === "trail" && Number(x.distance) >= 20),
  },
  {
    id: "rapide",
    label: "Rapide",
    image: "/badges/rapide.png",
    condition: (r) =>
      r.some(
        (x) =>
          Number(x.distance) === 10 &&
          x.temps !== null &&
          x.temps <= "00:45:00",
      ),
  },
  {
    id: "centurion",
    label: "Centurion",
    image: "/badges/centurion.png",
    condition: (r) =>
      r.reduce((acc, x) => acc + Number(x.distance ?? 0), 0) >= 100,
  },
  {
    id: "bonrunner",
    label: "Bon Runner",
    image: "/badges/bonrunner.png",
    condition: (r) =>
      r.some((x) => x.classement !== null && x.classement <= 10),
  },
  {
    id: "lent",
    label: "Lent mais finit",
    image: "/badges/lent.png",
    condition: (r) => r.length >= 5,
  },
  {
    id: "courage",
    label: "Courage",
    image: "/badges/courage.png",
    condition: (r) => r.some((x) => Number(x.distance) >= 42),
  },
  {
    id: "supermembre",
    label: "Super Membre",
    image: "/badges/supermembre.png",
    condition: (r) => r.length >= 10,
  },
];
export function ResultatsList({
  resultats: initialResultats,
}: {
  resultats: Resultats[];
}) {
  const [resultats, setResultats] = useState(initialResultats);
  const [recherche, setRecherche] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);

  // Modal states
  const [modal, setModal] = useState<"closed" | "login" | "form">("closed");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Login form
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");

  // Résultat form
  const [form, setForm] = useState({
    course: "",
    date: "",
    distance: "",
    temps: "",
    classement: "",
  });
  const filtered = resultats.filter(
    (r) =>
      r.personnes?.nom?.toLowerCase().includes(recherche.toLowerCase()) ||
      r.personnes?.prenom?.toLowerCase().includes(recherche.toLowerCase()) ||
      r.course?.toLowerCase().includes(recherche.toLowerCase()),
  );

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // Login
  const handleLogin = async () => {
    setLoginLoading(true);
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: mdp,
    });
    if (error) {
      setLoginError("Email ou mot de passe incorrect.");
    } else {
      setModal("form");
    }
    setLoginLoading(false);
  };

  // Submit résultat
  const handleSubmit = async () => {
    setSubmitLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setSubmitLoading(false);
      return;
    }

    // Récupérer la personne
    const { data: personne } = await supabase
      .from("personnes")
      .select("id, nom, prenom")
      .eq("users_id", user.id)
      .single();

    if (!personne) {
      setSubmitLoading(false);
      return;
    }

    const { data: newResult, error } = await supabase
      .from("resultats")
      .insert({
        course: form.course,
        date: form.date,
        distance: Number(form.distance),
        temps: form.temps,
        classement: Number(form.classement),
        coureur_id: personne.id,
      })
      .select(
        "id, course, date, distance, temps, classement, coureur_id, created_at",
      ) // ← colonnes explicites
      .single();

    if (!error && newResult) {
      const resultAvecPersonne = {
        ...newResult,
        personnes: { nom: personne.nom, prenom: personne.prenom },
      };
      setResultats((prev) => [resultAvecPersonne, ...prev]);
      setSubmitSuccess(true);
      setTimeout(() => {
        setModal("closed");
        setSubmitSuccess(false);
        setForm({
          course: "",
          date: "",
          distance: "",
          temps: "",
          classement: "",
        });
        supabase.auth.signOut();
      }, 1500);
    }
    setSubmitLoading(false);
  };

  const closeModal = () => {
    setModal("closed");
    setLoginError("");
    setEmail("");
    setMdp("");
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    color: "#fff",
    fontSize: "0.875rem",
    outline: "none",
    fontFamily: "inherit",
  };

  return (
    <div>
      {/* Barre recherche + bouton */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "2rem",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher un coureur ou une course..."
          className="font-barlow"
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "0.75rem 1.25rem",
            color: "#fff",
            fontSize: "0.85rem",
            outline: "none",
          }}
        />
        <button
          onClick={() => setModal("login")}
          className="font-barlow-condensed uppercase"
          style={{
            flexShrink: 0,
            background: "#e8186d",
            border: "none",
            borderRadius: "12px",
            padding: "0.75rem 1.25rem",
            color: "#fff",
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          + Ajouter
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          marginBottom: "2.5rem",
        }}
      >
        {[
          { label: "Résultats", value: resultats.length },
          {
            label: "Coureurs",
            value: new Set(resultats.map((r) => r.coureur_id)).size,
          },

          {
            label: "Courses",
            value: new Set(resultats.map((r) => r.course)).size,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#1a1a1a",
              border: "1px solid rgba(232,24,109,0.15)",
              borderRadius: "12px",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <p
              className="font-bebas"
              style={{ fontSize: "2rem", color: "#e8186d", lineHeight: 1 }}
            >
              {stat.value}
            </p>
            <p
              className="font-barlow-condensed uppercase"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.3)",
                marginTop: "0.25rem",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Liste résultats */}
      {sorted.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <p
            className="font-bebas"
            style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.2)" }}
          >
            Aucun résultat trouvé
          </p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {sorted.map((result) => (
          <div
            key={result.id}
            onMouseEnter={() => setHovered(result.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background:
                hovered === result.id ? "rgba(232,24,109,0.05)" : "#1a1a1a",
              border: `1px solid ${hovered === result.id ? "rgba(232,24,109,0.3)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: "12px",
              padding: "1.25rem 1.5rem",
              display: "grid",
              gridTemplateColumns: "auto 1px 1fr auto",
              gap: "1.5rem",
              alignItems: "center",
              transition: "all 0.2s",
            }}
          >
            <div style={{ textAlign: "center", minWidth: "48px" }}>
              <div
                className="font-bebas"
                style={{ fontSize: "2rem", color: "#fff", lineHeight: 1 }}
              >
                {new Date(result.date).getDate()}
              </div>
              <div
                className="font-barlow-condensed uppercase"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  color: "#e8186d",
                }}
              >
                {new Date(result.date).toLocaleDateString("fr-FR", {
                  month: "short",
                  year: "2-digit",
                })}
              </div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                alignSelf: "stretch",
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.35rem",
                  flexWrap: "wrap",
                }}
              >
                <p
                  className="font-barlow-condensed font-bold"
                  style={{ fontSize: "1rem", color: "#fff" }}
                >
                  {result.personnes
                    ? `${result.personnes.prenom} ${result.personnes.nom}`
                    : "Anonyme"}
                </p>
                <span
                  style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                  }}
                />
                <p
                  className="font-barlow-condensed"
                  style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}
                >
                  {result.course}
                </p>
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {result.distance && (
                  <span
                    className="font-barlow"
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    📏 {result.distance} km
                  </span>
                )}
                {result.temps && (
                  <span
                    className="font-barlow"
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    ⏱ {result.temps}
                  </span>
                )}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              {result.classement && (
                <div>
                  <p
                    className="font-bebas"
                    style={{
                      fontSize: "1.8rem",
                      color:
                        Number(result.classement) <= 3 ? "#e8186d" : "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {result.classement}
                  </p>
                  <p
                    className="font-barlow-condensed uppercase"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.08em",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    classement
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal overlay */}
      {modal !== "closed" && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#1a1a1a",
              border: "1px solid rgba(232,24,109,0.2)",
              borderRadius: "16px",
              padding: "2rem",
              width: "100%",
              maxWidth: "420px",
            }}
          >
            {/* Login */}
            {modal === "login" && (
              <div>
                <p
                  className="font-barlow-condensed uppercase"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    color: "#e8186d",
                    marginBottom: "0.5rem",
                  }}
                >
                  Espace membre
                </p>
                <h2
                  className="font-bebas"
                  style={{
                    fontSize: "2rem",
                    color: "#fff",
                    marginBottom: "1.5rem",
                  }}
                >
                  Connexion
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-barlow"
                    style={inputStyle}
                  />
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    value={mdp}
                    onChange={(e) => setMdp(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="font-barlow"
                    style={inputStyle}
                  />
                  {loginError && (
                    <p
                      className="font-barlow"
                      style={{ fontSize: "0.8rem", color: "#e8186d" }}
                    >
                      {loginError}
                    </p>
                  )}
                  <button
                    onClick={handleLogin}
                    disabled={loginLoading}
                    className="font-barlow-condensed uppercase"
                    style={{
                      background: "#e8186d",
                      border: "none",
                      borderRadius: "8px",
                      padding: "0.875rem",
                      color: "#fff",
                      fontSize: "0.85rem",
                      letterSpacing: "0.1em",
                      cursor: "pointer",
                      marginTop: "0.5rem",
                      opacity: loginLoading ? 0.7 : 1,
                    }}
                  >
                    {loginLoading ? "Connexion..." : "Se connecter"}
                  </button>
                </div>
              </div>
            )}

            {/* Formulaire ajout */}
            {modal === "form" && (
              <div>
                <p
                  className="font-barlow-condensed uppercase"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    color: "#e8186d",
                    marginBottom: "0.5rem",
                  }}
                >
                  Espace membre
                </p>
                <h2
                  className="font-bebas"
                  style={{
                    fontSize: "2rem",
                    color: "#fff",
                    marginBottom: "1.5rem",
                  }}
                >
                  Ajouter un résultat
                </h2>
                {submitSuccess ? (
                  <p
                    className="font-bebas"
                    style={{
                      fontSize: "1.5rem",
                      color: "#e8186d",
                      textAlign: "center",
                    }}
                  >
                    ✓ Résultat ajouté !
                  </p>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Nom de la course"
                      value={form.course}
                      onChange={(e) =>
                        setForm({ ...form, course: e.target.value })
                      }
                      className="font-barlow"
                      style={inputStyle}
                    />
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                      className="font-barlow"
                      style={inputStyle}
                    />
                    <input
                      type="number"
                      placeholder="Distance (km)"
                      value={form.distance}
                      onChange={(e) =>
                        setForm({ ...form, distance: e.target.value })
                      }
                      className="font-barlow"
                      style={inputStyle}
                    />
                    <input
                      type="text"
                      placeholder="Temps (ex: 1h32)"
                      value={form.temps}
                      onChange={(e) =>
                        setForm({ ...form, temps: e.target.value })
                      }
                      className="font-barlow"
                      style={inputStyle}
                    />
                    <input
                      type="number"
                      placeholder="Classement"
                      value={form.classement}
                      onChange={(e) =>
                        setForm({ ...form, classement: e.target.value })
                      }
                      className="font-barlow"
                      style={inputStyle}
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={submitLoading}
                      className="font-barlow-condensed uppercase"
                      style={{
                        background: "#e8186d",
                        border: "none",
                        borderRadius: "8px",
                        padding: "0.875rem",
                        color: "#fff",
                        fontSize: "0.85rem",
                        letterSpacing: "0.1em",
                        cursor: "pointer",
                        marginTop: "0.5rem",
                        opacity: submitLoading ? 0.7 : 1,
                      }}
                    >
                      {submitLoading ? "Envoi..." : "Enregistrer"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
