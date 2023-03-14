<template>
  <Header>
    <div>服务</div>
  </Header>
  <div style="margin-bottom: 70px">
    <div v-for="(item, index) in sortList" :key="index" class="main">
      <div class="main-title">
        <div class="main-line"></div>
        <div class="main-text">{{ item.modeClassify }}</div>
      </div>
      <div class="main-sort">
        <div v-for="val in item.list" :key="val.sortOrder" class="sort-box" @click="goPage(item, val)">
          <img class="sort-logo" :src="val.icon" alt="" />
          <div class="sort-text">{{ val.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header/index.vue';
import { usePublicStore } from '@/store/modules/public';

const router = useRouter();
// const route = useRoute();

// 获取页面分类信息
const sortList = ref([]);
const publicStore = usePublicStore();

const sortInit = async () => {
  const list = await publicStore.action_tax_icons({ type: 3 });
  sortList.value = list;
};
sortInit();
// 页面跳转
const goPage = (item, val) => {
  let routerName = '';
  const titleName = val.title;
  switch (item.modeClassify) {
    case '申报信息查询':
      if (val.sortOrder === '1') {
        routerName = 'DeclarationQuery';
      } else if (val.sortOrder === '3') {
        routerName = 'TaxDeatilsSearch';
      } else if (val.sortOrder === '2') {
        routerName = 'EmptyPage';
      } else {
        routerName = 'BlankLoading';
      }
      break;
    case '备案信息查询':
      routerName = 'EmptyPage';
      break;
    case '其他查询':
      routerName = 'EmptyPage';
      break;
    default:
      routerName = 'BlankLoading';
      break;
  }
  const routerInfo = {
    name: routerName || '',
  };
  if (routerName === 'BlankLoading' || routerName === 'EmptyPage') routerInfo.query = { title: titleName };
  router.push(routerInfo);
};
</script>

<style scoped lang="scss">
.main {
  margin-bottom: 11px;
  background-color: #fff;
  .main-title {
    padding: 12px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(238, 237, 237, 0.6);
    .main-line {
      width: 4px;
      height: 17px;
      background: #4981ff;
      margin-right: 9px;
      border-radius: 466px;
    }
    .main-text {
      color: #3d3d3d;
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 0.08em;
    }
  }
  .main-sort {
    display: flex;
    flex-wrap: wrap;
    padding: 14px 0;
    height: 100%;
    .sort-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 33.33%;
      .sort-logo {
        margin-bottom: 6px;
        width: 48px;
        height: 48px;
      }
      .sort-text {
        width: 77px;
        height: 33px;
        color: #3d3d3d;
        font-size: 12px;
        text-align: center;
        line-height: 17px;
        margin-bottom: 14px;
      }
    }
  }
}
</style>
