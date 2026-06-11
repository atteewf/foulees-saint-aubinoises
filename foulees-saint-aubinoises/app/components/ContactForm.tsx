"use client";
import { useRef } from "react";

// dans handleSubmit :
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("body"),
    };
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      alert("Message envoyé");
      formRef.current?.reset();
    } else {
      alert("Erreur lors de l'envoi");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
    >
      {[
        { label: "Nom", name: "name", type: "text", placeholder: "Votre nom" },
        {
          label: "Email",
          name: "email",
          type: "email",
          placeholder: "votre@email.com",
        },
      ].map((field) => (
        <div
          key={field.name}
          style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
        >
          <label
            className="font-barlow-condensed uppercase text-xs tracking-widest"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "0.75rem 1rem",
              color: "#fff",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
        </div>
      ))}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <label
          className="font-barlow-condensed uppercase text-xs tracking-widest"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Message
        </label>
        <textarea
          name="body"
          rows={6}
          placeholder="Votre message..."
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            padding: "0.75rem 1rem",
            color: "#fff",
            fontSize: "0.9rem",
            outline: "none",
            resize: "none",
          }}
        />
      </div>
      <button
        type="submit"
        className="font-barlow-condensed uppercase tracking-widest text-sm rounded-full transition-colors duration-200"
        style={{
          background: "#e8186d",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          border: "none",
          cursor: "pointer",
        }}
      >
        Envoyer
      </button>
    </form>
  );
}
