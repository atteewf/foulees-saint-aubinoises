// app/contact/page.tsx
import Link from "next/link";
import { Mail, Phone, ExternalLink } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="flex-1 min-h-screen bg-fsa-gris-pale py-16">
      <div className="max-w-7xl mx-auto px-6 w-full py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="font-barlow-condensed text-fsa-rose uppercase tracking-widest text-sm mb-2">
            Nous rejoindre
          </p>
          <h1 className="font-bebas text-5xl text-fsa-noir">Contact</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Bloc gauche — Infos */}
          <div className="flex flex-col gap-6">
            {/* Qui sommes-nous */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="font-bebas text-2xl text-fsa-noir mb-4">
                Qui sommes-nous ?
              </h2>
              <p className="font-barlow text-fsa-gris-med leading-relaxed">
                Notre association, non adhérente à la fédération d'athlétisme,
                se compose de femmes et d'hommes qui se retrouvent suivant les
                objectifs de chacun afin de pratiquer la course à pied. Vous
                êtes tous les bienvenus, serez vite intégrés et progresserez
                avec le groupe.
              </p>
            </div>

            {/* Coordonnées */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="font-bebas text-2xl text-fsa-noir mb-6">
                Nous contacter
              </h2>
              <div className="flex flex-col gap-4">
                <a
                  href="tel:0628783993"
                  className="flex items-center gap-3 text-fsa-gris-med hover:text-fsa-rose transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-fsa-rose/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-fsa-rose" />
                  </div>
                  <span className="font-barlow">06 28 78 39 93</span>
                </a>

                <a
                  href="mailto:fouleessaintaubinoises@gmail.com"
                  className="flex items-center gap-3 text-fsa-gris-med hover:text-fsa-rose transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-fsa-rose/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-fsa-rose" />
                  </div>
                  <span className="font-barlow">
                    fouleessaintaubinoises@gmail.com
                  </span>
                </a>
              </div>
              <a
                href="https://www.facebook.com/fouleessstaubinoises/?locale=fr_FR"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-fsa-gris-med hover:text-fsa-rose transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-fsa-rose/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-fsa-rose"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </div>
                <span className="font-barlow">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/foulees_saint_aubinoises/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-fsa-gris-med hover:text-fsa-rose transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-fsa-rose/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-fsa-rose"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
                <span className="font-barlow">Instagram</span>
              </a>
            </div>

            {/* HelloAsso */}
            <div className="bg-fsa-noir rounded-2xl p-8 shadow-sm">
              <h2 className="font-bebas text-2xl text-white mb-2">
                Rejoindre le club
              </h2>
              <p className="font-barlow text-white/60 text-sm mb-6">
                Adhésion en ligne via HelloAsso — simple et rapide.
              </p>
              <Link
                href="https://www.helloasso.com/associations/foulees-saint-aubinoises"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-fsa-rose hover:bg-fsa-rose-dark text-white font-barlow-condensed uppercase tracking-widest text-sm px-6 py-3 rounded-full transition-colors duration-200"
              >
                S'inscrire sur HelloAsso
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Bloc droite — Formulaire */}
          <div className="bg-white rounded-2xl p-8 shadow-sm h-fit">
            <h2 className="font-bebas text-2xl text-fsa-noir mb-6">
              Envoyer un message
            </h2>
            <form
              action={`mailto:fouleessaintaubinoises@gmail.com`}
              method="GET"
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med">
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  className="border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="votre@email.com"
                  className="border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med">
                  Message
                </label>
                <textarea
                  name="body"
                  rows={6}
                  placeholder="Votre message..."
                  className="border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-fsa-rose hover:bg-fsa-rose-dark text-white font-barlow-condensed uppercase tracking-widest text-sm px-6 py-3 rounded-full transition-colors duration-200 mt-2"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
