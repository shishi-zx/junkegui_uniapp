<template>
  <div class="container">
        <van-toast id="van-toast" />
    <div class="form">
      <uni-row>
        <div class="row">
          <uni-col>
            <van-field type="password" label="原密码" placeholder="请输入原密码" @input="onPwdInput" />
          </uni-col>
        </div>
      </uni-row>
      <uni-row>
        <div class="row">
          <uni-col>
            <van-field type="password" label="新密码" placeholder="请输入新密码" @input="onNpwd1Input" />
          </uni-col>
        </div>
      </uni-row>
      <uni-row>
        <div class="row">
          <uni-col>
            <van-field type="password" label="确认新密码" placeholder="请确认新密码" @input="onNpwd2Input"
              :error-message="pwdNotSame" />
          </uni-col>
        </div>
      </uni-row>
      <uni-row>
        <div class="row btn-row">
          <uni-col>
            <div class="btn-box">
              <div class="btn">
                <van-button type="primary" @click="onUpdate">修改</van-button>
              </div>
              <div class="btn">
                <van-button type="info" @click="onBack">取消</van-button>
              </div>
            </div>
          </uni-col>
        </div>
      </uni-row>
    </div>
  </div>
</template>

<script>
import {reqUpdateSelfPwd} from '../../api/index'
export default {
  data() {
    return {
      user: null,
      pwd: '',
      npwd1: '',
      npwd2: '',
      pwdNotSame: ''
    }
  },
  mounted() {
    this.user = this.$store.state.user
  },
  methods: {
    onPwdInput({ detail: pwd }) {
      this.pwd = pwd
    },
    onNpwd1Input({ detail: npwd1 }) {
      this.npwd1 = npwd1
    },
    onNpwd2Input({ detail: npwd2 }) {
      this.npwd2 = npwd2
      if (this.npwd1 != npwd2) {
        this.pwdNotSame = '新密码不一致'
      } else {
        this.pwdNotSame = ''
      }
    },
    async onUpdate() {
      let {user,pwd,npwd1} = this
      let obj = {
        user:user.user,pwd,npwd: npwd1
      }
      let res = await reqUpdateSelfPwd(obj)
      console.log(res);
      if(res.code==200){
        this.$Router.replaceAll('/pages/login')
      }else{
        this.toast(res.msg)
      }
    },
    onBack() {
      this.$Router.back()
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  width: 90%;
  overflow: hidden;
  border-radius: 30rpx;
  background: #fff;
}

.btn-box {
  margin: 40rpx 0;
  display: flex;
  justify-content: space-around;
}
</style>