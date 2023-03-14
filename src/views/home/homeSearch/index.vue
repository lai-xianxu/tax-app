<template>
  <NavbarPage label="我要查询">
    <div>
      <!-- 申报信息查询 -->
      <div class="msg-search">
        <div class="title">
          <div class="line"></div>
          <div class="title-text">申报信息查询</div>
        </div>
        <div class="search-box">
          <div class="search-title" @click="goPage(1)">
            <div class="title-text">申报查询</div>
            <img src="../../../assets/home/search-jiantour.png" alt="" />
          </div>
          <div class="search-content">已填报的各项报表的查询</div>
          <div class="sort-line"></div>
          <div class="search-title" @click.stop="goPageBlank">
            <div class="title-text">专项附加扣除信息查询</div>
            <img src="../../../assets/home/search-jiantour.png" alt="" />
          </div>
          <div class="search-content">已填报的各项专项附加扣除记录的查询</div>
          <div class="sort-line"></div>
          <div class="search-title" @click="goPage(2)">
            <div class="title-text">收入纳税明细查询</div>
            <img src="../../../assets/home/search-jiantour.png" alt="" />
          </div>
          <div class="search-content">已申报收入的查询及异议申诉</div>
        </div>
      </div>
      <!-- 备案信息查询 -->
      <div class="msg-search">
        <div class="title">
          <div class="line"></div>
          <div class="title-text">备案信息查询</div>
        </div>
        <div class="search-box">
          <div class="search-title" @click.stop="goPageBlank">
            <div class="title-text">天使投资个人所得税抵扣备案查询</div>
            <img src="../../../assets/home/search-jiantour.png" alt="" />
          </div>
          <div class="search-content">已备案的创投企业和天使投资个人符合规定投资行为查询</div>
          <div class="sort-line"></div>
          <div class="search-title" @click.stop="goPageBlank">
            <div class="title-text">非货币性资产投资分期缴纳备案查询</div>
            <img src="../../../assets/home/search-jiantour.png" alt="" />
          </div>
          <div class="search-content">已备案的非货币性资产投资分期缴纳查询</div>
          <div class="sort-line"></div>
          <div class="search-title" @click.stop="goPageBlank">
            <div class="title-text">税收优惠备案查询</div>
            <img src="../../../assets/home/search-jiantour.png" alt="" />
          </div>
          <div class="search-content">已备案的其他税收优惠事项查询</div>
        </div>
      </div>
      <!-- 其他查询 -->
      <div class="msg-search other-search">
        <div class="title">
          <div class="line"></div>
          <div class="title-text">其他查询</div>
        </div>
        <div class="search-box">
          <div class="search-title" @click.stop="goPageBlank">
            <div class="title-text">异议处理查询</div>
            <img src="../../../assets/home/search-jiantour.png" alt="" />
          </div>
          <div class="search-content">已发起申诉事项的进度查询</div>
          <div class="sort-line"></div>
          <div class="search-title" @click.stop="goPageBlank">
            <div class="title-text">税务文书查询</div>
            <img src="../../../assets/home/search-jiantour.png" alt="" />
          </div>
          <div class="search-content">税务机关送达的税务文书查询</div>
          <div class="sort-line"></div>
          <div class="search-title" @click.stop="goPageBlank">
            <div class="title-text">税务机关送达的税务文书查询</div>
            <img src="../../../assets/home/search-jiantour.png" alt="" />
          </div>
          <div class="search-content">税务机关送达的税务文书查询</div>
          <div class="sort-line"></div>
          <div class="search-title" @click.stop="goPageBlank">
            <div class="title-text">纳税记录申请查询</div>
            <img src="../../../assets/home/search-jiantour.png" alt="" />
          </div>
          <div class="search-content">已申请开具的纳税记录查询</div>
        </div>
      </div>
    </div>
  </NavbarPage>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goPage = (num) => {
  if (num === 2) {
    router.push({
      name: 'TaxDeatilsSearch',
    });
  } else {
    router.push({
      name: 'DeclarationQuery',
    });
  }
};
const goPageBlank = () => {
  router.push({
    name: 'BlankLoading',
  });
};
</script>

<style scoped lang="scss">
// 本页面公共头部标题部分
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
    font-weight: bold;
    color: #3d3d3d;
  }
}
// 主体内容公共部分
.search-box {
  padding: 0px 16px 10px 14px;
  background-color: #fff;
  .search-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 30px;
    .title-text {
      font-size: 16px;
      font-weight: normal;
      letter-spacing: 0.02em;
      color: #3d3d3d;
    }
    img {
      width: 10px;
      height: 10px;
    }
  }
  .search-content {
    margin-right: 41px;
    font-size: 13px;
    font-weight: normal;
    letter-spacing: 0.02em;
    color: #b8b8b8;
  }
}
// 分割线
.sort-line {
  margin: 10px 0 5px 0;
  width: 360px;
  height: 1px;
  background-color: rgba(238, 237, 237, 0.6);
}
// 申报信息查询
.msg-search {
  margin-top: 12px;
}
// 其他查询
.other-search {
  margin-bottom: 12px;
}
</style>
