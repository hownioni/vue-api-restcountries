<script setup>
defineProps({
  mensaje: {
    type: String,
    default: 'No fue posible obtener los datos de la API',
  },
})
</script>

<template>
  <div class="error" id="error-message">
    <div class="error__icon-wrapper">
      <span class="error__icon">⚠️</span>
    </div>
    <h2 class="error__title">¡Algo salió mal!</h2>
    <p class="error__message">{{ mensaje }}</p>
    <button class="error__retry" @click="$router ? $router.go(0) : location.reload()">
      🔄 Reintentar
    </button>
  </div>
</template>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3xl) var(--spacing-xl);
  animation: fadeIn var(--transition-base) ease-out;
}

.error__icon-wrapper {
  width: 80px;
  height: 80px;
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
}

.error__icon {
  font-size: 2.5rem;
}

.error__title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-error);
  margin-bottom: var(--spacing-sm);
}

.error__message {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  text-align: center;
  max-width: 400px;
  margin-bottom: var(--spacing-xl);
}

.error__retry {
  background: var(--color-bg-input);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition:
    background var(--transition-fast),
    border-color var(--transition-fast),
    transform var(--transition-fast);
}

.error__retry:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--color-border-hover);
  transform: translateY(-1px);
}
</style>
