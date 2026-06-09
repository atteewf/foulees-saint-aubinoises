import { Suspense } from "react";
import { supabase } from "../lib/supabase";
import { EventTimeline } from "../components/EventTimeline";
import { AgendaClient } from "../components/AgendaClient";
import { PageHeader } from "../components/PageHeader";
async function EventsData() {
  const { data: events } = await supabase
    .from("events")
    .select()
    .order("date", { ascending: true });
  return <AgendaClient events={events ?? []} />;
}

export default function AgendaPage() {
  return (
    <div
      style={{
        width: "100%",
        background: "#111",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Fond dots + semelle — fixes */}
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
        <img
          src="/foulees/semelle_agenda.svg"
          alt=""
          style={{
            position: "absolute",
            left: "40%",
            bottom: "-21%",
            height: "85vh",
            opacity: 2,
            filter:
              "invert(27%) sepia(90%) saturate(2000%) hue-rotate(310deg) brightness(90%)",
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
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header — fixe */}
        <PageHeader
          label="FSA · Saint-Aubin-d'Aubigné"
          title="Agenda"
          subtitle="Courses, sorties collectives et événements de la saison."
        />

        {/* Contenu flex */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1024px",
            margin: "0 auto",
            padding: "0rem 1.5rem",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header fixe */}
          <div style={{ marginBottom: "1.5rem", flexShrink: 0 }}>
            {/* ... ton header ... */}
          </div>

          {/* Filtres + Timeline via AgendaClient */}
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
    </div>
  );
}
