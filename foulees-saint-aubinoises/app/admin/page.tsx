"use client";

import { useState } from "react";
import { AdminPanelAgenda } from "../components/AdminPanelAgenda";
import { AdminPanelGalerie } from "../components/AdminPanelGalerie";
import { AdminPanelEscapNocturne } from "../components/AdminPanelEscapNocturne";
import { AdminPanelMembres } from "../components/AdminPanelMembres";

export default function AdminPanel() {
  const [onglet, setOnglet] = useState<
    "agenda" | "galerie" | "escapade" | "membres"
  >("agenda");

  return (
    <div className="min-h-screen" style={{ background: "#0f0f0f" }}>
      {/* Onglets */}
      <div
        style={{
          background: "#1a1a1a",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "0.75rem 1.5rem",
          display: "flex",
          gap: "0.75rem",
          overflowX: "auto",
        }}
      >
        {(["agenda", "galerie", "escapade", "membres"] as const).map((o) => (
          <button
            key={o}
            onClick={() => setOnglet(o)}
            className="font-barlow-condensed uppercase tracking-widest text-xs flex-shrink-0"
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "999px",
              border:
                onglet === o
                  ? "1px solid #e8186d"
                  : "1px solid rgba(255,255,255,0.1)",
              background: onglet === o ? "#e8186d" : "transparent",
              color: onglet === o ? "#fff" : "rgba(255,255,255,0.4)",
              cursor: "pointer",
            }}
          >
            {o === "agenda"
              ? "Agenda"
              : o === "galerie"
                ? "Galerie"
                : o === "escapade"
                  ? "Escapades"
                  : "Membres"}
          </button>
        ))}
      </div>

      {/* Contenu */}
      {onglet === "agenda" && <AdminPanelAgenda />}
      {onglet === "galerie" && <AdminPanelGalerie />}
      {onglet === "escapade" && <AdminPanelEscapNocturne />}
      {onglet === "membres" && <AdminPanelMembres />}
    </div>
  );
}
