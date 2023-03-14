<template>
  <NavbarPage label="收入纳税明细查询">
    <template v-if="deatilsData?.creditCount" #navbarRight>
      <div class="shensu" @click.stop="$router.push('/blank-loading')">批量申诉</div>
    </template>
    <div class="tax-deatils-search-list" @click.prevent.stop="showPopover = false">
      <!-- 合计-->
      <div class="total">
        <div class="total-income">
          <div class="total-income-left">
            <span>收入合计</span>
            <div class="right-icon">
              <div v-show="showPopover">
                <div class="popover">
                  针对所得项目小类为个人股权激励收入的，仅统计全年最后一次有<br />效申报中所填的收入
                </div>
                <div class="popover-arrow"></div>
              </div>
              <img src="../../../assets/service/wenhao.png" alt="" @click.stop="showPopover = !showPopover" />
            </div>
            <span>:</span>
          </div>
          <div class="total-income-right">
            <span style="margin-right: 3px">{{ deatilsData?.creditCount || '0.00' }}元</span>
          </div>
        </div>
        <div class="total-line"></div>
        <div class="total-declared total-income">
          <div class="total-declared-left"><span style="margin-right: 3px">已申报税额合计</span><span>:</span></div>
          <div class="total-declared-right">
            <span style="margin-right: 3px">{{ deatilsData?.taxDeclaredCount || '0.00' }}元</span>
          </div>
        </div>
      </div>
      <!-- 工资薪金列表 -->
      <div v-if="deatilsData?.list && deatilsData?.list?.length" class="deatils-list">
        <div v-for="item in deatilsData.list" :key="item.id" class="payroll-list" @click="goPage(item.id)">
          <div class="payroll-list-top">
            <div class="payroll-list-title">{{ item.incomeType }}</div>
            <div class="payroll-list-time">{{ item.taxationDate }}</div>
          </div>
          <!-- 薪金详情 -->
          <div class="payroll-list-main">
            <div class="payroll-list-main-describe">
              <div class="hangju">
                <span>所得项目小类：</span>
                <span>{{ item.incomeCategory }}</span>
              </div>
              <div class="hangju">
                <span>扣缴义务人：</span>
                <span>{{ item.obligorName }}</span>
              </div>
              <div class="hangju">
                <span>收入：</span>
                <span>{{ item.credit }}</span>
                <span>元</span>
              </div>
              <div class="hangju">
                <span>已申报税额：</span>
                <span>{{ item.taxDeclared }}</span>
                <span>元</span>
              </div>
            </div>
            <img src="../../../assets/service/youjiantou.png" alt="" />
          </div>
        </div>
        <div class="no-more">我是有底线的</div>
      </div>
      <div v-if="emptyShow" class="empty fcc-c">
        <img src="../../../assets/service/blankEmpty.png" alt="" />
        <div class="text">页面空空如也</div>
      </div>
    </div>
  </NavbarPage>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { getTaxDeatilsList } from '@/api/service.js';

const router = useRouter();
const route = useRoute();
// 跳转纳税详情
const goPage = (id) => {
  router.push({
    name: 'TaxDeatilsListontent',
    query: {
      id,
    },
  });
};

// 点击问号提示
const showPopover = ref(false);
// 获取纳税记录列表
const deatilsData = ref({});
const emptyShow = ref(false);

const initTaxDeatilsList = async () => {
  const details = await getTaxDeatilsList({
    annual: route.query.annual,
    incomeType: route.query.incomeType,
  });
  deatilsData.value = details?.result;
  if (!details?.result || !details?.result?.list?.length) {
    setTimeout(() => {
      emptyShow.value = true;
    }, 300);
  }
};
initTaxDeatilsList();
</script>

<style scoped lang="scss">
.shensu {
  margin-right: 16px;
  font-size: 15px;
  font-weight: normal;
  color: #5084ea;
}
.tax-deatils-search-list {
  height: 100%;
  display: flex;
  flex-direction: column;
}
// 合计
.total {
  margin-top: 12px;
  padding: 18px;
  width: 100%;
  height: 95px;
  background-color: #fff;
  .total-income {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .total-income-left {
      display: flex;
      .right-icon {
        position: relative;
        .popover {
          position: absolute;
          top: 22px;
          left: -93px;
          padding: 13px 16px;
          line-height: 17px;
          white-space: nowrap;
          border-radius: 6px;
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
          font-size: 12px;
          transform: scale(0.9);
          color: #666;
          background-color: #fff;
        }
        .popover-arrow {
          position: absolute;
          top: 12px;
          left: 4px;
          width: 0;
          height: 0;
          border-color: transparent;
          border-style: solid;
          border-width: 0.16rem;
          line-height: 0;
          font-size: 0;
          border-color: transparent transparent #fff transparent;
          border-style: solid;
          border-width: 4px 5px 9px 5px;
        }
      }
    }
    span {
      margin-right: 8px;
      font-size: 15px;
      font-weight: normal;
      color: #3d3d3d;
    }
    img {
      margin-right: 8px;
      width: 18px;
      height: 18px;
    }
    // 问号弹窗
  }
  .total-line {
    margin: 10px 0;
    width: 341px;
    height: 1px;
    background-color: rgba(238, 237, 237, 0.6);
  }
}
.deatils-list {
  flex: 1;
  overflow: auto;
}
// 工资薪金列表
.payroll-list {
  margin: 14px 0;
  padding: 20px 16px 0 16px;
  width: 100%;
  height: 174px;
  background-color: #fff;
  .payroll-list-top {
    display: flex;
    justify-content: space-between;
    padding-right: 32px;
    margin-bottom: 6px;
    .payroll-list-title {
      font-size: 17px;
      font-weight: normal;
      color: #3d3d3d;
    }
    .payroll-list-time {
      font-size: 16px;
      font-weight: normal;
      color: #3d3d3d;
    }
  }
  .payroll-list-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 6px;
    color: #929191;
    .payroll-list-main-describe {
      .hangju {
        margin-bottom: 6px;
        span {
          font-size: 15px;
          font-weight: normal;
        }
      }
    }
    img {
      width: 16px;
      height: 16px;
    }
  }
}

.no-more {
  font-size: 12px;
  color: #3d3d3d;
  padding-top: 10px;
  margin-bottom: 50px;
  text-align: center;
}

.empty {
  margin-top: 100px;
  img {
    width: 139px;
    height: 123px;
  }
  .text {
    margin-top: 10px;
    color: #3d3d3d;
    font-size: 15px;
  }
}
</style>
