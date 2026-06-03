"use client";

import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Event } from "../types/database";
import { Photos } from "../types/database";

type EventWithCount = Event & { photoCount?: number };
// ─── Composant principal ─────────────────────────────────────────────────────

export function AdminPanelGalerie() {
  const router = useRouter();

  // Vue active : "events" = liste des events | "photos" = photos d'un event
  const [vue, setVue] = useState<"events" | "photos">("events");

  // Events
  const [events, setEvents] = useState<EventWithCount[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventWithCount | null>(
    null,
  );

  // Photos
  const [photos, setPhotos] = useState<Photos[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Formulaire ajout photo
  const [showForm, setShowForm] = useState(false);
  const [url, setUrl] = useState("");
  const [nom, setNom] = useState("");
  const [date, setDate] = useState("");
  const [lieu, setLieu] = useState("");
  const [categorie, setCategorie] = useState("");

  // ─── Fetch events avec count photos ──────────────────────────────────────

  const fetchEvents = async () => {
    const { data: eventsData } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });

    if (!eventsData) return;

    // Pour chaque event, compter les photos liées
    const eventsWithCount = await Promise.all(
      eventsData.map(async (event) => {
        const { count } = await supabase
          .from("photos")
          .select("*", { count: "exact", head: true })
          .eq("event_id", event.id);
        return { ...event, photoCount: count ?? 0 };
      }),
    );

    setEvents(eventsWithCount);
  };

  // ─── Fetch photos d'un event ──────────────────────────────────────────────

  const fetchPhotos = async (eventId: string) => {
    const { data } = await supabase
      .from("photos")
      .select("*")
      .eq("event_id", eventId)
      .order("date", { ascending: false });
    setPhotos(data ?? []);
    setSelectedIds(new Set());
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ─── Navigation ──────────────────────────────────────────────────────────

  const ouvrirEvent = (event: EventWithCount) => {
    setSelectedEvent(event);
    fetchPhotos(event.id);
    setVue("photos");
    setShowForm(false);
  };

  const retourEvents = () => {
    setVue("events");
    setSelectedEvent(null);
    setPhotos([]);
    setSelectedIds(new Set());
    fetchEvents();
  };

  // ─── Sélection photos ────────────────────────────────────────────────────

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toutSelectionner = () => {
    if (selectedIds.size === photos.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(photos.map((p) => p.id)));
    }
  };

  // ─── Suppression photos sélectionnées ────────────────────────────────────

  const supprimerSelection = async () => {
    if (selectedIds.size === 0) return;
    if (
      !confirm(
        `Supprimer ${selectedIds.size} photo${selectedIds.size > 1 ? "s" : ""} ?`,
      )
    )
      return;

    await supabase.from("photos").delete().in("id", Array.from(selectedIds));

    if (selectedEvent) await fetchPhotos(selectedEvent.id);
    await fetchEvents();
  };

  // ─── Suppression event (avec confirmation si photos) ─────────────────────

  const supprimerEvent = async (event: EventWithCount) => {
    const count = event.photoCount ?? 0;

    if (count > 0) {
      const ok = confirm(
        `Cet événement contient ${count} photo${count > 1 ? "s" : ""}.\nSupprimer l'événement ET toutes ses photos ?`,
      );
      if (!ok) return;
      // Supprimer les photos liées d'abord
      await supabase.from("photos").delete().eq("event_id", event.id);
    } else {
      if (!confirm(`Supprimer l'événement "${event.nom}" ?`)) return;
    }

    await supabase.from("events").delete().eq("id", event.id);
    await fetchEvents();
  };

  // ─── Ajout photo ─────────────────────────────────────────────────────────

  const resetForm = () => {
    setUrl("");
    setNom("");
    setDate("");
    setLieu("");
    setCategorie("");
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!url || !selectedEvent) return;
    await supabase.from("photos").insert({
      url,
      nom: nom || null,
      date: date || null,
      lieu: lieu || null,
      categorie: categorie || null,
      event_id: selectedEvent.id,
    });
    resetForm();
    await fetchPhotos(selectedEvent.id);
    await fetchEvents();
  };

  // ─── Logout ──────────────────────────────────────────────────────────────

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          {vue === "photos" && (
            <button
              onClick={retourEvents}
              className="text-fsa-gris-med hover:text-fsa-noir transition-colors font-barlow-condensed uppercase tracking-widest text-sm"
            >
              ← Retour
            </button>
          )}
          <h1 className="font-bebas text-4xl text-fsa-noir">
            {vue === "events"
              ? "Galerie — Événements"
              : `Photos · ${selectedEvent?.nom}`}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-fsa-gris-med hover:text-red-500 transition-colors font-barlow-condensed uppercase tracking-widest"
        >
          Déconnexion
        </button>
      </div>

      {/* ── VUE EVENTS ────────────────────────────────────────────────────── */}
      {vue === "events" && (
        <div className="flex flex-col gap-3">
          {events.length === 0 && (
            <p className="text-fsa-gris-med font-barlow text-center py-12">
              Aucun événement
            </p>
          )}
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl px-6 py-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
            >
              {/* Infos event */}
              <div className="flex items-center gap-4">
                <div className="bg-fsa-rose/10 rounded-xl px-4 py-2 text-center min-w-[60px]">
                  <div className="font-bebas text-2xl text-fsa-rose leading-none">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="font-barlow-condensed text-xs text-fsa-rose/70 uppercase tracking-wider">
                    {new Date(event.date).toLocaleDateString("fr-FR", {
                      month: "short",
                      year: "2-digit",
                    })}
                  </div>
                </div>
                <div>
                  <p className="font-barlow-condensed font-bold text-fsa-noir text-lg leading-tight">
                    {event.nom}
                  </p>
                  <p className="font-barlow text-sm text-fsa-gris-med">
                    {event.lieu ?? "Lieu non précisé"}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {/* Badge photos */}
                <span
                  className={`font-barlow-condensed text-xs uppercase tracking-wider px-3 py-1 rounded-full ${
                    (event.photoCount ?? 0) > 0
                      ? "bg-fsa-rose text-white"
                      : "bg-fsa-gris-pale text-fsa-gris-med"
                  }`}
                >
                  {event.photoCount ?? 0} photo
                  {(event.photoCount ?? 0) !== 1 ? "s" : ""}
                </span>

                <button
                  onClick={() => ouvrirEvent(event)}
                  className="bg-fsa-noir text-white px-4 py-2 rounded-lg text-sm font-barlow-condensed uppercase tracking-wider hover:bg-fsa-noir/80 transition-colors"
                >
                  Gérer
                </button>

                <button
                  onClick={() => supprimerEvent(event)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-barlow-condensed uppercase tracking-wider hover:bg-red-600 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── VUE PHOTOS ────────────────────────────────────────────────────── */}
      {vue === "photos" && (
        <div>
          {/* Barre d'actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={toutSelectionner}
                className="border border-fsa-gris-pale text-fsa-gris-med px-4 py-2 rounded-lg text-sm font-barlow-condensed uppercase tracking-wider hover:border-fsa-noir transition-colors"
              >
                {selectedIds.size === photos.length && photos.length > 0
                  ? "Tout désélectionner"
                  : "Tout sélectionner"}
              </button>

              {selectedIds.size > 0 && (
                <button
                  onClick={supprimerSelection}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-barlow-condensed uppercase tracking-wider hover:bg-red-600 transition-colors"
                >
                  Supprimer ({selectedIds.size})
                </button>
              )}
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-fsa-rose text-white px-5 py-2 rounded-lg text-sm font-barlow-condensed uppercase tracking-wider hover:bg-fsa-rose/90 transition-colors"
            >
              {showForm ? "Annuler" : "+ Ajouter une photo"}
            </button>
          </div>

          {/* Formulaire ajout */}
          {showForm && (
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
              <h2 className="font-bebas text-xl text-fsa-noir mb-4">
                Ajouter une photo
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
                    URL de la photo *
                  </label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://res.cloudinary.com/..."
                    className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Nom de la photo"
                      className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir focus:outline-none focus:border-fsa-rose transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
                      Lieu
                    </label>
                    <input
                      type="text"
                      value={lieu}
                      onChange={(e) => setLieu(e.target.value)}
                      placeholder="Lieu"
                      className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
                      Catégorie
                    </label>
                    <select
                      value={categorie}
                      onChange={(e) => setCategorie(e.target.value)}
                      className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir focus:outline-none focus:border-fsa-rose transition-colors"
                    >
                      <option value="">Sélectionner</option>
                      <option value="trail">Trail</option>
                      <option value="route">Route</option>
                      <option value="cross">Cross</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className="bg-fsa-rose text-white py-3 rounded-xl font-barlow-condensed uppercase tracking-widest text-sm hover:bg-fsa-rose/90 transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </div>
          )}

          {/* Grille photos */}
          {photos.length === 0 ? (
            <p className="text-fsa-gris-med font-barlow text-center py-12">
              Aucune photo pour cet événement
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => toggleSelect(photo.id)}
                  className={`relative rounded-xl overflow-hidden aspect-square cursor-pointer transition-all duration-200 ${
                    selectedIds.has(photo.id)
                      ? "ring-4 ring-fsa-rose scale-95"
                      : "hover:scale-[1.02]"
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.nom ?? "photo"}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay sélection */}
                  {selectedIds.has(photo.id) && (
                    <div className="absolute inset-0 bg-fsa-rose/30 flex items-center justify-center">
                      <div className="bg-fsa-rose rounded-full w-8 h-8 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">✓</span>
                      </div>
                    </div>
                  )}
                  {/* Nom au survol */}
                  {photo.nom && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-barlow-condensed truncate">
                        {photo.nom}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
