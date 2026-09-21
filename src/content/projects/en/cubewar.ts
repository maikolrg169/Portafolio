import videoCubeWar from "../../../assets/videos/cubewar.mp4";

import cubewar0 from "../../../assets/images/projects/cubewar/cubewar-0.webp";
import cubewar1 from "../../../assets/images/projects/cubewar/cubewar-1.webp";
import cubewar2 from "../../../assets/images/projects/cubewar/cubewar-2.webp";
import cubewar3 from "../../../assets/images/projects/cubewar/cubewar-3.webp";
import cubewar4 from "../../../assets/images/projects/cubewar/cubewar-4.webp";
import cubewar5 from "../../../assets/images/projects/cubewar/cubewar-5.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "CRM de cursos online",
  theme: "dark",
  tags: ["Next.js", "websockets", "redis"],
  videoBorder: false,
  live: "https://cursos-ashen.vercel.app/",
  description:
    "Plataforma web integral diseñada para la automatización, captación de estudiantes y administración end-to-end de capacitaciones técnicas. El sistema centraliza la experiencia del usuario desde el catálogo público de formación hasta un panel de control operativo con métricas clave y emisión de certificados. El proyecto resuelve la fricción operativa entre el marketing formativo y la gestión administrativa. Ofrece una interfaz pública moderna enfocada en conversión de matrículas, complementada con un backend robusto que permite supervisar métricas de rendimiento, controlar cupos, validar asistencia y emitir credenciales digitales verificables.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoCubeWar,
        caption: "Gameplay",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar0,
        alt: "Landinpage",
        caption: "Landinpage",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar1,
        alt: "Beneficios",
        caption: "Beneficios",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar2,
        alt: "Galería de cursos",
        caption: "Galería de cursos",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar3,
        alt: "Formulario",
        caption: "Formulario",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar4,
        alt: "Autentificación",
        caption: "Autentificación",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar5,
        alt: "Panel admin",
        caption: "Panel admin",
      },
    },
  ],
} as const satisfies ProjectContent;
