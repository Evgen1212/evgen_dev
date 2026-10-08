import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Erriour — веб-разработка любой сложности",
    short_name: "Erriour",
    description:
      "От логотипа до логики — один специалист! Сайты, веб-сервисы, боты, дизайн, администрирование.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    lang: "ru",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
