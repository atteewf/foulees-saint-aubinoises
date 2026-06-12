"use client";

import { useState } from "react";
import Image from "next/image";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

type Photo = {
  id: string;
  url: string;
  nom?: string | null;
};

export function GalerieLightbox({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const ouvrir = (i: number) => setIndex(i);
  const fermer = () => setIndex(null);
  const suivant = () =>
    setIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  const precedent = () =>
    setIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null,
    );

  return (
    <>
      {/* Grille photos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            onClick={() => ouvrir(i)}
            style={{
              position: "relative",
              aspectRatio: "1",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "zoom-in",
            }}
            className="group"
          >
            <Image
              src={photo.url}
              fill
              style={{ objectFit: "cover" }}
              className="group-hover:scale-105 transition-transform duration-300"
              alt={photo.nom ?? "photo"}
            />
            <div
              className="group-hover:opacity-100"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                opacity: 0,
                transition: "opacity 0.25s",
              }}
            />
            {photo.nom && (
              <p
                className="font-barlow-condensed group-hover:opacity-100"
                style={{
                  position: "absolute",
                  bottom: "0.75rem",
                  left: "0.75rem",
                  right: "0.75rem",
                  fontSize: "0.75rem",
                  color: "#fff",
                  opacity: 0,
                  transition: "opacity 0.25s",
                }}
              >
                {photo.nom}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {index !== null && (
        <div
          onClick={fermer}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Fermer */}
          <button
            onClick={fermer}
            style={{
              position: "absolute",
              top: "5rem",
              right: "1.5rem",
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: "1.2rem",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 102,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
          {/* Précédent */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              precedent();
            }}
            style={{
              position: "absolute",
              left: "1.5rem",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: "1.5rem",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 101,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircleArrowLeft />
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "90vw",
              height: "85vh",
              maxWidth: "1200px",
            }}
          >
            <Image
              src={photos[index].url}
              fill
              style={{ objectFit: "contain" }}
              alt={photos[index].nom ?? "photo"}
            />
          </div>

          {/* Suivant */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              suivant();
            }}
            style={{
              position: "absolute",
              right: "1.5rem",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: "1.5rem",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 101,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircleArrowRight />
          </button>

          {/* Compteur */}
          <p
            className="font-barlow-condensed"
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.8rem",
            }}
          >
            {index + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
