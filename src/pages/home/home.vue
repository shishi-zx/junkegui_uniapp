<template>
  <div class="container">
    <van-toast id="van-toast" />
    <div class="page1" v-show="Selected==1||Selected==2">
      <div class="swiper-box">
        <homeSwiper/>
      </div>
      <div class="serve-box" v-show="Selected==1">
        <homeServe />
      </div>
      <div class="manage-box" v-show="Selected==2">
        <homeManage/>
      </div>
    </div>
    <!-- <div class="page2" v-show="Selected==2">
      
    </div> -->
    <div class="page3" v-show="Selected==3">
      <div class="user-box">
        <homeUser/>
      </div>
    </div>
    <div class="bottom-tap">
      <div class="item" :class="{'page-selected': Selected==1 }" @click="Selected=1">
        <van-icon name="wap-home-o" />
        <div class="text">服务</div>
      </div>
      <div class="item" :class="{'page-selected': Selected==2 }" @click="Selected=2">
        <van-icon name="cluster-o" />
        <div class="text">管理</div>
      </div>
      <div class="item" :class="{'page-selected': Selected==3 }" @click="Selected=3">
        <van-icon name="user-o" />
        <div class="text">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeManage from '../../components/home_manage.vue'
import homeServe from '../../components/home_serve.vue'
import homeSwiper from '../../components/home_swiper.vue'
import homeUser from '../../components/home_user.vue'
export default {
  components: { homeSwiper, homeServe, HomeManage, homeUser },
  data(){
    return {
      Selected: 1
    }
  }
}
</script>

<style scoped>
.container {
  overflow: hidden;
  min-height: 100vh;
  background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
}
.swiper-box {
  margin: 20rpx;
  border-radius: 10px;
  overflow: hidden;
}
.serve-box {
  margin: 20rpx;
  margin-top: 60rpx;
}
.bottom-tap{
  position: fixed;
  bottom: 0;
  width: 100vw;
  z-index: 1000;
  height: calc(100vh / 10);
  background: #f8f8f8;
  display: flex;
}
.bottom-tap .item{
  height: calc(100vh / 10);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.bottom-tap .item van-icon{
  font-size: 70rpx;
}
.bottom-tap .item .text{
  font-size: 32rpx;
}
.page-selected{
  color: rgb(45, 124, 235);
}
</style>