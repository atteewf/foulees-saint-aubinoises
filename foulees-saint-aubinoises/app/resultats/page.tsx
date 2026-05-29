import { Suspense } from "react";
import { supabase } from "../lib/supabase";
import { ResultatsList } from "../components/Resultats";
async function ResultsData() {
  const { data: resultats, error } = await supabase
    .from("resultats")
    .select("*");
  console.log("resultats:", resultats);
  console.log("error:", error);
  return <ResultatsList resultats={resultats ?? []} />;
}

export default function ResultatPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full py-12">
      <h1 className="font-bebas text-4xl text-fsa-noir">Resultats</h1>
      <Suspense fallback={<div>Chargement...</div>}>
        <ResultsData />
      </Suspense>
    </div>
  );
}
