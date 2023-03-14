<template>
  <NavbarPage label="收入纳税明细详情">
    <template #navbarRight>
      <div class="shensu" @click.stop="$router.push('/blank-loading')">申诉</div>
    </template>
    <div>
      <!-- 纳税明细信息 -->
      <div class="top">
        <div class="title">
          <div class="line"></div>
          <div class="title-text">纳税明细信息</div>
        </div>
        <div class="top-message">
          <div class="message-box">
            <div class="text">收入:</div>
            <div class="money">
              <span>{{ taxdeatilsList.credit }}</span>
              <span>元</span>
            </div>
          </div>
          <div class="message-box">
            <div class="text">已申报税额：</div>
            <div class="money">
              <span>{{ taxdeatilsList.taxDeclared }}</span>
              <span>元</span>
            </div>
          </div>
          <div class="tax-payment" @click="goPage">
            <div class="tax-payment-text">查看税款计算</div>
            <img src="../../../assets/service/lanse-yjt.png" alt="" />
          </div>
        </div>
      </div>
      <!-- 纳税明细-基本情况 -->
      <div class="basic-info">
        <div class="title">
          <div class="line"></div>
          <div class="title-text">纳税明细信息-基本情况</div>
        </div>
        <div class="basic-info-main">
          <div class="basic-info-box">
            <div class="basic-info-text">所得项目小类：</div>
            <div class="basic-info-text-right">{{ taxdeatilsList.incomeType }}</div>
          </div>
          <div class="basic-info-box">
            <div class="basic-info-text">扣缴义务人名称：</div>
            <div class="basic-info-text-right">{{ taxdeatilsList.obligorName }}</div>
          </div>
          <div class="basic-info-box">
            <div class="basic-info-text">扣缴义务人纳税人识别号：</div>
            <div class="basic-info-text-right">{{ taxdeatilsList.dutyParagraph }}</div>
          </div>
          <div class="basic-info-box">
            <div class="basic-info-text">主管税务机关：</div>
            <div class="basic-info-text-right">{{ taxdeatilsList.taxAuthority }}</div>
          </div>
          <div class="basic-info-box">
            <div class="basic-info-text">申报渠道：</div>
            <div class="basic-info-text-right">{{ taxdeatilsList.declareChannel }}</div>
          </div>
        </div>
      </div>
      <!-- 日期/时间 -->
      <div class="date">
        <div class="basic-info-box">
          <div class="basic-info-text">申报日期：</div>
          <div class="basic-info-text-right">{{ taxdeatilsList.declareDate }}</div>
        </div>
        <div class="basic-info-box">
          <div class="basic-info-text">税款所属期：</div>
          <div class="basic-info-text-right">{{ taxdeatilsList.taxationDate }}</div>
        </div>
      </div>
      <!-- 温馨提示 -->
      <div class="reminder">
        <span class="reminder-text">
          温馨提示：专项附加扣除和个人养老金已体现在税款计算
          过程中，在本期数据中不予显示。您可在'“税款计算-累计收入与扣除详情”中查看。
        </span>
        <span class="reminder-pay" @click="goPage">查看扣税计算</span>
      </div>
      <!-- 本期收入与扣除详情 -->
      <div class="details">
        <div class="title">
          <div class="line"></div>
          <div class="title-text">本期收入与扣除详情</div>
        </div>
        <div class="details-box">
          <div class="message-box">
            <div class="text">本期收入:</div>
            <div class="money">
              <span>{{ taxdeatilsList.credit }}元</span>
              <div class="right-money"></div>
            </div>
          </div>
          <div class="message-box">
            <div class="text">本期免税收入：</div>
            <div class="money">
              <span>{{ taxdeatilsList.exemptIncome }}元</span>
              <div class="right-money"></div>
            </div>
          </div>
          <div class="message-box">
            <div class="text">本期减除费用：</div>
            <div class="money">
              <span>{{ taxdeatilsList.deductingExpenses }}元</span>
              <div class="right-money"></div>
            </div>
          </div>
          <div class="message-box">
            <div class="text">本期专项扣除：</div>
            <div class="money money-num" @click.stop="onOpen(taxdeatilsList)">
              <span>{{ taxdeatilsList.specialDeduction }}元</span>
              <img
                v-if="+taxdeatilsList.specialDeduction"
                src="@/assets/service/triangle.png"
                alt=""
                :class="{ transform_icon: !isUpDown }"
              />
              <div v-else class="right-money"></div>
            </div>
          </div>
          <!-- 展开收起项 -->
          <div v-show="taxdeatilsList.specialDeduction" class="special-list" :class="{ 'special-list-open': isUpDown }">
            <div v-for="val in taxdeatilsList?.list" :key="val.id" class="specila-item fsbc">
              <span>{{ val.deductionType }}：</span>
              <span class="yuan">{{ val.money }}元</span>
            </div>
          </div>
          <div class="message-box">
            <div class="text">本期其他扣除：</div>
            <div class="money">
              <span>{{ taxdeatilsList.otherDeductions }}元</span>
              <div class="right-money"></div>
            </div>
          </div>
          <div class="message-box">
            <div class="text">本期准予扣除的捐赠项目：</div>
            <div class="money">
              <span>{{ taxdeatilsList.grantDeduction }}元</span>
              <div class="right-money"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NavbarPage>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTaxDeatils } from '@/api/service.js';

