"use client";

import dynamic from "next/dynamic";

const MapEvent = dynamic(
  () => import("@/app/components/MapEvent").then((m) => m.MapEvent),
  {
    ssr: false,
  },
);

type Props = {
  lat: number;
  lon: number;
  lieu: string;
  nom: string;
};

export function MapWrapper({ lat, lon, lieu, nom }: Props) {
  return <MapEvent lat={lat} lon={lon} lieu={lieu} nom={nom} />;
}
