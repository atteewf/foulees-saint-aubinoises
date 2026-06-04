export default function Home() {
  return (
    <main className="bg-fsa-noir flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="text-center px-6">
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
