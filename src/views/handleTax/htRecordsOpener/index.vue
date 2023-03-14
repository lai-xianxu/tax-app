<template>
  <NavbarPage label="纳税记录开具">
    <div>
      <!-- 温馨提示 -->
      <div class="notice">
        <div class="notice-text">温馨提示：</div>
        <div class="notice-text">
          1.根据《国家税务总局公告2018年第55号》的规定，您可申请开具2019年1月及以后的纳税记录;
        </div>
        <div class="notice-text">2.每人每天最多可开具三次纳税记录；</div>
        <div class="notice-text">
          3.若您对纳税记录的内容有疑问，请<span class="help" @click.stop="taxBtn">点击帮助</span>
        </div>
      </div>
      <!-- 基本信息 -->
      <div class="basic-info">
        <div class="info">
          <div class="info-text">证件类型</div>
          <div class="info-text" style="color: #b8b8b8">居民身份证</div>
        </div>
        <div class="line"></div>
        <div class="info">
          <div class="info-text">证件号码</div>
          <div class="info-number">5****************1</div>
        </div>
        <div class="line"></div>
        <div class="info">
          <div class="info-text">开具年月起</div>
          <div class="info-time">2022-02</div>
          <img src="../../../assets/handleTax/youjiantou.png" alt="" />
        </div>
        <div class="line"></div>
        <div class="info">
          <div class="info-text">开具年月止</div>
          <div class="info-time">2022-03</div>
          <img src="../../../assets/handleTax/youjiantou.png" alt="" />
        </div>
      </div>
      <!-- 滑块 -->
      <div class="huakuai">
        <DragVerify v-model:isPassing="isPassing"></DragVerify>
      </div>
      <!-- 生成纳税记录 -->
      <div class="tax-btn">
        <van-button type="primary" class="btn" @click.stop="taxBtn"
          ><span class="btn-text">生成纳税记录</span></van-button
        >
      </div>
      <!-- 查看申请记录 -->
      <div class="search-note" @click.stop="taxBtn">查看申请记录</div>
    </div>
  </NavbarPage>
</template>

<script setup>
import { ref } from 'vue';
// import { showLoadingToast } from 'vant';
import { useRouter } from 'vue-router';
import DragVerify from '@/components/DragVerify/index.vue';

const router = useRouter();

const isPassing = ref(false);

const taxBtn = () => {
  router.push({
    name: 'BlankLoading',
  });
  // showLoadingToast('当前网络不佳');
};
</script>

<style scoped lang="scss">
.notice {
  padding: 7px 7px 19px 16px;
  background: #edf3ff;
  .notice-text {
    line-height: 18px;
    letter-spacing: 0.04em;
    font-size: 13px;
    font-weight: normal;
    color: #3d3d3d;
  }
  .help {
    color: #4189ff;
  }
}
// 基本信息
.basic-info {
  padding: 12px 15px;
  background-color: #fff;
  .line {
    margin: 10px 0;
    width: 358px;
    height: 1px;
    background-color: #d8d8d8;
  }
  .info {
    position: relative;
    display: flex;
    align-items: center;
    .info-text {
      margin-right: 54px;
      font-size: 16px;
      font-weight: 350;
      letter-spacing: 0.01em;
      color: #444444;
    }
    .info-number {
      font-size: 15px;
      font-weight: 350;
      letter-spacing: 0.02em;
      color: #b8b8b8;
    }
    .info-time {
      margin-left: -16px;
      margin-right: 130px;
    }
    img {
      position: absolute;
      right: 0;
      width: 16px;
      height: 16px;
    }
  }
}
// 滑块
.huakuai {
  margin-top: 12px;
  padding: 15px 24px 17px 21px;
  background-color: #fff;
}
// 生成纳税记录
.tax-btn {
  margin-top: 32px;
  padding: 0 16px 0 21px;
  .btn {
    width: 338px;
    height: 48px;
  }
  .btn-text {
    font-size: 17px;
    font-weight: normal;
    letter-spacing: 0em;
    color: #ffffff;
  }
}
// 查看申请记录
.search-note {
  margin-top: 20px;
  text-align: center;
  font-size: 17px;
  font-weight: normal;
  letter-spacing: 0em;
  color: #4981ff;
}
</style>
