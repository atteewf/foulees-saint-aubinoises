import Link from "next/link";

export default function CourseNocturnePage() {
  return (
    <main className="w-full">
      {/* Hero */}
      <div className="relative bg-fsa-noir w-full px-6 py-24 text-center overflow-hidden">
        <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-[100px] border-fsa-rose opacity-5 pointer-events-none" />
        <div className="absolute left-[-80px] bottom-[-80px] w-[300px] h-[300px] rounded-full border-[60px] border-fsa-rose opacity-5 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block bg-fsa-rose/10 text-fsa-rose text-xs font-barlow-condensed uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Édition 2025 — Saint-Aubin-d'Aubigné
          </span>
          <h1 className="font-bebas text-6xl text-white tracking-wide mb-4">
            Les Escapades <span className="text-fsa-rose">Nocturnes</span>
          </h1>
          <div className="w-10 h-0.5 bg-fsa-rose mx-auto mb-5" />
          <p className="font-barlow text-white/50 text-base leading-relaxed mb-8">
            Samedi 15 novembre 2025 · Départ 18h00 · Saint-Aubin-d'Aubigné
          </p>
          <a
            href="https://www.klikego.com/inscription/les-escapades-nocturnes-saint-aubinoises-2025/running-course-a-pied/1422072323642-10"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-fsa-rose hover:bg-fsa-rose-dark text-white font-barlow-condensed uppercase tracking-widest text-sm px-8 py-3 rounded-full transition-colors duration-200"
          >
            S'inscrire sur Klikego →
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Épreuves */}
        <div className="mb-14">
          <span className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med block mb-4">
            Les épreuves
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                titre: "L'Escapade",
                distance: "12 km",
                heure: "18h00",
                tarif: "Adultes",
                complet: true,
              },
              {
                titre: "La Découverte",
                distance: "6 km",
                heure: "18h00",
                tarif: "Adultes",
                complet: true,
              },
              {
                titre: "Enfants 7-9 ans",
                distance: "1,1 km",
                heure: "16h30",
                tarif: "Gratuit",
                complet: false,
              },
              {
                titre: "Enfants 10-12 ans",
                distance: "2,2 km",
                heure: "16h30",
                tarif: "Gratuit",
                complet: false,
              },
            ].map((epreuve) => (
              <div
                key={epreuve.titre}
                className="border border-fsa-gris-pale rounded-xl p-5 relative"
              >
                {epreuve.complet && (
                  <span className="absolute top-3 right-3 bg-fsa-gris-pale text-fsa-gris-med font-barlow-condensed uppercase text-xs tracking-widest px-2 py-0.5 rounded-full">
                    Complet
                  </span>
                )}
                <p className="font-bebas text-2xl text-fsa-noir mb-1">
                  {epreuve.titre}
                </p>
                <p className="font-bebas text-4xl text-fsa-rose mb-3">
                  {epreuve.distance}
                </p>
                <div className="space-y-1">
                  <p className="font-barlow text-xs text-fsa-gris-med">
                    Départ : {epreuve.heure}
                  </p>
                  <p className="font-barlow text-xs text-fsa-gris-med">
                    {epreuve.tarif}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infos pratiques */}
        <div className="mb-14">
          <span className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med block mb-4">
            Infos pratiques
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                titre: "Parcours",
                desc: "70% chemins, 30% route. Possibilité de faire 6 km ou 12 km selon votre niveau.",
              },
              {
                titre: "Éclairage obligatoire",
                desc: "Un éclairage frontal ou ventral est obligatoire pour tous les adultes participants.",
              },
              {
                titre: "Inscriptions",
                desc: "Pas d'inscriptions sur place pour les adultes. Inscriptions enfants possibles sur place.",
              },
              {
                titre: "Licences",
                desc: "Licences FFA santé, encadrement, découverte et FFTRI non valides pour cette compétition.",
              },
            ].map((info) => (
              <div
                key={info.titre}
                className="border-l-2 border-fsa-rose pl-5 py-1"
              >
                <p className="font-barlow font-medium text-fsa-noir text-sm mb-1">
                  {info.titre}
                </p>
                <p className="font-barlow text-fsa-gris-med text-sm leading-relaxed">
                  {info.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Solidarité */}
        <div className="bg-fsa-rose/5 border border-fsa-rose/20 rounded-xl p-6 mb-14 flex gap-5 items-start">
          <div className="w-10 h-10 rounded-full bg-fsa-rose flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">💙</span>
          </div>
          <div>
            <p className="font-barlow font-medium text-fsa-noir text-sm mb-1">
              Un geste solidaire
            </p>
            <p className="font-barlow text-fsa-gris text-sm leading-relaxed">
              1€ par inscription est reversé à l'association{" "}
              <strong>SOS Préma</strong>, qui accompagne les jeunes parents tout
              au long des étapes de la prématurité et de l'hospitalisation d'un
              bébé.
            </p>
            <a
              href="https://www.sosprema.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-rose hover:text-fsa-rose-dark transition-colors duration-200 mt-2 inline-block"
            >
              En savoir plus sur SOS Préma →
            </a>
          </div>
        </div>

        {/* CTA bas de page */}
        <div className="text-center">
          <a
            href="https://www.klikego.com/inscription/les-escapades-nocturnes-saint-aubinoises-2025/running-course-a-pied/1422072323642-10"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-fsa-rose hover:bg-fsa-rose-dark text-white font-barlow-condensed uppercase tracking-widest text-sm px-8 py-3 rounded-full transition-colors duration-200"
          >
            S'inscrire sur Klikego →
          </a>
          <p className="font-barlow text-fsa-gris-med text-xs mt-3">
            Inscriptions gérées par Klikego — plateforme sécurisée
          </p>
        </div>
      </div>
    </main>
  );
}
