"use client";

import { Escapade, Escapade_Epreuves, Event } from "../types/database";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import { PageHeader } from "./PageHeader";

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
    <div
      style={{
        width: "100%",
        background: "#0f0f0f",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1024px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
        }}
      >
        <PageHeader
          label="FSA · Administration"
          title="Escapades Nocturnes"
          subtitle="Gérer les éditions et épreuves"
        />

        {/* Header actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {vue === "edit" && (
              <button
                onClick={retourListe}
                className="font-barlow-condensed uppercase tracking-widest text-xs"
                style={{
                  color: "rgba(255,255,255,0.3)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ← Retour
              </button>
            )}
          </div>
          {vue === "list" && (
            <button
              onClick={ouvrirNouvelle}
              className="font-barlow-condensed uppercase tracking-widest text-xs"
              style={{
                background: "#e8186d",
                color: "#fff",
                border: "none",
                borderRadius: "999px",
                padding: "0.5rem 1.25rem",
                cursor: "pointer",
              }}
            >
              + Nouvelle
            </button>
          )}
        </div>

        {/* ── VUE LISTE ── */}
        {vue === "list" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {escapades.length === 0 && (
              <p
                className="font-barlow text-center"
                style={{ color: "rgba(255,255,255,0.3)", padding: "3rem 0" }}
              >
                Aucune escapade nocturne
              </p>
            )}
            {escapades.map((escapade) => (
              <div
                key={escapade.id}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "1.25rem 1.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <p
                    className="font-barlow-condensed font-bold text-sm"
                    style={{ color: "#fff", marginBottom: "0.2rem" }}
                  >
                    {escapade.event?.nom ?? "Sans événement"}
                  </p>
                  <p
                    className="font-barlow text-xs"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {escapade.edition && `Édition ${escapade.edition} · `}
                    {escapade.epreuves.length} épreuve
                    {escapade.epreuves.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => togglePublished(escapade)}
                    className="font-barlow-condensed uppercase text-xs"
                    style={{
                      background: escapade.published
                        ? "rgba(34,197,94,0.1)"
                        : "rgba(255,255,255,0.05)",
                      border: escapade.published
                        ? "1px solid rgba(34,197,94,0.3)"
                        : "1px solid rgba(255,255,255,0.1)",
                      color: escapade.published
                        ? "#22c55e"
                        : "rgba(255,255,255,0.3)",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "999px",
                      cursor: "pointer",
                    }}
                  >
                    {escapade.published ? "Publié" : "Brouillon"}
                  </button>
                  <button
                    onClick={() => ouvrirEdition(escapade)}
                    className="font-barlow-condensed uppercase tracking-wider text-xs"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      padding: "0.4rem 0.9rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => supprimerEscapade(escapade)}
                    className="font-barlow-condensed uppercase tracking-wider text-xs"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      color: "#ef4444",
                      padding: "0.4rem 0.9rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Suppr.
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── VUE EDIT ── */}
        {vue === "edit" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Formulaire escapade */}
            <div
              style={{
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "1.75rem",
              }}
            >
              <h2
                className="font-bebas text-2xl"
                style={{ color: "#fff", marginBottom: "1.5rem" }}
              >
                Informations générales
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {!selected && (
                  <div>
                    <label
                      className="font-barlow-condensed uppercase text-xs tracking-widest"
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        display: "block",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Événement associé
                    </label>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {(["existant", "nouveau"] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setModeEvent(m)}
                          className="font-barlow-condensed uppercase text-xs"
                          style={{
                            padding: "0.4rem 1rem",
                            borderRadius: "999px",
                            border:
                              modeEvent === m
                                ? "1px solid #e8186d"
                                : "1px solid rgba(255,255,255,0.1)",
                            background:
                              modeEvent === m ? "#e8186d" : "transparent",
                            color:
                              modeEvent === m
                                ? "#fff"
                                : "rgba(255,255,255,0.4)",
                            cursor: "pointer",
                          }}
                        >
                          {m === "existant"
                            ? "Event existant"
                            : "Créer un event"}
                        </button>
                      ))}
                    </div>
                    {modeEvent === "existant" ? (
                      <select
                        value={eventId}
                        onChange={(e) => setEventId(e.target.value)}
                        style={{
                          width: "100%",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "10px",
                          padding: "0.75rem 1rem",
                          color: "#fff",
                          fontSize: "0.9rem",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      >
                        <option value="" style={{ background: "#1a1a1a" }}>
                          Sélectionner un événement
                        </option>
                        {events.map((event) => (
                          <option
                            key={event.id}
                            value={event.id}
                            style={{ background: "#1a1a1a" }}
                          >
                            {event.nom} —{" "}
                            {new Date(event.date).toLocaleDateString("fr-FR")}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            value: nouveauEventNom,
                            setter: setNouveauEventNom,
                            placeholder: "Nom de l'événement",
                            type: "text",
                          },
                          {
                            value: nouveauEventDate,
                            setter: setNouveauEventDate,
                            placeholder: "",
                            type: "date",
                          },
                        ].map((f, i) => (
                          <input
                            key={i}
                            type={f.type}
                            value={f.value}
                            onChange={(e) => f.setter(e.target.value)}
                            placeholder={f.placeholder}
                            style={{
                              width: "100%",
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "10px",
                              padding: "0.75rem 1rem",
                              color: "#fff",
                              fontSize: "0.9rem",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {[
                  {
                    label: "Édition",
                    value: edition,
                    setter: setEdition,
                    placeholder: "ex: 2026",
                  },
                  {
                    label: "Lien inscriptions (Klikego)",
                    value: inscriptionsUrl,
                    setter: setInscriptionsUrl,
                    placeholder: "https://www.klikego.com/...",
                  },
                ].map((f) => (
                  <div key={f.label}>
                    <label
                      className="font-barlow-condensed uppercase text-xs tracking-widest"
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      type="text"
                      value={f.value}
                      onChange={(e) => f.setter(e.target.value)}
                      placeholder={f.placeholder}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                        padding: "0.75rem 1rem",
                        color: "#fff",
                        fontSize: "0.9rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Association solidarité",
                      value: associationSolidarite,
                      setter: setAssociationSolidarite,
                      placeholder: "ex: SOS Préma",
                    },
                    {
                      label: "Lien association",
                      value: associationUrl,
                      setter: setAssociationUrl,
                      placeholder: "https://...",
                    },
                  ].map((f) => (
                    <div key={f.label}>
                      <label
                        className="font-barlow-condensed uppercase text-xs tracking-widest"
                        style={{
                          color: "rgba(255,255,255,0.3)",
                          display: "block",
                          marginBottom: "0.4rem",
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        type="text"
                        value={f.value}
                        onChange={(e) => f.setter(e.target.value)}
                        placeholder={f.placeholder}
                        style={{
                          width: "100%",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "10px",
                          padding: "0.75rem 1rem",
                          color: "#fff",
                          fontSize: "0.9rem",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <input
                    type="checkbox"
                    id="published"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 accent-fsa-rose"
                  />
                  <label
                    htmlFor="published"
                    className="font-barlow-condensed uppercase text-xs tracking-widest"
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      cursor: "pointer",
                    }}
                  >
                    Publier sur le site
                  </label>
                </div>

                <button
                  onClick={handleSubmitEscapade}
                  className="font-barlow-condensed uppercase tracking-widest text-sm"
                  style={{
                    background: "#e8186d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "999px",
                    padding: "0.75rem 1.5rem",
                    cursor: "pointer",
                  }}
                >
                  {selected ? "Mettre à jour" : "Créer l'escapade"}
                </button>
              </div>
            </div>

            {/* Épreuves */}
            {selected && (
              <div
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "1.75rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <h2 className="font-bebas text-2xl" style={{ color: "#fff" }}>
                    Épreuves
                  </h2>
                  <button
                    onClick={() => {
                      resetFormEpreuve();
                      setShowEpreuveForm(true);
                    }}
                    className="font-barlow-condensed uppercase text-xs"
                    style={{
                      background: "#e8186d",
                      color: "#fff",
                      border: "none",
                      borderRadius: "999px",
                      padding: "0.5rem 1.25rem",
                      cursor: "pointer",
                    }}
                  >
                    + Ajouter
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {selected.epreuves.length === 0 && (
                    <p
                      className="font-barlow text-xs"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Aucune épreuve
                    </p>
                  )}
                  {selected.epreuves.map((epreuve) => (
                    <div
                      key={epreuve.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "12px",
                        padding: "1rem 1.25rem",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                      }}
                    >
                      <div>
                        <p
                          className="font-barlow-condensed font-bold text-sm"
                          style={{ color: "#fff" }}
                        >
                          {epreuve.titre}
                        </p>
                        <p
                          className="font-barlow text-xs"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          {epreuve.distance && `${epreuve.distance} · `}
                          {epreuve.heure_depart &&
                            `Départ ${epreuve.heure_depart} · `}
                          {epreuve.tarif}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          onClick={() => toggleComplet(epreuve)}
                          className="font-barlow-condensed uppercase text-xs"
                          style={{
                            background: epreuve.complet
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(34,197,94,0.1)",
                            border: epreuve.complet
                              ? "1px solid rgba(255,255,255,0.1)"
                              : "1px solid rgba(34,197,94,0.3)",
                            color: epreuve.complet
                              ? "rgba(255,255,255,0.3)"
                              : "#22c55e",
                            padding: "0.3rem 0.75rem",
                            borderRadius: "999px",
                            cursor: "pointer",
                          }}
                        >
                          {epreuve.complet ? "Complet" : "Ouvert"}
                        </button>
                        <button
                          onClick={() => editerEpreuve(epreuve)}
                          className="font-barlow-condensed uppercase text-xs"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#fff",
                            padding: "0.3rem 0.75rem",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => supprimerEpreuve(epreuve.id)}
                          className="font-barlow-condensed uppercase text-xs"
                          style={{
                            background: "rgba(239,68,68,0.1)",
                            border: "1px solid rgba(239,68,68,0.2)",
                            color: "#ef4444",
                            padding: "0.3rem 0.75rem",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                        >
                          Suppr.
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {showEpreuveForm && (
                  <div
                    style={{
                      background: "rgba(232,24,109,0.05)",
                      border: "1px solid rgba(232,24,109,0.2)",
                      borderRadius: "12px",
                      padding: "1.5rem",
                    }}
                  >
                    <h3
                      className="font-bebas text-xl"
                      style={{ color: "#fff", marginBottom: "1rem" }}
                    >
                      {epreuveId ? "Modifier l'épreuve" : "Nouvelle épreuve"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label
                          className="font-barlow-condensed uppercase text-xs tracking-widest"
                          style={{
                            color: "rgba(255,255,255,0.3)",
                            display: "block",
                            marginBottom: "0.4rem",
                          }}
                        >
                          Titre *
                        </label>
                        <input
                          type="text"
                          value={eTitre}
                          onChange={(e) => setETitre(e.target.value)}
                          placeholder="ex: L'Escapade"
                          style={{
                            width: "100%",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "10px",
                            padding: "0.75rem 1rem",
                            color: "#fff",
                            fontSize: "0.9rem",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      {[
                        {
                          label: "Distance",
                          value: eDistance,
                          setter: setEDistance,
                          placeholder: "ex: 12 km",
                        },
                        {
                          label: "Heure départ",
                          value: eHeure,
                          setter: setEHeure,
                          placeholder: "ex: 18h00",
                        },
                        {
                          label: "Tarif",
                          value: eTarif,
                          setter: setETarif,
                          placeholder: "ex: Adultes / Gratuit",
                        },
                      ].map((f) => (
                        <div key={f.label}>
                          <label
                            className="font-barlow-condensed uppercase text-xs tracking-widest"
                            style={{
                              color: "rgba(255,255,255,0.3)",
                              display: "block",
                              marginBottom: "0.4rem",
                            }}
                          >
                            {f.label}
                          </label>
                          <input
                            type="text"
                            value={f.value}
                            onChange={(e) => f.setter(e.target.value)}
                            placeholder={f.placeholder}
                            style={{
                              width: "100%",
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "10px",
                              padding: "0.75rem 1rem",
                              color: "#fff",
                              fontSize: "0.9rem",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      ))}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        }}
                      >
                        <input
                          type="checkbox"
                          id="complet"
                          checked={eComplet}
                          onChange={(e) => setEComplet(e.target.checked)}
                          className="w-4 h-4 accent-fsa-rose"
                        />
                        <label
                          htmlFor="complet"
                          className="font-barlow-condensed uppercase text-xs tracking-widest"
                          style={{
                            color: "rgba(255,255,255,0.3)",
                            cursor: "pointer",
                          }}
                        >
                          Complet
                        </label>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        marginTop: "1rem",
                      }}
                    >
                      <button
                        onClick={handleSubmitEpreuve}
                        className="font-barlow-condensed uppercase tracking-widest text-sm"
                        style={{
                          flex: 1,
                          background: "#e8186d",
                          color: "#fff",
                          border: "none",
                          borderRadius: "999px",
                          padding: "0.75rem 1.5rem",
                          cursor: "pointer",
                        }}
                      >
                        {epreuveId ? "Mettre à jour" : "Ajouter"}
                      </button>
                      <button
                        onClick={resetFormEpreuve}
                        className="font-barlow-condensed uppercase tracking-widest text-sm"
                        style={{
                          background: "none",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.4)",
                          borderRadius: "999px",
                          padding: "0.75rem 1.5rem",
                          cursor: "pointer",
                        }}
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
    </div>
  );
}
