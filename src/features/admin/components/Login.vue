<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['success']);

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const login = async () => {
  error.value = '';
  loading.value = true;
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    });
    const data = await res.json();
    if (data.success) {
      emit('success');
    } else {
      error.value = data.message || 'Error en inicio de sesión';
    }
  } catch (err) {
    error.value = 'Error de red';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-box">
    <h2>CMS Local</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" required placeholder="mhrm@dev.com" />
      </div>
      <div class="form-group">
        <label>Contraseña</label>
        <input type="password" v-model="password" required />
      </div>
      <p v-if="error" class="error-msg">{{ error }}</p>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Iniciando...' : 'Entrar' }}
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.login-box {
  background: #1e293b;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);

  h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #38bdf8;
    text-align: center;
  }
}

.form-group {
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    color: #94a3b8;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border-radius: 6px;
    border: 1px solid #334155;
    background: #0f172a;
    color: white;
    outline: none;
    box-sizing: border-box;

    &:focus {
      border-color: #38bdf8;
    }
  }
}

.error-msg {
  color: #ef4444;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background: #0284c7;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0369a1;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
