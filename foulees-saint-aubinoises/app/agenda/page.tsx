import { Suspense } from "react";
import { supabase } from "../lib/supabase";
import { EventList } from "../components/EventList";

async function EventsData() {
  const { data: events } = await supabase.from("events").select();
  return <EventList events={events ?? []} />;
}

export default function EvenementsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full py-12">
      <h1 className="font-bebas text-4xl text-fsa-noir">Événements</h1>
      <Suspense fallback={<div>Chargement...</div>}>
        <EventsData />
      </Suspense>
    </div>
  );
}
