<template>
  <nav class="navbar-container fsbc">
    <div class="back-box fsc" @click.stop="onBack">
      <img src="@/assets/my/left-arrow.png" alt="" />
      <div class="back">返回</div>
    </div>
    <div class="title te1" :class="{ text1: aRow }">{{ label }}</div>
    <div @click.stop="handleNavbarRight">
      <slot name="navbarRight" />
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
  label: {
    type: String,
    default: '个人所得税',
  },
  aRow: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['back', 'handleNavbarRight']);

const router = useRouter();

/* 返回 */
const onBack = () => {
  router.go(-1);
  emit('back');
};

/* 点击右侧 */
const handleNavbarRight = () => {
  emit('handleNavbarRight');
};
</script>

<style scoped lang="scss">
.navbar-container {
  position: relative;
  width: 100%;
  height: 47px;
  background: #fff;
  border-bottom: 1px solid rgba(238, 237, 237, 0.6);
  .back-box {
    cursor: pointer;
    &:active {
      opacity: 0.8;
    }
    img {
      width: 8.5px;
      height: 16px;
      margin-left: 16px;
    }
    .back {
      line-height: 20px;
      font-size: 14px;
      font-weight: normal;
      letter-spacing: 0.04em;
      color: #5084ea;
      margin-left: 4.5px;
    }
  }

  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    line-height: 23px;
    font-size: 17px;
    font-weight: 450;
    letter-spacing: 0.06em;
    color: #3d3d3d;
  }
  .text1 {
    max-width: 180px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    word-break: break-all;
  }
}
</style>
