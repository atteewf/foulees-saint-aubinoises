import { supabase } from "@/app/lib/supabase";
import Image from "next/image";
import Link from "next/link";

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

  const { data: photos } = await supabase
    .from("photos")
    .select("*")
    .eq("event_id", id);

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 w-full">
      {/* Retour */}
      <Link
        href="/galerie"
        className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med hover:text-fsa-rose transition-colors duration-200 flex items-center gap-2 mb-8"
      >
        ← Retour à la galerie
      </Link>

      {/* Header */}
      {event && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            {event.type && (
              <span className="bg-fsa-rose text-white font-barlow-condensed uppercase text-xs tracking-widest px-3 py-1 rounded-full">
                {event.type}
              </span>
            )}
            <span className="font-barlow text-sm text-fsa-gris-med">
              {new Date(event.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            {event.lieu && (
              <>
                <span className="text-fsa-gris-med/40">•</span>
                <span className="font-barlow text-sm text-fsa-gris-med">
                  {event.lieu}
                </span>
              </>
            )}
          </div>
          <h1 className="font-bebas text-5xl text-fsa-noir">{event.nom}</h1>
          {event.description && (
            <p className="font-barlow text-fsa-gris mt-3 max-w-2xl">
              {event.description}
            </p>
          )}
          <p className="font-barlow text-fsa-gris-med text-sm mt-2">
            {photos?.length} photo{photos?.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}

      {/* Grille photos */}
      {photos && photos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <Image
                src={photo.url}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                alt={photo.nom}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="font-barlow text-fsa-gris-med">
          Aucune photo pour cet événement.
        </p>
      )}
    </main>
  );
}
