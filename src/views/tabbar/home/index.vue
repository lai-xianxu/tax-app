<template>
  <div id="tabbar-home" class="home-container">
    <div class="shang">
      <div class="swiper">
        <van-swipe :autoplay="5000" :duration="200" class="va-swiper">
          <van-swipe-item v-for="item in swipeList" :key="item.id">
            <img :src="item.picture" alt="" />
          </van-swipe-item>
          <template #indicator="{ active, total }">
            <div class="swipe-dian">
              <div
                v-for="val in total"
                :key="val"
                class="article-dian"
                :class="{ 'article-dian-active': val - 1 == active }"
              ></div>
            </div>
          </template>
        </van-swipe>
        <div class="triangle-left"></div>
        <div class="triangle-right"></div>
      </div>
      <!-- 搜索框 -->
      <div id="home-search" class="top" style="max-width: 750px">
        <img class="huizhang" src="../../../assets/home/huizhang.png" alt="" />
        <div class="title">个人所得税</div>
        <div class="search">
          <img class="search-logo" src="../../../assets/home/search.png" alt="" />
          <div class="search-text">搜一搜</div>
        </div>
        <img class="saomiao" src="../../../assets/home/saomiao.png" alt="" />
        <img class="message saomiao" src="../../../assets/home/message.png" alt="" />
      </div>
      <!-- 分类 -->
      <div class="sort">
        <div v-for="item in sortList" :key="item.sortOrder" class="sort-box" @click="goPage(item)">
          <img :src="item.icon" alt="" class="sort-logo" />
          <div>{{ item.title }}</div>
        </div>
      </div>
      <!-- 通知 -->
      <div class="announcement" @click.stop="goPage">
        <img src="../../../assets/home/lindang.png" alt="" />
        <div class="announcement-text">国家税务总局关于办理2022年度个人所得国家税务总局关于办理2022年度个人所得</div>
        <img src="../../../assets/home/rjiant-yellow.png" alt="" class="rjt-yellow" />
      </div>
      <div class="bgc" @click.stop="goPage">
        <img v-if="dictBgcImg" :src="dictBgcImg" alt="" />
      </div>
    </div>
    <div class="xia">
      <!-- 常用业务 -->
      <div class="norml">
        <div class="norml-business">
          <img src="../../../assets/home/norml-image.png" alt="" />
          <div class="norml-text">常用业务</div>
        </div>
        <div class="manage" @click.stop="goPage">
          <div class="manage-text">管理</div>
          <img src="../../../assets/home/right-jiantou.png" alt="" />
        </div>
      </div>
      <!-- 业务分类 -->
      <div>
        <div
          v-for="(item, index) in busniessList"
          :key="item.id"
          class="sort-business"
          :class="`sort-business--bac${index}`"
          @click="toPage(item)"
        >
          <div class="text-box">
            <div class="business-title">{{ item.title }}</div>
            <div class="business-text">{{ item.description }}</div>
          </div>
          <img src="../../../assets/home/right-jiantou.png" alt="" />
        </div>
      </div>
      <!-- 热点问题 -->
      <div class="hot-question" @click="goPage()">
        <div class="question-box">
          <div class="question-title">
            <img src="../../../assets/home/hot-question.png" alt="" />
            <div class="title-text">热点问题</div>
          </div>
          <div class="see-more">
            <div class="more-text">查看更多</div>
            <img src="../../../assets/home/right-jiantou.png" alt="" />
          </div>
        </div>
        <div v-for="item in hotQuestionList" :key="item.id" class="des-question">
          <img src="../../../assets/home/dian.png" alt="" />
          <div class="des-text">{{ item.title }}</div>
        </div>
      </div>
      <!-- 其他 -->
      <div class="other-box" @click="goPage()">
        <div class="other-left">
          <div class="other-left-top">
            <img src="../../../assets/home/tz-gonggao.png" alt="" />
          </div>
          <div class="other-left-top">
            <img src="../../../assets/home/zc-jiedu.png" alt="" />
          </div>
        </div>
        <div class="other-right">
          <img src="../../../assets/home/need-help.png" alt="" />
        </div>
      </div>
      <div class="image">
        <img src="../../../assets/home/ren.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { usePublicStore } from '@/store/modules/public';
import { taxSwiper, getNormlBusniess, getHotQuestion } from '@/api/home';
import { getQueryByDictCode } from '@/api/public';

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});

const router = useRouter();

const swipeList = ref([]);
// 获取轮播图信息
const getSwiper = async () => {
  const swipe = await taxSwiper();
  swipeList.value = swipe.result;
};
getSwiper();

// 获取页面分类信息
const sortList = ref([]);
const publicStore = usePublicStore();
const sortInit = async () => {
  const list = await publicStore.action_tax_icons({ type: 1 });
  sortList.value = list?.[0].list;
};
sortInit();

