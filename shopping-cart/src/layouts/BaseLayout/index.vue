<script setup>
/**
 * Layout: use for pages're logged
 */
</script>

<template>
  <div class="base-layout">
    <header>
      <div style="height: 200px;"></div>
    </header>
    <div class="layout-root">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './styles.scss';
</style>
