"use client";

import { Event } from "../types/database";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CircleArrowRight } from "lucide-react";

export function Galerie({ events }: { events: Event[] }) {
  const [filtre, setFiltre] = useState<string>("tout");
  const [hovered, setHovered] = useState<string | null>(null);

  const types = ["tout", "trail", "route", "entrainement", "club"];

  const filtered = events.filter((e) =>
    filtre === "tout" ? true : e.type === filtre,
  );

  const avecPhotos = filtered.filter((e) => e.photos && e.photos.length > 0);
  const sansPhotos = filtered.filter((e) => !e.photos || e.photos.length === 0);

  return (
    <div>
      {/* Filtres */}
      <div
        style={{
          display: "flex",
          gap: "0.6rem",
          marginBottom: "2.5rem",
          flexWrap: "wrap",
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
            {t === "tout"
              ? "Tous"
              : t === "club"
                ? "Vie du club"
                : t === "entrainement"
                  ? "Entraînement"
                  : t}
          </button>
        ))}
      </div>

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
            Aucune photo disponible
          </p>
          <p
            className="font-barlow"
            style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.2)" }}
          >
            Les photos arrivent bientôt.
          </p>
        </div>
      )}

      {/* Grille événements avec photos */}
      {avecPhotos.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
            marginBottom: "3rem",
          }}
        >
          {avecPhotos.map((event) => (
            <Link
              key={event.id}
              href={`/galerie/${event.id}`}
              style={{ textDecoration: "none" }}
              onMouseEnter={() => setHovered(event.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                style={{
                  background: "#1a1a1a",
                  border: `1px solid ${hovered === event.id ? "rgba(232,24,109,0.4)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "all 0.25s",
                  transform:
                    hovered === event.id ? "translateY(-4px)" : "translateY(0)",
                  boxShadow:
                    hovered === event.id
                      ? "0 16px 40px rgba(232,24,109,0.12)"
                      : "none",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    position: "relative",
                    height: "220px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={
                      (
                        event.photos.find((p: any) => p.is_cover) ??
                        event.photos[0]
                      )?.url
                    }
                    fill
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.4s",
                      transform:
                        hovered === event.id ? "scale(1.05)" : "scale(1)",
                    }}
                    alt={event.nom}
                  />
                  {/* Overlay gradient */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                      transition: "opacity 0.25s",
                    }}
                  />
                  {/* Badge type */}
                  {event.type && (
                    <span
                      className="font-barlow-condensed uppercase"
                      style={{
                        position: "absolute",
                        top: "0.75rem",
                        left: "0.75rem",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        background: "#e8186d",
                        color: "#fff",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                      }}
                    >
                      {event.type}
                    </span>
                  )}
                  {/* Nombre de photos */}
                  <span
                    className="font-barlow-condensed"
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      fontSize: "0.65rem",
                      background: "rgba(0,0,0,0.5)",
                      color: "rgba(255,255,255,0.7)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "999px",
                    }}
                  >
                    📷 {event.photos.length}
                  </span>
                </div>

                {/* Infos */}
                <div
                  style={{
                    padding: "1rem 1.25rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p
                      className="font-barlow-condensed font-bold"
                      style={{
                        fontSize: "1rem",
                        color: "#fff",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {event.nom}
                    </p>
                    <p
                      className="font-barlow"
                      style={{
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      {new Date(event.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      {event.lieu && ` · ${event.lieu}`}
                    </p>
                  </div>
                  <div
                    style={{
                      color:
                        hovered === event.id
                          ? "#e8186d"
                          : "rgba(255,255,255,0.2)",
                      fontSize: "1.1rem",
                      transition: "all 0.2s",
                      transform:
                        hovered === event.id
                          ? "translateX(3px)"
                          : "translateX(0)",
                    }}
                  >
                    <CircleArrowRight size={20} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
