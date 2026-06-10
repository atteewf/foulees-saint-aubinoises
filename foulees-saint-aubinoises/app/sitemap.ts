import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://foulees-saint-aubinoises.fr",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://foulees-saint-aubinoises.fr/leclub",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://foulees-saint-aubinoises.fr/agenda",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://foulees-saint-aubinoises.fr/galerie",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://foulees-saint-aubinoises.fr/resultats",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://foulees-saint-aubinoises.fr/contact",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://foulees-saint-aubinoises.fr/escapade",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://foulees-saint-aubinoises.fr/mentionslegales",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
