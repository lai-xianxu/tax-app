<template>
  <NavbarPage label="申报查询（更正/作废申报)" :a-row="false">
    <div class="declaration-query">
      <van-tabs v-model:active="activeName" line-width="125" line-height="4" animated>
        <van-tab title="未完成" name="a">
          <div class="default-text">
            如您存在未支付完成的订单，则该申报表无法更正和作废；如需更正和作废，请15分钟后再试，或直接至<span
              @click.stop="$router.push('/blank-loading')"
              >支付订单管理</span
            >
            取消订单后再操作。
          </div>
          <div class="empty fcc-c">
            <img src="@/assets/service/blankEmpty.png" alt="" />
            <div class="text">页面空空如也</div>
          </div>
        </van-tab>
        <van-tab title="已完成" name="b">
          <div class="empty fcc-c">
            <img src="@/assets/service/blankEmpty.png" alt="" />
            <div class="text">页面空空如也</div>
          </div>
        </van-tab>
        <van-tab title="已作废" name="c">
          <div class="empty fcc-c">
            <img src="@/assets/service/blankEmpty.png" alt="" />
            <div class="text">页面空空如也</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </NavbarPage>
</template>

<script setup>
import { ref } from 'vue';

const activeName = ref('a');
</script>

<style scoped lang="scss">
.declaration-query {
  .default-text {
    background: #edf3ff;
    padding: 12px;
    font-size: 13px;
    font-weight: normal;
    letter-spacing: 0.04em;
    line-height: 19px;
    span {
      color: #5084ea;
    }
  }
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
<style lang="scss">
.declaration-query {
  .van-tabs--line .van-tabs__wrap {
    height: 39px;
  }
  .van-tab {
    font-size: 15px;
    color: #000;
    font-weight: normal;
  }
  .van-tab--active {
    color: #5084ea;
  }
}
</style>
