<script setup lang="ts">
import { ref, onMounted } from 'vue';

const activeTab = ref<'translations' | 'projects' | 'social'>('translations');
const loading = ref(false);

// Translations state
const translations = ref<Record<string, string>>({});
const transSaving = ref(false);

// Projects state
const projects = ref<any[]>([]);
const currentProject = ref<any | null>(null);
const projSaving = ref(false);
const projectImages = ref<any[]>([]);

onMounted(() => {
  fetchTranslations();
  fetchProjects();
});

const fetchTranslations = async () => {
  loading.value = true;
  const res = await fetch('/api/admin/translations');
  const data = await res.json();
  if (data.success) {
    translations.value = data.data;
  }
  loading.value = false;
};

const saveTranslations = async () => {
  transSaving.value = true;
  await fetch('/api/admin/translations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: translations.value })
  });
  transSaving.value = false;
  alert('Textos guardados correctamente en local');
};

const fetchProjects = async () => {
  const res = await fetch('/api/admin/projects');
  const data = await res.json();
  if (data.success) {
    projects.value = data.projects;
  }
};

const editProject = async (proj: any) => {
  currentProject.value = { ...proj };
  currentProject.value.tagsString = proj.tags ? proj.tags.join(', ') : '';
  projectImages.value = [];
  const res = await fetch(`/api/admin/images?project=${proj.id}`);
  const data = await res.json();
  if (data.success) {
    projectImages.value = data.images;
  }
};

const handleImageUpload = async (event: Event, filename: string) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64 = e.target?.result as string;
    const res = await fetch('/api/admin/upload-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project: currentProject.value.id,
        filename,
        base64
      })
    });
    const data = await res.json();
    if (data.success) {
      alert(`Imagen ${filename} actualizada correctamente. Refresca la página para ver los cambios visuales.`);
      editProject(currentProject.value); // refresh images to bust cache
    } else {
      alert('Error al subir la imagen');
    }
  };
  reader.readAsDataURL(file);
};

const handleVideoUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64 = e.target?.result as string;
    const res = await fetch('/api/admin/upload-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project: currentProject.value.id,
        base64
      })
    });
    const data = await res.json();
    if (data.success) {
      alert(`Video actualizado correctamente. Refresca la página pública para ver los cambios.`);
    } else {
      alert('Error al subir el video');
    }
  };
  reader.readAsDataURL(file);
};

const saveProject = async () => {
  if (!currentProject.value) return;
  projSaving.value = true;
  
  const projectToSave = { ...currentProject.value, images: projectImages.value };
  if (projectToSave.tagsString !== undefined) {
    projectToSave.tags = projectToSave.tagsString.split(',').map((t: string) => t.trim()).filter(Boolean);
  }

  await fetch('/api/admin/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectToSave)
  });
  projSaving.value = false;
  
  // update list locally
  const idx = projects.value.findIndex(p => p.id === currentProject.value.id);
  if (idx !== -1) projects.value[idx] = { ...projectToSave };
  
  alert('Proyecto guardado correctamente en local');
  currentProject.value = null;
};

const logout = () => {
  localStorage.removeItem('local-admin-token');
  window.location.reload();
};
</script>

