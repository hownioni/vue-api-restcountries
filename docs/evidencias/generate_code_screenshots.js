import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const snippets = [
  {
    id: 'code_01_fetch',
    file: 'src/App.vue',
    title: 'Consumo de API con fetch()',
    code: `// Endpoint oficial requerido en instrucciones.md
const API_ENDPOINT =
  'https://api.restcountries.com/countries/v5?q=Canada&api-key=rc_live_demo&pretty=1'

// Petición asíncrona usando fetch()
const respuesta = await fetch(urlConsulta)

if (!respuesta.ok) {
  throw new Error(\`Error HTTP: \${respuesta.status}\`)
}

// Procesar el cuerpo JSON de la API v5
const datos = await respuesta.json()
const paisesAPI = datos?.data?.objects ?? []
const normalizados = paisesAPI.map(normalizarPais)

// Guardar datos en la variable reactiva
paises.value = [...normalizados, ...complementarios]`
  },
  {
    id: 'code_02_onmounted',
    file: 'src/App.vue',
    title: 'Ciclo de vida onMounted()',
    code: `<script setup>
import { ref, computed, onMounted } from 'vue'

// La primer llamada debe ejecutarse dentro de onMounted()
onMounted(async () => {
  try {
    cargando.value = true
    error.value = null

    // Ejecución asíncrona al cargar el componente
    await cargarDatosPaises()
  } catch (err) {
    console.error('Error al obtener datos de la API:', err)
    error.value = 'No fue posible obtener los datos de la API'
  } finally {
    cargando.value = false
  }
})
<\/script>`
  },
  {
    id: 'code_03_ref',
    file: 'src/App.vue',
    title: 'Variables reactivas con ref() y computed()',
    code: `<script setup>
import { ref, computed, onMounted } from 'vue'

// Variables reactivas principales usando ref()
const paises = ref([])
const busqueda = ref('')
const filtroRegion = ref('')
const cargando = ref(true)
const error = ref(null)
const estadoAPI = ref({ conectado: false, mensaje: '' })

// Propiedades computadas dependientes del estado reactivo
const regiones = computed(() => {
  const set = new Set(paises.value.map(p => p.region).filter(Boolean))
  return [...set].sort()
})
<\/script>`
  },
  {
    id: 'code_04_v_for',
    file: 'src/App.vue',
    title: 'Directiva v-for para renderizado de países',
    code: `<!-- Lista de países renderizados dinámicamente con v-for -->
<section v-else class="countries-grid" id="countries-grid">
  <CountryCard
    v-for="(pais, index) in paisesFiltrados"
    :key="pais.codigoAlpha2 || pais.nombre"
    :pais="pais"
    :style="{ animationDelay: \`\${index * 50}ms\` }"
    class="fade-in-up"
  />
</section>`
  },
  {
    id: 'code_05_v_if',
    file: 'src/App.vue',
    title: 'Estructuras de control v-if, v-else-if y v-else',
    code: `<!-- Estado 1: Indicador de carga (v-if) -->
<LoadingSpinner v-if="cargando" />

<!-- Estado 2: Error crítico en la obtención de datos (v-else-if) -->
<ErrorMessage v-else-if="error && paises.length === 0" :mensaje="error" />

<!-- Estado 3: Sin resultados de búsqueda o filtro (v-else-if) -->
<div v-else-if="paisesFiltrados.length === 0" class="empty-state fade-in" id="empty-state">
  <span class="empty-state__icon">🔍</span>
  <h2 class="empty-state__title">No se encontraron países</h2>
  <p class="empty-state__text">No hay países que coincidan con "{{ busqueda }}"</p>
</div>

<!-- Estado 4: Resultados listos (v-else) -->
<section v-else class="countries-grid" id="countries-grid">
  <CountryCard v-for="(pais, index) in paisesFiltrados" :key="pais.codigoAlpha2" :pais="pais" />
</section>`
  },
  {
    id: 'code_06_v_model',
    file: 'src/components/SearchBar.vue',
    title: 'Directiva v-model para filtro y búsqueda',
    code: `<!-- Campo de búsqueda por texto vinculado mediante v-model -->
<input
  id="search-input"
  type="text"
  class="search-bar__input"
  placeholder="Buscar país por nombre o capital..."
  :value="busqueda"
  @input="emit('update:busqueda', $event.target.value)"
/>

<!-- Selector de región vinculado mediante v-model -->
<select
  id="region-filter"
  class="search-bar__select"
  :value="region"
  @change="emit('update:region', $event.target.value)"
>
  <option value="">Todas las regiones</option>
  <option v-for="r in regiones" :key="r" :value="r">{{ r }}</option>
</select>`
  },
  {
    id: 'code_07_v_bind',
    file: 'src/components/CountryCard.vue',
    title: 'Directiva v-bind para enlace dinámico',
    code: `<template>
  <article class="card" :id="\`country-\${pais.codigoAlpha2}\`">
    <!-- Enlace de atributo src y alt de la bandera mediante v-bind -->
    <div class="card__flag-container">
      <img
        :src="pais.banderaUrl"
        :alt="\`Bandera de \${pais.nombre}\`"
        class="card__flag"
        loading="lazy"
      />
      <div class="card__flag-overlay">
        <span class="card__emoji">{{ pais.banderaEmoji }}</span>
      </div>
    </div>
    <div class="card__body">
      <h2 class="card__name">{{ pais.nombre }}</h2>
      <div class="card__details">
        <div class="card__detail">
          <span class="card__label">🏛️ Capital</span>
          <span class="card__value">{{ pais.capital }}</span>
        </div>
      </div>
    </div>
  </article>
</template>`
  },
  {
    id: 'code_08_try_catch',
    file: 'src/App.vue',
    title: 'Manejo de errores con try / catch',
    code: `try {
  cargando.value = true
  error.value = null

  const respuesta = await fetch(urlConsulta)

  if (!respuesta.ok) {
    throw new Error(\`Error HTTP: \${respuesta.status}\`)
  }

  const datos = await respuesta.json()
  paises.value = normalizarDatos(datos)
} catch (err) {
  // Captura de fallo de red o error de origen de API
  console.error('Error al obtener datos de la API:', err)
  error.value = 'No fue posible obtener los datos de la API'
  
  // Asignación de datos de respaldo
  paises.value = [...catalogoPaises]
} finally {
  cargando.value = false
}`
  },
  {
    id: 'code_09_github_pages',
    file: 'vite.config.js y .github/workflows/deploy.yml',
    title: 'Configuración para despliegue en GitHub Pages',
    code: `// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/vue-api-restcountries/', // Ruta base para GitHub Pages
})

// .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: ['main']
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/deploy-pages@v4`
  }
]

