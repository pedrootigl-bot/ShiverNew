import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shiver Broker",
    short_name: "Shiver",
    description: "Shiver Broker: corretora de forex, crypto e opções. Conta demo com $10.000 virtuais.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#05070a",
    lang: "pt-BR",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
