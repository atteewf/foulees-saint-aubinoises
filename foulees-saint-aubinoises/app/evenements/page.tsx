import { Suspense } from "react";
import { supabase } from "../lib/supabase";

async function EventsData() {
  const { data: events } = await supabase.from("events").select();
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
            <span className="text-fsa-rose font-bold text-lg">→</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EvenementsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div>Evenements</div>
      <Suspense fallback={<div>Loading events...</div>}>
        <EventsData />
        <EventsData />
        <EventsData />
        <EventsData />
        <EventsData />
        <EventsData />
        <EventsData />
      </Suspense>
    </div>
  );
}
