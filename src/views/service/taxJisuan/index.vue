<template>
  <NavbarPage>
    <div>
      <!-- 温馨提示 -->
      <div class="reminder">
        温馨提示：税款计算采用累计计税方式，累计收入与扣除 详情数据已包括本期数据。 此处数据为扣缴单位为您申报
        的数据，如有异议，请联系您的单位处理。
      </div>
      <!-- 累计收入与扣除情况 -->
      <div class="accumulate">
        <div class="title">
          <div class="line"></div>
          <div class="title-text">累计收入与扣除情况</div>
        </div>
        <div class="accumulate-box">
          <div v-for="item in 8" :key="item" class="message-box">
            <div class="text">收入:</div>
            <div class="money">
              <span>9999.00</span>
              <span>元</span>
            </div>
          </div>
        </div>
        <div class="tax-accumulate">
          <div class="message-box">
            <div class="text">收入:</div>
            <div class="money">
              <span>9999.00</span>
              <span>元</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 税款计算 -->
      <div class="tax-dues">
        <div class="title">
          <div class="line"></div>
          <div class="title-text">累计收入与扣除情况</div>
        </div>
        <div class="tax-dues-box">
          <div v-for="item in 8" :key="item" class="message-box">
            <div class="text">收入:</div>
            <div class="money">
              <span>9999.00</span>
              <span>元</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 查看政策说明 -->
      <div class="des-policy">查看政策说明</div>
    </div>
  </NavbarPage>
</template>

<script setup></script>

<style scoped lang="scss">
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
    font-weight: 500;
    color: #3d3d3d;
  }
}
// 本页面文字+数字内容公共
.message-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  .text {
    font-size: 15px;
    font-weight: normal;
    color: #636469;
  }
  .money {
    font-size: 15px;
    font-weight: normal;
    color: #3d3d3d;
  }
}
// 温馨提示
.reminder {
  padding: 10px 16px 0;
  width: 100%;
  height: 86px;
  background: #edf3ff;
  font-size: 13px;
  font-weight: normal;
  color: #3d3d3d;
  line-height: 20px;
}
// 累计收入与扣除情况
.accumulate {
  .accumulate-box {
    padding: 16px 16px 5px;
    background-color: #fff;
    border-bottom: 1px solid rgba(238, 237, 237, 0.6);
  }
  .tax-accumulate {
    background-color: #fff;
    padding: 10px 16px 5px;
  }
}
// 税款计算
.tax-dues {
  margin: 12px 0;
  .tax-dues-box {
    padding: 10px 16px 5px;
    background-color: #fff;
  }
}
// 查看政策说明
.des-policy {
  margin: 20px 0 40px;
  text-align: center;
  font-size: 15px;
  font-weight: normal;
  color: #4981ff;
}
</style>
