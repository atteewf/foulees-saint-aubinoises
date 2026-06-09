import { Users, Medal, MapPin, DoorOpen } from "lucide-react";
import { StatCounter } from "../components/StatCounter";
import { FaRunning, FaDumbbell } from "react-icons/fa";

export default function LeClubPage() {
  const bureau = [
    { initials: "GT", name: "Ghislain T.", role: "Président" },
    { initials: "AT", name: "Anne T.", role: "Secrétaire" },
    { initials: "FL", name: "Florence L.", role: "Trésorière" },
  ];

  const valeurs = [
    {
      icon: <Users size={18} />,
      title: "Convivialité",
      desc: "Courir ensemble dans la bonne humeur, du débutant au confirmé.",
    },
    {
      icon: <Medal size={18} />,
      title: "Dépassement",
      desc: "Se dépasser à son rythme, sans compétition entre membres.",
    },
    {
      icon: <MapPin size={18} />,
      title: "Ancrage local",
      desc: "Fiers de représenter Saint-Aubin lors des courses bretonnes.",
    },
    {
      icon: <DoorOpen size={18} />,
      title: "Accessibilité",
      desc: "Ouvert à tous, sans prérequis, avec ou sans licence FFA.",
    },
  ];

  const seances = [
    {
      jour: "Mardi",
      heure: "18h30 – 19h30",
      type: "TABATA",
      desc: "Musculation adaptée à la course à pied, encadrée par Hugues ou Hervé.",
      coach: "Hugues ou Hervé",
      icon: <FaDumbbell size={18} />,
    },
    {
      jour: "Mercredi",
      heure: "18h30 – 19h30",
      type: "Fractionné",
      desc: "Séance de fractionné coachée par Hugues.",
      coach: "Hugues",
      icon: <FaRunning size={18} />,
    },
  ];

  const timeline = [
    {
      year: "1992",
      text: "Création de l'association le 7 décembre 1992 par un groupe de coureurs passionnés du village.",
    },
    {
      year: "2005",
      text: "Première édition des Foulées Saint-Aubinoises, course annuelle locale.",
    },
    {
      year: "2015",
      text: "Cap des 80 adhérents franchi. Développement des sorties trail.",
    },
    {
      year: "Aujourd'hui",
      text: "81 membres actifs pour la saison 2025/2026, avec des événements phares : la T3C et le Relais de Mélesse.",
    },
  ];

  return (
    <div style={{ width: "100%", background: "#0f0f0f", minHeight: "100vh" }}>
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
        {/* Hero */}
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            backgroundImage: "url('/foulees/hero_leclub.PNG')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginBottom: "2rem",
            position: "relative",
            height: "clamp(160px, 40vw, 280px)",
            border: "1px solid rgba(232,24,109,0.2)",
          }}
        >
          <img
            src="/foulees/logo_fsa_fond_blanc.png"
            alt="Coureurs FSA"
            style={{
              position: "absolute",
              bottom: 0,
              left: "51%",
              top: "42%",
              transform: "translateX(-50%)",
              height: "40%",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-2 md:gap-4"
          style={{ marginBottom: "1rem" }}
        >
          <StatCounter
            target={81}
            suffix=""
            duration={1500}
            delay={0}
            label="Adhérents"
          />
          <StatCounter
            target={1992}
            suffix=""
            duration={2500}
            delay={800}
            label="Fondation"
          />
          <StatCounter
            target={35}
            suffix=""
            duration={1200}
            delay={2400}
            label="Courses / an"
          />
        </div>
        <div
          style={{
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "34%" }}>
            <StatCounter
              target={100}
              suffix="%"
              suffixSmall="Bonne Humeur"
              duration={1800}
              delay={3500}
              label=""
            />
          </div>
        </div>

        {/* Card photo groupe + bureau */}
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            background: "#1a1a1a",
            border: "1px solid rgba(232,24,109,0.2)",
            marginBottom: "2rem",
          }}
        >
          <img
            src="/foulees/photo_groupe.png"
            alt="Groupe FSA"
            style={{
              width: "100%",
              height: "clamp(160px, 45vw, 380px)",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <div
            style={{
              padding: "1.5rem",
              textAlign: "center",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p
              className="font-bebas text-3xl"
              style={{ color: "#fff", marginBottom: "0.5rem" }}
            >
              Les Foulées{" "}
              <span style={{ color: "#e8186d" }}>Saint-Aubinoises</span>
            </p>
            <p
              className="font-barlow text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              La saison 2025/2026 a réuni plus de{" "}
              <strong style={{ color: "#fff" }}>81</strong> coureurs passionnés.
              Nos adhérents sont des runners de tous niveaux rassemblés autour
              d'une même passion : courir ensemble, se dépasser et représenter
              fièrement notre commune sur les routes et sentiers de Bretagne et
              d'ailleurs.
            </p>
          </div>
          <div style={{ padding: "1.5rem", textAlign: "center" }}>
            <p
              className="font-bebas text-xl"
              style={{ color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}
            >
              Le bureau se compose de :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
              {bureau.map((member) => (
                <div
                  key={member.initials}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(232,24,109,0.15)",
                      border: "1px solid rgba(232,24,109,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      className="font-barlow-condensed text-xs font-bold"
                      style={{ color: "#e8186d" }}
                    >
                      {member.initials}
                    </span>
                  </div>
                  <div>
                    <p
                      className="font-barlow text-sm font-medium"
                      style={{ color: "#fff" }}
                    >
                      {member.name}
                    </p>
                    <p
                      className="font-barlow text-xs"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section basse 3 colonnes */}
        <div
          className="w-full rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-12"
          style={{ background: "#1a1a1a", marginBottom: "3rem" }}
        >
          {/* Nos valeurs */}
          <div>
            <h2
              className="font-barlow-condensed uppercase text-sm tracking-widest font-bold"
              style={{ color: "#ffffff", marginBottom: "1.5rem" }}
            >
              Nos valeurs
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {valeurs.map((v) => (
                <div
                  key={v.title}
                  style={{
                    display: "flex",
                    gap: "0.875rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "rgba(232,24,109,0.15)",
                      border: "1px solid rgba(232,24,109,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "#e8186d",
                    }}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <p
                      className="font-barlow-condensed uppercase text-sm tracking-wider font-bold"
                      style={{ color: "#fff", marginBottom: "0.25rem" }}
                    >
                      {v.title}
                    </p>
                    <p
                      className="font-barlow text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nos rendez-vous */}
          <div>
            <h2
              className="font-barlow-condensed uppercase text-sm tracking-widest font-bold"
              style={{ color: "#ffffff", marginBottom: "1.5rem" }}
            >
              Nos rendez-vous
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {seances.map((s) => (
                <div
                  key={s.jour}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      background: "rgba(232,24,109,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "#e8186d",
                    }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.25rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <p
                        className="font-barlow-condensed uppercase text-sm font-bold"
                        style={{ color: "#fff" }}
                      >
                        {s.jour}
                      </p>
                      <span
                        style={{
                          color: "rgba(255,255,255,0.2)",
                          fontSize: "1rem",
                        }}
                      >
                        ●
                      </span>
                      <p
                        className="font-barlow-condensed text-sm"
                        style={{ color: "#e8186d" }}
                      >
                        {s.heure}
                      </p>
                    </div>
                    <p
                      className="font-barlow-condensed uppercase text-sm tracking-wider font-bold"
                      style={{ color: "#e8186d", marginBottom: "0.25rem" }}
                    >
                      {s.type}
                    </p>
                    <p
                      className="font-barlow text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {s.desc}
                    </p>
                    <p
                      className="font-barlow text-sm"
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        marginTop: "0.25rem",
                      }}
                    >
                      👤 {s.coach}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notre histoire */}
          <div>
            <h2
              className="font-barlow-condensed uppercase text-sm tracking-widest font-bold"
              style={{ color: "#ffffff", marginBottom: "1.5rem" }}
            >
              Notre histoire
            </h2>
            <div
              style={{
                borderLeft: "2px solid rgba(232,24,109,0.3)",
                paddingLeft: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {timeline.map((item) => (
                <div key={item.year} style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "-1.625rem",
                      top: "0.25rem",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "#e8186d",
                      border: "2px solid #1a1a1a",
                    }}
                  />
                  <p
                    className="font-barlow-condensed uppercase text-sm tracking-widest"
                    style={{ color: "#e8186d", marginBottom: "0.25rem" }}
                  >
                    {item.year}
                  </p>
                  <p
                    className="font-barlow text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
