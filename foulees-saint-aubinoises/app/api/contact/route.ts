import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  await resend.emails.send({
    from: "FSA Contact <onboarding@resend.dev>",
    to: "fouleessaintaubinoises@gmail.com",
    subject: `Message de ${name}`,
    html: `<p><strong>De :</strong> ${name} (${email})</p><p>${message}</p>`,
  });

  return NextResponse.json({ success: true });
}
