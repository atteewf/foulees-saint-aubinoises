import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import { MapWrapper } from "@/app/components/MapWrapper";
import { PageHeader } from "@/app/components/PageHeader";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data: event } = await supabase
    .from("events")
    .select("nom, lieu, date, description, type")
    .eq("id", id)
    .single();

  if (!event) return { title: "Agenda | Foulées Saint-Aubinoises" };

  const dateFormatted = new Date(event.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    title: `${event.nom} — ${dateFormatted} | Foulées Saint-Aubinoises`,
    description: `${event.nom} à ${event.lieu} le ${dateFormatted}. ${event.description ?? "Course organisée par les Foulées Saint-Aubinoises, club de running à Saint-Aubin-d'Aubigné."}`,
    openGraph: {
      title: `${event.nom} — Foulées Saint-Aubinoises`,
      description: `${event.nom} à ${event.lieu} le ${dateFormatted}.`,
      url: `https://foulees-saint-aubinoises.fr/agenda/${id}`,
      siteName: "Foulées Saint-Aubinoises",
      locale: "fr_FR",
      type: "website",
    },
  };
}

async function getCoords(
  lieu: string,
): Promise<{ lat: number; lon: number } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(lieu + ", France")}&format=json&limit=1`,
      {
        headers: { "User-Agent": "FSA-Saint-Aubin/1.0" },
        next: { revalidate: 86400 },
      },
    );
    const data = await res.json();
    if (!data[0]) return null;
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
}

const codeMeteo: Record<number, { label: string; emoji: string }> = {
  0: { label: "Ciel dégagé", emoji: "☀️" },
  1: { label: "Peu nuageux", emoji: "🌤️" },
  2: { label: "Partiellement nuageux", emoji: "⛅" },
  3: { label: "Couvert", emoji: "☁️" },
  45: { label: "Brouillard", emoji: "🌫️" },
  48: { label: "Brouillard givrant", emoji: "🌫️" },
  51: { label: "Bruine légère", emoji: "🌦️" },
  61: { label: "Pluie légère", emoji: "🌧️" },
  63: { label: "Pluie modérée", emoji: "🌧️" },
  65: { label: "Pluie forte", emoji: "🌧️" },
  71: { label: "Neige légère", emoji: "🌨️" },
  80: { label: "Averses légères", emoji: "🌦️" },
  95: { label: "Orage", emoji: "⛈️" },
};
async function getMeteo(coords: { lat: number; lon: number }, date: string) {
  try {
    const { lat, lon } = coords;
    const eventDate = new Date(date);
    const today = new Date();
    const diffDays = Math.ceil(
      (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diffDays < 0 || diffDays > 16) return null;

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=Europe/Paris&start_date=${date}&end_date=${date}`,
      { next: { revalidate: 3600 } },
    );
    const data = await res.json();
    if (!data.daily) return null;

    return {
      code: data.daily.weathercode[0],
      tempMax: data.daily.temperature_2m_max[0],
      tempMin: data.daily.temperature_2m_min[0],
      precipitation: data.daily.precipitation_sum[0],
      wind: data.daily.windspeed_10m_max[0],
    };
  } catch {
    return null;
  }
}

