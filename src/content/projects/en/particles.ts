import videoParticles from "../../../assets/videos/particles.mp4";

import particles0 from "../../../assets/images/projects/particles/particles-0.webp";
import particles1 from "../../../assets/images/projects/particles/particles-1.webp";
import particles2 from "../../../assets/images/projects/particles/particles-2.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Gruas expres",
  theme: "dark",
  tags: ["sveltekit", "typescript", "postgresql"],
  live: "https://gruas-expres2-pi.vercel.app/",
  videoBorder: false,
  description:
    "Grúas Expres es una plataforma web moderna e integral diseñada para conectar a conductores en apuros con servicios de grúas locales de forma rápida, transparente y confiable. Actúa como un puente directo entre usuarios varados, conductores de grúas y administradores de servicio. ",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoParticles,
        caption: "System live",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: particles0,
        alt: "Inicio",
        caption: "Inicio",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: particles1,
        alt: "Panel admin",
        caption: "Panel admin",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: particles2,
        alt: "Asignación automática",
        caption: "Asignación automática",
      },
    },
  ],
} as const satisfies ProjectContent;
