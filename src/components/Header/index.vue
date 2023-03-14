<template>
  <div class="h-container">
    <div class="title">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.h-container {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  .title {
    width: 100%;
    height: 44px;
    background: linear-gradient(268deg, #4f80e9 30%, #2c62e6 99%);
    color: #fff;
    font-size: 16px;
    line-height: 44px;
    text-align: center;
  }
}
</style>
