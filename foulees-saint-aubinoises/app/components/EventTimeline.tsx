"use client";

import { Event } from "../types/database";
import Link from "next/link";
import { useState } from "react";
import { HiArrowCircleRight } from "react-icons/hi";

// ─── EventCard ────────────────────────────────────────────────────────────────

function EventCard({ event, isPast }: { event: Event; isPast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/agenda/${event.id}`}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: hovered
            ? "rgba(232,24,109,0.6)"
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? "rgba(232, 24, 111, 0.87)" : "rgba(255,255,255,0.07)"}`,
          borderRadius: "12px",
          padding: "1.25rem 1.5rem",
          display: "flex",
          gap: "1.5rem",
          alignItems: "flex-start",
          transition: "all 0.2s",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          opacity: isPast ? 0.5 : 1,
          cursor: "pointer",
        }}
      >
        {/* Date bloc */}
        <div style={{ textAlign: "center", minWidth: "48px", flexShrink: 0 }}>
          <div
            className="font-bebas"
            style={{
              fontSize: "2.8rem",
              lineHeight: 1,
              color: isPast ? "rgba(255,255,255,0.3)" : "#fff",
            }}
          >
            {new Date(event.date).getDate()}
          </div>
          <div
            className="font-barlow-condensed uppercase"
            style={{
              fontSize: "0.9rem",
              letterSpacing: "0.1em",
              fontWeight: 700,
              color: isPast ? "rgba(255,255,255,0.2)" : "#e8186d",
              marginTop: "2px",
            }}
          >
            {new Date(event.date).toLocaleDateString("fr-FR", {
              month: "short",
            })}
          </div>
        </div>

        {/* Séparateur vertical */}
        <div
          style={{
            width: "1px",
            background: hovered
              ? "rgba(232,24,109,0.5)"
              : "rgba(255,255,255,0.08)",
            alignSelf: "stretch",
            transition: "background 0.2s",
          }}
        />

        {/* Contenu */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "0.5rem",
            }}
          >
            <h3
              className="font-barlow-condensed font-bold"
              style={{
                fontSize: "1rem",
                color: "#fff",
                letterSpacing: "0.02em",
              }}
            >
              {event.nom}
            </h3>
            {event.type && (
              <span
                className="font-barlow-condensed uppercase"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: "#e8186d",
                  background: "rgba(232,24,109,0.1)",
                  border: "1px solid rgba(232,24,109,0.2)",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "999px",
                  whiteSpace: "nowrap",
                  marginLeft: "0.75rem",
                }}
              >
                {event.type}
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {event.lieu && (
              <span
                className="font-barlow"
                style={{
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                📍 {event.lieu}
              </span>
            )}
            {event.description && (
              <span
                className="font-barlow"
                style={{
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,0.3)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "300px",
                }}
              >
                {event.description}
              </span>
            )}
          </div>
        </div>

        {/* Flèche */}
        <HiArrowCircleRight
          style={{
            color: hovered ? "#e8186d" : "rgba(255,255,255,0.15)",
            fontSize: "1.4rem",
            transition: "all 0.2s",
            transform: hovered ? "translateX(3px)" : "translateX(0)",
            alignSelf: "center",
            flexShrink: 0,
          }}
        />
      </div>
    </Link>
  );
}

// ─── EventTimeline ────────────────────────────────────────────────────────────
type Props = { events: Event[]; filtre: string };

export function EventTimeline({ events, filtre }: Props) {
  const now = new Date();

  const filtered = events.filter((e) =>
    filtre === "tout" ? true : e.type === filtre,
  );

  // Grouper par mois
  const grouped: Record<string, { events: Event[]; isPast: boolean }> = {};

  filtered.forEach((event) => {
    const d = new Date(event.date);
    const key = d.toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });
    if (!grouped[key]) {
      grouped[key] = { events: [], isPast: d < now };
    }
    grouped[key].events.push(event);
    if (d >= now) grouped[key].isPast = false;
  });

  const aVenir = filtered.filter((e) => new Date(e.date) >= now);
  const passes = filtered.filter((e) => new Date(e.date) < now);

  return (
    <div>
      {/* État vide */}
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <p
            className="font-bebas"
            style={{
              fontSize: "1.5rem",
              color: "rgba(255,255,255,0.2)",
              marginBottom: "0.5rem",
            }}
          >
            Aucun événement programmé
          </p>
          <p
            className="font-barlow"
            style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.2)" }}
          >
            La prochaine sortie arrive bientôt.
          </p>
          {/* Mini ECG */}
          <svg
            width="200"
            height="40"
            viewBox="0 0 200 40"
            style={{ marginTop: "1.5rem", opacity: 0.3 }}
          >
            <defs>
              <style>{`
                @keyframes ecg-vide {
                  0% { stroke-dashoffset: 400; }
                  100% { stroke-dashoffset: 0; }
                }
                .ecg-v { stroke: #e8186d; stroke-width: 1.5; fill: none; stroke-dasharray: 400; stroke-dashoffset: 400; animation: ecg-vide 2s linear infinite; }
              `}</style>
            </defs>
            <path
              className="ecg-v"
              d="M0,20 L40,20 L50,20 L55,8 L60,28 L65,2 L70,28 L75,20 L130,20 L135,20 L140,10 L145,26 L150,4 L155,26 L160,20 L200,20"
            />
          </svg>
        </div>
      )}

      {/* Timeline */}
      {Object.entries(grouped).length > 0 && (
        <div style={{ position: "relative" }}>
          {/* À venir */}
          {aVenir.length > 0 && (
            <div style={{ marginBottom: "3rem" }}>
              {Object.entries(grouped)
                .filter(([, g]) => !g.isPast)
                .map(([mois, group]) => (
                  <div key={mois} style={{ marginBottom: "2rem" }}>
                    {/* Point mois */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "1rem",
                        position: "relative",
                      }}
                    >
                      <p
                        className="font-barlow-condensed uppercase"
                        style={{
                          fontSize: "1rem",
                          letterSpacing: "0.12em",
                          color: "#e8186d",
                        }}
                      >
                        ● {mois}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                      }}
                    >
                      {group.events.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          isPast={false}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Passés */}
          {passes.length > 0 && (
            <div>
              <p
                className="font-barlow-condensed uppercase"
                style={{
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  color: "rgba(255, 255, 255, 0.8)",
                  marginBottom: "1.5rem",
                }}
              >
                Événements passés
              </p>
              {Object.entries(grouped)
                .filter(([, g]) => g.isPast)
                .map(([mois, group]) => (
                  <div key={mois} style={{ marginBottom: "2rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "1rem",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "-2.4rem",
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.15)",
                          border: "2px solid #0f0f0f",
                        }}
                      />
                      <p
                        className="font-barlow-condensed uppercase"
                        style={{
                          fontSize: "1rem",
                          letterSpacing: "0.12em",
                          color: "rgba(255,255,255,0.2)",
                        }}
                      >
                        ● {mois}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                      }}
                    >
                      {group.events.map((event) => (
                        <EventCard key={event.id} event={event} isPast={true} />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
