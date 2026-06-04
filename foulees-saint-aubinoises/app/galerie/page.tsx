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
    <div
      style={{ maxWidth: "1024px", margin: "0 auto", padding: "3rem 1.5rem" }}
    >
      <h1 className="font-bebas text-4xl text-fsa-noir">Galerie</h1>
      <Suspense fallback={<div>Chargement...</div>}>
        <GalerieData />
      </Suspense>
    </div>
  );
}
