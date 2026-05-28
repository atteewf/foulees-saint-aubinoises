import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaStrava } from "react-icons/fa";

export default function Footer() {
  const liens = [
    { href: "/leclub", label: "Le Club" },
    { href: "/agenda", label: "Agenda" },
    { href: "/galerie", label: "Galerie" },
    { href: "/resultats", label: "Résultats" },
    { href: "/adhesion", label: "Adhésion" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-fsa-noir border-t border-white/10">
      {/* Partie principale */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + description */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/foulees/LOGO_FSA_ST_SF.png"
              alt="Logo FSA"
              width={60}
              height={60}
            />
            <span className="font-bebas text-xl tracking-wide text-white">
              Foulées <span className="text-fsa-rose">Saint-Aubinoises</span>
            </span>
          </div>
          <p className="font-barlow text-white/40 text-sm leading-relaxed">
            Association de course à pied de Saint-Aubin-d'Aubigné, ouverte à
            tous niveaux.
          </p>
        </div>

        {/* Liens rapides */}
        <div>
          <p className="font-barlow-condensed uppercase text-xs tracking-widest text-white/40 mb-4">
            Navigation
          </p>
          <ul className="space-y-2">
            {liens.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className="font-barlow text-sm text-white/60 hover:text-fsa-rose transition-colors duration-200"
                >
                  {lien.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + réseaux */}
        <div>
          <p className="font-barlow-condensed uppercase text-xs tracking-widest text-white/40 mb-4">
            Nous suivre
          </p>
          <div className="flex gap-4 mb-6">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-fsa-rose transition-colors duration-200 text-2xl"
            >
              <FaFacebook />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-fsa-rose transition-colors duration-200 text-2xl"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://strava.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-fsa-rose transition-colors duration-200 text-2xl"
            >
              <FaStrava />
            </Link>
          </div>
          <p className="font-barlow text-white/40 text-sm">
            Saint-Aubin-d'Aubigné, Ille-et-Vilaine
          </p>
        </div>
      </div>

      {/* Bas de footer */}
      <div className="border-t border-white/10 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-barlow text-white/30 text-xs">
            © 2025 Les Foulées Saint-Aubinoises — Tous droits réservés
          </p>
          <Link
            href="/mentionslegales"
            className="font-barlow text-white/30 text-xs hover:text-fsa-rose transition-colors duration-200"
          >
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
