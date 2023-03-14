<template>
  <NavbarPage label="个人信息">
    <div class="my-name-info">
      <div class="info-field fss">
        <div class="field-bottom-line"></div>
        <div class="field-label">姓名</div>
        <van-field v-model="fieldValue" type="textarea" rows="1" autosize placeholder="请输入姓名" />
        <div class="field-look">录入生僻字</div>
      </div>
      <div class="save-button fcc" :class="{ 'save-button--disabled': !fieldValue }" @click.stop="onSave">保存</div>
    </div>
  </NavbarPage>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { showDialog } from 'vant';

const route = useRoute();
const fieldValue = ref(route.query?.name);

const onSave = () => {
  if (!fieldValue.value) return;
  showDialog({
    message: '未通过实名校验，如为正确姓名，\n请移步至办税服务厅处理！',
    confirmButtonText: '我知道了',
  });
};
</script>

<style scoped lang="scss">
.my-name-info {
  background-color: #fff;
  margin-top: 10px;
  .info-field {
    position: relative;
    width: 100%;
    min-height: 46px;
    padding: 12px 17px;
    background: #fff;
    line-height: 22px;
    .field-bottom-line {
      position: absolute;
      left: 16px;
      bottom: 0;
      width: calc(100% - 16px);
      height: 1px;
      background-color: rgba(238, 237, 237, 0.6);
    }
    .field-label {
      width: 60px;
      font-size: 16px;
      font-weight: normal;
      color: #686868;
      flex-shrink: 0;
    }
    .field-look {
      font-size: 15px;
      color: #5084ea;
      margin-left: auto;
      flex-shrink: 0;
    }
  }
  .save-button {
    height: 48px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    color: #fff;
    background: #4981ff;
    margin: 32px 17px 0;
    &:active {
      opacity: 0.8;
    }
    &--disabled {
      background: rgba(82, 132, 231, 0.3);
    }
  }
}

:deep(.van-field) {
  font-size: 16px;
  color: #3d3d3d;
  padding: 0;
}
</style>
