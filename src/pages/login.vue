<template>
    <view class="container">
        <van-toast id="van-toast" />
        <view class="form">
            <div class="form-line">
                <div class="title">LOGIN</div>
            </div>
            <div class="form-line">
                <input type="text" v-model="user" placeholder="请输入账号">
            </div>
            <div class="form-line">
                <input placeholder-class="placeholder-input" type="password" v-model="pwd" placeholder="请输入密码">
            </div>
            <div class="form-line">
                <van-button @click="login" round block size="large"
                    color="linear-gradient(120deg, #8cb5f7 0%, #b3dcee 100%)" class="login-btn">登录</van-button>
            </div>
        </view>
    </view>
</template>

<script>

import {reqLogin} from '../api/index'

export default {
    data() {
        return {
            user: 'root',
            pwd: 'root'
        }
    },
    mounted() {

    },
    methods: {
        login() {
            const {user,pwd} = this
            reqLogin({user,password:pwd}).then(async res=>{
                if(res.code==200){
                    await this.utils.initUser(user,pwd)
                    this.$Router.push('/pages/home/home')
                }
                else this.toast(res.msg)
            })
        }
    }
};
</script>

<style scoped >
.container {
    height: 100vh;
    /* background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%); */
    /* background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%); */
    /* background: #f8f8f8; */
    background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form {
    /* background-image: linear-gradient(120deg, #8cb5f7 0%, #b3dcee 100%); */
    /* background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); */
    /* background: rgba(0, 0, 0, 0.3); */
    background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
    box-shadow: 0 0 10px 1px #a5a6a8;
    border-radius: 30rpx;
    width: 90%;
    height: 50%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    flex-wrap: nowrap;
}

.form-line {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-line:first-child {
    height: 30%;
}

.form-line:nth-child(2) {
    height: 20%;
}

.form-line:nth-child(3) {
    height: 20%;
}

.form-line:nth-child(4) {
    height: 30%;
}

input {
    background-color: transparent;
    width: 70%;
    color: #000;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 1);
    padding: 10px 0;
    text-indent: 10px;
    font-size: 14px;
    letter-spacing: 2px;
    font-size: 40rpx;

}

.title {
    font-weight: bold;
    font-size: 60rpx;
}

.login-btn {
    width: 50%;
}
</style>