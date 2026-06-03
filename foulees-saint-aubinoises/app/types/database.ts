export type Event = {
  id: string;
  nom: string;
  date: string;
  lieu: string | null;
  description: string | null;
  type: string | null;
  photos: { url: string }[];
};

export type Photos = {
  id: string;
  url: string;
  nom: string;
  date: string;
  lieu: string | null;
  categorie: string | null;
  event_id: string;
};

export type Resultats = {
  id: string;
  coureur: string;
  course: string;
  date: string;
  distance: string | null;
  temps: string | null;
  classement: string | null;
  created_at: string;
};

export type Escapade = {
  id: string;
  event_id: string;
  edition: string | null;
  inscriptions_url: string | null;
  association_solidarite: string | null;
  association_url: string | null;
  published: boolean;
};
export type Escapade_Epreuves = {
  id: string;
  escapade_id: string;
  titre: string | null;
  distance: string | null;
  heure_depart: string | null;
  tarif: string | null;
  complet: boolean;
};
