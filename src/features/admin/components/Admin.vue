<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Login from './Login.vue';
import Dashboard from './Dashboard.vue';

const isLoggedIn = ref(false);

onMounted(() => {
  const token = localStorage.getItem('local-admin-token');
  if (token) {
    isLoggedIn.value = true;
  }
});

const handleLoginSuccess = () => {
  localStorage.setItem('local-admin-token', 'local-admin-token');
  isLoggedIn.value = true;
};
</script>

<template>
  <div class="admin-layout">
    <div v-if="!isLoggedIn" class="admin-login-wrapper">
      <Login @success="handleLoginSuccess" />
    </div>
    <Dashboard v-else />
  </div>
</template>

<style scoped lang="scss">
.admin-layout {
  min-height: 100vh;
  background-color: #0f172a; // Slate 900
  color: #f8fafc;
  font-family: Inter, system-ui, sans-serif;
  display: flex;
  flex-direction: column;
}

.admin-login-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
