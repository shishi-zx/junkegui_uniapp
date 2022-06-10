<template>
  <div class="container">
    <div class="top">
      <div class="name">用户：shishi</div>
      <div class="user">登录账号：shishi</div>
    </div>
    <div class="main">
      <uni-row>
        <uni-col>
          <van-divider contentPosition="center" hairline
                customStyle="color: #000; border-color: #000; font-size: 18px;">
                我的操作
            </van-divider>
        </uni-col>
      </uni-row>
      <uni-row>
        <uni-col>
          <div class="item" @click="onInf">
            <van-icon name="coupon-o" />
            <span>我的信息</span>
          </div>
        </uni-col>
      </uni-row>
      <uni-row>
        <uni-col>
          <div class="item" @click="onUpdPwd">
            <van-icon name="shield-o" />
            <span>修改密码</span>
          </div>
        </uni-col>
      </uni-row>
      <uni-row>
        <uni-col>
          <div class="item" @click="onLoginOut">
            <van-icon name="share-o" />
            <span>退出登录</span>
          </div>
        </uni-col>
      </uni-row>
    </div>
  </div>
</template>

<script>
import {reqLogout} from '../api/index'
export default {
  methods:{
    async onLoginOut(){
      let res = await reqLogout()
      if(res.code==200){
        this.$Router.replaceAll('/pages/login')
      }else{
        this.toast(res.msg)
      }
    },
    onUpdPwd(){
      this.$Router.push('/pages/user/pwd')
    },
    onInf(){
      this.$Router.push('/pages/user/information')
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
}

.top {
  background: #f8f8f8;
  height: 300rpx;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
}

.name {
  font-size: 60rpx;
}

.user {
  font-size: 30rpx;
}

.main {
  margin: 30rpx;
  background: #f8f8f8;
  border-radius: 30rpx;
  padding: 0 30rpx 0 30rpx;
}
.item{
  height: 80rpx;
  line-height: 80rpx;
  font-size: 34rpx;
  border-bottom: 1px solid rgb(207, 200, 200);
  margin-bottom: 30rpx;
}
.item span{
  padding-left: 20rpx;
}
</style>