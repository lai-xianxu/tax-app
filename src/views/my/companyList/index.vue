<template>
  <NavbarPage label="任职受雇信息">
    <div class="company-container">
      <div v-for="item in companyList" :key="item.id" class="company-card" @click.stop="onViewDetail(item)">
        <div class="card-title">{{ item.companyName }}</div>
        <div class="card-text">统一社会信用代码：{{ item.creditCode || '-' }}</div>
        <div class="card-text">职务：{{ item.post || '-' }}</div>
        <div class="card-text">任职受雇日期：{{ item.employmentPeriod || '-' }}</div>
        <div class="card-text">离职日期：{{ item.departureDate || '-' }}</div>
      </div>
    </div>
  </NavbarPage>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCompanyList } from '@/api/my';

const router = useRouter();

const companyList = ref([]);
const getCompanyListInit = async () => {
  const { result } = await getCompanyList();
  companyList.value = result;
};
getCompanyListInit();

// 查看详情
const onViewDetail = (item) => {
  router.push({
    name: 'CompanyDetail',
    query: {
      item: JSON.stringify(item),
    },
  });
};
</script>

<style scoped lang="scss">
.company-container {
  padding: 12px 17px;
  .company-card {
    width: 100%;
    border-radius: 4px;
    background: #ffffff;
    padding: 16px 21px;
    margin-bottom: 12px;
    .card-title {
      line-height: 28px;
      font-size: 17px;
      color: #3d3d3d;
    }
    .card-text {
      line-height: 24px;
      font-size: 15px;
      letter-spacing: 0.02em;
      color: #929191;
    }
  }
}
</style>
