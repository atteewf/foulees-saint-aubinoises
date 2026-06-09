"use client";
export default function EscapadeCourse() {
  const epreuves = [
    {
      titre: "L'Escapade",
      distance: "12 km",
      heure: "18h00",
      tarif: "10€ · Adultes",
    },
    {
      titre: "La Découverte",
      distance: "6 km",
      heure: "18h00",
      tarif: "8€ · Adultes",
    },
    {
      titre: "Enfants 7-9 ans",
      distance: "1,1 km",
      heure: "16h30",
      tarif: "Gratuit",
    },
    {
      titre: "Enfants 10-12 ans",
      distance: "2,2 km",
      heure: "16h30",
      tarif: "Gratuit",
    },
  ];

  const badges = [
    "Format 6 & 12 km",
    "Départ 18h",
    "Courses enfants",
    "1€ reversé SOS Préma*",
  ];

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* HERO — titre + affiche alignés en haut */}
      <section className="grid lg:grid-cols-2 gap-10 items-start mb-10">
        {/* Texte */}
        <div>
          <p className="font-barlow-condensed uppercase text-fsa-rose tracking-[0.2em] text-sm mb-2">
            Course Nocturne · FSA
          </p>
          <h1
            className="font-bebas leading-[0.9]"
            style={{ color: "#fff", fontSize: "clamp(3.5rem, 9vw, 7rem)" }}
          >
            LES
            <br />
            <span style={{ color: "#e8186d" }}>ESCAPADES</span>
            <br />
            NOCTURNES 2026
          </h1>
        </div>

        {/* Affiche alignée en haut */}
        <div className="flex justify-center lg:justify-end">
          <div
            style={{ position: "relative", width: "100%", maxWidth: "380px" }}
          >
            <div
              style={{
                position: "absolute",
                inset: "-20px",
                background:
                  "radial-gradient(circle, rgba(232,24,109,0.25), transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <img
              src="/foulees/escapades.jpg"
              alt="Affiche Escapades Nocturnes"
              style={{
                width: "100%",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.1)",
                position: "relative",
                zIndex: 1,
                boxShadow: "0 20px 80px rgba(0,0,0,0.45)",
                filter: "brightness(0.45)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotate(-12deg)",
              }}
            >
              <p
                className="font-bebas"
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 3rem)",
                  color: "#e8186d",
                  border: "3px solid #e8186d",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "8px",
                  textAlign: "center",
                  lineHeight: 1.2,
                  textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                }}
              >
                À venir
                <br />
                prochainement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BADGES */}
      <section
        className="mb-6"
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          {badges.map((item) => (
            <div
              key={item}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p
                className="font-barlow-condensed uppercase"
                style={{
                  color: "#fff",
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="mb-8">
        <p
          className="font-barlow text-xl leading-relaxed"
          style={{
            color: "rgba(255,255,255,0.6)",
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          Une course nature nocturne unique entre chemins, ambiance conviviale
          et esprit trail. Deux formats adultes et plusieurs courses enfants
          pour petits et grands.
        </p>
      </section>

      {/* CTA centré */}
      <section className="mb-12 flex justify-center">
        <a
          href="https://www.klikego.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full px-8 py-4 transition-all duration-300 hover:scale-105"
          style={{
            background: "#e8186d",
            color: "#fff",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          <span
            className="font-barlow-condensed uppercase tracking-[0.2em] text-xl"
            style={{
              fontSize: "1rem",
              letterSpacing: "0.12em",
              fontWeight: "700",
              color: "white",

              padding: "0.3rem 0.9rem",
              borderRadius: "999px",
            }}
          >
            S'inscrire (Prochainement)
          </span>
        </a>
      </section>

      {/* ÉPREUVES */}
      <section className="mb-12">
        <h2
          className="font-barlow-condensed uppercase text-xl tracking-widest font-bold mb-6"
          style={{ color: "#fff", marginTop: "1rem", marginBottom: "2rem" }}
        >
          Les épreuves
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {epreuves.map((epreuve) => (
            <EpreuveCard key={epreuve.titre} epreuve={epreuve} />
          ))}
        </div>
      </section>

      {/* SOS PRÉMA */}
      <section
        style={{
          background: "rgba(232,24,109,0.06)",
          border: "1px solid rgba(232,24,109,0.2)",
          borderRadius: "16px",
          padding: "1.5rem",
          marginBottom: "2rem",
          marginTop: "2rem ",
        }}
      >
        <p
          className="font-barlow-condensed uppercase text-xs tracking-widest font-bold mb-2"
          style={{ color: "#e8186d" }}
        >
          * SOS Préma
        </p>
        <p
          className="font-barlow text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          1€ par dossard est reversé à{" "}
          <a
            href="https://www.sosprema.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#e8186d", textDecoration: "underline" }}
          >
            SOS Préma
          </a>
          , association de soutien aux familles et aux enfants nés
          prématurément. Un geste solidaire à chaque foulée.
        </p>
      </section>
    </div>
  );
}

function EpreuveCard({
  epreuve,
}: {
  epreuve: { titre: string; distance: string; heure: string; tarif: string };
}) {
  return (
    <div
      className="relative overflow-hidden group"
      style={{
        borderRadius: "16px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "1.25rem",
        transition: "all 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background =
          "rgba(232,24,109,0.08)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(232,24,109,0.4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background =
          "rgba(255,255,255,0.03)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(255,255,255,0.08)";
      }}
    >
      {/* Badge À venir */}
      <div
        style={{
          position: "absolute",
          top: "0.75rem",
          right: "0.75rem",
          background: "rgba(232,24,109,0.15)",
          border: "1px solid rgba(232,24,109,0.3)",
          color: "#e8186d",
          padding: "0.2rem 0.5rem",
          borderRadius: "999px",
          fontSize: "0.6rem",
        }}
      >
        À venir
      </div>

      <p
        className="font-bebas"
        style={{ color: "#e8186d", fontSize: "2rem", lineHeight: 1 }}
      >
        {epreuve.distance}
      </p>
      <p
        className="font-barlow-condensed font-bold text-sm mt-1"
        style={{ color: "#fff" }}
      >
        {epreuve.titre}
      </p>
      <div
        className="mt-3"
        style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem" }}
      >
        <p>Départ : {epreuve.heure}</p>
        <p>{epreuve.tarif}</p>
      </div>
    </div>
  );
}