export default async function EventDetailPage({
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

  if (!event) {
    return (
      <div style={{ width: "100%", background: "#111", minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: "1024px",
            margin: "0 auto",
            padding: "3rem 1.5rem",
          }}
        >
          <p className="font-barlow" style={{ color: "rgba(255,255,255,0.4)" }}>
            Événement introuvable.
          </p>
        </div>
      </div>
    );
  }
  const coords = await getCoords(event.lieu ?? "");
  const meteo = coords ? await getMeteo(coords, event.date) : null;
  const meteoInfo = meteo
    ? (codeMeteo[meteo.code] ?? { label: "Variable", emoji: "🌤️" })
    : null;
  const isPast = new Date(event.date) < new Date();
  const dateFormatted = new Date(event.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        width: "100%",
        background: "#111",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Fond dots + semelle */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Contenu */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1024px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
        }}
      >
        {/* Header événement */}
        <PageHeader
          label="FSA · Saint-Aubin-d'Aubigné"
          title="Agenda"
          subtitle="Courses, sorties collectives et événements de la saison."
        />
        {/* Retour */}
        <Link
          href="/agenda"
          className="font-barlow-condensed uppercase"
          style={{
            display: "inline-block",
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "0.6rem 1.5rem",
            marginBottom: "3rem",
            borderRadius: "999px",
          }}
        >
          ← Retour à l'agenda
        </Link>
        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid rgba(232,24,109,0.2)",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              background: isPast ? "rgba(255,255,255,0.05)" : "#e8186d",
              padding: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <div
                className="font-bebas"
                style={{ fontSize: "5rem", color: "#fff", lineHeight: 1 }}
              >
                {new Date(event.date).getDate()}
              </div>
              <div
                className="font-barlow-condensed uppercase"
                style={{
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.8)",
                  letterSpacing: "0.1em",
                }}
              >
                {new Date(event.date).toLocaleDateString("fr-FR", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "0.5rem",
              }}
            >
              {event.type && (
                <span
                  className="font-barlow-condensed uppercase"
                  style={{
                    fontSize: "0.75rem",
                    background: "rgba(0,0,0,0.25)",
                    color: "#fff",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "999px",
                    letterSpacing: "0.1em",
                  }}
                >
                  {event.type}
                </span>
              )}
              <span
                className="font-barlow-condensed uppercase"
                style={{
                  fontSize: "0.75rem",
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "999px",
                  letterSpacing: "0.1em",
                }}
              >
                {isPast ? "Passé" : "À venir"}
              </span>
            </div>
          </div>
          <div style={{ padding: "2rem" }}>
            <h1
              className="font-bebas"
              style={{
                fontSize: "2.5rem",
                color: "#fff",
                marginBottom: "0.75rem",
              }}
            >
              {event.nom}
            </h1>
            <p
              className="font-barlow-condensed uppercase"
              style={{
                fontSize: "1rem",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.08em",
                marginBottom: "1rem",
              }}
            >
              {dateFormatted}
            </p>
            {event.description && (
              <p
                className="font-barlow"
                style={{
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7,
                }}
              >
                {event.description}
              </p>
            )}
          </div>
        </div>

        {/* Grille météo + carte */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {/* Météo */}
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "1.5rem",
            }}
          >
            <p
              className="font-barlow-condensed uppercase"
              style={{
                fontSize: "1rem",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "1rem",
              }}
            >
              Météo prévue
            </p>
            {meteo && meteoInfo ? (
              <div>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                  {meteoInfo.emoji}
                </div>
                <p
                  className="font-barlow-condensed"
                  style={{
                    color: "#fff",
                    fontSize: "1rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  {meteoInfo.label}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.5rem",
                  }}
                >
                  {[
                    { label: "Temp. max", value: `${meteo.tempMax}°C` },
                    { label: "Temp. min", value: `${meteo.tempMin}°C` },
                    { label: "Pluie", value: `${meteo.precipitation} mm` },
                    { label: "Vent max", value: `${meteo.wind} km/h` },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: "8px",
                        padding: "0.6rem",
                      }}
                    >
                      <p
                        className="font-barlow"
                        style={{
                          fontSize: "0.7rem",
                          color: "rgba(255,255,255,0.3)",
                        }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="font-bebas"
                        style={{ fontSize: "1.25rem", color: "#e8186d" }}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p
                className="font-barlow"
                style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}
              >
                {isPast
                  ? "Événement passé — météo non disponible."
                  : "Prévision disponible 16 jours avant l'événement."}
              </p>
            )}
          </div>

          {/* Carte */}
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "1rem 1.5rem" }}>
              <p
                className="font-barlow-condensed uppercase"
                style={{
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                Localisation · {event.lieu}
              </p>
            </div>
            {coords ? (
              <MapWrapper
                lat={coords.lat}
                lon={coords.lon}
                lieu={event.lieu!}
                nom={event.nom}
              />
            ) : (
              <div style={{ padding: "1.5rem" }}>
                <p
                  className="font-barlow"
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "0.85rem",
                  }}
                >
                  Carte non disponible pour ce lieu.
                </p>
              </div>
            )}{" "}
          </div>
        </div>

        {/* CTA retour */}
        <div style={{ textAlign: "center", paddingBottom: "3rem" }}>
          <Link
            href="/agenda"
            className="font-barlow-condensed uppercase"
            style={{
              display: "inline-block",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "0.6rem 1.5rem",
              borderRadius: "999px",
            }}
          >
            ← Retour à l'agenda
          </Link>
        </div>
      </div>
    </div>
  );
}
