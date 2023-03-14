<template>
  <NavbarPage label="家庭成员信息">
    <div class="tax-preference">
      <div class="empty fcc-c">
        <img src="@/assets/my/shenfen.png" alt="" />
        <div class="text-gray">
          1.可以添加父母、配偶、子女等家庭成员的信息。<br />2.添加家庭成员信息后，在办理专项附加扣除业务
          时将会更加便捷。
        </div>
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
      width: 110px;
      height: 80px;
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
