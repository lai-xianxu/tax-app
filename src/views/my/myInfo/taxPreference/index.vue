<template>
  <NavbarPage label="可享税收优惠信息">
    <div class="tax-preference">
      <div class="empty fcc-c">
        <img src="@/assets/my/youhui.png" alt="" />
        <div class="text">当前没有信息</div>
        <div class="text-gray">如有残疾、孤老、烈属等可享税收优惠情形，请添加税收优惠减免备案</div>
      </div>
      <footer>
        <div class="save-button fcc" @click.stop="$router.push('/blank-loading')">添加</div>
      </footer>
    </div>
  </NavbarPage>
</template>

<script setup></script>

<style scoped lang="scss">
.tax-preference {
  position: relative;
  height: 100%;
  .empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    img {
      width: 83px;
      height: 96px;
    }
    .text {
      margin-top: 10px;
      color: #3d3d3d;
      font-size: 15px;
    }
    .text-gray {
      margin-top: 10px;
      font-size: 13px;
      letter-spacing: 0.02em;
      color: #929191;
      width: 290px;
      line-height: 19px;
      text-align: center;
    }
  }
  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 11px 33px;
    background-color: #fff;
    .save-button {
      height: 48px;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      color: #fff;
      background: #4981ff;
      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