// 获取专题图片
const dictBgcImg = ref('');
const queryByDictCode = async () => {
  const { result } = await getQueryByDictCode({ code: 'A005' });
  dictBgcImg.value = result.image;
};
queryByDictCode();

// 常用业务
const busniessList = ref([]);
const getBusniess = async () => {
  const busniess = await getNormlBusniess();
  busniessList.value = busniess.result.list;
};
getBusniess();

// 热点问题
const hotQuestionList = ref([]);
const getQuestion = async () => {
  const hotQuestion = await getHotQuestion();
  hotQuestionList.value = hotQuestion.result.list;
};
getQuestion();

// 页面跳转
const goPage = (item) => {
  let routerName = '';
  switch (item?.title) {
    case '我要办税':
      routerName = 'HandleTax';
      break;
    case '我要查询':
      routerName = 'INeedSearch';
      break;
    case '公众服务':
      routerName = 'PublicService';
      break;
    default:
      routerName = 'BlankLoading';
      break;
  }
  router.push({
    name: routerName || '',
  });
};
// 常用业务部分，跳转页面
const toPage = (item) => {
  let toName = '';
  switch (item?.title) {
    case '综合所得年度汇算':
      toName = 'EmptyPage';
      break;
    case '专项附加扣除填报':
      toName = 'EmptyPage';
      break;
    case '收入纳税明细查询':
      toName = 'TaxDeatilsSearch';
      break;
    case '纳税记录开具':
      toName = 'HtRecordsOpener';
      break;
    default:
      break;
  }
  router.push({
    name: toName || '',
    query: {
      title: item.title,
    },
  });
};

// 顶部搜索背景色
const onScroll = () => {
  const HomeEl = document.getElementById('tabbar-home');
  const SearchEl = document.getElementById('home-search');
  let topS = HomeEl.scrollTop;
  if (topS <= 1) {
    SearchEl.style.setProperty('background', 'transparent');
    return;
  }
  if (topS > 100) topS = 100;
  SearchEl.style.setProperty(
    'background',
    `linear-gradient(to right, rgba(4, 97, 236, ${topS / 100}), rgba(66, 134, 245, ${topS / 100}))`,
  );
};
nextTick(() => {
  const HomeEl = document.getElementById('tabbar-home');
  HomeEl.addEventListener('scroll', onScroll);
});
</script>

