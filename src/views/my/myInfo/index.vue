<template>
  <NavbarPage label="个人信息">
    <div class="my-info">
      <div v-for="item in cardList" :key="item.id" class="info-crad fsbc" @click.stop="onCard(item)">
        <div class="card-left">{{ item.name }}</div>
        <img src="@/assets/my/right-arrow.png" alt="" class="card-right" />
      </div>
    </div>
  </NavbarPage>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const cardList = [
  {
    id: 1,
    name: '基本信息',
    path: 'BasicInfo',
  },
  {
    id: 2,
    name: '可享税收优惠',
    path: 'TaxPreference',
    title: '可享税收优惠',
  },
  {
    id: 3,
    name: '其他身份证件',
    path: 'OtherIdentityDocuments',
    title: '其他身份证件',
  },
];
const onCard = (item) => {
  const routerInfo = {
    name: item.path,
  };
  if (item.title)
    routerInfo.query = {
      title: item.title,
    };
  router.push(routerInfo);
};
</script>

<style scoped lang="scss">
.my-info {
  padding-top: 12px;
  .info-crad {
    position: relative;
    height: 46px;
    padding-left: 20px;
    padding-right: 16px;
    background-color: #fff;
    cursor: pointer;
    &::after {
      position: absolute;
      left: 20px;
      bottom: 0;
      content: '';
      width: calc(100% - 20px);
      height: 1px;
      background-color: rgba(238, 237, 237, 0.6);
    }
    &:last-child {
      &::after {
        background-color: transparent;
      }
    }
    &:active {
      background-color: rgba(0, 0, 0, 0.05);
    }
    .card-left {
      font-size: 16px;
      letter-spacing: 0.02em;
      color: #3d3d3d;
    }
    .card-right {
      width: 7.4px;
      height: 14px;
    }
  }
}
</style>
