import { Users, Medal, MapPin, DoorOpen } from "lucide-react";
import { StatCounter } from "../components/StatCounter";

export default function LeClubPage() {
  const bureau = [
    { initials: "PL", name: "Pierre L.", role: "Président" },
    { initials: "ML", name: "Marie L.", role: "Secrétaire" },
    { initials: "JD", name: "Jean D.", role: "Trésorier" },
    { initials: "SB", name: "Sophie B.", role: "Resp. communication" },
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

  const timeline = [
    {
      year: "1998",
      text: "Création de l'association par un groupe de coureurs passionnés du village.",
    },
    {
      year: "2005",
      text: "Première édition des Foulées Saint-Aubinoises, course annuelle locale.",
    },
    {
      year: "2015",
      text: "Cap des 100 adhérents franchi. Développement des sorties trail.",
    },
    {
      year: "Aujourd'hui",
      text: "Plus de 120 membres actifs et des dizaines de participations collectives chaque année.",
    },
  ];

  return (
    <div style={{ width: "100%", background: "#0f0f0f", minHeight: "100vh" }}>
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
      {/* Semelle fond */}
      {/* Semelle fond */}
      <img
        src="/foulees/tong.svg"
        alt=""
        style={{
          position: "fixed",
          right: "-10%", // déborde légèrement à droite
          bottom: "0",
          height: "90vh",
          opacity: 0.6, // très discret
          filter:
            "invert(27%) sepia(90%) saturate(2000%) hue-rotate(310deg) brightness(90%)",
          pointerEvents: "none",
          zIndex: 0, // derrière le contenu
        }}
      />
      <div
        style={{ maxWidth: "1024px", margin: "0 auto", padding: "3rem 1.5rem" }}
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
            height: "280px",
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

        {/* Stats 3 + 1 */}
        <div
          className="grid grid-cols-3 gap-4"
          style={{ marginBottom: "1rem" }}
        >
          <StatCounter
            target={120}
            suffix="+"
            duration={1500}
            delay={0}
            label="Adhérents"
          />
          <StatCounter
            target={1998}
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
              height: "380px",
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
          <div
            style={{
              padding: "2rem",
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
              className="font-barlow text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              La saison 2025/2026 a réuni plus de 120 coureurs passionnés, de
              tous niveaux, autour d'une même passion : courir ensemble sur les
              routes et sentiers de Bretagne.
            </p>
          </div>
          <div
            style={{
              padding: "2rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
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

        {/* Section basse 3 colonnes */}
        <div
          className="w-full rounded-2xl"
          style={{
            background: "#1a1a1a",
            padding: "3rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "3rem",
          }}
        >
          {/* Colonne 1 — Présentation */}
          <div>
            <h2
              className="font-barlow-condensed uppercase text-xs tracking-widest font-bold"
              style={{ color: "#ffffff", marginBottom: "1.5rem" }}
            >
              Présentation
            </h2>
            <div
              style={{
                borderLeft: "2px solid #e8186d",
                paddingLeft: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <p
                className="font-barlow text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Créée à Saint-Aubin-d'Aubigné en 1998, notre association réunit
                des passionnés de course à pied, de tous âges et de tous
                niveaux.
              </p>
              <p
                className="font-barlow text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Notre objectif : partager{" "}
                <strong style={{ color: "#fff" }}>
                  le plaisir de courir ensemble
                </strong>
                , se dépasser et représenter fièrement notre commune sur les
                routes et sentiers de Bretagne.
              </p>
            </div>
          </div>

          {/* Colonne 2 — Nos valeurs */}
          <div>
            <h2
              className="font-barlow-condensed uppercase text-xs tracking-widest font-bold"
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
                      className="font-barlow-condensed uppercase text-xs tracking-wider font-bold"
                      style={{ color: "#fff", marginBottom: "0.25rem" }}
                    >
                      {v.title}
                    </p>
                    <p
                      className="font-barlow text-xs leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne 3 — Notre histoire */}
          <div>
            <h2
              className="font-barlow-condensed uppercase text-xs tracking-widest font-bold"
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
                    className="font-barlow-condensed uppercase text-xs tracking-widest"
                    style={{ color: "#e8186d", marginBottom: "0.25rem" }}
                  >
                    {item.year}
                  </p>
                  <p
                    className="font-barlow text-xs leading-relaxed"
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
