"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-fsa-gris sticky top-0 z-50 w-full">
      {/* Barre principale */}
      <div className="flex items-center justify-between px-6 py-3 md:justify-center md:gap-8">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/foulees/logo_hero_sansFSA.png"
            alt="Logo FSA"
            width={90}
            height={90}
          />
        </Link>

        {/* Liens desktop */}
        <ul className="hidden md:flex gap-6 items-center">
          <NavLinks />
        </ul>

        {/* Burger mobile */}
        <button
          className="md:hidden text-white text-2xl p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {isOpen && (
        <ul className="flex flex-col items-center gap-4 py-4 pb-6 md:hidden border-t border-white/10">
          <NavLinks onClose={() => setIsOpen(false)} />
        </ul>
      )}
    </nav>
  );
}

function NavLinks({ onClose }: { onClose?: () => void }) {
  const linkClass =
    "font-barlow-condensed uppercase text-1xl tracking-widest text-white/60 hover:text-fsa-rose transition-colors duration-200";

  return (
    <>
      {[
        { href: "/leclub", label: "Le Club" },
        { href: "/agenda", label: "Agenda" },
        { href: "/galerie", label: "Galerie" },
        { href: "/resultats", label: "Résultats" },
        { href: "/contact", label: "Contact" },
      ].map(({ href, label }) => (
        <li key={href}>
          <Link className={linkClass} href={href} onClick={onClose}>
            {label}
          </Link>
        </li>
      ))}

      {/* Bouton Escapades */}
      <li>
        <Link
          className="font-barlow-condensed uppercase tracking-widest transition-all duration-200 btn-escapade"
          href="/escapade"
          style={{
            fontSize: "1rem",
            letterSpacing: "0.12em",
            fontWeight: "700",
            color: "#e8186d",
            border: "2px solid rgba(232,24,109,0.5)",
            padding: "0.3rem 0.9rem",
            borderRadius: "999px",
            background: "rgba(232,24,109,0.05)",
            backdropFilter: "blur(4px)",
            display: "inline-block",
          }}
        >
          ✦ Escapades 2026
        </Link>{" "}
      </li>
    </>
  );
}
