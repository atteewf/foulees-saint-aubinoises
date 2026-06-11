import Link from "next/link";
import { Mail, Phone, ExternalLink } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { ContactLinks } from "../components/ContactLinks";

export const metadata: Metadata = {
  title: "Agenda | Foulées Saint-Aubinoises — Club de course à pied 35",
  description:
    "Calendrier des courses, trails et sorties collectives des Foulées Saint-Aubinoises. Association de running à Saint-Aubin-d'Aubigné, près de Rennes.",
  openGraph: {
    title: "Agenda — Foulées Saint-Aubinoises",
    description:
      "Tous les événements de la saison : trail, route, cross, sorties club.",
    url: "https://foulees-saint-aubinoises.fr/agenda",
    siteName: "Foulées Saint-Aubinoises",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div
      style={{
        width: "100%",
        background: "#0f0f0f",
        minHeight: "100vh",
        position: "relative",
      }}
    >
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

      {/* Semelle desktop */}
      <img
        src="/foulees/tong.svg"
        alt=""
        className="hidden md:block"
        style={{
          position: "fixed",
          right: "-10%",
          bottom: "0",
          height: "90vh",
          opacity: 0.06,
          filter:
            "invert(27%) sepia(90%) saturate(2000%) hue-rotate(310deg) brightness(90%)",
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
          label="FSA · Saint-Aubin-d'Aubigné"
          title="Contact"
          subtitle="Nous rejoindre et participer à une association conviviale et dynamique"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bloc gauche */}
          <div className="flex flex-col gap-6">
            {/* Qui sommes-nous */}
            <div
              style={{
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "1.75rem",
              }}
            >
              <h2
                className="font-bebas text-2xl"
                style={{ color: "#fff", marginBottom: "0.75rem" }}
              >
                Qui sommes-nous ?
              </h2>
              <p
                className="font-barlow text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Notre association, non adhérente à la fédération d'athlétisme,
                se compose de femmes et d'hommes qui se retrouvent suivant les
                objectifs de chacun afin de pratiquer la course à pied. Vous
                êtes tous les bienvenus, serez vite intégrés et progresserez
                avec le groupe.
              </p>
            </div>

            {/* Coordonnées */}
            <div
              style={{
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "1.75rem",
              }}
            >
              <h2
                className="font-bebas text-2xl"
                style={{ color: "#fff", marginBottom: "1.25rem" }}
              >
                Nous contacter
              </h2>
              <ContactLinks />
            </div>

            {/* Rejoindre */}
            <div
              style={{
                background: "rgba(232,24,109,0.08)",
                border: "1px solid rgba(232,24,109,0.2)",
                borderRadius: "16px",
                padding: "1.75rem",
              }}
            >
              <h2
                className="font-bebas text-2xl"
                style={{ color: "#fff", marginBottom: "0.5rem" }}
              >
                Rejoindre le club
              </h2>
              <p
                className="font-barlow text-sm"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "1.25rem",
                }}
              >
                Adhésion en ligne via HelloAsso — simple et rapide.
              </p>
              <Link
                href="https://www.helloasso.com/associations/foulees-saint-aubinoises"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full transition-colors duration-200"
                style={{
                  background: "#e8186d",
                  color: "#fff",
                  padding: "0.6rem 1.5rem",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                }}
              >
                <span className="font-barlow-condensed uppercase tracking-widest text-sm">
                  S'inscrire sur HelloAsso
                </span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Bloc droite — Formulaire */}
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              padding: "1.75rem",
            }}
          >
            <h2
              className="font-bebas text-2xl"
              style={{ color: "#fff", marginBottom: "1.5rem" }}
            >
              Envoyer un message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
