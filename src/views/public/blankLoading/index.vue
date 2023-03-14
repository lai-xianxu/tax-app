<template>
  <NavbarPage :label="$route.query?.title || ''" style="background-color: #fff" @handle-full-screen="$router.go(-1)">
    <div class="loading">
      <van-loading type="spinner" color="#fff" size="24" />
    </div>
  </NavbarPage>
</template>

<script setup></script>

<style scoped lang="scss">
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.35);
  width: 92px;
  height: 92px;
  border-radius: 4px;
}
</style>
