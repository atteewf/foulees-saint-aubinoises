export default function MentionsLegalesPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 w-full">
      <div className="mb-12">
        <span className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med block mb-3">
          Informations légales
        </span>
        <h1 className="font-bebas text-5xl text-fsa-noir">
          Mentions <span className="text-fsa-rose">Légales</span>
        </h1>
      </div>

      <div className="space-y-10 font-barlow text-fsa-gris leading-relaxed">
        <section>
          <h2 className="font-bebas text-2xl text-fsa-noir mb-3">
            Éditeur du site
          </h2>
          <p>Nom : Les Foulées Saint-Aubinoises</p>
          <p>Forme juridique : Association loi 1901</p>
          <p>Siège social : Saint-Aubin-d'Aubigné, Ille-et-Vilaine (35)</p>
          <p>Email : contact@foulees-saint-aubinoises.fr</p>
          <p>Directeur de publication : [Nom du président]</p>
        </section>

        <section>
          <h2 className="font-bebas text-2xl text-fsa-noir mb-3">
            Hébergement
          </h2>
          <p>Vercel Inc.</p>
          <p>340 Pine Street, Suite 900</p>
          <p>San Francisco, CA 94104, États-Unis</p>
          <p>Site : vercel.com</p>
        </section>

        <section>
          <h2 className="font-bebas text-2xl text-fsa-noir mb-3">
            Propriété intellectuelle
          </h2>
          <p>
            L'ensemble des contenus présents sur ce site (textes, photos, logo)
            sont la propriété exclusive de l'association Les Foulées
            Saint-Aubinoises. Toute reproduction, même partielle, est interdite
            sans autorisation préalable.
          </p>
        </section>

        <section>
          <h2 className="font-bebas text-2xl text-fsa-noir mb-3">
            Données personnelles
          </h2>
          <p>
            Les données collectées via le formulaire de contact (nom, email,
            message) sont utilisées uniquement pour répondre à vos demandes.
            Elles ne sont pas transmises à des tiers.
          </p>
          <p className="mt-2">
            Conformément au RGPD, vous disposez d'un droit d'accès, de
            rectification et de suppression de vos données. Pour exercer ces
            droits, contactez-nous à : contact@foulees-saint-aubinoises.fr
          </p>
          <p className="mt-2">
            Responsable du traitement : Les Foulées Saint-Aubinoises.
          </p>
        </section>

        <section>
          <h2 className="font-bebas text-2xl text-fsa-noir mb-3">Cookies</h2>
          <p>
            Ce site n'utilise pas de cookies à des fins publicitaires ou de
            tracking. Des cookies techniques peuvent être utilisés pour le bon
            fonctionnement du site.
          </p>
        </section>
      </div>
    </main>
  );
}
