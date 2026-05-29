import { Suspense } from "react";
import { supabase } from "../lib/supabase";
import { Galerie } from "../components/Galerie";

async function GalerieData() {
  const { data: events } = await supabase.from("events").select(`
      *,
      photos (
        url
      )
    `);
  return <Galerie events={events ?? []} />;
}

export default function GaleriePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full py-12">
      <h1 className="font-bebas text-4xl text-fsa-noir">Galerie</h1>
      <Suspense fallback={<div>Chargement...</div>}>
        <GalerieData />
      </Suspense>
    </div>
  );
}
