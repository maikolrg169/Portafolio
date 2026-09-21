<script setup lang="ts">
import { t } from "../../../i18n/utils/translate";
import Footer from "../../../components/Footer.vue";
</script>

<template>
  <div class="page-container">
    <div class="page-content">
      <h1>{{ t("privacy") }}</h1>
      <div class="prose">
        <p>This is the privacy policy page. Edit this file to add your privacy policy content.</p>
        <h2>Information We Collect</h2>
        <p>...</p>
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
