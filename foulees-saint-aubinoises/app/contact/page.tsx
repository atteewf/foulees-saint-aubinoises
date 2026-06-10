"use client";
import Link from "next/link";
import { Mail, Phone, ExternalLink } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda | Foulées Saint-Aubinoises — Club de course à pied 35",
  description:
    "Calendrier des courses, trails et sorties collectives des Foulées Saint-Aubinoises. Association de running à Saint-Aubin-d'Aubigné, près de Rennes.",
  openGraph: {
    title: "Agenda — Foulées Saint-Aubinoises",
    description:
      "Tous les événements de la saison : trail, route, cross, sorties club.",
    url: "https://foulees-saint-aubinoises.fr/agenda",
    siteName: "Foulées Saint-Aubinoises",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ContactPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("body"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Message envoyé");
      e.currentTarget.reset();
    } else {
      alert("Erreur lors de l'envoi");
    }
  };
  return (
    <div
      style={{
        width: "100%",
        background: "#0f0f0f",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Fond dots */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Semelle desktop */}
      <img
        src="/foulees/tong.svg"
        alt=""
        className="hidden md:block"
        style={{
          position: "fixed",
          right: "-10%",
          bottom: "0",
          height: "90vh",
          opacity: 0.06,
          filter:
            "invert(27%) sepia(90%) saturate(2000%) hue-rotate(310deg) brightness(90%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1024px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
        }}
      >
        <PageHeader
          label="FSA · Saint-Aubin-d'Aubigné"
          title="Contact"
          subtitle="Nous rejoindre et participer à une association conviviale et dynamique"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bloc gauche */}
          <div className="flex flex-col gap-6">
            {/* Qui sommes-nous */}
            <div
              style={{
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "1.75rem",
              }}
            >
              <h2
                className="font-bebas text-2xl"
                style={{ color: "#fff", marginBottom: "0.75rem" }}
              >
                Qui sommes-nous ?
              </h2>
              <p
                className="font-barlow text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Notre association, non adhérente à la fédération d'athlétisme,
                se compose de femmes et d'hommes qui se retrouvent suivant les
                objectifs de chacun afin de pratiquer la course à pied. Vous
                êtes tous les bienvenus, serez vite intégrés et progresserez
                avec le groupe.
              </p>
            </div>

            {/* Coordonnées */}
            <div
              style={{
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "1.75rem",
              }}
            >
              <h2
                className="font-bebas text-2xl"
                style={{ color: "#fff", marginBottom: "1.25rem" }}
              >
                Nous contacter
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[
                  {
                    href: "tel:0628783993",
                    icon: <Phone size={18} />,
                    label: "06 28 78 39 93",
                  },
                  {
                    href: "mailto:fouleessaintaubinoises@gmail.com",
                    icon: <Mail size={18} />,
                    label: "fouleessaintaubinoises@gmail.com",
                  },
                  {
                    href: "https://www.facebook.com/fouleessstaubinoises/?locale=fr_FR",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    ),
                    label: "Facebook",
                    external: true,
                  },
                  {
                    href: "https://www.instagram.com/foulees_saint_aubinoises/",
                    icon: (
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
                      >
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    ),
                    label: "Instagram",
                    external: true,
                  },
                ].map(({ href, icon, label, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.7")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "rgba(232,24,109,0.15)",
                        border: "1px solid rgba(232,24,109,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "#e8186d",
                      }}
                    >
                      {icon}
                    </div>
                    <span
                      className="font-barlow text-sm"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Rejoindre */}
            <div
              style={{
                background: "rgba(232,24,109,0.08)",
                border: "1px solid rgba(232,24,109,0.2)",
                borderRadius: "16px",
                padding: "1.75rem",
              }}
            >
              <h2
                className="font-bebas text-2xl"
                style={{ color: "#fff", marginBottom: "0.5rem" }}
              >
                Rejoindre le club
              </h2>
              <p
                className="font-barlow text-sm"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "1.25rem",
                }}
              >
                Adhésion en ligne via HelloAsso — simple et rapide.
              </p>
              <Link
                href="https://www.helloasso.com/associations/foulees-saint-aubinoises"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full transition-colors duration-200"
                style={{
                  background: "#e8186d",
                  color: "#fff",
                  padding: "0.6rem 1.5rem",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                }}
              >
                <span className="font-barlow-condensed uppercase tracking-widest text-sm">
                  S'inscrire sur HelloAsso
                </span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Bloc droite — Formulaire */}
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              padding: "1.75rem",
            }}
          >
            <h2
              className="font-bebas text-2xl"
              style={{ color: "#fff", marginBottom: "1.5rem" }}
            >
              Envoyer un message
            </h2>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {[
                {
                  label: "Nom",
                  name: "name",
                  type: "text",
                  placeholder: "Votre nom",
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  placeholder: "votre@email.com",
                },
              ].map((field) => (
                <div
                  key={field.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  <label
                    className="font-barlow-condensed uppercase text-xs tracking-widest"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      padding: "0.75rem 1rem",
                      color: "#fff",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <label
                  className="font-barlow-condensed uppercase text-xs tracking-widest"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Message
                </label>
                <textarea
                  name="body"
                  rows={6}
                  placeholder="Votre message..."
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    padding: "0.75rem 1rem",
                    color: "#fff",
                    fontSize: "0.9rem",
                    outline: "none",
                    resize: "none",
                  }}
                />
              </div>

              <button
                type="submit"
                className="font-barlow-condensed uppercase tracking-widest text-sm rounded-full transition-colors duration-200"
                style={{
                  background: "#e8186d",
                  color: "#fff",
                  padding: "0.75rem 1.5rem",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "0.5rem",
                }}
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
