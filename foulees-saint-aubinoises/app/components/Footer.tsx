"use client";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaStrava } from "react-icons/fa";

const liens = [
  { href: "/leclub", label: "Le Club" },
  { href: "/agenda", label: "Agenda" },
  { href: "/galerie", label: "Galerie" },
  { href: "/resultats", label: "Résultats" },
  { href: "/contact", label: "Contact" },
];

const reseaux = [
  { href: "https://www.facebook.com/fouleessstaubinoises", icon: FaFacebook },
  {
    href: "https://www.instagram.com/foulees_saint_aubinoises",
    icon: FaInstagram,
  },
  { href: "https://strava.com", icon: FaStrava },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#1a1a1a",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 0.5rem" }}
      >
        {/* Ligne principale */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            <span
              className="font-bebas"
              style={{
                fontSize: "1rem",
                letterSpacing: "0.05em",
                color: "#fff",
              }}
            >
              Foulées <span style={{ color: "#e8186d" }}>Saint-Aubinoises</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1.25rem",
            }}
          >
            {liens.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-barlow-condensed uppercase"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e8186d")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
                }
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Réseaux */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {reseaux.map(({ href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.35)", fontSize: "1.1rem" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e8186d")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
                }
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>

        {/* Bas footer */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            marginTop: "1.5rem",
            paddingTop: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <p
            className="font-barlow"
            style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}
          >
            © 2026 Les Foulées Saint-Aubinoises — Tous droits réservés
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