const router = useRouter();
const route = useRoute();

// 跳转税款计算页面
const goPage = () => {
  router.push({
    name: 'BlankLoading',
    query: {
      title: '税款计算',
    },
  });
};

// 纳税详情
const taxdeatilsList = ref([]);
const specialDeduction = ref([]);
const initTaxDeatils = async () => {
  const taxdeatils = await getTaxDeatils({
    id: route.query.id,
  });
  taxdeatilsList.value = taxdeatils.result;
  specialDeduction.value = taxdeatils.result.list;
};
initTaxDeatils();

const isUpDown = ref(false);
const onOpen = (val) => {
  if (!val?.specialDeduction || !val?.list?.length) return;
  isUpDown.value = !isUpDown.value;
};
</script>

<style scoped lang="scss">
.shensu {
  margin-right: 16px;
  font-size: 15px;
  font-weight: normal;
  color: #5084ea;
}
// 本页面头部公共
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
    font-size: 15px;
    font-weight: bold;
    color: #3d3d3d;
  }
}
// 本页面两边都是文字内容公共
.basic-info-box {
  display: flex;
  justify-content: space-between;
  .basic-info-text {
    margin-bottom: 12px;
    font-size: 15px;
    font-weight: normal;
    color: #929191;
    line-height: 20px;
    max-width: 120px;
    flex-shrink: 0;
  }
  .basic-info-text-right {
    max-width: 210px;
    font-size: 15px;
    line-height: 20px;
    font-weight: normal;
    color: #3d3d3d;
  }
}
// 本页面文字+数字内容公共
.message-box {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 12px;
  padding: 0 16px;
  .text {
    font-size: 15px;
    font-weight: normal;
    color: #929191;
    max-width: 160px;
  }
  .money {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: normal;
    color: #3d3d3d;
    span {
      color: #3d3d3d;
    }
    .right-money {
      width: 14px;
      height: 9px;
      margin-left: 6px;
    }
    img {
      width: 14px;
      height: 7px;
      margin-left: 6px;
      transition: all 0.5s;
      transform: rotate(-180deg);
      &.transform_icon {
        transform: rotate(-360deg);
      }
    }
  }
  .money-num {
    color: #636469;
  }
}

.special-list {
  background-color: #f5f6fa;
  padding: 0 36px;
  font-size: 14px;
  height: 0;
  transition: all 0.5s;
  overflow: hidden;
  &.special-list-open {
    height: 173px;
    margin-bottom: 12px;
  }
  .specila-item {
    padding: 13px 0;
    color: #636469;
    .yuan {
      font-size: 15px;
      color: #3d3d3d;
    }
  }
}

// 纳税明细
.top {
  margin-top: 12px;
  .top-message {
    padding: 17px 0;
    background-color: #fff;

    .tax-payment {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 14px;
      .tax-payment-text {
        margin-left: 3px;
        font-size: 15px;
        font-weight: normal;
        color: #4981ff;
      }
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
}
// 纳税明细-基本情况
.basic-info {
  margin-top: 12px;
  .basic-info-main {
    padding: 16px 16px 0;
    background-color: #fff;
  }
}
// 日期/时间
.date {
  margin-top: 12px;
  padding: 16px 16px 0;
  background-color: #fff;
}
// 温馨提示、
.reminder {
  margin-top: 12px;
  padding: 16px;
  width: 100%;
  height: 86px;
  background: #edf3ff;
  line-height: 20px;
  .reminder-text {
    font-size: 13px;
    font-weight: normal;
    color: #3d3d3d;
    letter-spacing: 0.4px;
  }
  .reminder-pay {
    margin-left: 10px;
    font-size: 13px;
    font-weight: normal;
    color: #4981ff;
  }
}
// 本期收入与扣除详情
.details {
  margin-bottom: 70px;
  .details-box {
    padding: 16px 0 10px;
    background-color: #fff;
  }
}
</style>
