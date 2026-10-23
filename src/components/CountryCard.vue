<script setup>
defineProps({
  pais: {
    type: Object,
    required: true,
  },
})

/**
 * Formatea un número de población con separadores de miles
 */
function formatearPoblacion(num) {
  return new Intl.NumberFormat('es-MX').format(num)
}
</script>

<template>
  <article class="card" :id="`country-${pais.codigoAlpha2}`">
    <!-- Bandera del país (v-bind con :src y :alt) -->
    <div class="card__flag-container">
      <img
        :src="pais.banderaUrl"
        :alt="`Bandera de ${pais.nombre}`"
        class="card__flag"
        loading="lazy"
      />
      <div class="card__flag-overlay">
        <span class="card__emoji">{{ pais.banderaEmoji }}</span>
      </div>
    </div>

    <!-- Información del país -->
    <div class="card__body">
      <h2 class="card__name">{{ pais.nombre }}</h2>

      <div class="card__details">
        <div class="card__detail">
          <span class="card__label">🏛️ Capital</span>
          <span class="card__value">{{ pais.capital }}</span>
        </div>
        <div class="card__detail">
          <span class="card__label">🌎 Región</span>
          <span class="card__value">{{ pais.region }}</span>
        </div>
        <div class="card__detail">
          <span class="card__label">👥 Población</span>
          <span class="card__value">{{ formatearPoblacion(pais.poblacion) }}</span>
        </div>
        <div v-if="pais.subregion" class="card__detail">
          <span class="card__label">📍 Subregión</span>
          <span class="card__value">{{ pais.subregion }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition:
    transform var(--transition-spring),
    box-shadow var(--transition-base),
    border-color var(--transition-base);
  cursor: default;
  backdrop-filter: blur(10px);
}

.card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: var(--shadow-xl), var(--shadow-glow);
  border-color: var(--color-border-hover);
}

/* --- Flag --- */
.card__flag-container {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: var(--color-bg-secondary);
}

.card__flag {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.card:hover .card__flag {
  transform: scale(1.08);
}

.card__flag-overlay {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  width: 42px;
  height: 42px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(-4px);
  transition:
    opacity var(--transition-base),
    transform var(--transition-base);
}

.card:hover .card__flag-overlay {
  opacity: 1;
  transform: translateY(0);
}

.card__emoji {
  font-size: 1.4rem;
}

/* --- Body --- */
.card__body {
  padding: var(--spacing-lg);
}

.card__name {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  letter-spacing: -0.01em;
}

/* --- Details --- */
.card__details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.card__detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-xs) 0;
  border-bottom: 1px solid var(--color-border);
}

.card__detail:last-child {
  border-bottom: none;
}

.card__label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: 400;
}

.card__value {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 600;
  text-align: right;
}
</style>
