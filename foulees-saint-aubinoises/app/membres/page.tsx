import { Metadata } from "next";
export const metadata: Metadata = {
  robots: "noindex, nofollow",
};
export default function MembrePage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-bebas text-4xl text-fsa-noir">Mmebres</h1>
    </div>
  );
}
