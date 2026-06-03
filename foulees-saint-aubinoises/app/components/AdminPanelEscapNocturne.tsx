"use client";

import { Escapade, Escapade_Epreuves, Event } from "../types/database";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";

// ─── Types locaux ─────────────────────────────────────────────────────────────

type EscapadeWithEpreuves = Escapade & {
  epreuves: Escapade_Epreuves[];
  event?: Event;
};

// ─── Composant ────────────────────────────────────────────────────────────────

export function AdminPanelEscapNocturne() {
  // Liste des escapades
  const [escapades, setEscapades] = useState<EscapadeWithEpreuves[]>([]);
  // Events existants pour le select
  const [events, setEvents] = useState<Event[]>([]);
  // Escapade sélectionnée pour édition
  const [selected, setSelected] = useState<EscapadeWithEpreuves | null>(null);
  // Vue : "list" | "edit"
  const [vue, setVue] = useState<"list" | "edit">("list");

  // ── Formulaire escapade ──
  const [modeEvent, setModeEvent] = useState<"existant" | "nouveau">(
    "existant",
  );
  const [eventId, setEventId] = useState<string>("");
  const [nouveauEventNom, setNouveauEventNom] = useState("");
  const [nouveauEventDate, setNouveauEventDate] = useState("");
  const [edition, setEdition] = useState("");
  const [inscriptionsUrl, setInscriptionsUrl] = useState("");
  const [associationSolidarite, setAssociationSolidarite] = useState("");
  const [associationUrl, setAssociationUrl] = useState("");
  const [published, setPublished] = useState(false);

  // ── Formulaire épreuve ──
  const [showEpreuveForm, setShowEpreuveForm] = useState(false);
  const [epreuveId, setEpreuveId] = useState<string | null>(null);
  const [eTitre, setETitre] = useState("");
  const [eDistance, setEDistance] = useState("");
  const [eHeure, setEHeure] = useState("");
  const [eTarif, setETarif] = useState("");
  const [eComplet, setEComplet] = useState(false);

  // ─── Fetch ────────────────────────────────────────────────────────────────

  const fetchEscapades = async () => {
    const { data } = await supabase
      .from("escapade")
      .select("*, escapade_epreuves(*), events(*)");
    if (!data) return;
    const mapped = data.map((e: any) => ({
      ...e,
      epreuves: e.escapade_epreuves ?? [],
      event: e.events ?? undefined,
    }));
    setEscapades(mapped);
  };

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });
    setEvents(data ?? []);
  };

  useEffect(() => {
    fetchEscapades();
    fetchEvents();
  }, []);

  // ─── Navigation ───────────────────────────────────────────────────────────

  const ouvrirNouvelle = () => {
    setSelected(null);
    resetFormEscapade();
    setVue("edit");
  };

  const ouvrirEdition = (escapade: EscapadeWithEpreuves) => {
    setSelected(escapade);
    setModeEvent("existant");
    setEventId(escapade.event_id ?? "");
    setEdition(escapade.edition ?? "");
    setInscriptionsUrl(escapade.inscriptions_url ?? "");
    setAssociationSolidarite(escapade.association_solidarite ?? "");
    setAssociationUrl(escapade.association_url ?? "");
    setPublished(escapade.published ?? false);
    setVue("edit");
  };

  const retourListe = () => {
    setVue("list");
    setSelected(null);
    resetFormEscapade();
    fetchEscapades();
  };

  // ─── Reset formulaires ────────────────────────────────────────────────────

  const resetFormEscapade = () => {
    setModeEvent("existant");
    setEventId("");
    setNouveauEventNom("");
    setNouveauEventDate("");
    setEdition("");
    setInscriptionsUrl("");
    setAssociationSolidarite("");
    setAssociationUrl("");
    setPublished(false);
  };

  const resetFormEpreuve = () => {
    setEpreuveId(null);
    setETitre("");
    setEDistance("");
    setEHeure("");
    setETarif("");
    setEComplet(false);
    setShowEpreuveForm(false);
  };

  // ─── Submit escapade ──────────────────────────────────────────────────────

  const handleSubmitEscapade = async () => {
    let finalEventId = eventId;

    // Créer un nouvel event si besoin
    if (modeEvent === "nouveau") {
      if (!nouveauEventNom || !nouveauEventDate) return;
      const { data: newEvent } = await supabase
        .from("events")
        .insert({
          nom: nouveauEventNom,
          date: nouveauEventDate,
          type: "nocturne",
        })
        .select()
        .single();
      if (!newEvent) return;
      finalEventId = newEvent.id;
      await fetchEvents();
    }

    if (!finalEventId) return;

    const payload = {
      event_id: finalEventId,
      edition: edition || null,
      inscriptions_url: inscriptionsUrl || null,
      association_solidarite: associationSolidarite || null,
      association_url: associationUrl || null,
      published,
    };

    if (selected) {
      await supabase.from("escapade").update(payload).eq("id", selected.id);
    } else {
      await supabase.from("escapade").insert(payload);
    }

    retourListe();
  };

  // ─── Suppression escapade ─────────────────────────────────────────────────

  const supprimerEscapade = async (escapade: EscapadeWithEpreuves) => {
    const count = escapade.epreuves.length;
    const msg =
      count > 0
        ? `Supprimer cette escapade et ses ${count} épreuve${count > 1 ? "s" : ""} ?`
        : `Supprimer cette escapade ?`;
    if (!confirm(msg)) return;
    await supabase.from("escapade").delete().eq("id", escapade.id);
    await fetchEscapades();
  };

  // ─── Toggle published ─────────────────────────────────────────────────────

  const togglePublished = async (escapade: EscapadeWithEpreuves) => {
    await supabase
      .from("escapade")
      .update({ published: !escapade.published })
      .eq("id", escapade.id);
    await fetchEscapades();
  };

  // ─── Submit épreuve ───────────────────────────────────────────────────────

  const handleSubmitEpreuve = async () => {
    if (!eTitre || !selected) return;
    const payload = {
      escapade_id: selected.id,
      titre: eTitre,
      distance: eDistance || null,
      heure_depart: eHeure || null,
      tarif: eTarif || null,
      complet: eComplet,
    };
    if (epreuveId) {
      await supabase
        .from("escapade_epreuves")
        .update(payload)
        .eq("id", epreuveId);
    } else {
      await supabase.from("escapade_epreuves").insert(payload);
    }
    resetFormEpreuve();
    // Refresh épreuves de l'escapade sélectionnée
    const { data } = await supabase
      .from("escapade_epreuves")
      .select("*")
      .eq("escapade_id", selected.id);
    setSelected({ ...selected, epreuves: data ?? [] });
  };

  const editerEpreuve = (epreuve: Escapade_Epreuves) => {
    setEpreuveId(epreuve.id);
    setETitre(epreuve.titre ?? "");
    setEDistance(epreuve.distance ?? "");
    setEHeure(epreuve.heure_depart ?? "");
    setETarif(epreuve.tarif ?? "");
    setEComplet(epreuve.complet ?? false);
    setShowEpreuveForm(true);
  };

  const supprimerEpreuve = async (id: string) => {
    if (!confirm("Supprimer cette épreuve ?")) return;
    await supabase.from("escapade_epreuves").delete().eq("id", id);
    if (selected) {
      const { data } = await supabase
        .from("escapade_epreuves")
        .select("*")
        .eq("escapade_id", selected.id);
      setSelected({ ...selected, epreuves: data ?? [] });
    }
  };

  const toggleComplet = async (epreuve: Escapade_Epreuves) => {
    await supabase
      .from("escapade_epreuves")
      .update({ complet: !epreuve.complet })
      .eq("id", epreuve.id);
    if (selected) {
      const { data } = await supabase
        .from("escapade_epreuves")
        .select("*")
        .eq("escapade_id", selected.id);
      setSelected({ ...selected, epreuves: data ?? [] });
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          {vue === "edit" && (
            <button
              onClick={retourListe}
              className="text-fsa-gris-med hover:text-fsa-noir transition-colors font-barlow-condensed uppercase tracking-widest text-sm"
            >
              ← Retour
            </button>
          )}
          <h1 className="font-bebas text-4xl text-fsa-noir">
            {vue === "list"
              ? "Escapades Nocturnes"
              : selected
                ? `Modifier · ${selected.event?.nom ?? selected.edition}`
                : "Nouvelle Escapade"}
          </h1>
        </div>
        {vue === "list" && (
          <button
            onClick={ouvrirNouvelle}
            className="bg-fsa-rose text-white px-5 py-2 rounded-lg text-sm font-barlow-condensed uppercase tracking-wider hover:bg-fsa-rose/90 transition-colors"
          >
            + Nouvelle
          </button>
        )}
      </div>

      {/* ── VUE LISTE ────────────────────────────────────────────────────── */}
      {vue === "list" && (
        <div className="flex flex-col gap-4">
          {escapades.length === 0 && (
            <p className="text-fsa-gris-med font-barlow text-center py-12">
              Aucune escapade nocturne
            </p>
          )}
          {escapades.map((escapade) => (
            <div
              key={escapade.id}
              className="bg-white rounded-2xl px-6 py-4 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="font-barlow-condensed font-bold text-fsa-noir text-lg">
                  {escapade.event?.nom ?? "Sans événement"}
                </p>
                <p className="font-barlow text-sm text-fsa-gris-med">
                  {escapade.edition && `Édition ${escapade.edition} · `}
                  {escapade.epreuves.length} épreuve
                  {escapade.epreuves.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Toggle published */}
                <button
                  onClick={() => togglePublished(escapade)}
                  className={`font-barlow-condensed text-xs uppercase tracking-wider px-3 py-1 rounded-full transition-colors ${
                    escapade.published
                      ? "bg-green-100 text-green-700"
                      : "bg-fsa-gris-pale text-fsa-gris-med"
                  }`}
                >
                  {escapade.published ? "Publié" : "Brouillon"}
                </button>
                <button
                  onClick={() => ouvrirEdition(escapade)}
                  className="bg-fsa-noir text-white px-4 py-2 rounded-lg text-sm font-barlow-condensed uppercase tracking-wider hover:bg-fsa-noir/80 transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={() => supprimerEscapade(escapade)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-barlow-condensed uppercase tracking-wider hover:bg-red-600 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── VUE EDIT ─────────────────────────────────────────────────────── */}
      {vue === "edit" && (
        <div className="flex flex-col gap-8">
          {/* Formulaire escapade */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="font-bebas text-2xl text-fsa-noir mb-6">
              Informations générales
            </h2>
            <div className="flex flex-col gap-4">
              {/* Liaison event */}
              {!selected && (
                <div>
                  <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-2 block">
                    Événement associé
                  </label>
                  <div className="flex gap-3 mb-3">
                    <button
                      onClick={() => setModeEvent("existant")}
                      className={`px-4 py-2 rounded-lg text-sm font-barlow-condensed uppercase tracking-wider transition-colors ${
                        modeEvent === "existant"
                          ? "bg-fsa-rose text-white"
                          : "border border-fsa-gris-pale text-fsa-gris-med"
                      }`}
                    >
                      Event existant
                    </button>
                    <button
                      onClick={() => setModeEvent("nouveau")}
                      className={`px-4 py-2 rounded-lg text-sm font-barlow-condensed uppercase tracking-wider transition-colors ${
                        modeEvent === "nouveau"
                          ? "bg-fsa-rose text-white"
                          : "border border-fsa-gris-pale text-fsa-gris-med"
                      }`}
                    >
                      Créer un event
                    </button>
                  </div>

                  {modeEvent === "existant" ? (
                    <select
                      value={eventId}
                      onChange={(e) => setEventId(e.target.value)}
                      className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir focus:outline-none focus:border-fsa-rose transition-colors"
                    >
                      <option value="">Sélectionner un événement</option>
                      {events.map((event) => (
                        <option key={event.id} value={event.id}>
                          {event.nom} —{" "}
                          {new Date(event.date).toLocaleDateString("fr-FR")}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={nouveauEventNom}
                        onChange={(e) => setNouveauEventNom(e.target.value)}
                        placeholder="Nom de l'événement"
                        className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors"
                      />
                      <input
                        type="date"
                        value={nouveauEventDate}
                        onChange={(e) => setNouveauEventDate(e.target.value)}
                        className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir focus:outline-none focus:border-fsa-rose transition-colors"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Édition */}
              <div>
                <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
                  Édition
                </label>
                <input
                  type="text"
                  value={edition}
                  onChange={(e) => setEdition(e.target.value)}
                  placeholder="ex: 2026"
                  className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors"
                />
              </div>

              {/* Lien inscriptions */}
              <div>
                <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
                  Lien inscriptions (Klikego)
                </label>
                <input
                  type="text"
                  value={inscriptionsUrl}
                  onChange={(e) => setInscriptionsUrl(e.target.value)}
                  placeholder="https://www.klikego.com/..."
                  className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors"
                />
              </div>

              {/* Association solidarité */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
                    Association solidarité
                  </label>
                  <input
                    type="text"
                    value={associationSolidarite}
                    onChange={(e) => setAssociationSolidarite(e.target.value)}
                    placeholder="ex: SOS Préma"
                    className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors"
                  />
                </div>
                <div>
                  <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
                    Lien association
                  </label>
                  <input
                    type="text"
                    value={associationUrl}
                    onChange={(e) => setAssociationUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors"
                  />
                </div>
              </div>

              {/* Published */}
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 accent-fsa-rose"
                />
                <label
                  htmlFor="published"
                  className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med cursor-pointer"
                >
                  Publier sur le site
                </label>
              </div>

              <button
                onClick={handleSubmitEscapade}
                className="bg-fsa-rose text-white py-3 rounded-xl font-barlow-condensed uppercase tracking-widest text-sm hover:bg-fsa-rose/90 transition-colors mt-2"
              >
                {selected ? "Mettre à jour" : "Créer l'escapade"}
              </button>
            </div>
          </div>

          {/* Épreuves — uniquement si escapade existante */}
          {selected && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bebas text-2xl text-fsa-noir">Épreuves</h2>
                <button
                  onClick={() => {
                    resetFormEpreuve();
                    setShowEpreuveForm(true);
                  }}
                  className="bg-fsa-rose text-white px-4 py-2 rounded-lg text-sm font-barlow-condensed uppercase tracking-wider hover:bg-fsa-rose/90 transition-colors"
                >
                  + Ajouter
                </button>
              </div>

              {/* Liste épreuves */}
              <div className="flex flex-col gap-3 mb-6">
                {selected.epreuves.length === 0 && (
                  <p className="text-fsa-gris-med font-barlow text-sm">
                    Aucune épreuve
                  </p>
                )}
                {selected.epreuves.map((epreuve) => (
                  <div
                    key={epreuve.id}
                    className="flex items-center justify-between border border-fsa-gris-pale rounded-xl px-5 py-3"
                  >
                    <div>
                      <p className="font-barlow-condensed font-bold text-fsa-noir">
                        {epreuve.titre}
                      </p>
                      <p className="font-barlow text-sm text-fsa-gris-med">
                        {epreuve.distance && `${epreuve.distance} · `}
                        {epreuve.heure_depart &&
                          `Départ ${epreuve.heure_depart} · `}
                        {epreuve.tarif}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleComplet(epreuve)}
                        className={`font-barlow-condensed text-xs uppercase tracking-wider px-3 py-1 rounded-full transition-colors ${
                          epreuve.complet
                            ? "bg-fsa-gris-pale text-fsa-gris-med"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {epreuve.complet ? "Complet" : "Ouvert"}
                      </button>
                      <button
                        onClick={() => editerEpreuve(epreuve)}
                        className="bg-fsa-noir text-white px-3 py-1 rounded-lg text-xs font-barlow-condensed uppercase tracking-wider hover:bg-fsa-noir/80 transition-colors"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => supprimerEpreuve(epreuve.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-barlow-condensed uppercase tracking-wider hover:bg-red-600 transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Formulaire épreuve */}
              {showEpreuveForm && (
                <div className="border border-fsa-rose/30 rounded-xl p-6 bg-fsa-rose/5">
                  <h3 className="font-bebas text-xl text-fsa-noir mb-4">
                    {epreuveId ? "Modifier l'épreuve" : "Nouvelle épreuve"}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
                        Titre *
                      </label>
                      <input
                        type="text"
                        value={eTitre}
                        onChange={(e) => setETitre(e.target.value)}
                        placeholder="ex: L'Escapade"
                        className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
                        Distance
                      </label>
                      <input
                        type="text"
                        value={eDistance}
                        onChange={(e) => setEDistance(e.target.value)}
                        placeholder="ex: 12 km"
                        className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
                        Heure départ
                      </label>
                      <input
                        type="text"
                        value={eHeure}
                        onChange={(e) => setEHeure(e.target.value)}
                        placeholder="ex: 18h00"
                        className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mb-1 block">
                        Tarif
                      </label>
                      <input
                        type="text"
                        value={eTarif}
                        onChange={(e) => setETarif(e.target.value)}
                        placeholder="ex: Adultes / Gratuit"
                        className="w-full border border-fsa-gris-pale rounded-xl px-4 py-3 font-barlow text-fsa-noir placeholder:text-fsa-gris-med/50 focus:outline-none focus:border-fsa-rose transition-colors bg-white"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="complet"
                        checked={eComplet}
                        onChange={(e) => setEComplet(e.target.checked)}
                        className="w-4 h-4 accent-fsa-rose"
                      />
                      <label
                        htmlFor="complet"
                        className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med cursor-pointer"
                      >
                        Complet
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleSubmitEpreuve}
                      className="flex-1 bg-fsa-rose text-white py-3 rounded-xl font-barlow-condensed uppercase tracking-widest text-sm hover:bg-fsa-rose/90 transition-colors"
                    >
                      {epreuveId ? "Mettre à jour" : "Ajouter"}
                    </button>
                    <button
                      onClick={resetFormEpreuve}
                      className="px-6 border border-fsa-gris-pale text-fsa-gris-med py-3 rounded-xl font-barlow-condensed uppercase tracking-widest text-sm hover:border-fsa-noir transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
