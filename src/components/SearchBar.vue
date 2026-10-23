<script setup>
const props = defineProps({
  busqueda: {
    type: String,
    default: '',
  },
  region: {
    type: String,
    default: '',
  },
  regiones: {
    type: Array,
    default: () => [],
  },
  totalResultados: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:busqueda', 'update:region'])
</script>

<template>
  <div class="search-bar" id="search-bar">
    <div class="search-bar__row">
      <!-- Campo de búsqueda con v-model -->
      <div class="search-bar__input-group">
        <span class="search-bar__icon">🔎</span>
        <input
          id="search-input"
          type="text"
          class="search-bar__input"
          placeholder="Buscar país por nombre o capital..."
          :value="busqueda"
          @input="emit('update:busqueda', $event.target.value)"
        />
        <button
          v-if="busqueda"
          class="search-bar__clear"
          @click="emit('update:busqueda', '')"
          aria-label="Limpiar búsqueda"
        >
          ✕
        </button>
      </div>

      <!-- Filtro por región con v-model -->
      <div class="search-bar__select-group">
        <span class="search-bar__icon">🌐</span>
        <select
          id="region-filter"
          class="search-bar__select"
          :value="region"
          @change="emit('update:region', $event.target.value)"
        >
          <option value="">Todas las regiones</option>
          <option v-for="r in regiones" :key="r" :value="r">
            {{ r }}
          </option>
        </select>
      </div>
    </div>

    <!-- Contador de resultados -->
    <div class="search-bar__results">
      <span class="search-bar__badge">{{ totalResultados }}</span>
      <span class="search-bar__results-text">
        {{ totalResultados === 1 ? 'país encontrado' : 'países encontrados' }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  backdrop-filter: blur(10px);
  animation: fadeInUp var(--transition-slow) ease-out;
}

.search-bar__row {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

/* --- Input Group --- */
.search-bar__input-group {
  flex: 2;
  min-width: 250px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-bar__icon {
  position: absolute;
  left: var(--spacing-md);
  font-size: var(--font-size-lg);
  pointer-events: none;
  z-index: 1;
}

.search-bar__input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 3rem;
  background: var(--color-bg-input);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    background var(--transition-base);
  outline: none;
}

.search-bar__input::placeholder {
  color: var(--color-text-muted);
}

.search-bar__input:focus {
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 3px var(--color-accent-glow);
  background: rgba(255, 255, 255, 0.08);
}

.search-bar__clear {
  position: absolute;
  right: var(--spacing-sm);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: var(--color-text-secondary);
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  transition:
    background var(--transition-fast),
    color var(--transition-fast);
}

.search-bar__clear:hover {
  background: rgba(248, 113, 113, 0.2);
  color: var(--color-error);
}

/* --- Select Group --- */
.search-bar__select-group {
  flex: 1;
  min-width: 200px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-bar__select {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 3rem;
  background: var(--color-bg-input);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  appearance: none;
  cursor: pointer;
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base);
  outline: none;
}

.search-bar__select:focus {
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 3px var(--color-accent-glow);
}

.search-bar__select option {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

/* --- Results --- */
.search-bar__results {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.search-bar__badge {
  background: var(--color-accent-gradient);
  color: white;
  font-weight: 700;
  font-size: var(--font-size-sm);
  padding: 2px 10px;
  border-radius: var(--radius-full);
  min-width: 28px;
  text-align: center;
}

.search-bar__results-text {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .search-bar__row {
    flex-direction: column;
  }

  .search-bar__input-group,
  .search-bar__select-group {
    min-width: 100%;
  }
}
</style>
