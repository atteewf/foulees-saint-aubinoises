"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className={`bg-fsa-gris py-3 sticky top-0 z-50 w-full`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          padding: "0 2rem",
        }}
      >
        {/* Logo */}
        <Link href="/">
          <Image
            src="/foulees/logo_hero_sansFSA.png"
            alt="Logo FSA"
            width={80}
            height={80}
          />
        </Link>

        {/* Burger mobile */}
        <button
          className="block md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Liens */}
        <ul
          className={`${isOpen ? "flex" : "hidden"} md:flex gap-6 items-center`}
        >
          <li>
            <Link
              className="font-barlow-condensed uppercase text-sm tracking-widest text-white/60 hover:text-fsa-rose transition-colors duration-200"
              href="/leclub"
            >
              Le Club
            </Link>
          </li>
          <li>
            <Link
              className="font-barlow-condensed uppercase text-sm tracking-widest text-white/60 hover:text-fsa-rose transition-colors duration-200"
              href="/agenda"
            >
              Agenda
            </Link>
          </li>
          <li>
            <Link
              className="font-barlow-condensed uppercase text-sm tracking-widest text-white/60 hover:text-fsa-rose transition-colors duration-200"
              href="/galerie"
            >
              Galerie
            </Link>
          </li>
          <li>
            <Link
              className="font-barlow-condensed uppercase text-sm tracking-widest text-white/60 hover:text-fsa-rose transition-colors duration-200"
              href="/resultats"
            >
              Résultats
            </Link>
          </li>
          <li>
            <Link
              className="font-barlow-condensed uppercase text-sm tracking-widest text-white/60 hover:text-fsa-rose transition-colors duration-200"
              href="/contact"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              className="font-barlow-condensed uppercase text-sm tracking-widest text-fsa-rose border border-fsa-rose px-4 py-2 rounded-full hover:bg-fsa-rose hover:text-white transition-colors duration-200"
              href="/escapade"
            >
              Escapades 2026
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
