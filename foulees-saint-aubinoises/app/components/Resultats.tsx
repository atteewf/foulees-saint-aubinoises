import { Resultats } from "../types/database";

export function ResultatsList({ resultats }: { resultats: Resultats[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {resultats?.map((result) => (
        <div
          key={result.id}
          className="bg-white rounded-2xl overflow-hidden border border-fsa-gris-pale hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          <div className="bg-fsa-rose px-5 py-4 flex justify-between items-center">
            <div>
              <p className="font-bebas text-xl text-white leading-none">
                {result.coureur}
              </p>
              <p className="font-bebas text-lg text-white/80 leading-none">
                {result.course}
              </p>
              <p className="font-barlow-condensed text-white/70 text-xs uppercase tracking-widest mt-0.5">
                {new Date(result.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                {` • ${result.distance} • ${result.classement} • ${result.temps}`}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
