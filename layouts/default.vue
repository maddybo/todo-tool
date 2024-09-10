<template>
  <div class="content-wrapper">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  width: 100%;
}

@media only screen and (min-width: 600px) {
  .content-wrapper {
    justify-content: center;
  }
}
</style>
