<template>
  <NavbarPage label="详情">
    <template #navbarRight><div class="shensu" @click.stop="$router.push('/blank-loading')">申诉</div></template>
    <div class="company-detail">
      <div v-for="item in detailList" :key="item.key" class="detail-card fss">
        <div class="card-left">{{ item.name }}</div>
        <div class="card-right">{{ companyDetail[item.key] }}</div>
      </div>
    </div>
  </NavbarPage>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const companyDetail = JSON.parse(route.query?.item);

const detailList = [
  {
    name: '统一社会信用代码',
    key: 'creditCode',
  },
  {
    name: '单位名称',
    key: 'companyName',
  },
  {
    name: '职务',
    key: 'post',
  },
  {
    name: '任职受雇日期',
    key: 'employmentPeriod',
  },
  {
    name: '离职日期',
    key: 'departureDate',
  },
];
</script>

<style scoped lang="scss">
.shensu {
  margin-right: 16px;
  font-size: 15px;
  font-weight: normal;
  color: #5084ea;
}
.company-detail {
  background-color: #fff;
  margin-top: 10px;
  .detail-card {
    position: relative;
    width: 100%;
    min-height: 46px;
    padding: 12px 19px;
    line-height: 22px;
    &::after {
      position: absolute;
      left: 16px;
      bottom: 0;
      content: '';
      width: calc(100% - 16px);
      height: 1px;
      background-color: rgba(238, 237, 237, 0.6);
    }
    &:last-child {
      &::after {
        background: transparent;
      }
    }
    .card-left {
      width: 100px;
      font-size: 16px;
      color: #3d3d3d;
      margin-right: 15px;
    }
    .card-right {
      font-size: 16px;
      color: #929191;
    }
  }
}
</style>
