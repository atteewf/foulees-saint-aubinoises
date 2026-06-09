"use client";
import { Typewriter } from "./components/Typewriter";
export default function Home() {
  return (
    <main
      className="bg-fsa-noir flex flex-col items-center justify-center"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "calc(100svh - 86px)",
        padding: "2rem 1.5rem",
        gap: "0",
      }}
    >
      {/* Coureurs */}
      <img
        src="/foulees/coureurs_en_noir.svg"
        alt=""
        style={{
          position: "absolute",
          width: "90%",
          maxWidth: "1000px",
          opacity: 0.3,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -65%)", // ← décale vers le haut
          pointerEvents: "none",
          filter: "invert(1)",
        }}
      />

      {/* Bulles desktop uniquement */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
        <style>{`
          @keyframes orbit1 {
            0%   { transform: translate(0px, 0px) scale(1); opacity: 0.7; }
            25%  { transform: translate(80px, -60px) scale(1.2); opacity: 1; }
            50%  { transform: translate(160px, 20px) scale(0.9); opacity: 0.6; }
            75%  { transform: translate(60px, 80px) scale(1.1); opacity: 0.9; }
            100% { transform: translate(0px, 0px) scale(1); opacity: 0.7; }
          }
          @keyframes orbit2 {
            0%   { transform: translate(0px, 0px) scale(1); }
            25%  { transform: translate(-70px, -80px) scale(1.3); }
            50%  { transform: translate(-120px, 40px) scale(0.8); }
            75%  { transform: translate(-40px, 90px) scale(1.2); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          @keyframes orbit3 {
            0%   { transform: translate(0px, 0px) scale(1); opacity: 0.8; }
            33%  { transform: translate(100px, 60px) scale(1.4); opacity: 1; }
            66%  { transform: translate(-60px, 100px) scale(0.7); opacity: 0.5; }
            100% { transform: translate(0px, 0px) scale(1); opacity: 0.8; }
          }
          @keyframes orbit4 {
            0%   { transform: translate(0px, 0px); }
            20%  { transform: translate(-80px, -100px) scale(1.5); }
            40%  { transform: translate(120px, -80px) scale(0.6); }
            60%  { transform: translate(100px, 80px) scale(1.3); }
            80%  { transform: translate(-60px, 60px) scale(0.9); }
            100% { transform: translate(0px, 0px); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .bulle { position: absolute; border-radius: 50%; background: #e8186d; }
          .b1  { width: 8px;  height: 8px;  top: 45%; left: 72%; animation: orbit1 6s ease-in-out infinite; }
          .b2  { width: 12px; height: 12px; top: 48%; left: 74%; animation: orbit1 7s ease-in-out infinite 0.5s; opacity: 0.8; }
          .b3  { width: 16px; height: 16px; top: 52%; left: 76%; animation: orbit2 8s ease-in-out infinite 1s; }
          .b4  { width: 22px; height: 22px; top: 55%; left: 78%; animation: orbit3 9s ease-in-out infinite 0.3s; }
          .b5  { width: 30px; height: 30px; top: 58%; left: 75%; animation: orbit2 7s ease-in-out infinite 1.5s; }
          .b6  { width: 40px; height: 40px; top: 60%; left: 70%; animation: orbit4 10s ease-in-out infinite; }
          .b7  { width: 52px; height: 52px; top: 62%; left: 63%; animation: orbit1 11s ease-in-out infinite 2s; }
          .b8  { width: 38px; height: 38px; top: 58%; left: 58%; animation: orbit3 8s ease-in-out infinite 0.8s; }
          .b9  { width: 24px; height: 24px; top: 54%; left: 55%; animation: orbit2 9s ease-in-out infinite 1.2s; }
          .b10 { width: 14px; height: 14px; top: 50%; left: 53%; animation: orbit4 7s ease-in-out infinite 0.4s; }
          .b11 { width: 8px;  height: 8px;  top: 46%; left: 80%; animation: float 4s ease-in-out infinite; opacity: 0.5; }
          .b12 { width: 6px;  height: 6px;  top: 42%; left: 77%; animation: float 5s ease-in-out infinite 1s; opacity: 0.4; }
          .b13 { width: 10px; height: 10px; top: 40%; left: 82%; animation: orbit1 6s ease-in-out infinite 2.5s; opacity: 0.6; }
          .b14 { width: 18px; height: 18px; top: 65%; left: 68%; animation: orbit2 8s ease-in-out infinite 0.7s; }
          .b15 { width: 28px; height: 28px; top: 68%; left: 72%; animation: orbit3 10s ease-in-out infinite 1.8s; }
        `}</style>
        <div className="bulle b1" />
        <div className="bulle b2" />
        <div className="bulle b3" />
        <div className="bulle b4" />
        <div className="bulle b5" />
        <div className="bulle b6" />
        <div className="bulle b7" />
        <div className="bulle b8" />
        <div className="bulle b9" />
        <div className="bulle b10" />
        <div className="bulle b11" />
        <div className="bulle b12" />
        <div className="bulle b13" />
        <div className="bulle b14" />
        <div className="bulle b15" />
      </div>

      {/* Slogan */}
      <p
        className="font-bebas tracking-[0.25em] uppercase relative z-10 "
        style={{
          color: "#e8186d",
          fontSize: "clamp(0.9rem, 2vw, 1.5rem)",
          marginBottom: "clamp(1rem, 10vh, 4rem)",
        }}
      >
        Trail Running & Fun
      </p>

      {/* Titre */}
      <h1
        className="font-bebas leading-[0.85] tracking-tight uppercase text-center relative z-10"
        style={{
          fontSize: "clamp(2.5rem, 11vw, 9rem)",
          color: "#ffffff",
          textShadow: `
      #e8e8e8 0 -1px 0,
      #ffffff 1px 1px 0,
      #cccccc 2px 2px 0,
      #aaaaaa 3px 3px 0,
      #888888 4px 4px 0,
      #555555 5px 5px 0,
      #333 5px 5px 10px
    `,
        }}
      >
        Les Foulées
        <br />
        <span
          style={{
            color: "#e8186d",

            textShadow: `
    #ffb3d0 0 -1px 0,
    #e8186d 1px 1px 0,
    #c0125a 2px 2px 0,
    #9a0e48 3px 3px 0,
    #7a0b38 4px 4px 0,
    #5a0828 5px 5px 0,
    #333 5px 5px 10px
  `,
          }}
        >
          Saint-Aubinoises
        </span>
      </h1>

      {/* Typewriter */}
      <div
        className="min-h-[40px] flex items-center justify-center relative z-10"
        style={{ marginTop: "clamp(1rem, 4vh, 3rem)" }}
      >
        <p
          className="font-barlow text-sm max-w-xl text-center tracking-wide"
          style={{ color: "#fff" }}
        >
          <Typewriter text="Association de course à pied sur la commune de Saint-Aubin d'Aubigné" />
        </p>
      </div>

      {/* Mentions légales */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <p
          className="font-barlow"
          style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}
        >
          © 2026 Les Foulées Saint-Aubinoises — Tous droits réservés
        </p>
        <a
          href="/mentionslegales"
          className="font-barlow"
          style={{
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.2)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e8186d")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.2)")
          }
        >
          Mentions légales
        </a>
      </div>
    </main>
  );
}
