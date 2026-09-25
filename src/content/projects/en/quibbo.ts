import videoQuibbo from "../../../assets/videos/quibbo.mp4";

import quibbo0 from "../../../assets/images/projects/quibbo/quibbo-0.webp";
import quibbo1 from "../../../assets/images/projects/quibbo/quibbo-1.webp";
import quibbo2 from "../../../assets/images/projects/quibbo/quibbo-2.webp";
import quibbo3 from "../../../assets/images/projects/quibbo/quibbo-3.webp";
import quibbo4 from "../../../assets/images/projects/quibbo/quibbo-4.webp";
import quibbo5 from "../../../assets/images/projects/quibbo/quibbo-5.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "CRM de Tienda e inventario online",
  live: "https://tiendajhon.netlify.app/",
  theme: "light",
  tags: ["three", "node", "next", "redis", "postgresql"],
  videoBorder: true,
  description:
    "Mi Tienda es una solución web integral (PWA) de punto de venta (POS) y gestión de inventario diseñada específicamente para comercios que operan en entornos multimoneda. La plataforma optimiza la facturación rápida, el control de existencias en tiempo real y la conciliación financiera diaria, resolviendo la fricción operativa que genera la fluctuación cambiaria entre divisas (USD/USDT) y moneda local (Bolívares).   ",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoQuibbo,
        caption: "System live",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo0,
        alt: "Dashboar",
        caption: "Dashboar",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo1,
        alt: "Login",
        caption: "Login",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo2,
        alt: "Caja",
        caption: "Caja",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo3,
        alt: "PWA móvil",
        caption: "PWA móvil",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo4,
        alt: "Reportes",
        caption: "Reportes",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo5,
        alt: "Inventario",
        caption: "Inventario",
      },
    },
  ],
} as const satisfies ProjectContent;
