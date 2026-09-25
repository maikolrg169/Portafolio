import videoSharkie from "../../../assets/videos/sharkie.mp4";

import sharkie0 from "../../../assets/images/projects/sharkie/sharkie-0.webp";
import sharkie1 from "../../../assets/images/projects/sharkie/sharkie-1.webp";
import sharkie2 from "../../../assets/images/projects/sharkie/sharkie-2.webp";
import sharkie3 from "../../../assets/images/projects/sharkie/sharkie-3.webp";
import sharkie4 from "../../../assets/images/projects/sharkie/sharkie-4.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Gestión de Correspondencia",
  theme: "light",
  tags: ["Filament", "laravel", "MySQL"],
  live: "",
  source: "https://github.com/davidhckh/sharkie-game",
  description:
    "Gestión de Correspondencia es una plataforma web integral desarrollada para centralizar, digitalizar y controlar el flujo de comunicaciones oficiales, documentos y trámites internos o externos en empresas e instituciones del sector público o privado. ",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoSharkie,
        caption: "System live",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie0,
        alt: "Login",
        caption: "Login",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie1,
        alt: "Inicio",
        caption: "Inicio",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie2,
        alt: "Modulo principal",
        caption: "Modulo principal",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie3,
        alt: "Añadir correspondencia",
        caption: "Añadir correspondencia",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie4,
        alt: "Añadir departamento o ente",
        caption: "Añadir departamento o ente",
      },
    },
  ],
} as const satisfies ProjectContent;
