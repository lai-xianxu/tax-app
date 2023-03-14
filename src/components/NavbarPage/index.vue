<template>
  <div class="page-container" @click.stop="handleFullScreen">
    <!-- 导航栏 -->
    <Navbar v-bind="$attrs" v-on="$event">
      <template v-for="(item, key) in $slots" :key="key" #[key]="data">
        <slot :name="key" v-bind="data"></slot>
      </template>
    </Navbar>

    <!-- 页面 -->
    <div class="page">
      <slot />
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar/index.vue';

const emit = defineEmits(['handleFullScreen']);

/* 点击全屏 */
const handleFullScreen = () => {
  emit('handleFullScreen');
};
</script>

<style scoped lang="scss">
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  .page {
    position: relative;
    flex: 1;
    overflow: auto;
  }
}
</style>
