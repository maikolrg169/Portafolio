<script setup lang="ts">
import { t } from "../../../i18n/utils/translate";
import Footer from "../../../components/Footer.vue";
</script>

<template>
  <div class="page-container">
    <div class="page-content">
      <h1>{{ t("legal") }}</h1>
      <div class="prose">
        <p>Este es el aviso legal del portafolio web de Michael Rodríguez.</p>
        <h2>Propiedad Intelectual</h2>
        <p>Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, iconos, imágenes y código fuente, es propiedad de Michael Rodríguez o ha sido licenciado para su uso. El concepto original pertenece a su respectivo creador. Está prohibida su reproducción sin autorización previa.</p>
        <h2>Responsabilidad</h2>
        <p>Los enlaces a sitios de terceros (como repositorios en GitHub o proyectos desplegados) se proporcionan únicamente como referencia de mi trabajo. No me hago responsable del contenido ni de la disponibilidad de esos sitios externos una vez fuera de mi control.</p>
        <h2>Condiciones de Uso</h2>
        <p>El acceso y uso de este portafolio es de carácter informativo. Queda prohibido usar la información de este sitio web para actividades ilícitas o que atenten contra el orden público.</p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-400);
  color: var(--color-text);
  padding-top: var(--height-header);
}

.page-content {
  flex: 1;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-xl) var(--space-outer);

  h1 {
    font-size: var(--font-size-title-sm);
    margin-bottom: var(--space-lg);
    font-weight: 700;
  }

  .prose {
    font-size: var(--font-size-md);
    line-height: 1.6;
    
    h2 {
      font-size: var(--font-size-lg);
      margin-top: var(--space-lg);
      margin-bottom: var(--space-sm);
      font-weight: 600;
    }

    p {
      margin-bottom: var(--space-md);
    }
  }
}
</style>
