<template>
  <div
    ref="dragVerify"
    class="drag-verify"
    :style="{ background: background }"
    @mousemove="dragMoving"
    @mouseup="dragFinish"
    @mouseleave="dragFinish"
    @touchmove="dragMoving"
    @touchend="dragFinish"
  >
    <div
      ref="progressBar"
      class="dv-progress-bar"
      :class="{ goFirst2: isOk }"
      :style="{ background: progressBarBg }"
    ></div>
    <div ref="message" class="dv-text" :style="{ paddingRight: isPassing ? '1.28rem' : '' }">
      {{ messageText }}
    </div>

    <div
      ref="handler"
      class="dv-handler"
      :class="{ goFirst: isOk }"
      :style="{ background: handlerBg }"
      @mousedown="dragStart"
      @touchstart="dragStart"
    >
      <img :src="moveIcon" alt="" />
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import handlerIcon from '@/assets/my/double-right-arrow.png';
import successIcon from '@/assets/my/success.png';

const props = defineProps({
  isPassing: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '请按住滑块，拖动到最右边',
  },
  successText: {
    type: String,
    default: '验证通过',
  },
  background: {
    type: String,
    default: '#f1f2f6',
  },
  progressBarBg: {
    type: String,
    default: '#8ac051',
  },
  completedBg: {
    type: String,
    default: '#8ac051',
  },
  handlerIcon: {
    type: String,
    default: handlerIcon,
  },
  successIcon: {
    type: String,
    default: successIcon,
  },
  handlerBg: {
    type: String,
    default: '#fff',
  },
  textColor: {
    type: String,
    default: '#3D3D3D',
  },
});

const emit = defineEmits(['handlerMove', 'passfail', 'update:isPassing', 'passcallback']);

const isMoving = ref(false);
const x = ref(0);
const isOk = ref(false);
const dragVerify = ref(null);
const progressBar = ref(null);
const message = ref(null);
const handler = ref(null);
const width = ref(340);
const height = ref(48);
const rootFontSize = parseFloat(document.documentElement.style.fontSize);

const remJs = (e) => {
  return e / rootFontSize;
};

const moveIcon = computed(() => {
  return props.isPassing ? props.successIcon : props.handlerIcon;
});

const messageText = computed(() => {
  return props.isPassing ? props.successText : props.text;
});

const dragStart = (e) => {
  if (!props.isPassing) {
    isMoving.value = true;
    x.value = e.pageX || e.touches[0].pageX;
  }
  emit('handlerMove');
};
const dragMoving = (e) => {
  if (isMoving.value && !props.isPassing) {
    const _x = (e.pageX || e.touches[0].pageX) - x.value;
    if (_x > 0 && _x <= width.value - height.value) {
      handler.value.style.left = `${remJs(_x)}rem`;
      progressBar.value.style.width = `${remJs(_x + height.value)}rem`;
    } else if (_x > width.value - height.value) {
      setTimeout(() => {
        handler.value.style.left = `${remJs(width.value - height.value)}rem`;
        progressBar.value.style.width = `${remJs(width.value - height.value)}rem`;
        passVerify();
      }, 400);
    }
  }
};
const dragFinish = (e) => {
  if (isMoving.value && !props.isPassing) {
    const _x = (e.pageX || e.changedTouches[0].pageX) - x.value;
    if (_x < width.value - height.value) {
      isOk.value = true;
      setTimeout(() => {
        handler.value.style.left = '0';
        progressBar.value.style.width = '0';
        isOk.value = false;
      }, 500);
      emit('passfail');
    } else {
      setTimeout(() => {
        handler.value.style.left = `${remJs(width.value - height.value)}rem`;
        progressBar.value.style.width = `${remJs(width.value - height.value)}rem`;
        passVerify();
      }, 400);
    }
    isMoving.value = false;
  }
};
const passVerify = () => {
  emit('update:isPassing', true);
  isMoving.value = false;
  progressBar.value.style.background = props.completedBg;
  message.value.style['-webkit-text-fill-color'] = 'unset';
  message.value.style.animation = 'slidetounlock2 3s linear infinite';
  message.value.style.color = '#fff';
  emit('passcallback');
};

onMounted(() => {
  const dragEl = dragVerify.value;
  width.value = dragEl?.offsetWidth;
  height.value = dragEl?.offsetHeight;
  nextTick(() => {
    dragEl.style.setProperty('--textColor', props.textColor);
    dragEl.style.setProperty('--width', `${Math.floor(remJs(width.value / 2))}rem`);
    dragEl.style.setProperty('--pwidth', `${-Math.floor(remJs(width.value / 2))}rem`);
  });
});
</script>

<style scoped lang="scss">
.drag-verify {
  position: relative;
  width: 100%;
  height: 48px;
  line-height: 48px;
  background-color: #e8e8e8;
  text-align: center;
  overflow: hidden;
  .dv-handler {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: move;
    border: 1px solid #d6d6d6;
    img {
      width: 24px;
      height: 24px;
      padding-left: 0;
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      -o-user-select: none;
      -ms-user-select: none;
      -webkit-user-drag: none;
    }
    .el-icon-circle-check {
      color: #6c6;
      margin-top: 9px;
    }
  }
  .dv-progress-bar {
    position: absolute;
    height: 48px;
    width: 0px;
  }
  .dv-text {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 48px;
    font-size: 16px;
    color: transparent;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0, var(--textColor)),
      color-stop(0.4, var(--textColor)),
      color-stop(0.5, #fff),
      color-stop(0.6, var(--textColor)),
      color-stop(1, var(--textColor))
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-size-adjust: none;
    animation: slidetounlock 3s linear infinite;
    & * {
      -webkit-text-fill-color: var(--textColor);
    }
  }
  .goFirst {
    left: 0px !important;
    transition: left 0.5s;
  }
  .goFirst2 {
    width: 0px !important;
    transition: width 0.5s;
  }
}
</style>
<style>
@keyframes slidetounlock {
  0% {
    background-position: var(--pwidth) 0;
  }
  66% {
    background-position: var(--pwidth) 0;
  }
  100% {
    background-position: var(--width) 0;
  }
}
@keyframes slidetounlock2 {
  0% {
    background-position: var(--pwidth) 0;
  }
  66% {
    background-position: var(--pwidth) 0;
  }
  100% {
    background-position: var(--pwidth) 0;
  }
}
</style>
