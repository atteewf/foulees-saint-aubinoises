"use client";

import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import { PageHeader } from "./PageHeader";

type Personne = {
  id: string;
  nom: string;
  prenom: string;
  is_admin: boolean;
  badges: string[];
};

const TOUS_BADGES = [
  { id: "podium", label: "Podium" },
  { id: "regulier", label: "Régulier" },
  { id: "trailer", label: "Trailer" },
  { id: "rapide", label: "Rapide" },
  { id: "centurion", label: "Centurion" },
  { id: "bonrunner", label: "Bon Runner" },
  { id: "lent", label: "Lent mais finit" },
  { id: "courage", label: "Courage" },
  { id: "supermembre", label: "Super Membre" },
  { id: "supersympa", label: "Runner Sympa" },
  { id: "boue", label: "Boue" },
  { id: "mentor", label: "Mentor" },
  { id: "rigolo", label: "Rigolo" },
  { id: "alacoule", label: "À la Coule" },
];

export function AdminPanelMembres() {
  const [membres, setMembres] = useState<Personne[]>([]);
  const [selected, setSelected] = useState<Personne | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchMembres = async () => {
    const { data } = await supabase
      .from("personnes")
      .select("id, nom, prenom, is_admin, badges")
      .order("nom", { ascending: true });
    setMembres(data ?? []);
  };

  useEffect(() => {
    fetchMembres();
  }, []);

  const toggleBadge = (badgeId: string) => {
    if (!selected) return;
    const badges = selected.badges ?? [];
    const updated = badges.includes(badgeId)
      ? badges.filter((b) => b !== badgeId)
      : [...badges, badgeId];
    setSelected({ ...selected, badges: updated });
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    await supabase
      .from("personnes")
      .update({ badges: selected.badges })
      .eq("id", selected.id);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
    await fetchMembres();
    setSaving(false);
  };

  return (
    <div
      style={{
        width: "100%",
        background: "#0f0f0f",
        minHeight: "100vh",
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
          maxWidth: "1024px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
        }}
      >
        <PageHeader
          label="FSA · Administration"
          title="Membres"
          subtitle="Attribuer les badges aux membres du club"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Liste membres */}
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "1.25rem 1.75rem",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h2 className="font-bebas text-xl" style={{ color: "#fff" }}>
                Membres ({membres.length})
              </h2>
            </div>
            <div>
              {membres.map((membre, i) => (
                <div
                  key={membre.id}
                  onClick={() =>
                    setSelected({ ...membre, badges: membre.badges ?? [] })
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.75rem",
                    borderBottom:
                      i < membres.length - 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                    cursor: "pointer",
                    background:
                      selected?.id === membre.id
                        ? "rgba(232,24,109,0.08)"
                        : "transparent",
                    transition: "background 0.2s",
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(232,24,109,0.15)",
                      border: "1px solid rgba(232,24,109,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      className="font-bebas text-sm"
                      style={{ color: "#e8186d" }}
                    >
                      {membre.prenom?.[0]}
                      {membre.nom?.[0]}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      className="font-barlow-condensed font-bold text-sm"
                      style={{ color: "#fff" }}
                    >
                      {membre.prenom} {membre.nom}
                    </p>
                    <p
                      className="font-barlow text-xs"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {(membre.badges ?? []).length} badge
                      {(membre.badges ?? []).length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  {membre.is_admin && (
                    <span
                      className="font-barlow-condensed uppercase text-xs"
                      style={{
                        background: "rgba(232,24,109,0.1)",
                        border: "1px solid rgba(232,24,109,0.2)",
                        color: "#e8186d",
                        padding: "0.15rem 0.6rem",
                        borderRadius: "999px",
                      }}
                    >
                      Admin
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Panel badges */}
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "1.25rem 1.75rem",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h2 className="font-bebas text-xl" style={{ color: "#fff" }}>
                {selected
                  ? `${selected.prenom} ${selected.nom}`
                  : "Sélectionner un membre"}
              </h2>
            </div>

            {!selected ? (
              <div style={{ padding: "3rem", textAlign: "center" }}>
                <p
                  className="font-barlow text-sm"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Clique sur un membre pour gérer ses badges
                </p>
              </div>
            ) : (
              <div style={{ padding: "1.75rem" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: "0.75rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {TOUS_BADGES.map((badge) => {
                    const actif = (selected.badges ?? []).includes(badge.id);
                    return (
                      <div
                        key={badge.id}
                        onClick={() => toggleBadge(badge.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "0.75rem 1rem",
                          borderRadius: "10px",
                          border: actif
                            ? "1px solid rgba(232,24,109,0.4)"
                            : "1px solid rgba(255,255,255,0.07)",
                          background: actif
                            ? "rgba(232,24,109,0.08)"
                            : "transparent",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <img
                          src={`/badges/${badge.id}.png`}
                          alt={badge.label}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "contain",
                          }}
                        />
                        <span
                          className="font-barlow-condensed text-xs uppercase tracking-wider"
                          style={{
                            color: actif ? "#e8186d" : "rgba(255,255,255,0.4)",
                          }}
                        >
                          {badge.label}
                        </span>
                        {actif && (
                          <span
                            style={{
                              marginLeft: "auto",
                              color: "#e8186d",
                              fontSize: "14px",
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="font-barlow-condensed uppercase tracking-widest text-sm"
                  style={{
                    width: "100%",
                    background: success ? "rgba(34,197,94,0.2)" : "#e8186d",
                    border: success ? "1px solid rgba(34,197,94,0.3)" : "none",
                    color: success ? "#22c55e" : "#fff",
                    borderRadius: "999px",
                    padding: "0.75rem 1.5rem",
                    cursor: "pointer",
                  }}
                >
                  {success
                    ? "Sauvegardé ✓"
                    : saving
                      ? "Sauvegarde..."
                      : "Sauvegarder les badges"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
