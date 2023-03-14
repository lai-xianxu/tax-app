<template>
  <NavbarPage label="收入纳税明细查询">
    <div class="deatils-container">
      <!-- 年度选择 -->
      <div class="top">
        <div class="title">
          <div class="line"></div>
          <div class="title-text">请选择纳税记录年度</div>
        </div>
        <div>
          <van-field
            v-model="fieldValue"
            is-link
            readonly
            label="年度"
            placeholder="请选择年份"
            @click="showPicker = true"
          />
          <van-popup v-model:show="showPicker" position="bottom">
            <van-picker v-model="pickerVlaue" :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
          </van-popup>
        </div>
      </div>
      <!-- 选择类型 -->
      <div class="middle">
        <div class="title">
          <div class="line"></div>
          <div class="title-text">请选择所得类型</div>
        </div>
        <!-- 单选选项 -->
        <div class="select-box">
          <van-checkbox-group v-model="checked">
            <van-checkbox v-for="item in taxDetailsList" :key="item.value" :name="item.value" class="select">
              <span class="select-text">{{ item.title }}</span>
            </van-checkbox>
          </van-checkbox-group>
        </div>
        <!-- 查询按钮 -->
        <div class="search-button">
          <van-button :disabled="!checked?.length" type="primary" block class="button" @click="goPage">查询</van-button>
        </div>
      </div>
    </div>
  </NavbarPage>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getTaxDeatilsSearch, getTaxDeatilsTime } from '@/api/service.js';

const router = useRouter();

const columns = ref([]);
// 年分选择
const getTaxTime = async () => {
  const { result } = await getTaxDeatilsTime();
  result.forEach((e) => {
    columns.value.push({
      text: e,
      value: e,
    });
  });
};
getTaxTime();

const fieldValue = ref('2022');
const pickerVlaue = ref(['2022']);
const showPicker = ref(false);
const onConfirm = ({ selectedOptions }) => {
  fieldValue.value = selectedOptions[0].value;
  showPicker.value = false;
};

const checked = ref([]);
// 选择类型
const taxDetailsList = ref([]);
const getTaxDetails = async () => {
  const taxDetails = await getTaxDeatilsSearch({ code: 'A02' });
  taxDetailsList.value = taxDetails.result;
  checked.value = taxDetails.result?.map((e) => e.value);
};
getTaxDetails();
// 查询按钮页面跳转
const goPage = () => {
  router.push({
    name: 'TaxDeatilsList',
    query: {
      annual: fieldValue.value,
      incomeType: checked.value.join(','),
    },
  });
};
</script>

<style scoped lang="scss">
.deatils-container {
  // 年度选择
  .top {
    margin-top: 12px;
    .title {
      display: flex;
      align-items: center;
      padding-left: 17px;
      width: 100%;
      height: 45px;
      background-color: #fff;
      border-bottom: 1px solid rgba(238, 237, 237, 0.6);
      .line {
        margin-right: 7px;
        width: 4px;
        height: 17px;
        background: #4981ff;
        border-radius: 466px;
      }
      .title-text {
        font-size: 15.5px;
        font-weight: bold;
        color: #3d3d3d;
      }
    }
  }
  // 选择分类
  .middle {
    width: 100%;
    height: 241px;
    margin-top: 12px;
    background-color: #fff;
    .title {
      display: flex;
      align-items: center;
      padding-left: 17px;
      width: 100%;
      height: 45px;
      border-bottom: 1px solid rgba(238, 237, 237, 0.6);
      .line {
        margin-right: 7px;
        width: 4px;
        height: 17px;
        background: #4981ff;
        border-radius: 466px;
      }
      .title-text {
        font-size: 15.5px;
        font-weight: bold;
        color: #3d3d3d;
      }
    }
    .select-box {
      padding: 5px 16px 0 16px;
      min-height: 188px;
      .select {
        position: relative;
        overflow: visible;
        padding: 13px 0;
        &::after {
          position: absolute;
          left: 0;
          bottom: 0;
          content: '';
          height: 1px;
          width: calc(100% + 16px);
          background-color: rgba(238, 237, 237, 0.6);
        }
        &:last-child {
          &::after {
            background-color: transparent;
          }
        }
        .select-text {
          margin-left: 13px;
          font-size: 15.5px;
          letter-spacing: 0.02em;
          color: #3d3d3d;
        }
      }
    }
  }
  // 查询按钮
  .search-button {
    margin-top: 45px;
    .button {
      margin-left: 18px;
      width: 341px;
      height: 48px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: normal;
      color: #ffffff;
    }
  }
}
:deep(.van-cell) {
  font-size: 15.5px;
}
:deep(.van-button--disabled) {
  opacity: 0.3;
}
</style>
