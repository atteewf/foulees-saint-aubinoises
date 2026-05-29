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
