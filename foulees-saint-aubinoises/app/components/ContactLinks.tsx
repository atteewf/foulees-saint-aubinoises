"use client";

import { Mail, Phone } from "lucide-react";

export function ContactLinks() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {[
        {
          href: "tel:0628783993",
          icon: <Phone size={18} />,
          label: "06 28 78 39 93",
        },
        {
          href: "mailto:fouleessaintaubinoises@gmail.com",
          icon: <Mail size={18} />,
          label: "fouleessaintaubinoises@gmail.com",
        },
        {
          href: "https://www.facebook.com/fouleessstaubinoises/?locale=fr_FR",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          ),
          label: "Facebook",
          external: true,
        },
        {
          href: "https://www.instagram.com/foulees_saint_aubinoises/",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          ),
          label: "Instagram",
          external: true,
        },
      ].map(({ href, icon, label, external }) => (
        <a
          key={label}
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(232,24,109,0.15)",
              border: "1px solid rgba(232,24,109,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: "#e8186d",
            }}
          >
            {icon}
          </div>
          <span
            className="font-barlow text-sm"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
