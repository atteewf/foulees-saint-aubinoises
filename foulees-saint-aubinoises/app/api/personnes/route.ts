import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);
export async function POST(req: Request) {
  const { nom, prenom } = await req.json();
  console.log("API personnes appelée avec:", { nom, prenom });

  const { data: existing, error: errSelect } = await supabaseAdmin
    .from("personnes")
    .select("id, nom, prenom")
    .eq("nom", nom)
    .eq("prenom", prenom)
    .maybeSingle();

  console.log("existing:", existing, "errSelect:", errSelect);

  if (existing) return NextResponse.json(existing);

  const { data: created, error } = await supabaseAdmin
    .from("personnes")
    .insert({ nom, prenom })
    .select("id, nom, prenom")
    .single();

  console.log("created:", created, "error:", error);

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(created);
}
