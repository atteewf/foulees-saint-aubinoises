import { Suspense } from "react";
import { supabase } from "../lib/supabase";
import { ResultatsList } from "../components/Resultats";
import { PageHeader } from "../components/PageHeader";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Résultats | Foulées Saint-Aubinoises — Palmarès des coureurs",
  description:
    "Résultats et palmarès des coureurs des Foulées Saint-Aubinoises. Performances en trail, route et cross en Ille-et-Vilaine et Bretagne.",
  openGraph: {
    title: "Résultats — Foulées Saint-Aubinoises",
    description:
      "Palmarès et performances des membres du club de running de Saint-Aubin-d'Aubigné.",
    url: "https://foulees-saint-aubinoises.fr/resultats",
    siteName: "Foulées Saint-Aubinoises",
    locale: "fr_FR",
    type: "website",
  },
};
async function ResultsData() {
  const { data: resultats } = await supabase
    .from("resultats")
    .select("*, personnes(nom, prenom)")
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
      {/* Semelle fond */}
      <img
        src="/foulees/tong.svg"
        alt=""
        style={{
          position: "fixed",
          right: "-10%", // déborde légèrement à droite
          bottom: "0",
          height: "90vh",
          opacity: 0.6, // très discret
          filter:
            "invert(27%) sepia(90%) saturate(2000%) hue-rotate(310deg) brightness(90%)",
          pointerEvents: "none",
          zIndex: 0, // derrière le contenu
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
        <PageHeader
          label="FSA · Saint-Aubin-d'Aubigné"
          title="Résultat"
          subtitle=" Performances et classements des membres de l'association.
      "
        />
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
