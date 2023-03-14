<template>
  <div class="home">
    <!-- 页面 -->
    <div class="home-page">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>

    <!-- 底部导航栏 -->
    <div class="tabbar">
      <van-tabbar v-model="active" @change="onChange">
        <van-tabbar-item v-for="item in tabbarList" :key="item.path" :name="item.path">
          <template #icon="props">
            <div class="tabbar-item">
              <img :src="props.active ? item.imgactive : item.img" alt="" />
              <div class="tabbar-item-text">{{ item.text }}</div>
            </div>
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated } from 'vue';
import { useRouter } from 'vue-router';
import homeImg from '@/assets/tabbar/home.png';
import homeActiveImg from '@/assets/tabbar/home-active.png';
import handleTaxImg from '@/assets/tabbar/handle-tax.png';
import handleTaxActiveImg from '@/assets/tabbar/handle-tax-active.png';
import serviceImg from '@/assets/tabbar/service.png';
import serviceActiveImg from '@/assets/tabbar/service-active.png';
import myImg from '@/assets/tabbar/my.png';
import myActiveImg from '@/assets/tabbar/my-active.png';

const router = useRouter();

/* 导航栏 */
const active = ref(window.location.hash.substring(1));
const tabbarList = ref([
  {
    path: '/home',
    img: homeImg,
    imgactive: homeActiveImg,
    text: '首页',
  },
  {
    path: '/handle-tax',
    img: handleTaxImg,
    imgactive: handleTaxActiveImg,
    text: '办税',
  },
  {
    path: '/service',
    img: serviceImg,
    imgactive: serviceActiveImg,
    text: '服务',
  },
  {
    path: '/my',
    img: myImg,
    imgactive: myActiveImg,
    text: '个人中心',
  },
]);
const onChange = (path) => {
  router.replace(path);
};

onUpdated(() => {
  active.value = window.location.hash.substring(1);
});
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f4f9fd;
  .home-page {
    width: 100%;
    flex: 1;
    overflow: overlay;
  }
  .tabbar {
    height: 49px;
    border-top: 1px solid rgba(238, 237, 237, 0.6);
    background: #fff;
    .tabbar-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
      .tabbar-item-text {
        margin-top: 3px;
        transform: scale(0.92);
        font-size: 12px;
      }
    }
  }
}
:deep(.van-tabbar--fixed) {
  position: relative;
  height: 100%;
}
:deep(.van-tabbar-item__icon) {
  margin-bottom: 0;
}
</style>