<template>
  <div class="dashboard">
    <header class="topbar">
      <h1>Panel de Configuración Local</h1>
      <button class="logout-btn" @click="logout">Cerrar Sesión</button>
    </header>

    <div class="main-content">
      <aside class="sidebar">
        <ul>
          <li :class="{ active: activeTab === 'translations' }" @click="activeTab = 'translations'">Textos (Español)</li>
          <li :class="{ active: activeTab === 'projects' }" @click="activeTab = 'projects'">Proyectos</li>
          <li :class="{ active: activeTab === 'social' }" @click="activeTab = 'social'">Contacto / Redes</li>
        </ul>
      </aside>

      <section class="content-area">
        
        <!-- TRANSLATIONS TAB -->
        <div v-if="activeTab === 'translations'" class="tab-panel">
          <h2>Editar Textos</h2>
          <p class="subtitle">Modifica los textos estáticos. Los cambios se guardarán en <code>en.json</code> para compilarse en Vercel.</p>
          
          <div v-if="loading">Cargando...</div>
          <div v-else class="trans-list">
            <template v-for="(_, key) in translations" :key="key">
              <div class="form-group" v-if="!['social-mail', 'social-github', 'social-linkedin', 'social-x', 'whatsapp-number', 'whatsapp-message'].includes(String(key))">
                <label>{{ key }}</label>
                <textarea v-model="translations[key]" rows="2"></textarea>
              </div>
            </template>
            <button class="save-btn" @click="saveTranslations" :disabled="transSaving">
              {{ transSaving ? 'Guardando...' : 'Guardar Todos los Textos' }}
            </button>
          </div>
        </div>

        <!-- SOCIAL TAB -->
        <div v-if="activeTab === 'social'" class="tab-panel">
          <h2>Editar Contacto y Redes</h2>
          <p class="subtitle">Modifica los links de redes sociales y la información de WhatsApp.</p>
          
          <div v-if="loading">Cargando...</div>
          <div v-else class="trans-list">
            <div class="form-group">
              <label>Correo Electrónico (Mailto)</label>
              <input type="text" v-model="translations['social-mail']" />
            </div>
            <div class="form-group">
              <label>GitHub (URL)</label>
              <input type="text" v-model="translations['social-github']" />
            </div>
            <div class="form-group">
              <label>LinkedIn (URL)</label>
              <input type="text" v-model="translations['social-linkedin']" />
            </div>
            <div class="form-group">
              <label>X (Twitter URL)</label>
              <input type="text" v-model="translations['social-x']" />
            </div>
            <div class="form-group">
              <label>Número de WhatsApp (ej. +584129330660)</label>
              <input type="text" v-model="translations['whatsapp-number']" />
            </div>
            <div class="form-group">
              <label>Plantilla de mensaje de WhatsApp</label>
              <textarea v-model="translations['whatsapp-message']" rows="2"></textarea>
            </div>
            <button class="save-btn" @click="saveTranslations" :disabled="transSaving">
              {{ transSaving ? 'Guardando...' : 'Guardar Contacto y Redes' }}
            </button>
          </div>
        </div>

        <!-- PROJECTS TAB -->
        <div v-if="activeTab === 'projects'" class="tab-panel">
          <h2>Editar Proyectos</h2>
          <div class="projects-layout">
            <div class="projects-list">
              <div 
                v-for="p in projects" 
                :key="p.id" 
                class="project-card" 
                @click="editProject(p)"
                :class="{ active: currentProject?.id === p.id }"
              >
                {{ p.title || p.id }}
              </div>
            </div>
            
            <div class="project-editor" v-if="currentProject">
              <h3>Editando: {{ currentProject.id }}</h3>
              <div class="form-group">
                <label>Título</label>
                <input type="text" v-model="currentProject.title" />
              </div>
              <div class="form-group">
                <label>Descripción corta para tarjeta (Página principal)</label>
                <input type="text" v-model="currentProject.previewDescription" />
              </div>
              <div class="form-group">
                <label>Descripción completa (HTML permitido)</label>
                <textarea v-model="currentProject.description" rows="10"></textarea>
              </div>
              <div class="form-group">
                <label>Enlace "LIVE VIEW"</label>
                <input type="text" v-model="currentProject.live" />
              </div>
              <div class="form-group">
                <label>Etiquetas (ej. Three.js, Node.js, WebSockets)</label>
                <input type="text" v-model="currentProject.tagsString" />
              </div>
              
              <div class="form-group" style="margin-top: 2rem;">
                <label>Etiqueta del Video y Archivo (.mp4)</label>
                <input type="text" v-model="currentProject.videoCaption" placeholder="Ej. Animated Particle System" style="margin-bottom: 0.5rem;" />
                <input type="file" accept="video/mp4" @change="handleVideoUpload" />
              </div>

              <div class="form-group" style="margin-top: 2rem;">
                <label>Imágenes del Proyecto (Reemplazar)</label>
                <div class="image-grid">
                  <div class="image-card" v-for="img in projectImages" :key="img.filename">
                    <img :src="`/src/assets/images/projects/${currentProject.id}/${img.filename}?t=${Date.now()}`" alt="" />
                    <div class="image-card-info">
                      <span>{{ img.filename }}</span>
                      <input type="text" v-model="img.caption" placeholder="Etiqueta (ej. Tutorial)" class="caption-input" />
                      <input type="file" accept="image/*" @change="e => handleImageUpload(e, img.filename)" />
                    </div>
                  </div>
                </div>
              </div>

              <button class="save-btn" @click="saveProject" :disabled="projSaving">
                {{ projSaving ? 'Guardando...' : 'Guardar Proyecto' }}
              </button>
              <button class="cancel-btn" @click="currentProject = null">Cancelar</button>
            </div>
            <div v-else class="project-editor-empty">
              Selecciona un proyecto de la lista para editar.
            </div>
          </div>
        </div>

      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  background: #1e293b;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #334155;

  h1 {
    margin: 0;
    font-size: 1.25rem;
    color: #e2e8f0;
  }
}

.logout-btn {
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  &:hover { background: #ef4444; color: white; }
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background: #1e293b;
  border-right: 1px solid #334155;
  ul {
    list-style: none;
    padding: 1rem 0;
    margin: 0;
    li {
      padding: 1rem 2rem;
      cursor: pointer;
      color: #94a3b8;
      transition: all 0.2s;
      &:hover { background: #334155; color: white; }
      &.active { background: #38bdf8; color: #0f172a; font-weight: 600; }
    }
  }
}

.content-area {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.subtitle {
  color: #94a3b8;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #cbd5e1;
    font-size: 0.875rem;
  }
  input, textarea {
    width: 100%;
    background: #1e293b;
    border: 1px solid #475569;
    color: white;
    padding: 0.75rem;
    border-radius: 6px;
    font-family: inherit;
    box-sizing: border-box;
    &:focus { border-color: #38bdf8; outline: none; }
  }
}

.save-btn {
  background: #0284c7;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  &:hover { background: #0369a1; }
  &:disabled { opacity: 0.5; }
}

.cancel-btn {
  background: transparent;
  color: #94a3b8;
  border: 1px solid #475569;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 1rem;
  &:hover { background: #334155; }
}

.projects-layout {
  display: flex;
  gap: 2rem;
}

.projects-list {
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.project-card {
  background: #1e293b;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #334155;
  cursor: pointer;
  &:hover { border-color: #38bdf8; }
  &.active { border-color: #38bdf8; background: #0f172a; }
}

.project-editor {
  flex: 1;
  background: #1e293b;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #334155;
  h3 { margin-top: 0; color: #38bdf8; margin-bottom: 1.5rem; }
}

.project-editor-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  border: 2px dashed #334155;
  border-radius: 8px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.image-card {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 6px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    display: block;
  }
  &-info {
    padding: 0.5rem;
    font-size: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    span {
      color: #94a3b8;
      word-break: break-all;
    }
    input[type="file"] {
      padding: 0;
      border: none;
      background: none;
      font-size: 0.7rem;
    }
    .caption-input {
      width: 100%;
      background: #1e293b;
      border: 1px solid #475569;
      color: white;
      padding: 0.4rem;
      border-radius: 4px;
      font-size: 0.75rem;
      box-sizing: border-box;
      &:focus { border-color: #38bdf8; outline: none; }
    }
  }
}
</style>
