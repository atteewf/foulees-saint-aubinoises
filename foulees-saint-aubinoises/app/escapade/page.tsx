import Link from "next/link";
import { Suspense } from "react";
import EscapadeCourse from "../components/EscapadeCourse";
import { PageHeader } from "../components/PageHeader";
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
          title="Escapade"
          subtitle=" Course nocturne organisée par les Foulées Saint-Aubinoises "
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
          <EscapadeCourse />
        </Suspense>
      </div>
    </div>
  );
}
