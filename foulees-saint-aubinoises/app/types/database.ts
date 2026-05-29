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
