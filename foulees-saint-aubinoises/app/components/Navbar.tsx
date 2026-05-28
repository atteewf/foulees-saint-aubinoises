"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav
      className={`bg-fsa-gris py-4 sticky top-0 z-50 w-full ${isOpen ? "open" : ""}`}
    >
      <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/foulees/LOGO_FSA_ST_SF.png"
            alt="Logo FSA"
            width={80}
            height={80}
          />
          <span className="font-bebas text-2xl tracking-wide text-white">
            FOULÉES <span className="text-fsa-rose">SAINT-AUBINOISES</span>
          </span>
        </div>
        <button
          className="block md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <ul
          className={`${isOpen ? "flex" : "hidden"} md:flex gap-8 items-center`}
        >
          <li>
            <Link
              className="font-barlow-condensed uppercase text-sm tracking-widest text-white/60 hover:text-fsa-rose transition-colors duration-200"
              href="/"
            >
              Accueil
            </Link>
          </li>
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
              className="font-barlow-condensed uppercase text-sm tracking-widest text-white/60 hover:text-fsa-rose transition-colors duration-200"
              href="/adhesion"
            >
              Adhésion
            </Link>
          </li>
          <li>
            <Link
              className="font-barlow-condensed uppercase text-sm tracking-widest text-white/60 hover:text-fsa-rose transition-colors duration-200"
              href="/mentionslegales"
            >
              Mentions Légales
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
