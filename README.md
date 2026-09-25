Portafolio (2026)

Sitio web de portafolio personal: casos de estudio de proyectos webs, demos ligeras de 3D y shaders, y textos bilingües (inglés y español).Desarrollado con Vue 3, TypeScript y Vite. Animaciones mediante GSAP y Lenis, 3D con three.js, audio con Howler. 

GLSL se compila a través de vite-plugin-glsl.ScriptsComandoDescripciónnpm run devServidor de desarrollo en el puerto 3000 (strictPort) npm run buildvue-tsc y luego empaquetado para producción en dist/npm run previewServir localmente la versión de producciónnpm run typecheckSolo verificación de tipos (vue-tsc -b)ContenidoProyectos: src/content/projects/{en,de}/<slug>.ts — textos, etiquetas, multimedia, enlaces. 

Los slugs deben coincidir con projectIds en src/content/projects/index.ts.Vistas previas / listado: src/content/projects/previews/.Etiquetas: las variantes y textos se encuentran en src/components/tagVariants.ts (usados por Tag.vue y los tipos de contenido).Stack (nivel general)Vue 3 (<script setup>), SCSS con mixins compartidos (src/assets/styles/)Funciones auxiliares de i18n en src/i18n/WebGL / GLSL en src/three/ según aplique.
