"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="hero-home flex-1 bg-fsa-noir flex items-center justify-center min-h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Logo coureurs en arrière-plan */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat opacity-15 pointer-events-none"
        style={{
          backgroundImage: "url('/foulees/LOGO_FSA_ST_SF.png')",
          backgroundSize: "40%",
        }}
      />

      {/* Halo rose animé */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 400,
          height: 400,
          background: "var(--color-fsa-rose)",
          filter: "blur(80px)",
          opacity: 0.1,
        }}
        initial={{ x: "-40vw", y: "-40vh" }}
        animate={{ x: "-35vw", y: "20vh" }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />

      {/* Contenu */}
      <div className="relative z-10 text-center px-6">
        <p className="font-barlow-condensed text-fsa-rose uppercase tracking-widest text-sm mb-6">
          Course à pied • Saint-Aubin d'Aubigné
        </p>
        <h1
          className="font-bebas text-white leading-none"
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
        >
          Les Foulées
          <br />
          <span className="text-fsa-rose">Saint-Aubinoises</span>
        </h1>
        <p className="font-bebas text-fsa-gris-med text-2xl mt-4 tracking-widest">
          Trail Running & Fun
        </p>
        <p className="font-barlow text-fsa-gris-med mt-4 max-w-md mx-auto">
          Association de course à pied sur la commune de Saint-Aubin d'Aubigné
        </p>
      </div>
    </main>
  );
}
