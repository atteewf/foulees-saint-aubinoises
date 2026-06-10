import { Suspense } from "react";
import EscapadeCourse from "../components/EscapadeCourse";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Escapades Nocturnes 2026 | Foulées Saint-Aubinoises — Course nocturne 35",
  description:
    "Les Escapades Nocturnes, la course nocturne emblématique des Foulées Saint-Aubinoises à Saint-Aubin-d'Aubigné. Inscriptions, épreuves et infos sur la course.",
  openGraph: {
    title: "Escapades Nocturnes — Foulées Saint-Aubinoises",
    description:
      "Course nocturne à Saint-Aubin-d'Aubigné, Ille-et-Vilaine. Plusieurs distances, ambiance conviviale. Course enfant",
    url: "https://foulees-saint-aubinoises.fr/escapade",
    siteName: "Foulées Saint-Aubinoises",
    locale: "fr_FR",
    type: "website",
  },
};

export default function CourseNocturnePage() {
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
          <EscapadeCourse />
        </Suspense>
      </div>
    </div>
  );
}
