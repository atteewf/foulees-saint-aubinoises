"use client";

import { Event } from "../types/database";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "./PageHeader";

export function AdminPanelAgenda() {
  const router = useRouter();
  const [agenda, setAgenda] = useState<Event[]>([]);
  const [agendaId, setAgendaId] = useState<string | null>(null);
  const [nom, setNom] = useState("");
  const [date, setDate] = useState("");
  const [lieu, setLieu] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

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
    if (!nom || !type) return;

    if (type === "entrainement") {
      if (selectedDates.length === 0) return;
      const rows = selectedDates.map((d) => ({
        nom,
        date: d,
        lieu,
        description,
        type,
      }));
      await supabase.from("events").insert(rows);
    } else {
      if (!date) return;
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
    }

    resetFormAgenda();
    setSelectedDates([]);
    await fetchAgenda();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };
  const toggleDate = (d: string) => {
    setSelectedDates((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    );
  };
  return (
    <div
      style={{
        width: "100%",
        background: "#0f0f0f",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Fond dots */}
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
          title="Agenda"
          subtitle="Gérer les événements et entraînements du club"
        />

        {/* Bouton déconnexion */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "2rem",
          }}
        >
          <button
            onClick={handleLogout}
            className="font-barlow-condensed uppercase tracking-widest text-xs"
            style={{
              color: "rgba(255,255,255,0.3)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Déconnexion
          </button>
        </div>

        {/* Liste des événements */}
        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              padding: "1.25rem 1.75rem",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h2 className="font-bebas text-xl" style={{ color: "#fff" }}>
              Événements ({agenda.length})
            </h2>
          </div>
          <div>
            {agenda.map((event, i) => (
              <div
                key={event.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.75rem",
                  borderBottom:
                    i < agenda.length - 1
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "none",
                }}
              >
                {/* Date bloc */}
                <div
                  style={{
                    background: "#e8186d",
                    borderRadius: "10px",
                    padding: "0.5rem 0.75rem",
                    textAlign: "center",
                    minWidth: "52px",
                    flexShrink: 0,
                  }}
                >
                  <div className="font-bebas text-2xl text-white leading-none">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="font-barlow-condensed uppercase text-white/80 text-xs">
                    {new Date(event.date).toLocaleDateString("fr-FR", {
                      month: "short",
                    })}
                  </div>
                </div>

                {/* Infos */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.2rem",
                    }}
                  >
                    <span
                      className="font-barlow-condensed font-bold text-sm"
                      style={{
                        color: "#fff",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {event.nom}
                    </span>
                    {event.type && (
                      <span
                        className="font-barlow-condensed uppercase text-xs"
                        style={{
                          background: "rgba(232,24,109,0.1)",
                          border: "1px solid rgba(232,24,109,0.2)",
                          color: "#e8186d",
                          padding: "0.15rem 0.6rem",
                          borderRadius: "999px",
                          flexShrink: 0,
                        }}
                      >
                        {event.type}
                      </span>
                    )}
                  </div>
                  <p
                    className="font-barlow text-xs"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {event.lieu}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button
                    onClick={() => handleEdit(event)}
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
                    onClick={() => handleDelete({ id: event.id })}
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
        </div>

        {/* Formulaire */}
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
            {agendaId ? "Modifier l'événement" : "Ajouter un événement"}
          </h2>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Nom + Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="font-barlow-condensed uppercase text-xs tracking-widest"
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Nom
                </label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Nom de l'événement"
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
              <div>
                <label
                  className="font-barlow-condensed uppercase text-xs tracking-widest"
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Type
                </label>
                <select
                  value={type ?? ""}
                  onChange={(e) => setType(e.target.value)}
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
                    Sélectionner un type
                  </option>
                  <option value="trail" style={{ background: "#1a1a1a" }}>
                    Trail
                  </option>
                  <option value="route" style={{ background: "#1a1a1a" }}>
                    Route
                  </option>
                  <option value="cross" style={{ background: "#1a1a1a" }}>
                    Cross
                  </option>
                  <option
                    value="entrainement"
                    style={{ background: "#1a1a1a" }}
                  >
                    Entraînement
                  </option>
                  <option value="club" style={{ background: "#1a1a1a" }}>
                    Vie du club
                  </option>
                </select>
              </div>
            </div>

            {/* Lieu + Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="font-barlow-condensed uppercase text-xs tracking-widest"
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Lieu
                </label>
                <input
                  type="text"
                  value={lieu ?? ""}
                  onChange={(e) => setLieu(e.target.value)}
                  placeholder="Lieu"
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
              {type === "entrainement" ? (
                <div>
                  <label
                    className="font-barlow-condensed uppercase text-xs tracking-widest"
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      display: "block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Ajouter des dates ({selectedDates.length} sélectionnée
                    {selectedDates.length > 1 ? "s" : ""})
                  </label>
                  <input
                    type="date"
                    value=""
                    onChange={(e) => {
                      if (e.target.value) toggleDate(e.target.value);
                      e.target.value = "";
                    }}
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
              ) : (
                <div>
                  <label
                    className="font-barlow-condensed uppercase text-xs tracking-widest"
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      display: "block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
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
              )}
            </div>

            {/* Badges dates entraînement */}
            {type === "entrainement" && selectedDates.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {selectedDates.sort().map((d) => (
                  <span
                    key={d}
                    className="font-barlow-condensed uppercase text-xs"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      background: "rgba(232,24,109,0.1)",
                      border: "1px solid rgba(232,24,109,0.25)",
                      color: "#e8186d",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "999px",
                    }}
                  >
                    {new Date(d).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                    })}
                    <button
                      onClick={() => toggleDate(d)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "inherit",
                        cursor: "pointer",
                        fontWeight: "bold",
                        padding: 0,
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <div>
              <label
                className="font-barlow-condensed uppercase text-xs tracking-widest"
                style={{
                  color: "rgba(255,255,255,0.3)",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                Description
              </label>
              <textarea
                value={description ?? ""}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={3}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "0.75rem 1rem",
                  color: "#fff",
                  fontSize: "0.9rem",
                  outline: "none",
                  resize: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Boutons */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={handleSubmit}
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
                {agendaId ? "Mettre à jour" : "Ajouter"}
              </button>
              {agendaId && (
                <button
                  onClick={resetFormAgenda}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
