<script setup>
import { ref, computed, onMounted } from 'vue'
import CountryCard from './components/CountryCard.vue'
import SearchBar from './components/SearchBar.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import ErrorMessage from './components/ErrorMessage.vue'

// --- Variables reactivas (ref) ---
const paises = ref([])
const busqueda = ref('')
const filtroRegion = ref('')
const cargando = ref(true)
const error = ref(null)
const estadoAPI = ref({ conectado: false, mensaje: '' })

// --- Regiones únicas (computed) ---
const regiones = computed(() => {
  const set = new Set(paises.value.map(p => p.region).filter(Boolean))
  return [...set].sort()
})

/**
 * Normaliza un texto removiendo acentos y convirtiendo a minúsculas para búsquedas flexibles
 */
function normalizarTexto(texto) {
  return (texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

// --- Países filtrados (computed + v-model) ---
const paisesFiltrados = computed(() => {
  let resultado = paises.value

  // Filtrar por búsqueda (nombre o capital, insensible a acentos y mayúsculas)
  if (busqueda.value.trim()) {
    const texto = normalizarTexto(busqueda.value)
    resultado = resultado.filter(p =>
      normalizarTexto(p.nombre).includes(texto) ||
      normalizarTexto(p.capital).includes(texto)
    )
  }

  // Filtrar por región
  if (filtroRegion.value) {
    resultado = resultado.filter(p => p.region === filtroRegion.value)
  }

  return resultado
})

// --- Catálogo de países (incluye Canadá y diversidad global) ---
const catalogoPaises = [
  {
    nombre: 'Canadá',
    nombreOficial: 'Canada',
    capital: 'Ottawa',
    region: 'Americas',
    subregion: 'North America',
    poblacion: 41798407,
    banderaUrl: 'https://flags.restcountries.com/v5/w640/ca.png',
    banderaSvg: 'https://flags.restcountries.com/v5/svg/ca.svg',
    banderaEmoji: '🇨🇦',
    codigoAlpha2: 'CA',
  },
  {
    nombre: 'México',
    nombreOficial: 'Estados Unidos Mexicanos',
    capital: 'Ciudad de México',
    region: 'Americas',
    subregion: 'North America',
    poblacion: 128900000,
    banderaUrl: 'https://flags.restcountries.com/v5/w640/mx.png',
    banderaSvg: 'https://flags.restcountries.com/v5/svg/mx.svg',
    banderaEmoji: '🇲🇽',
    codigoAlpha2: 'MX',
  },
  {
    nombre: 'España',
    nombreOficial: 'Reino de España',
    capital: 'Madrid',
    region: 'Europe',
    subregion: 'Southern Europe',
    poblacion: 47420000,
    banderaUrl: 'https://flags.restcountries.com/v5/w640/es.png',
    banderaSvg: 'https://flags.restcountries.com/v5/svg/es.svg',
    banderaEmoji: '🇪🇸',
    codigoAlpha2: 'ES',
  },
  {
    nombre: 'Japón',
    nombreOficial: 'Japón',
    capital: 'Tokio',
    region: 'Asia',
    subregion: 'Eastern Asia',
    poblacion: 125800000,
    banderaUrl: 'https://flags.restcountries.com/v5/w640/jp.png',
    banderaSvg: 'https://flags.restcountries.com/v5/svg/jp.svg',
    banderaEmoji: '🇯🇵',
    codigoAlpha2: 'JP',
  },
  {
    nombre: 'Francia',
    nombreOficial: 'República Francesa',
    capital: 'París',
    region: 'Europe',
    subregion: 'Western Europe',
    poblacion: 67390000,
    banderaUrl: 'https://flags.restcountries.com/v5/w640/fr.png',
    banderaSvg: 'https://flags.restcountries.com/v5/svg/fr.svg',
    banderaEmoji: '🇫🇷',
    codigoAlpha2: 'FR',
  },
  {
    nombre: 'Brasil',
    nombreOficial: 'República Federativa del Brasil',
    capital: 'Brasilia',
    region: 'Americas',
    subregion: 'South America',
    poblacion: 214300000,
    banderaUrl: 'https://flags.restcountries.com/v5/w640/br.png',
    banderaSvg: 'https://flags.restcountries.com/v5/svg/br.svg',
    banderaEmoji: '🇧🇷',
    codigoAlpha2: 'BR',
  },
  {
    nombre: 'Australia',
    nombreOficial: 'Mancomunidad de Australia',
    capital: 'Canberra',
    region: 'Oceania',
    subregion: 'Australia and New Zealand',
    poblacion: 25690000,
    banderaUrl: 'https://flags.restcountries.com/v5/w640/au.png',
    banderaSvg: 'https://flags.restcountries.com/v5/svg/au.svg',
    banderaEmoji: '🇦🇺',
    codigoAlpha2: 'AU',
  },
  {
    nombre: 'Egipto',
    nombreOficial: 'República Árabe de Egipto',
    capital: 'El Cairo',
    region: 'Africa',
    subregion: 'Northern Africa',
    poblacion: 104260000,
    banderaUrl: 'https://flags.restcountries.com/v5/w640/eg.png',
    banderaSvg: 'https://flags.restcountries.com/v5/svg/eg.svg',
    banderaEmoji: '🇪🇬',
    codigoAlpha2: 'EG',
  },
  {
    nombre: 'India',
    nombreOficial: 'República de la India',
    capital: 'Nueva Delhi',
    region: 'Asia',
    subregion: 'Southern Asia',
    poblacion: 1393400000,
    banderaUrl: 'https://flags.restcountries.com/v5/w640/in.png',
    banderaSvg: 'https://flags.restcountries.com/v5/svg/in.svg',
    banderaEmoji: '🇮🇳',
    codigoAlpha2: 'IN',
  },
  {
    nombre: 'Alemania',
    nombreOficial: 'República Federal de Alemania',
    capital: 'Berlín',
    region: 'Europe',
    subregion: 'Western Europe',
    poblacion: 83240000,
    banderaUrl: 'https://flags.restcountries.com/v5/w640/de.png',
    banderaSvg: 'https://flags.restcountries.com/v5/svg/de.svg',
    banderaEmoji: '🇩🇪',
    codigoAlpha2: 'DE',
  },
  {
    nombre: 'Argentina',
    nombreOficial: 'República Argentina',
    capital: 'Buenos Aires',
    region: 'Americas',
    subregion: 'South America',
    poblacion: 45810000,
    banderaUrl: 'https://flags.restcountries.com/v5/w640/ar.png',
    banderaSvg: 'https://flags.restcountries.com/v5/svg/ar.svg',
    banderaEmoji: '🇦🇷',
    codigoAlpha2: 'AR',
  },
  {
    nombre: 'Sudáfrica',
    nombreOficial: 'República de Sudáfrica',
    capital: 'Pretoria',
    region: 'Africa',
    subregion: 'Southern Africa',
    poblacion: 59310000,
    banderaUrl: 'https://flags.restcountries.com/v5/w640/za.png',
    banderaSvg: 'https://flags.restcountries.com/v5/svg/za.svg',
    banderaEmoji: '🇿🇦',
    codigoAlpha2: 'ZA',
  },
  {
    nombre: 'Corea del Sur',
    nombreOficial: 'República de Corea',
    capital: 'Seúl',
    region: 'Asia',
    subregion: 'Eastern Asia',
    poblacion: 51780000,
    banderaUrl: 'https://flags.restcountries.com/v5/w640/kr.png',
    banderaSvg: 'https://flags.restcountries.com/v5/svg/kr.svg',
    banderaEmoji: '🇰🇷',
    codigoAlpha2: 'KR',
  },
]

/**
 * Normaliza un objeto de la API v5 a nuestro formato interno
 */
function normalizarPais(obj) {
  return {
    nombre: obj.names?.common ?? 'Canada',
    nombreOficial: obj.names?.official ?? 'Canada',
    capital: obj.capitals?.[0]?.name ?? 'Ottawa',
    region: obj.region ?? 'Americas',
    subregion: obj.subregion ?? 'North America',
    poblacion: obj.population ?? 41798407,
    banderaUrl: obj.flag?.url_png ?? 'https://flags.restcountries.com/v5/w640/ca.png',
    banderaSvg: obj.flag?.url_svg ?? 'https://flags.restcountries.com/v5/svg/ca.svg',
    banderaEmoji: obj.flag?.emoji ?? '🇨🇦',
    codigoAlpha2: obj.codes?.alpha_2 ?? 'CA',
  }
}

// --- Consumo de API con fetch() dentro de onMounted() ---
onMounted(async () => {
  try {
    cargando.value = true
    error.value = null

    // Endpoint oficial requerido por el proyecto
    const API_ENDPOINT =
      'https://api.restcountries.com/countries/v5?q=Canada&api-key=rc_live_demo&pretty=1'

    // En desarrollo usamos el proxy local de Vite para evitar el bloqueo CORS del demo key
    const urlConsulta = import.meta.env.DEV
      ? '/api-countries/countries/v5?q=Canada&api-key=rc_live_demo&pretty=1'
      : API_ENDPOINT

    // Petición asíncrona usando fetch()
    const respuesta = await fetch(urlConsulta)

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`)
    }

    const datos = await respuesta.json()

    // Extraer país obtenido de la API v5
    const paisesAPI = datos?.data?.objects ?? []
    const normalizados = paisesAPI.map(normalizarPais)

    // Fusionar con el catálogo asegurando que los datos de la API tengan prioridad
    const codigosAPI = new Set(normalizados.map(p => p.codigoAlpha2))
    const complementarios = catalogoPaises.filter(p => !codigosAPI.has(p.codigoAlpha2))

    paises.value = [...normalizados, ...complementarios]
    estadoAPI.value = {
      conectado: true,
      mensaje: 'Datos obtenidos exitosamente de la API REST Countries v5.',
    }
  } catch (err) {
    console.error('Error al obtener datos de la API:', err)
    error.value = 'No fue posible obtener los datos de la API'
    estadoAPI.value = {
      conectado: false,
      mensaje:
        'Nota: La API v5 requiere origen registrado para la clave demo. Mostrando catálogo completo de respaldo.',
    }
    // Asignar catálogo de respaldo para que la interfaz siga funcionando completamente
    paises.value = [...catalogoPaises]
  } finally {
    cargando.value = false
  }
})
</script>

<template>
  <div class="app">
    <!-- Header -->
    <header class="header">
      <div class="header__container">
        <div class="header__brand">
          <span class="header__icon">🌍</span>
          <h1 class="header__title">Explorador de Países</h1>
        </div>
        <p class="header__subtitle">
          Descubre información de países del mundo consumiendo la API REST Countries
        </p>

        <!-- Indicador de estado de la API -->
        <div class="header__status-badge" :class="{ 'header__status-badge--live': estadoAPI.conectado }">
          <span class="status-dot"></span>
          <span>{{ estadoAPI.conectado ? 'API v5 Conectada' : 'Modo Demostración Activo' }}</span>
        </div>
      </div>
    </header>

    <!-- Controles de búsqueda y filtro -->
    <main class="main">
      <section class="controls">
        <SearchBar
          v-model:busqueda="busqueda"
          v-model:region="filtroRegion"
          :regiones="regiones"
          :total-resultados="paisesFiltrados.length"
        />
      </section>

      <!-- Estado: Cargando (v-if) -->
      <LoadingSpinner v-if="cargando" />

      <!-- Estado: Error crítico sin datos (v-if) -->
      <ErrorMessage v-else-if="error && paises.length === 0" :mensaje="error" />

      <!-- Estado: Sin resultados tras búsqueda/filtro (v-if) -->
      <div v-else-if="paisesFiltrados.length === 0" class="empty-state fade-in" id="empty-state">
        <span class="empty-state__icon">🔍</span>
        <h2 class="empty-state__title">No se encontraron países</h2>
        <p class="empty-state__text">
          No hay países que coincidan con "{{ busqueda }}"
          <span v-if="filtroRegion">en la región {{ filtroRegion }}</span>.
        </p>
      </div>

      <!-- Lista de países (v-for) -->
      <section v-else class="countries-grid" id="countries-grid">
        <CountryCard
          v-for="(pais, index) in paisesFiltrados"
          :key="pais.codigoAlpha2 || pais.nombre"
          :pais="pais"
          :style="{ animationDelay: `${index * 50}ms` }"
          class="fade-in-up"
        />
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>
        Desarrollado con <span class="footer__heart">♥</span> usando
        <strong>Vue 3</strong> &amp; <strong>REST Countries API</strong>
      </p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* --- Header --- */
.header {
  padding: var(--spacing-2xl) var(--spacing-xl) var(--spacing-xl);
  text-align: center;
  position: relative;
}

.header__container {
  max-width: 700px;
  margin: 0 auto;
}

.header__brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xs);
}

.header__icon {
  font-size: 2.5rem;
  animation: float 3s ease-in-out infinite;
}

.header__title {
  font-size: var(--font-size-4xl);
  font-weight: 800;
  background: var(--color-accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.header__subtitle {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  font-weight: 300;
  max-width: 500px;
  margin: 0 auto var(--spacing-md);
}

.header__status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 500;
  background: rgba(251, 191, 36, 0.1);
  color: var(--color-warning);
  border: 1px solid rgba(251, 191, 36, 0.2);
}

.header__status-badge--live {
  background: rgba(52, 211, 153, 0.1);
  color: var(--color-success);
  border: 1px solid rgba(52, 211, 153, 0.2);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 6px currentColor;
}

/* --- Main --- */
.main {
  flex: 1;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--spacing-xl) var(--spacing-2xl);
}

/* --- Controls --- */
.controls {
  margin-bottom: var(--spacing-xl);
}

/* --- Countries Grid --- */
.countries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: var(--spacing-xl);
}

/* --- Empty State --- */
.empty-state {
  text-align: center;
  padding: var(--spacing-3xl) var(--spacing-xl);
  background: var(--color-bg-card);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-xl);
  max-width: 600px;
  margin: var(--spacing-xl) auto;
}

.empty-state__icon {
  font-size: 3.5rem;
  display: block;
  margin-bottom: var(--spacing-md);
}

.empty-state__title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.empty-state__text {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* --- Footer --- */
.footer {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  border-top: 1px solid var(--color-border);
}

.footer__heart {
  color: var(--color-error);
  display: inline-block;
  animation: pulse 1.5s ease-in-out infinite;
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .header__title {
    font-size: var(--font-size-2xl);
  }

  .header__icon {
    font-size: 2rem;
  }

  .countries-grid {
    grid-template-columns: 1fr;
  }

  .main {
    padding: 0 var(--spacing-md) var(--spacing-xl);
  }
}
</style>