<style scoped lang="scss">
.home-container {
  position: relative;
  height: 100%;
  overflow: auto;

  // 上半部分盒子
  .shang {
    background-color: #fff;
    padding-bottom: 18px;
    margin-bottom: 10px;
  }
  // 下半部分盒子
  .xia {
    background-color: #fff;
  }
  // 搜索部分
  .top {
    position: fixed;
    top: 0;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    display: flex;
    // justify-content: space-evenly;
    align-items: center;
    padding: 12px 13px 10px 8px;
    z-index: 99;
    .huizhang {
      margin-right: 2px;
      width: 30px;
      height: 30px;
    }
    .search {
      display: flex;
      align-items: center;
      margin-right: 11px;
      width: 151px;
      height: 32px;
      border-radius: 116px;
      background: rgba(255, 255, 255, 0.25);
      .search-logo {
        margin: 0 8px 0 14px;
        width: 16px;
        height: 18px;
        opacity: 0.9;
      }
      .search-text {
        font-size: 16px;
        font-weight: normal;
        color: #ffffff;
      }
    }
    .title {
      margin-right: 14px;
      font-size: 16px;
      font-weight: normal;
      letter-spacing: 0.06em;
      color: #ffffff;
    }
    .saomiao {
      width: 24px;
      height: 24px;
    }
    .message {
      margin-left: 11px;
    }
  }
  // 轮播图
  .swiper {
    position: relative;
    width: 100%;
    height: 232px;
    .va-swiper {
      width: 100%;
      height: 100%;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
      .swipe-dian {
        position: absolute;
        left: 25px;
        bottom: 56px;
        display: flex;
        .article-dian {
          margin-right: 6px;
          width: 6px;
          height: 6px;
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 0.7);
        }
        .article-dian-active {
          width: 15px;
          height: 6px;
          background-color: #fff;
        }
      }
    }
    .triangle-left {
      position: absolute;
      left: -2px;
      bottom: -10px;
      width: 0;
      height: 0;
      border-color: transparent transparent #f4f9fd #f4f9fd;
      border-style: solid;
      border-width: 10px 20px;
    }
    .triangle-right {
      position: absolute;
      right: 0;
      bottom: -10px;
      width: 0;
      height: 0;
      border-color: transparent #f4f9fd #f4f9fd transparent;
      border-style: solid;
      border-width: 10px 20px;
    }
  }
  // 分类
  .sort {
    position: absolute;
    left: 16px;
    top: 195px;
    display: flex;
    width: 344px;
    height: 94px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 8px 19px 0px rgba(196, 205, 255, 0.49);
    .sort-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 33.33%;
      padding: 12px 0;
      .sort-logo {
        margin-bottom: 2px;
        width: 50px;
        height: 50px;
      }
    }
  }

  //通知
  .announcement {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 76px 0 0 18px;
    padding: 14px;
    width: 344px;
    height: 36px;
    border-radius: 17.5px;
    background: #fdf7dd;
    .announcement-text {
      margin-right: 10px;
      white-space: nowrap;
      overflow: hidden;
      word-break: break-all;
      text-overflow: ellipsis;
      font-size: 13.4px;
      letter-spacing: 0.02em;
      color: #f2a73f;
    }

    img {
      margin-right: 20px;
      width: 14px;
      height: 14.52px;
    }
    .rjt-yellow {
      margin-right: -3px;
      width: 14px;
      height: 14px;
    }
  }
  .bgc {
    img {
      margin: 20px 0 0 18px;
      width: 344px;
      height: 146px;
    }
  }
  // 常用业务
  .norml {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    padding: 20px 14px 20px 18px;
    .norml-business {
      display: flex;
      img {
        width: 17.35px;
        height: 17.35px;
        margin-right: 12px;
      }
      .norml-text {
        font-size: 16px;
        font-weight: bold;
        color: #282828;
      }
    }
    .manage {
      display: flex;
      align-items: center;
      .manage-text {
        font-size: 14px;
        font-weight: normal;
        color: #b8b8b8;
      }
      img {
        margin-left: 6px;
        width: 14px;
        height: 14px;
      }
    }
  }
  // 业务分类
  .sort-business {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 18px;
    margin-bottom: 15px;
    padding: 12px;
    width: 347px;
    border-radius: 4px;
    background: #ffffff;
    &--bac0 {
      box-shadow: 2px 0px 0px 0px #ed6e90 inset, 0px 0px 7px 0px rgba(0, 0, 0, 0.05);
    }
    &--bac1 {
      box-shadow: 2px 0px 0px 0px #82d7ae inset, 0px 0px 7px 0px rgba(0, 0, 0, 0.05);
    }
    &--bac2 {
      box-shadow: 2px 0px 0px 0px #9b8edd inset, 0px 0px 7px 0px rgba(0, 0, 0, 0.05);
    }
    &--bac3 {
      box-shadow: 2px 0px 0px 0px #edca92 inset, 0px 0px 7px 0px rgba(0, 0, 0, 0.05);
    }
    .business-title {
      margin-bottom: 5px;
      font-size: 14px;
      font-weight: normal;
      color: #3d3d3d;
      line-height: 20px;
    }
    .business-text {
      font-size: 13px;
      font-weight: normal;
      color: #929191;
      line-height: 16px;
    }
    img {
      width: 14px;
      height: 14px;
      margin-left: 15px;
    }
  }

  // 热点问题
  .hot-question {
    margin-left: 21px;
    margin-top: 20px;
    width: 344px;
    height: 153px;
    border-radius: 2px;
    background: #ffffff;
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.05);
    .question-box {
      display: flex;
      justify-content: space-between;
      padding: 18px;
      .question-title {
        display: flex;
        img {
          margin-right: 13px;
          width: 19px;
          height: 19.5px;
        }
        .title-text {
          font-size: 16px;
          font-weight: normal;
          color: #282828;
        }
      }
      .see-more {
        display: flex;
        align-items: center;
        .more-text {
          margin-right: 7.6px;
          font-size: 14px;
          font-weight: normal;
          color: #3d3d3d;
        }
        img {
          width: 14px;
          height: 14px;
        }
      }
    }
    .des-question {
      padding: 0 14px;
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      img {
        width: 4px;
        height: 4px;
        margin-right: 8px;
      }
      .des-text {
        white-space: nowrap;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        font-size: 13px;
        font-weight: normal;
        color: #505050;
      }
    }
  }

  // 其他
  .other-box {
    margin: 30px 0 0px 19px;
    display: flex;
    .other-left {
      margin-right: 18px;
      .other-left-top {
        margin-bottom: 11px;
        width: 164px;
        height: 68px;
        img {
          width: 100%;
        }
      }
    }
    .other-right {
      width: 164px;
      height: 144.24px;
      img {
        width: 100%;
      }
    }
  }

  // 底部图片
  .image {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    padding-bottom: 50px;
    img {
      width: 245px;
      height: 28px;
    }
  }
}
</style>
