"use client";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaStrava } from "react-icons/fa";

export default function Footer() {
  const liens = [
    { href: "/leclub", label: "Le Club" },
    { href: "/agenda", label: "Agenda" },
    { href: "/galerie", label: "Galerie" },
    { href: "/resultats", label: "Résultats" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer
      style={{
        background: "#1a1a1a",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{ maxWidth: "1024px", margin: "0 auto", padding: "2rem 1.5rem" }}
      >
        {/* Ligne principale */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {/* Logo + nom */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <Image
              src="/foulees/logo_fsa_fond_blanc.svg"
              alt="Logo FSA"
              width={40}
              height={40}
            />
            <span
              className="font-bebas"
              style={{
                fontSize: "1rem",
                color: "#fff",
                letterSpacing: "0.05em",
              }}
            >
              Foulées <span style={{ color: "#e8186d" }}>Saint-Aubinoises</span>
            </span>
          </Link>

          {/* Navigation compacte inline */}
          <nav
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {liens.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
                className="font-barlow-condensed uppercase"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e8186d")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
                }
              >
                {lien.label}
              </Link>
            ))}
          </nav>

          {/* Réseaux */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link
              href="https://www.facebook.com/fouleessstaubinoises"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "1.1rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e8186d")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
              }
            >
              <FaFacebook />
            </Link>
            <Link
              href="https://www.instagram.com/foulees_saint_aubinoises"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "1.1rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e8186d")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
              }
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://strava.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "1.1rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e8186d")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
              }
            >
              <FaStrava />
            </Link>
          </div>
        </div>

        {/* Bas footer */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            marginTop: "1.5rem",
            paddingTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p
            className="font-barlow"
            style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}
          >
            © 2025 Les Foulées Saint-Aubinoises — Tous droits réservés
          </p>
          <Link
            href="/mentionslegales"
            className="font-barlow"
            style={{
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.2)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e8186d")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.2)")
            }
          >
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