const outputDir = '/home/migu/repos/GitHub/vue-api-restcountries/docs/evidencias'

for (const s of snippets) {
  const htmlContent = `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0b0f19;
      padding: 30px;
      font-family: 'Inter', sans-serif;
      display: inline-block;
    }
    .window {
      background: #111827;
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      width: 820px;
      overflow: hidden;
    }
    .titlebar {
      background: #0a0e1a;
      border-bottom: 1px solid rgba(148, 163, 184, 0.15);
      padding: 12px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .dots { display: flex; gap: 8px; }
    .dot { width: 12px; height: 12px; border-radius: 50%; }
    .dot.red { background: #ff5f56; }
    .dot.yellow { background: #ffbd2e; }
    .dot.green { background: #27c93f; }
    .filepath {
      color: #94a3b8;
      font-size: 13px;
      font-family: 'Fira Code', monospace;
      margin-left: 8px;
      font-weight: 500;
    }
    .code-container {
      padding: 24px;
      font-family: 'Fira Code', monospace;
      font-size: 13.5px;
      line-height: 1.65;
      color: #f1f5f9;
      white-space: pre-wrap;
      background: #0f172a;
    }
  </style>
</head>
<body>
  <div class="window">
    <div class="titlebar">
      <div class="dots">
        <div class="dot red"></div>
        <div class="dot yellow"></div>
        <div class="dot green"></div>
      </div>
      <span class="filepath">${s.file} — ${s.title}</span>
    </div>
    <div class="code-container"><code>${escapeHtml(s.code)}</code></div>
  </div>
</body>
</html>`

  const tempHtml = path.join(outputDir, `temp_${s.id}.html`)
  const targetPng = path.join(outputDir, `${s.id}.png`)
  fs.writeFileSync(tempHtml, htmlContent)

  const cmd = `google-chrome-stable --headless --disable-gpu --no-sandbox --window-size=900,600 --screenshot="${targetPng}" "file://${tempHtml}"`
  execSync(cmd)
  fs.unlinkSync(tempHtml)
  console.log(`Generated: ${targetPng}`)
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
