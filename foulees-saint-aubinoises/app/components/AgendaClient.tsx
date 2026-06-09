"use client";
import { useState } from "react";
import { EventTimeline } from "./EventTimeline";
import { Event } from "../types/database";

const types = ["tout", "trail", "route", "cross", "entrainement", "club"];

export function AgendaClient({ events }: { events: Event[] }) {
  const [filtre, setFiltre] = useState("tout");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      {/* Filtres */}
      <div
        style={{
          display: "flex",
          gap: "0.6rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          flexShrink: 0,
        }}
      >
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFiltre(t)}
            className="font-barlow-condensed uppercase"
            style={{
              padding: "0.4rem 1.1rem",
              borderRadius: "999px",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              cursor: "pointer",
              border:
                filtre === t
                  ? "1px solid #e8186d"
                  : "1px solid rgba(255,255,255,0.12)",
              background: filtre === t ? "#e8186d" : "transparent",
              color: filtre === t ? "#fff" : "rgba(255,255,255,0.4)",
              transition: "all 0.2s",
            }}
          >
            {t === "tout" ? "Tous" : t}
          </button>
        ))}
      </div>

      {/* Timeline scrollable */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "2rem",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <EventTimeline events={events} filtre={filtre} />
      </div>
    </div>
  );
}
