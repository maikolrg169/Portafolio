import thumbnailCubeWar from "../../../assets/images/projects/cubewar/cubewar-0.webp";
import thumbnailQuibbo from "../../../assets/images/projects/quibbo/quibbo-0.webp";
import thumbnailParticles from "../../../assets/images/projects/particles/particles-0.webp";
import thumbnailPokedex from "../../../assets/images/projects/pokedex/pokedex-0.webp";
import thumbnailSharkie from "../../../assets/images/projects/sharkie/sharkie-0.webp";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "CRM de cursos online",
    slug: "cubewar",
    thumbnail: thumbnailCubeWar,
    description: "Plataforma web",
  },
  {
    title: "CRM de Tienda e inventario online",
    slug: "quibbo",
    thumbnail: thumbnailQuibbo,
    description: "Sistema POS, Gestión de Inventario y Control Multimoneda",
  },
  {
    title: "Gestión de Correspondencia",
    slug: "sharkie",
    thumbnail: thumbnailSharkie,
    description: "Web para la gestión de correspondencia publica o privada",
  },
  {
    title: "Gruas expres",
    slug: "particles",
    thumbnail: thumbnailParticles,
    description: "App web con CRM",
  },
  {
    title: "seocreator",
    slug: "pokedex",
    thumbnail: thumbnailPokedex,
    description: "Plataforma de generacion de contenido con ia",
  },
] as const satisfies ProjectPreview[];
