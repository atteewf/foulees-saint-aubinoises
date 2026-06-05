import { Suspense } from "react";
import { supabase } from "../lib/supabase";
import { ResultatsList } from "../components/Resultats";

async function ResultsData() {
  const { data: resultats } = await supabase
    .from("resultats")
    .select("*")
    .order("date", { ascending: false });
  return <ResultatsList resultats={resultats ?? []} />;
}

export default function ResultatPage() {
  return (
    <div style={{ width: "100%", background: "#0f0f0f", minHeight: "100vh" }}>
      {/* Fond dots */}
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
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p
            className="font-barlow-condensed uppercase"
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              color: "#e8186d",
              marginBottom: "0.5rem",
            }}
          >
            FSA · Saint-Aubin-d'Aubigné
          </p>
          <h1
            className="font-bebas"
            style={{
              fontSize: "4rem",
              color: "#fff",
              lineHeight: 1,
              marginBottom: "0.5rem",
            }}
          >
            Résultats
          </h1>
          <p
            className="font-barlow"
            style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.35)" }}
          >
            Performances et classements des membres de l'association.
          </p>
        </div>

        <Suspense
          fallback={
            <p
              className="font-barlow"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Chargement...
            </p>
          }
        >
          <ResultsData />
        </Suspense>
      </div>
    </div>
  );
}
