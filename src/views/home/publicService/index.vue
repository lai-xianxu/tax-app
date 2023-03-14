<template>
  <NavbarPage label="公众服务">
    <div>
      <div class="sort-box">
        <div class="sort" @click.stop="goPage('票证查验')">
          <div class="sort-text">票证查验</div>
          <img src="../../../assets/home/search-jiantour.png" alt="" />
        </div>
        <div class="sort-des">多种税后票证的真伪查询</div>
        <div class="line"></div>
        <div class="sort" @click.stop="goPage('通知公告')">
          <div class="sort-text">通知公告</div>
          <img src="../../../assets/home/search-jiantour.png" alt="" />
        </div>
        <div class="sort-des">可查看税收相关通知公告</div>
        <div class="line"></div>
        <div class="sort" @click.stop="goPage('税收政策及解读')">
          <div class="sort-text">税收政策及解读</div>
          <img src="../../../assets/home/search-jiantour.png" alt="" />
        </div>
        <div class="sort-des">可查看税收政策及相关解读</div>
        <div class="line"></div>
        <div class="sort" @click.stop="goPage('办税指南')">
          <div class="sort-text">办税指南</div>
          <img src="../../../assets/home/search-jiantour.png" alt="" />
        </div>
        <div class="sort-des">可查看办税申请条件、相关流程等办理指南</div>
        <div class="line"></div>
        <div class="sort" @click.stop="goPage('热点问题')">
          <div class="sort-text">热点问题</div>
          <img src="../../../assets/home/search-jiantour.png" alt="" />
        </div>
        <div class="sort-des">可查看税务相关热点问题</div>
      </div>
    </div>
  </NavbarPage>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goPage = (title) => {
  router.push({
    name: 'BlankLoading',
    query: {
      title,
    },
  });
};
</script>

<style scoped lang="scss">
.sort-box {
  padding: 10px 14px 14px 15px;
  background-color: #fff;
  .sort {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 30px;
    img {
      width: 14px;
      height: 14px;
    }
    .sort-text {
      font-size: 16px;
      font-weight: normal;
      letter-spacing: 0em;
      color: #3d3d3d;
    }
  }
  .sort-des {
    font-size: 13px;
    font-weight: normal;
    letter-spacing: 0.02em;
    color: #b8b8b8;
  }
  .line {
    margin: 10px 0;
    width: 360px;
    height: 1px;
    background-color: rgba(238, 237, 237, 0.6);
  }
}
</style>
