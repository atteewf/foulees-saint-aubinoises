"use client";

import { Event } from "../types/database";
import Link from "next/link";

export function EventList({ events }: { events: Event[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {events?.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          <div className="bg-fsa-rose p-6">
            <div className="font-bebas text-5xl text-white leading-none">
              {new Date(event.date).getDate()}
            </div>
            <div className="font-barlow-condensed text-white/75 uppercase tracking-widest text-sm">
              {new Date(event.date).toLocaleDateString("fr-FR", {
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-barlow-condensed font-bold text-lg text-fsa-noir mb-2">
              {event.nom}
            </h3>
            <p className="text-fsa-gris-med text-sm leading-relaxed">
              {event.description}
            </p>
          </div>
          <div className="px-6 pb-5 flex justify-between items-center">
            <span className="bg-fsa-rose text-white text-xs font-barlow-condensed uppercase tracking-wider px-3 py-1 rounded-full">
              {event.lieu}
            </span>
            <Link
              href={`/agenda/${event.id}`}
              className="text-fsa-rose font-bold text-lg"
            >
              →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
