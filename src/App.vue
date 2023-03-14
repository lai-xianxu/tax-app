<template>
  <div id="app">
    <router-view v-slot="{ Component, route }">
      <!-- 缓存 -->
      <keep-alive>
        <component :is="Component" v-if="route.meta.keepAlive" :key="$route.fullPath" />
      </keep-alive>

      <!-- 非缓存 -->
      <component :is="Component" v-if="!route.meta.keepAlive" />
    </router-view>
  </div>
</template>

<script setup></script>

<style lang="scss">
@import './common/font.css';
#app {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 12px;
  background: #f6f7fb;
}
</style>
