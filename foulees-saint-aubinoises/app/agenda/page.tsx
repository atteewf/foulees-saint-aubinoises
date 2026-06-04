import { Suspense } from "react";
import { supabase } from "../lib/supabase";
import { EventTimeline } from "../components/EventTimeline";

async function EventsData() {
  const { data: events } = await supabase
    .from("events")
    .select()
    .order("date", { ascending: true });
  return <EventTimeline events={events ?? []} />;
}

export default function AgendaPage() {
  return (
    <div style={{ width: "100%", background: "#0f0f0f", minHeight: "100vh" }}>
      {/* Fond dots pattern */}
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
            Agenda
          </h1>
          <p
            className="font-barlow"
            style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.35)" }}
          >
            Courses, sorties collectives et événements de la saison.
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
          <EventsData />
        </Suspense>
      </div>
    </div>
  );
}
