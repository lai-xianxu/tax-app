<template>
  <div class="my-container">
    <!-- 头部用户信息 -->
    <div class="header fsc" @click.stop="onJumpLogin">
      <img v-if="userInfo?.avatar" :src="userInfo?.avatar" alt="" />
      <img v-else src="@/assets/my/user.png" alt="" />
      <div class="user">
        <div class="user-name">{{ userInfo?.realname || '登录/注册' }}</div>
        <div class="user-number">{{ userInfo?.phone }}</div>
      </div>
    </div>

    <!-- 功能卡片 -->
    <div class="card-box">
      <div
        v-for="item in pageList"
        :key="item.sortOrder"
        class="my-card fsbc"
        :class="{ mb10: ['4', '5', '10'].includes(item.sortOrder) }"
        @click.stop="onInfoCard(item)"
      >
        <div class="fsc">
          <img :src="item.icon" alt="" class="left-icon" />
          <div class="left-text">{{ item.title }}</div>
        </div>
        <img src="@/assets/my/right-arrow.png" alt="" class="right-icon" />
        <div v-if="!['4', '5', '10'].includes(item.sortOrder)" class="field-bottom-line"></div>
      </div>
    </div>

    <!-- 底部登录 -->
    <div v-if="userInfo?.token" class="sign-out fcc" @click.stop="onSignOut">退出登录</div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { useMyStore } from '@/store/modules/my';
import { usePublicStore } from '@/store/modules/public';

const router = useRouter();

const myStore = useMyStore();
const publicStore = usePublicStore();

/* 获取页面信息 */
const pageList = ref([]);
const init = async () => {
  const list = await publicStore.action_tax_icons({ type: 4 });
  pageList.value = list?.[0]?.list?.sort((a, b) => +a.sortOrder - +b.sortOrder);
};
init();

/* 用户登录信息 */
const userInfo = computed(() => {
  return myStore.getter_user_info;
});

/* 跳转登录 */
const onJumpLogin = () => {
  if (userInfo.value?.token) return;
  router.push({
    name: 'Login',
  });
};

/* 退出登录 */
const onSignOut = () => {
  myStore.state_user_info = {};
};

/* 点击卡片 */
const onInfoCard = (item) => {
  switch (item.title) {
    case '个人信息':
      router.push({
        name: 'MyInfo',
      });
      break;
    case '任职受雇信息':
      router.push({
        name: 'CompanyList',
      });
      break;
    case '家庭成员信息':
      router.push({
        name: 'FamilyInformation',
      });
      break;
    case '银行卡':
      router.push({
        name: 'BankCard',
      });
      break;
    default:
      router.push({
        name: 'BlankLoading',
        query: {
          title: item.title,
        },
      });
      break;
  }
};
</script>

<style scoped lang="scss">
.my-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fbfafc;
  overflow: auto;
  .header {
    width: 100%;
    height: 111px;
    padding: 27px 17px 18px;
    background: linear-gradient(267deg, #4f80e9 30%, #2c62e6 99%);
    cursor: pointer;
    img {
      width: 66px;
      height: 66px;
      border-radius: 50%;
    }
    .user {
      margin-left: 14px;
      .user-name {
        line-height: 23px;
        font-size: 16px;
        letter-spacing: 0.08em;
        color: #ffffff;
      }
      .user-number {
        line-height: 20px;
        margin-top: 6px;
        font-size: 14px;
        font-weight: normal;
        letter-spacing: 0.08em;
        color: #ffffff;
      }
    }
  }
  .card-box {
    min-height: 490px;
    .my-card {
      position: relative;
      width: 100%;
      height: 46px;
      padding: 12px 19px;
      background-color: #fff;
      cursor: pointer;
      &:active {
        background-color: rgba(0, 0, 0, 0.05);
      }
      .left-icon {
        width: 24px;
        height: 24px;
        object-fit: cover;
      }
      .left-text {
        line-height: 23px;
        margin-left: 15px;
        font-size: 16px;
        font-weight: normal;
        color: #3d3d3d;
      }
      .right-icon {
        width: 5.5px;
        height: 11px;
      }
      .field-bottom-line {
        position: absolute;
        left: 16px;
        bottom: 0;
        width: calc(100% - 16px);
        height: 1px;
        background-color: rgba(238, 237, 237, 0.6);
      }
    }
    .mb10 {
      margin-bottom: 10px;
    }
  }

  .sign-out {
    flex-shrink: 0;
    width: 100%;
    height: 42px;
    background: #ffffff;
    font-size: 16px;
    font-weight: 500;
    color: #ff0000;
    margin: 5px 0 15px;
    cursor: pointer;
  }
}
</style>
