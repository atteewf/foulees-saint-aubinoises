"use client";

import { Event } from "../types/database";
import Link from "next/link";
import { useState, useEffect } from "react";

export function EventList({ events }: { events: Event[] }) {
  const [filtre, setFiltre] = useState<string>("tout");
  const [likes, setLikes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem("fsa-likes");
    if (saved) setLikes(new Set(JSON.parse(saved)));
  }, []);

  const toggleLike = (id: string) => {
    setLikes((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      localStorage.setItem("fsa-likes", JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const types = ["tout", "trail", "route", "cross"];

  const now = new Date();
  const filtered = events.filter((e) =>
    filtre === "tout" ? true : e.type === filtre,
  );

  const aVenir = filtered.filter((e) => new Date(e.date) >= now);
  const passes = filtered.filter((e) => new Date(e.date) < now);

  const EventCard = ({ event }: { event: Event }) => {
    const isPast = new Date(event.date) < now;
    const isLiked = likes.has(event.id);

    return (
      <div
        style={{
          background: "#1a1a1a",
          border: `1px solid ${isPast ? "rgba(255,255,255,0.06)" : "rgba(232, 24, 111, 0.86)"}`,
          borderRadius: "16px",
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s",
          opacity: isPast ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform =
            "translateY(-4px)";
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 12px 40px rgba(232, 24, 111, 0.84)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* Header date */}
        <div
          style={{
            background: isPast ? "rgba(255, 255, 255, 0.98)" : "#e8186d",
            padding: "1.25rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              className="font-bebas"
              style={{ fontSize: "3.5rem", color: "#fff", lineHeight: 1 }}
            >
              {new Date(event.date).getDate()}
            </div>
            <div
              className="font-barlow-condensed uppercase tracking-widest"
              style={{
                fontSize: "0.75rem",
                color: isPast
                  ? "rgba(255,255,255,0.5)"
                  : "rgba(255,255,255,0.8)",
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
            {isPast ? (
              <span
                className="font-barlow-condensed uppercase"
                style={{
                  fontSize: "1rem",
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "999px",
                  letterSpacing: "0.1em",
                }}
              >
                Passé
              </span>
            ) : (
              <span
                className="font-barlow-condensed uppercase"
                style={{
                  fontSize: "2rem",
                  background: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "999px",
                  letterSpacing: "0.1em",
                }}
              >
                À venir
              </span>
            )}
            {event.type && (
              <span
                className="font-barlow-condensed uppercase"
                style={{
                  fontSize: "0.65rem",
                  background: "rgba(0,0,0,0.2)",
                  color: "#fff",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "999px",
                  letterSpacing: "0.1em",
                }}
              >
                {event.type}
              </span>
            )}
          </div>
        </div>

        {/* Contenu */}
        <div style={{ padding: "1.25rem 1.5rem" }}>
          <h3
            className="font-barlow-condensed font-bold"
            style={{
              fontSize: "1.1rem",
              color: "#fff",
              marginBottom: "0.5rem",
            }}
          >
            {event.nom}
          </h3>
          {event.description && (
            <p
              className="font-barlow"
              style={{
                fontSize: "0.85rem",
                color: "rgba(255, 255, 255, 0.81)",
                lineHeight: 1.6,
                marginBottom: "1rem",
              }}
            >
              {event.description}
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "0.875rem 1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {event.lieu ? (
            <span
              className="font-barlow-condensed uppercase"
              style={{
                fontSize: "0.95rem",
                color: "rgb(255, 253, 253)",
                letterSpacing: "0.08em",
              }}
            >
              📍 {event.lieu}
            </span>
          ) : (
            <span />
          )}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <button
              onClick={() => toggleLike(event.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.25rem",
                transition: "transform 0.15s",
                transform: isLiked ? "scale(1.2)" : "scale(1)",
              }}
              title={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              {isLiked ? "❤️" : "🤍"}
            </button>
            <Link
              href={`/agenda/${event.id}`}
              className="font-barlow-condensed uppercase"
              style={{
                fontSize: "0.75rem",
                color: "#e8186d",
                letterSpacing: "0.1em",
                textDecoration: "none",
              }}
            >
              Voir →
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Filtres */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFiltre(t)}
            className="font-barlow-condensed uppercase"
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "999px",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              cursor: "pointer",
              border:
                filtre === t
                  ? "1px solid #e8186d"
                  : "1px solid rgba(255,255,255,0.15)",
              background: filtre === t ? "#e8186d" : "transparent",
              color: filtre === t ? "#fff" : "rgba(255,255,255,0.5)",
              transition: "all 0.2s",
            }}
          >
            {t === "tout" ? "Tous" : t}
          </button>
        ))}
      </div>

      {/* Events à venir */}
      {aVenir.length > 0 && (
        <div style={{ marginBottom: "3rem" }}>
          <p
            className="font-barlow-condensed uppercase"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              color: "#e8186d",
              marginBottom: "1rem",
            }}
          >
            À venir · {aVenir.length} événement{aVenir.length > 1 ? "s" : ""}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {aVenir.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Events passés */}
      {passes.length > 0 && (
        <div>
          <p
            className="font-barlow-condensed uppercase"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "1rem",
            }}
          >
            Passés · {passes.length} événement{passes.length > 1 ? "s" : ""}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {passes.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <p
          className="font-barlow"
          style={{
            color: "rgba(255,255,255,0.3)",
            textAlign: "center",
            padding: "3rem 0",
          }}
        >
          Aucun événement pour ce filtre.
        </p>
      )}
    </div>
  );
}
