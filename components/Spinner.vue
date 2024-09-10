<template>
  <div class="spinner">⚓</div>
</template>

<style lang="scss" scoped>
.spinner {
  animation: spin 1s linear infinite;
  font-size: 2rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
