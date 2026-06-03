"use client";

import { useState } from "react";
import { AdminPanelAgenda } from "../components/AdminPanelAgenda";
import { AdminPanelGalerie } from "../components/AdminPanelGalerie";
import { AdminPanelEscapNocturne } from "../components/AdminPanelEscapNocturne";

export default function AdminPanel() {
  const [onglet, setOnglet] = useState<"agenda" | "galerie" | "escapade">(
    "agenda",
  );

  return (
    <div className="min-h-screen bg-fsa-gris-pale">
      {/* Onglets */}
      <div className="bg-white border-b border-fsa-gris-pale px-6 py-4 flex gap-4">
        {(["agenda", "galerie", "escapade"] as const).map((o) => (
          <button
            key={o}
            onClick={() => setOnglet(o)}
            className={`font-barlow-condensed uppercase tracking-widest text-sm px-5 py-2 rounded-lg transition-colors ${
              onglet === o
                ? "bg-fsa-rose text-white"
                : "text-fsa-gris-med hover:text-fsa-noir"
            }`}
          >
            {o === "agenda"
              ? "Agenda"
              : o === "galerie"
                ? "Galerie"
                : "Escapades"}
          </button>
        ))}
      </div>

      {/* Contenu */}
      {onglet === "agenda" && <AdminPanelAgenda />}
      {onglet === "galerie" && <AdminPanelGalerie />}
      {onglet === "escapade" && <AdminPanelEscapNocturne />}
    </div>
  );
}
