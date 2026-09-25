<script setup lang="ts">
import { t } from "../../../i18n/utils/translate";
import Footer from "../../../components/Footer.vue";
</script>

<template>
  <div class="page-container">
    <div class="page-content">
      <h1>{{ t("privacy") }}</h1>
      <div class="prose">
        <p>Esta es la Política de Privacidad de mi portafolio. Tu privacidad es fundamental.</p>
        <h2>Información que Recopilamos</h2>
        <p>Este sitio no recopila información personal de los visitantes de forma automática, a excepción de los datos proporcionados voluntariamente si decides contactarme a través de mis redes sociales, correo electrónico o WhatsApp.</p>
        <h2>Uso de la Información</h2>
        <p>Cualquier dato de contacto que me proporciones será utilizado estrictamente para responder a tus consultas, discutir oportunidades de empleo o colaborar en proyectos. No compartiré ni venderé tu información a terceros.</p>
        <h2>Cookies</h2>
        <p>Este portafolio únicamente utiliza cookies locales estrictamente necesarias para el funcionamiento de la web (por ejemplo, para guardar tu preferencia de idioma). No utilizamos cookies de seguimiento, rastreadores ni recolectamos datos para análisis de mercado.</p>
        <h2>Consentimiento</h2>
        <p>Al utilizar y navegar en este sitio web, estás de acuerdo con nuestra Política de Privacidad y aceptas sus términos.</p>
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
