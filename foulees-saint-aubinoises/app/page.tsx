export default function Home() {
  return (
    <main className="hero-home flex-1 bg-fsa-noir py-24 px-16 flex items-center">
      <div className="max-w-6xl mx-auto relative z-10">
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
        <p className="font-barlow text-fsa-gris-med mt-4 max-w-md">
          Association de course à pied sur la commune de Saint-Aubin d'Aubigné
        </p>
      </div>
    </main>
  );
}
