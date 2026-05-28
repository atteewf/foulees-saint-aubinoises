import { Users, Medal, MapPin, DoorOpen } from "lucide-react";
import PageWrapper from "../components/PageWrapper";

export default function LeClubPage() {
  const stats = [
    { num: "120+", label: "Adhérents" },
    { num: "1998", label: "Fondation" },
    { num: "35", label: "Courses / an" },
  ];

  const bureau = [
    { initials: "PL", name: "Pierre L.", role: "Président" },
    { initials: "ML", name: "Marie L.", role: "Secrétaire" },
    { initials: "JD", name: "Jean D.", role: "Trésorier" },
    { initials: "SB", name: "Sophie B.", role: "Resp. communication" },
  ];

  const valeurs = [
    {
      icon: <Users size={18} className="text-fsa-rose" />,
      title: "Convivialité",
      desc: "Courir ensemble dans la bonne humeur, du débutant au confirmé.",
    },
    {
      icon: <Medal size={18} className="text-fsa-rose" />,
      title: "Dépassement",
      desc: "Se dépasser à son rythme, sans compétition entre membres.",
    },
    {
      icon: <MapPin size={18} className="text-fsa-rose" />,
      title: "Ancrage local",
      desc: "Fiers de représenter Saint-Aubin lors des courses bretonnes.",
    },
    {
      icon: <DoorOpen size={18} className="text-fsa-rose" />,
      title: "Accessibilité",
      desc: "Ouvert à tous, sans prérequis, avec ou sans licence FFA.",
    },
  ];

  const timeline = [
    {
      year: "1998",
      text: "Création de l'association par un groupe de coureurs passionnés du village.",
    },
    {
      year: "2005",
      text: "Première édition des Foulées Saint-Aubinoises, course annuelle locale.",
    },
    {
      year: "2015",
      text: "Cap des 100 adhérents franchi. Développement des sorties trail.",
    },
    {
      year: "Aujourd'hui",
      text: "Plus de 120 membres actifs et des dizaines de participations collectives chaque année.",
    },
  ];

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6 w-full py-16">
        {/* Hero */}
        <div className="relative bg-fsa-noir w-full rounded-2xl px-8 py-20 text-center mb-12 overflow-hidden">
          <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-[100px] border-fsa-rose opacity-5 pointer-events-none" />
          <div className="absolute left-[-80px] bottom-[-80px] w-[300px] h-[300px] rounded-full border-[60px] border-fsa-rose opacity-5 pointer-events-none" />
          <span className="inline-block bg-fsa-rose/10 text-fsa-rose text-xs font-barlow-condensed uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Saint-Aubin-d'Aubigné · Ille-et-Vilaine
          </span>
          <h1 className="font-bebas text-6xl text-white tracking-wide mb-4">
            Les Foulées <span className="text-fsa-rose">Saint-Aubinoises</span>
          </h1>
          <div className="w-10 h-0.5 bg-fsa-rose mx-auto mb-5" />
          <p className="font-barlow text-white/50 text-base max-w-lg mx-auto leading-relaxed">
            Association de course à pied ouverte à tous les niveaux, dans la
            bonne humeur et la convivialité.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-14">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-fsa-gris-pale rounded-xl p-6 text-center ${
                i < 2 ? "border-r border-fsa-gris-pale" : ""
              }`}
            >
              <span className="font-bebas text-5xl text-fsa-rose block">
                {stat.num}
              </span>
              <span className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med mt-1 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Présentation */}
        <div className="mb-14">
          <span className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med block mb-4">
            Présentation
          </span>
          <div className="border-l-2 border-fsa-rose pl-6 space-y-3">
            <p className="font-barlow text-fsa-gris text-base leading-relaxed">
              Créée à Saint-Aubin-d'Aubigné, l'association Les Foulées
              Saint-Aubinoises rassemble des coureurs de tous niveaux autour
              d'une passion commune : la course à pied.
            </p>
            <p className="font-barlow text-fsa-gris text-base leading-relaxed">
              Du 10 km au marathon, sur route ou en trail, nous participons
              régulièrement à des épreuves locales et régionales. Nos sorties
              hebdomadaires sont ouvertes à tous, débutants comme confirmés.
            </p>
          </div>
        </div>

        {/* Bureau */}
        <div className="mb-14">
          <span className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med block mb-4">
            Notre bureau
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {bureau.map((member) => (
              <div
                key={member.initials}
                className="border border-fsa-gris-pale rounded-xl p-5 text-center hover:border-fsa-rose transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-fsa-rose/10 flex items-center justify-center mx-auto mb-3">
                  <span className="font-barlow-condensed text-fsa-rose font-semibold text-sm">
                    {member.initials}
                  </span>
                </div>
                <p className="font-barlow font-medium text-fsa-noir text-sm mb-0.5">
                  {member.name}
                </p>
                <p className="font-barlow text-fsa-gris-med text-xs">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Valeurs */}
        <div className="mb-14">
          <span className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med block mb-4">
            Nos valeurs
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {valeurs.map((v) => (
              <div
                key={v.title}
                className="border border-fsa-gris-pale rounded-xl p-5 flex gap-4 items-start hover:border-fsa-rose transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-fsa-rose/10 flex items-center justify-center flex-shrink-0">
                  {v.icon}
                </div>
                <div>
                  <p className="font-barlow font-medium text-fsa-noir text-sm mb-1">
                    {v.title}
                  </p>
                  <p className="font-barlow text-fsa-gris-med text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <span className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-gris-med block mb-6">
            Un peu d'histoire
          </span>
          <div className="border-l-2 border-fsa-rose/20 pl-6 space-y-8">
            {timeline.map((item) => (
              <div key={item.year} className="relative">
                <div className="absolute -left-[1.65rem] top-1 w-2.5 h-2.5 rounded-full bg-fsa-rose" />
                <p className="font-barlow-condensed uppercase text-xs tracking-widest text-fsa-rose mb-1">
                  {item.year}
                </p>
                <p className="font-barlow text-fsa-gris text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
