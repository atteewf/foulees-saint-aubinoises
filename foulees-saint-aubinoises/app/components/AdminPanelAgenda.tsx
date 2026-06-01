"use client";

import { Event } from "../types/database";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function AdminPanelAgenda() {
  const router = useRouter();
  const [agenda, setAgenda] = useState<Event[]>([]);
  const [agendaId, setAgendaId] = useState<string | null>(null);
  const [nom, setNom] = useState("");
  const [date, setDate] = useState("");
  const [lieu, setLieu] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  const fetchAgenda = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });
    setAgenda(data ?? []);
  };

  useEffect(() => {
    fetchAgenda();
  }, []);

  const resetFormAgenda = () => {
    setAgendaId(null);
    setNom("");
    setDate("");
    setLieu(null);
    setDescription(null);
    setType(null);
  };

  const handleEdit = (event: Event) => {
    setAgendaId(event.id);
    setNom(event.nom);
    setDate(event.date);
    setLieu(event.lieu);
    setDescription(event.description ?? "");
    setType(event.type ?? "");
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleDelete = async ({ id }: { id: string }) => {
    if (!confirm("Supprimer cet événement ?")) return;
    await supabase.from("events").delete().eq("id", id);
    await fetchAgenda();
  };

  const handleSubmit = async () => {
    if (!nom || !date) return;
    if (agendaId) {
      await supabase
        .from("events")
        .update({ nom, date, lieu, description, type })
        .eq("id", agendaId);
    } else {
      await supabase
        .from("events")
        .insert({ nom, date, lieu, description, type });
    }
    resetFormAgenda();
    await fetchAgenda();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bebas text-4xl text-fsa-noir">
          Gestion des événements
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm text-fsa-gris-med hover:text-red-500 transition-colors font-barlow-condensed uppercase tracking-widest"
        >
          Déconnexion
        </button>
      </div>

      {/* Liste des événements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {agenda.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="bg-fsa-rose p-6">
              <div className="font-bebas text-5xl text-white leading-none">
                {new Date(event.date).getDate()}
              </div>
              <div className="font-barlow-condensed text-white/75 uppercase tracking-widest text-sm">
                {new Date(event.date).toLocaleDateString("fr-FR", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-barlow-condensed font-bold text-lg text-fsa-noir mb-1">
                {event.nom}
              </h3>
              <p className="text-fsa-gris-med text-sm leading-relaxed">
                {event.description}
              </p>
            </div>
            <div className="px-6 pb-5 flex justify-between items-center">
              <span className="bg-fsa-rose text-white text-xs font-barlow-condensed uppercase tracking-wider px-3 py-1 rounded-full">
                {event.lieu}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="bg-fsa-noir text-white px-3 py-2 rounded-lg text-sm font-barlow-condensed uppercase tracking-wider hover:bg-fsa-noir/80 transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete({ id: event.id })}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-barlow-condensed uppercase tracking-wider hover:bg-red-600 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Formulaire ajout / modification */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="font-bebas text-2xl text-fsa-noir mb-6">
          {agendaId ? "Modifier l'événement" : "Ajouter un événement"}
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
              Nom
            </label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Nom de l'événement"
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
              value={lieu ?? ""}
              onChange={(e) => setLieu(e.target.value)}
              placeholder="Lieu"
              className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors"
            />
          </div>
          <div>
            <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
              Description
            </label>
            <textarea
              value={description ?? ""}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={3}
              className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors resize-none"
            />
          </div>
          <div>
            <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
              Type
            </label>
            <select
              value={type ?? ""}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir focus:outline-none focus:border-fsa-rose transition-colors"
            >
              <option value="">Sélectionner un type</option>
              <option value="trail">Trail</option>
              <option value="route">Route</option>
              <option value="cross">Cross</option>
            </select>
          </div>
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-fsa-rose text-white py-3 rounded-xl font-barlow-condensed uppercase tracking-widest text-sm hover:bg-fsa-rose/90 transition-colors"
            >
              {agendaId ? "Mettre à jour" : "Ajouter"}
            </button>
            {agendaId && (
              <button
                onClick={resetFormAgenda}
                className="px-6 border border-fsa-gris-pale text-fsa-gris-med py-3 rounded-xl font-barlow-condensed uppercase tracking-widest text-sm hover:border-fsa-noir transition-colors"
              >
                Annuler
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
