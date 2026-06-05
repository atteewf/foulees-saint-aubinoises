"use client";

import { Resultats } from "../types/database";
import { useState } from "react";

export function ResultatsList({ resultats }: { resultats: Resultats[] }) {
  const [recherche, setRecherche] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = resultats.filter(
    (r) =>
      r.coureur?.toLowerCase().includes(recherche.toLowerCase()) ||
      r.course?.toLowerCase().includes(recherche.toLowerCase()),
  );

  // Trier par date desc
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div>
      {/* Barre de recherche */}
      <div style={{ marginBottom: "2rem", position: "relative" }}>
        <input
          type="text"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher un coureur ou une course..."
          className="font-barlow"
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "0.875rem 1.25rem",
            color: "#fff",
            fontSize: "0.9rem",
            outline: "none",
          }}
        />
      </div>

      {/* Stats globales */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          marginBottom: "2.5rem",
        }}
      >
        {[
          { label: "Résultats", value: resultats.length },
          {
            label: "Coureurs",
            value: new Set(resultats.map((r) => r.coureur)).size,
          },
          {
            label: "Courses",
            value: new Set(resultats.map((r) => r.course)).size,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#1a1a1a",
              border: "1px solid rgba(232,24,109,0.15)",
              borderRadius: "12px",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <p
              className="font-bebas"
              style={{ fontSize: "2rem", color: "#e8186d", lineHeight: 1 }}
            >
              {stat.value}
            </p>
            <p
              className="font-barlow-condensed uppercase"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.3)",
                marginTop: "0.25rem",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* État vide */}
      {sorted.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <p
            className="font-bebas"
            style={{
              fontSize: "1.5rem",
              color: "rgba(255,255,255,0.2)",
              marginBottom: "0.5rem",
            }}
          >
            Aucun résultat trouvé
          </p>
          <p
            className="font-barlow"
            style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.2)" }}
          >
            Essayez un autre nom ou une autre course.
          </p>
        </div>
      )}

      {/* Liste résultats */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {sorted.map((result) => (
          <div
            key={result.id}
            onMouseEnter={() => setHovered(result.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background:
                hovered === result.id ? "rgba(232,24,109,0.05)" : "#1a1a1a",
              border: `1px solid ${hovered === result.id ? "rgba(232,24,109,0.3)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: "12px",
              padding: "1.25rem 1.5rem",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "1.5rem",
              alignItems: "center",
              transition: "all 0.2s",
              cursor: "default",
            }}
          >
            {/* Date */}
            <div style={{ textAlign: "center", minWidth: "48px" }}>
              <div
                className="font-bebas"
                style={{ fontSize: "2rem", color: "#fff", lineHeight: 1 }}
              >
                {new Date(result.date).getDate()}
              </div>
              <div
                className="font-barlow-condensed uppercase"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  color: "#e8186d",
                }}
              >
                {new Date(result.date).toLocaleDateString("fr-FR", {
                  month: "short",
                  year: "2-digit",
                })}
              </div>
            </div>

            {/* Séparateur */}
            <div
              style={{
                width: "1px",
                background: "rgba(255,255,255,0.06)",
                alignSelf: "stretch",
                flexShrink: 0,
                gridColumn: "unset",
              }}
            />

            {/* Infos */}
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.35rem",
                  flexWrap: "wrap",
                }}
              >
                <p
                  className="font-barlow-condensed font-bold"
                  style={{ fontSize: "1rem", color: "#fff" }}
                >
                  {result.coureur}
                </p>
                <span
                  style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    flexShrink: 0,
                  }}
                />
                <p
                  className="font-barlow-condensed"
                  style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}
                >
                  {result.course}
                </p>
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {result.distance && (
                  <span
                    className="font-barlow"
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    📏 {result.distance} km
                  </span>
                )}
                {result.temps && (
                  <span
                    className="font-barlow"
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    ⏱ {result.temps}
                  </span>
                )}
              </div>
            </div>

            {/* Classement */}
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              {result.classement && (
                <div>
                  <p
                    className="font-bebas"
                    style={{
                      fontSize: "1.8rem",
                      color: result.classement <= 3 ? "#e8186d" : "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {result.classement}
                  </p>
                  <p
                    className="font-barlow-condensed uppercase"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.08em",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    classement
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
