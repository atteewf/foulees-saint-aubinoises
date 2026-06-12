"use client";

import { Resultats } from "../types/database";
import { useState, useEffect } from "react";
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
    condition: (r) =>
      r.some((x) => x.classement !== null && Number(x.classement) <= 3),
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
    condition: (r) => r.some((x) => Number(x.distance) >= 20),
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
      r.some((x) => x.classement !== null && Number(x.classement) <= 10),
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
  const [modal, setModal] = useState<"closed" | "login" | "form">("closed");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [form, setForm] = useState({
    course: "",
    date: "",
    distance: "",
    temps: "",
    classement: "",
  });
  const [formNom, setFormNom] = useState("");
  const [formPrenom, setFormPrenom] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data: personne } = await supabase
        .from("personnes")
        .select("is_admin")
        .eq("users_id", user.id)
        .single();
      if (personne?.is_admin) setIsAdmin(true);
    };
    checkAdmin();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce résultat ?")) return;
    const { error } = await supabase.from("resultats").delete().eq("id", id);
    if (!error) {
      setResultats((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const filtered = resultats.filter(
    (r) =>
      r.personnes?.nom?.toLowerCase().includes(recherche.toLowerCase()) ||
      r.personnes?.prenom?.toLowerCase().includes(recherche.toLowerCase()) ||
      r.course?.toLowerCase().includes(recherche.toLowerCase()),
  );
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const toggleBadge = (badgeId: string) => {
    setSelectedBadges((prev) =>
      prev.includes(badgeId)
        ? prev.filter((b) => b !== badgeId)
        : [...prev, badgeId],
    );
  };

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

  const handleSubmit = async () => {
    setSubmitLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setSubmitLoading(false);
      return;
    }
    // Cherche la personne par nom/prénom ou la crée
    let personne;

    if (isAdmin && formNom && formPrenom) {
      const res = await fetch("/api/personnes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: formNom, prenom: formPrenom }),
      });
      personne = await res.json();
    } else {
      // Membre — utilise son propre compte
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setSubmitLoading(false);
        return;
      }
      const { data: self } = await supabase
        .from("personnes")
        .select("id, nom, prenom")
        .eq("users_id", user.id)
        .single();
      personne = self;
    }

    if (!personne) {
      setSubmitLoading(false);
      return;
    }
    console.log("personne avant insert:", personne);
    console.log("formPrenom:", formPrenom, "formNom:", formNom);
    const { data: newResult, error } = await supabase
      .from("resultats")
      .insert({
        course: form.course,
        date: form.date,
        distance: Number(form.distance),
        temps: form.temps,
        classement: form.classement ? Number(form.classement) : null,
        coureur_id: personne.id,
        badges: selectedBadges,
      })
      .select(
        "id, course, date, distance, temps, classement, coureur_id, created_at, badges",
      )
      .single();

    if (!error && newResult) {
      setResultats((prev) => [
        {
          ...newResult,
          personnes: {
            nom: personne?.nom ?? formNom,
            prenom: personne?.prenom ?? formPrenom,
          },
        },
        ...prev,
      ]);
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
        setFormNom("");
        setFormPrenom("");
        setSelectedBadges([]);
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
              position: "relative",
              background:
                hovered === result.id ? "rgba(232,24,109,0.05)" : "#1a1a1a",
              border: `1px solid ${hovered === result.id ? "rgba(232,24,109,0.3)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: "12px",
              padding: "1.25rem 1.5rem",
              transition: "all 0.2s",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            {/* Barre latérale rose */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "4px",
                background: "#e8186d",
                borderRadius: "4px 0 0 4px",
              }}
            />

            {/* Infos — flex 1, ne bouge jamais */}
            <div style={{ flex: 1, paddingLeft: "0.75rem", minWidth: 0 }}>
              {/* Ligne 1 : date + nom event */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  marginBottom: "0.3rem",
                }}
              >
                <p
                  className="font-barlow-condensed"
                  style={{
                    fontSize: "1rem",
                    color: "rgba(255, 255, 255, 0.79)",
                  }}
                >
                  {new Date(result.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "2-digit",
                  })}
                </p>
                <span
                  style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.79)",
                    flexShrink: 0,
                  }}
                />
                <p
                  className="font-barlow-condensed uppercase"
                  style={{
                    fontSize: "1rem",
                    color: "rgba(255, 255, 255, 0.79)",
                    letterSpacing: "0.06em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {result.course}
                </p>
              </div>

              {/* Ligne 2 : nom + capsules sur une seule ligne */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                <p
                  className="font-bebas"
                  style={{
                    fontSize: "2.5rem",
                    color: "#fff",
                    lineHeight: 1,
                    letterSpacing: "0.04em",
                    flexShrink: 0,
                  }}
                >
                  {result.personnes ? `${result.personnes.prenom}` : "Anonyme"}
                </p>

                {/* Capsules */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    flexShrink: 0,
                  }}
                >
                  {result.distance && (
                    <div
                      className="font-barlow-condensed uppercase"
                      style={{
                        padding: "0.3rem 0.7rem",
                        background: "#e8186d",
                        borderRadius: "999px",
                        fontSize: "0.9rem",
                        color: "#fff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {result.distance} km
                    </div>
                  )}
                  {result.temps && (
                    <div
                      className="font-barlow-condensed uppercase"
                      style={{
                        padding: "0.3rem 0.7rem",
                        background: "#e8186d",
                        borderRadius: "999px",
                        fontSize: "0.9rem",
                        color: "#fff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {result.temps}
                    </div>
                  )}
                  {result.classement && Number(result.classement) <= 3 && (
                    <div
                      className="font-barlow-condensed uppercase"
                      style={{
                        marginLeft: "0.5rem",
                        padding: "0.3rem 0.7rem",
                        background: "#e8186d",
                        borderRadius: "999px",
                        fontSize: "0.9rem",
                        color: "#fff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      TOP {result.classement}
                    </div>
                  )}
                  {result.classement && Number(result.classement) > 3 && (
                    <div
                      className="font-barlow-condensed uppercase"
                      style={{
                        marginLeft: "0.5rem",
                        padding: "0.3rem 0.7rem",
                        background: "#e8186d",
                        borderRadius: "999px",
                        fontSize: "0.72rem",
                        color: "#fff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {result.classement}e
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Badges — à droite, taille fixe */}
            <div
              className="badges-desktop"
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                flexShrink: 0,
                justifyContent: "flex-end",
              }}
            >
              {result.badges && result.badges.length > 0
                ? result.badges.map((badgeId: string) => {
                    const badge = BADGES.find((b) => b.id === badgeId);
                    if (!badge) return null;
                    return (
                      <img
                        key={badgeId}
                        src={badge.image}
                        alt={badge.label}
                        title={badge.label}
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "contain",
                          filter: "drop-shadow(0 0 8px rgba(232,24,109,0.5))",
                          transition: "transform 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.15)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                    );
                  })
                : null}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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
              maxWidth: "480px",
              maxHeight: "90vh",
              overflowY: "auto",
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
                    <div
                      className="grid grid-cols-1"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0.75rem",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Prénom"
                        value={formPrenom}
                        onChange={(e) => setFormPrenom(e.target.value)}
                        className="font-barlow"
                        style={inputStyle}
                      />
                      <input
                        type="text"
                        placeholder="Nom"
                        value={formNom}
                        onChange={(e) => setFormNom(e.target.value)}
                        className="font-barlow"
                        style={inputStyle}
                      />
                    </div>
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

                    {/* Sélecteur badges */}
                    <div>
                      <p
                        className="font-barlow-condensed uppercase text-xs"
                        style={{
                          color: "rgba(255,255,255,0.3)",
                          marginBottom: "0.75rem",
                        }}
                      >
                        Tes badges pour cette course (max 3)
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                        }}
                      >
                        {BADGES.map((badge) => {
                          const actif = selectedBadges.includes(badge.id);
                          return (
                            <div
                              key={badge.id}
                              onClick={() => {
                                if (!actif && selectedBadges.length >= 3)
                                  return;
                                toggleBadge(badge.id);
                              }}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                padding: "0.35rem 0.65rem",
                                borderRadius: "999px",
                                border: actif
                                  ? "1px solid #e8186d"
                                  : "1px solid rgba(255,255,255,0.1)",
                                background: actif
                                  ? "rgba(232,24,109,0.1)"
                                  : "transparent",
                                cursor:
                                  selectedBadges.length >= 3 && !actif
                                    ? "not-allowed"
                                    : "pointer",
                                opacity:
                                  selectedBadges.length >= 3 && !actif
                                    ? 0.4
                                    : 1,
                                transition: "all 0.15s",
                              }}
                            >
                              <img
                                src={badge.image}
                                alt={badge.label}
                                style={{
                                  width: "44px",
                                  height: "44px",
                                  objectFit: "contain",
                                  filter:
                                    "drop-shadow(0 0 6px rgba(232,24,109,0.4))",
                                  transition: "transform 0.2s",
                                }}
                              />
                              <span
                                className="font-barlow-condensed uppercase"
                                style={{
                                  fontSize: "0.65rem",
                                  color: actif
                                    ? "#e8186d"
                                    : "rgba(255,255,255,0.4)",
                                }}
                              >
                                {badge.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

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
                    {isAdmin && (
                      <div
                        style={{
                          marginTop: "1.5rem",
                          borderTop: "1px solid rgba(255,255,255,0.07)",
                          paddingTop: "1.5rem",
                        }}
                      >
                        <p
                          className="font-barlow-condensed uppercase text-xs"
                          style={{
                            color: "rgba(255,255,255,0.3)",
                            marginBottom: "0.75rem",
                          }}
                        >
                          Supprimer un résultat
                        </p>
                        <select
                          value={deleteId}
                          onChange={(e) => setDeleteId(e.target.value)}
                          style={{
                            width: "100%",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px",
                            padding: "0.75rem 1rem",
                            color: "#fff",
                            fontSize: "0.875rem",
                            outline: "none",
                            marginBottom: "0.75rem",
                          }}
                        >
                          <option value="" style={{ background: "#1a1a1a" }}>
                            Sélectionner un résultat
                          </option>
                          {sorted.map((r) => (
                            <option
                              key={r.id}
                              value={r.id}
                              style={{ background: "#1a1a1a" }}
                            >
                              {r.personnes?.prenom ?? "Anonyme"} — {r.course} (
                              {new Date(r.date).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "short",
                                year: "2-digit",
                              })}
                              )
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={async () => {
                            if (!deleteId) return;
                            if (!confirm("Supprimer ce résultat ?")) return;
                            const { error } = await supabase
                              .from("resultats")
                              .delete()
                              .eq("id", deleteId);
                            if (!error) {
                              setResultats((prev) =>
                                prev.filter((r) => r.id !== deleteId),
                              );
                              setDeleteId("");
                            }
                          }}
                          className="font-barlow-condensed uppercase"
                          style={{
                            width: "100%",
                            background: "rgba(239,68,68,0.1)",
                            border: "1px solid rgba(239,68,68,0.2)",
                            color: "#ef4444",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                          }}
                        >
                          Supprimer
                        </button>
                      </div>
                    )}
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
