"use client";

import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Event } from "../types/database";
import { Photos } from "../types/database";
import { PageHeader } from "./PageHeader";

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

  //Upload cloudinary
  const [uploading, setUploading] = useState(false);

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

  //Upload photos cloudinary
  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const sigRes = await fetch("/api/cloudinary-signature", {
        method: "POST",
      });
      const { timestamp, signature, folder, api_key, cloud_name } =
        await sigRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", folder);
      formData.append("api_key", api_key);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        { method: "POST", body: formData },
      );
      const data = await uploadRes.json();
      setUrl(data.secure_url);
    } catch (err) {
      console.error("Upload échoué", err);
    }
    setUploading(false);
  };

  // ─── Render ──────────────────────────────────────────────────────────────
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
          title="Galerie"
          subtitle={
            vue === "events"
              ? "Gérer les photos par événement"
              : `Photos · ${selectedEvent?.nom}`
          }
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
            {vue === "photos" && (
              <button
                onClick={retourEvents}
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

        {/* ── VUE EVENTS ── */}
        {vue === "events" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {events.length === 0 && (
              <p
                className="font-barlow text-center"
                style={{ color: "rgba(255,255,255,0.3)", padding: "3rem 0" }}
              >
                Aucun événement
              </p>
            )}
            {events.map((event) => (
              <div
                key={event.id}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "1rem 1.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                {/* Date bloc */}
                <div
                  style={{
                    background: "rgba(232,24,109,0.1)",
                    borderRadius: "10px",
                    padding: "0.5rem 0.75rem",
                    textAlign: "center",
                    minWidth: "52px",
                    flexShrink: 0,
                  }}
                >
                  <div
                    className="font-bebas text-2xl leading-none"
                    style={{ color: "#e8186d" }}
                  >
                    {new Date(event.date).getDate()}
                  </div>
                  <div
                    className="font-barlow-condensed uppercase text-xs"
                    style={{ color: "rgba(232,24,109,0.7)" }}
                  >
                    {new Date(event.date).toLocaleDateString("fr-FR", {
                      month: "short",
                      year: "2-digit",
                    })}
                  </div>
                </div>

                {/* Infos */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    className="font-barlow-condensed font-bold text-sm"
                    style={{ color: "#fff", marginBottom: "0.2rem" }}
                  >
                    {event.nom}
                  </p>
                  <p
                    className="font-barlow text-xs"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {event.lieu ?? "Lieu non précisé"}
                  </p>
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="font-barlow-condensed uppercase text-xs"
                    style={{
                      background:
                        (event.photoCount ?? 0) > 0
                          ? "rgba(232,24,109,0.1)"
                          : "rgba(255,255,255,0.05)",
                      border:
                        (event.photoCount ?? 0) > 0
                          ? "1px solid rgba(232,24,109,0.2)"
                          : "1px solid rgba(255,255,255,0.1)",
                      color:
                        (event.photoCount ?? 0) > 0
                          ? "#e8186d"
                          : "rgba(255,255,255,0.3)",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "999px",
                    }}
                  >
                    {event.photoCount ?? 0} photo
                    {(event.photoCount ?? 0) !== 1 ? "s" : ""}
                  </span>
                  <button
                    onClick={() => ouvrirEvent(event)}
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
                    Gérer
                  </button>
                  <button
                    onClick={() => supprimerEvent(event)}
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

        {/* ── VUE PHOTOS ── */}
        {vue === "photos" && (
          <div>
            {/* Barre d'actions */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <button
                  onClick={toutSelectionner}
                  className="font-barlow-condensed uppercase text-xs"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.4)",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  {selectedIds.size === photos.length && photos.length > 0
                    ? "Tout désélectionner"
                    : "Tout sélectionner"}
                </button>
                {selectedIds.size > 0 && (
                  <button
                    onClick={supprimerSelection}
                    className="font-barlow-condensed uppercase text-xs"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      color: "#ef4444",
                      padding: "0.4rem 0.9rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Supprimer ({selectedIds.size})
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="font-barlow-condensed uppercase text-xs"
                style={{
                  background: showForm ? "rgba(255,255,255,0.06)" : "#e8186d",
                  border: showForm ? "1px solid rgba(255,255,255,0.1)" : "none",
                  color: "#fff",
                  padding: "0.4rem 1.25rem",
                  borderRadius: "999px",
                  cursor: "pointer",
                }}
              >
                {showForm ? "Annuler" : "+ Ajouter une photo"}
              </button>
            </div>

            {/* Formulaire ajout */}
            {showForm && (
              <div
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "1.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <h2
                  className="font-bebas text-xl"
                  style={{ color: "#fff", marginBottom: "1.25rem" }}
                >
                  Ajouter une photo
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <label
                      className="font-barlow-condensed uppercase text-xs tracking-widest"
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      Photo *
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUpload(file);
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
                        cursor: "pointer",
                      }}
                    />
                    {uploading && (
                      <p
                        className="font-barlow text-xs"
                        style={{ color: "#e8186d", marginTop: "0.4rem" }}
                      >
                        Upload en cours...
                      </p>
                    )}
                    {url && !uploading && (
                      <p
                        className="font-barlow text-xs"
                        style={{
                          color: "rgba(34,197,94,1)",
                          marginTop: "0.4rem",
                        }}
                      >
                        ✓ Photo uploadée
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        label: "Nom",
                        value: nom,
                        setter: setNom,
                        type: "text",
                        placeholder: "Nom de la photo",
                      },
                      {
                        label: "Lieu",
                        value: lieu,
                        setter: setLieu,
                        type: "text",
                        placeholder: "Lieu",
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
                      </div>
                    ))}
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
                    <div>
                      <label
                        className="font-barlow-condensed uppercase text-xs tracking-widest"
                        style={{
                          color: "rgba(255,255,255,0.3)",
                          display: "block",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Catégorie
                      </label>
                      <select
                        value={categorie}
                        onChange={(e) => setCategorie(e.target.value)}
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
                          Sélectionner
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
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
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
                    Ajouter
                  </button>
                </div>
              </div>
            )}

            {/* Grille photos */}
            {photos.length === 0 ? (
              <p
                className="font-barlow text-center"
                style={{ color: "rgba(255,255,255,0.3)", padding: "3rem 0" }}
              >
                Aucune photo pour cet événement
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => toggleSelect(photo.id)}
                    style={{
                      position: "relative",
                      borderRadius: "12px",
                      overflow: "hidden",
                      aspectRatio: "1",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      outline: selectedIds.has(photo.id)
                        ? "3px solid #e8186d"
                        : "none",
                      transform: selectedIds.has(photo.id)
                        ? "scale(0.95)"
                        : "scale(1)",
                    }}
                  >
                    <img
                      src={photo.url}
                      alt={photo.nom ?? "photo"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {selectedIds.has(photo.id) && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(232,24,109,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            background: "#e8186d",
                            borderRadius: "50%",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{
                              color: "#fff",
                              fontSize: "1.1rem",
                              fontWeight: "bold",
                            }}
                          >
                            ✓
                          </span>
                        </div>
                      </div>
                    )}
                    {photo.nom && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                          padding: "0.75rem",
                        }}
                      >
                        <p
                          className="font-barlow-condensed text-xs"
                          style={{
                            color: "#fff",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
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
    </div>
  );
}
