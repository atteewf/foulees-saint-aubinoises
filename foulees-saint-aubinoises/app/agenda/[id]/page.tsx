import { supabase } from "@/app/lib/supabase";
import { use } from "react";
export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <div>
      <h1>{event?.nom}</h1>
      <p>{event?.description}</p>
    </div>
  );
}
