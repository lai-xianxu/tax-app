<template>
  <NavbarPage style="background-color: #fff">
    <div class="login-container" @click.prevent.stop="showPopover = false">
      <img class="user-img" src="@/assets/my/user.png" alt="" />

      <!-- 表单 -->
      <div class="form">
        <div class="input-box fsbc">
          <div class="left-text">账号</div>
          <van-field v-model="username" placeholder="手机号码/证件号码" maxlength="30" clearable />
          <div class="right-icon">
            <div v-show="showPopover">
              <div class="popover">使用外国护照注册的用<br />户，请使用手机号码登录</div>
              <div class="popover-arrow"></div>
            </div>
            <img class="tip-icon" src="@/assets/my/tips.png" alt="" @click.stop="showPopover = !showPopover" />
          </div>
        </div>
        <div class="input-box password-input fsbc">
          <div class="left-text">密码</div>
          <van-field v-model="password" type="password" placeholder="请输入密码" maxlength="15" />
        </div>
      </div>

      <!-- 滑块 -->
      <div class="silder">
        <DragVerify ref="dragVerify" v-model:isPassing="isPassing"> </DragVerify>
      </div>

      <!-- 找回密码 -->
      <div class="find-password fec" @click.stop="onBlankPage">找回密码</div>

      <!-- 底部按钮 -->
      <footer>
        <div class="button sing-in fcc" :class="{ 'is-sign-in': !isSignIn }" @click.stop="onSignIn">登录</div>
        <div class="button sing-up fcc" @click.stop="onBlankPage">注册</div>
      </footer>
    </div>
  </NavbarPage>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { showDialog, showConfirmDialog } from 'vant';
import { postSignIn } from '@/api/my';
import { useMyStore } from '@/store/modules/my';
import DragVerify from '@/components/DragVerify/index.vue';

const myStore = useMyStore();
const router = useRouter();

const showPopover = ref(false);
const isPassing = ref(false);

/* 登录 */
const username = ref('19673239497');
const password = ref('123456');
const onSignIn = async () => {
  if (!isSignIn.value) return;
  if (!isPassing.value) {
    showDialog({
      message: '请先拖动滑块验证',
      confirmButtonText: '确定',
    });
    return;
  }
  const data = await postSignIn({
    password: password.value,
    username: username.value,
  });
  if (data.code === 500) {
    showConfirmDialog({
      title: '提示',
      message: data.message,
      confirmButtonText: '重新输入',
      cancelButtonText: '找回密码',
    })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        onBlankPage();
      });
    return;
  }

  myStore.state_user_info = data.result;
  router.go(-1);
};

/* 监听是否可登录 */
const isSignIn = computed(() => {
  return username.value && password.value;
});

const onBlankPage = () => {
  router.push({
    name: 'BlankLoading',
  });
};
</script>

<style scoped lang="scss">
.login-container {
  padding: 37px 18px;
  .user-img {
    width: 92px;
    height: 92px;
    border-radius: 50%;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .form {
    margin-top: 78px;
    .input-box {
      width: 100%;
      height: 46px;
      border-bottom: 1px solid #d8d8d8;
      .left-text {
        font-size: 16px;
        line-height: 23px;
        font-weight: normal;
        color: #444444;
      }
      .van-field {
        flex: 1;
        margin-left: 20px;
        font-size: 16px;
      }
      .right-icon {
        position: relative;
        .popover {
          position: absolute;
          top: -60px;
          left: -122px;
          padding: 8px;
          line-height: 16px;
          white-space: nowrap;
          border-radius: 6px;
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
          color: #666;
        }
        .popover-arrow {
          position: absolute;
          top: -13px;
          left: 4px;
          width: 0;
          height: 0;
          border-color: transparent;
          border-style: solid;
          border-width: 0.16rem;
          line-height: 0;
          font-size: 0;
          border-color: #fff transparent transparent transparent;
          border-style: solid;
          border-width: 11px 5px 4px 5px;
        }
        .tip-icon {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }
  }
  .silder {
    width: 330px;
    height: 48px;
    margin: 17px auto 0;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
  }
  .find-password {
    margin-top: 10px;
    line-height: 20px;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.04em;
    color: #4981ff;
    cursor: pointer;
  }
  footer {
    margin-top: 25px;
    .button {
      width: 100%;
      height: 48px;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      &:active {
        opacity: 0.8;
      }
    }
    .sing-in {
      color: #fff;
      background: #4981ff;
    }
    .sing-up {
      font-size: 18px;
      border: 1px solid #4981ff;
      color: #4981ff;
      margin-top: 12px;
    }
    .is-sign-in {
      opacity: 0.4;
      &:active {
        opacity: 0.4;
      }
    }
  }
}
:deep(.van-field__control) {
  font-size: 16px;
}
:deep(.van-field__right-icon) {
  color: #ccc;
  cursor: pointer;
}
:deep(.password-input) {
  .van-field__control {
    letter-spacing: 9.4px;
    &::placeholder {
      letter-spacing: 0;
    }
  }
}
</style>
