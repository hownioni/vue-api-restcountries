<template>
  <div class="loading" id="loading-indicator">
    <div class="loading__spinner">
      <div class="loading__ring"></div>
      <span class="loading__globe">🌍</span>
    </div>
    <h2 class="loading__text">Cargando países...</h2>
    <p class="loading__subtext">Obteniendo datos de la API REST Countries</p>
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3xl) var(--spacing-xl);
  animation: fadeIn var(--transition-base) ease-out;
}

.loading__spinner {
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: var(--spacing-xl);
}

.loading__ring {
  position: absolute;
  inset: 0;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading__globe {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  animation: pulse 1.5s ease-in-out infinite;
}

.loading__text {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.loading__subtext {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
</style>
