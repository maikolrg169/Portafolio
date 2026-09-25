import videoPokedex from "../../../assets/videos/pokedex.mp4";

import pokedex0 from "../../../assets/images/projects/pokedex/pokedex-0.webp";
import pokedex1 from "../../../assets/images/projects/pokedex/pokedex-1.webp";
import pokedex2 from "../../../assets/images/projects/pokedex/pokedex-2.webp";
import pokedex3 from "../../../assets/images/projects/pokedex/pokedex-3.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "seocreator",
  theme: "light",
  tags: ["javascript", "html", "css"],
  live: "https://seocreator.app/",
  source: "https://github.com/davidhckh/pokedex",
  videoBorder: true,
  description:
    "Esta plataforma web auto-analiza a tus competidores y genera artículos que posicionan en Google y aparecen en las respuestas de la IA.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoPokedex,
        caption: "System live",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex0,
        alt: "Inicio",
        caption: "Inicio",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex1,
        alt: "Fluidez",
        caption: "Fluidez",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex2,
        alt: "Login",
        caption: "Login",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex3,
        alt: "Generación de contenido",
        caption: "Generación de contenido",
      },
    },
  ],
} as const satisfies ProjectContent;
