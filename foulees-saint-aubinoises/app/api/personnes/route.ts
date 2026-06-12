import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  const { nom, prenom } = await req.json();

  // Cherche si la personne existe
  const { data: existing } = await supabaseAdmin
    .from("personnes")
    .select("id, nom, prenom")
    .eq("nom", nom)
    .eq("prenom", prenom)
    .maybeSingle();

  if (existing) return NextResponse.json(existing);

  // Crée la personne
  const { data: created, error } = await supabaseAdmin
    .from("personnes")
    .insert({ nom, prenom })
    .select("id, nom, prenom")
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(created);
}
