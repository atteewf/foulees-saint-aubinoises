"use client";

import { Event } from "../types/database";
import Link from "next/link";
import Image from "next/image";

export function Galerie({ events }: { events: Event[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {events?.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-2xl overflow-hidden border border-fsa-gris-pale hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          {/* Miniature */}
          <div className="relative h-48 w-full overflow-hidden">
            {event.photos[0]?.url ? (
              <Image
                src={event.photos[0].url}
                fill
                className="object-cover"
                alt={event.nom}
              />
            ) : (
              <div className="bg-fsa-gris-pale h-full flex items-center justify-center">
                <span className="font-bebas text-5xl text-fsa-gris-med/30">
                  FSA
                </span>
              </div>
            )}
            {/* Badge type */}
            {event.type && (
              <span className="absolute top-3 left-3 bg-fsa-rose text-white font-barlow-condensed uppercase text-xs tracking-widest px-3 py-1 rounded-full">
                {event.type}
              </span>
            )}
          </div>

          {/* Bandeau rose bas */}
          <div className="bg-fsa-rose px-5 py-4 flex justify-between items-center">
            <div>
              <p className="font-bebas text-xl text-white leading-none">
                {event.nom}
              </p>
              <p className="font-barlow-condensed text-white/70 text-xs uppercase tracking-widest mt-0.5">
                {new Date(event.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                {event.lieu && ` • ${event.lieu}`}
              </p>
            </div>
            <Link
              href={`/galerie/${event.id}`}
              className="text-white font-bebas text-2xl hover:scale-110 transition-transform duration-200"
            >
              →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
