import { supabase } from "@/app/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { GalerieLightbox } from "@/app/components/GalerieLightbox";
import { CircleArrowLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data: event } = await supabase
    .from("events")
    .select("nom, lieu, date")
    .eq("id", id)
    .single();

  if (!event) return { title: "Galerie | Foulées Saint-Aubinoises" };

  return {
    title: `${event.nom} | Galerie — Foulées Saint-Aubinoises`,
    description: `Photos de ${event.nom} à ${event.lieu}. Club de running de Saint-Aubin-d'Aubigné.`,
    openGraph: {
      title: `${event.nom} — Galerie FSA`,
      description: `Photos de ${event.nom} à ${event.lieu}.`,
      url: `https://foulees-saint-aubinoises.fr/galerie/${id}`,
      siteName: "Foulées Saint-Aubinoises",
      locale: "fr_FR",
      type: "website",
    },
  };
}

export default async function GalerieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  const { data: photos } = await supabase
    .from("photos")
    .select("*")
    .eq("event_id", id);

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
        {/* Retour */}
        <Link
          href="/galerie"
          className="font-barlow-condensed uppercase"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "0.6rem 1.5rem",
            borderRadius: "999px",
          }}
        >
          <CircleArrowLeft size={16} /> Retour à la galerie
        </Link>

        {/* Header event */}
        {event && (
          <div style={{ marginBottom: "2.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              {event.type && (
                <span
                  className="font-barlow-condensed uppercase"
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    background: "#e8186d",
                    color: "#fff",
                    padding: "0.2rem 0.7rem",
                    borderRadius: "999px",
                  }}
                >
                  {event.type}
                </span>
              )}
              <span
                className="font-barlow"
                style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}
              >
                {new Date(event.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              {event.lieu && (
                <span
                  className="font-barlow"
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  · {event.lieu}
                </span>
              )}
            </div>
            <h1
              className="font-bebas"
              style={{
                fontSize: "3rem",
                color: "#fff",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}
            >
              {event.nom}
            </h1>
            {event.description && (
              <p
                className="font-barlow"
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.5)",
                  maxWidth: "600px",
                  lineHeight: 1.6,
                }}
              >
                {event.description}
              </p>
            )}
            <p
              className="font-barlow-condensed uppercase"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                color: "#e8186d",
                marginTop: "0.75rem",
              }}
            >
              {photos?.length ?? 0} photo
              {(photos?.length ?? 0) !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Grille photos */}
        {photos && photos.length > 0 ? (
          <GalerieLightbox photos={photos} />
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p
              className="font-bebas"
              style={{
                fontSize: "1.5rem",
                color: "rgba(255,255,255,0.2)",
                marginBottom: "0.5rem",
              }}
            >
              Aucune photo pour cet événement
            </p>
            <p
              className="font-barlow"
              style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.2)" }}
            >
              Les photos arrivent bientôt.
            </p>
          </div>
        )}
        {/* Retour bas */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            href="/galerie"
            className="font-barlow-condensed uppercase"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "0.6rem 1.5rem",
              borderRadius: "999px",
            }}
          >
            <CircleArrowLeft size={16} /> Retour à la galerie
          </Link>
        </div>
      </div>
    </div>
  );
}
