<template>
  <div class="container">
    <van-toast id="van-toast" />
    <div class="form">
      <uni-row>
        <div class="row">
          <uni-col :span="8">
            <div class="attr">昵称：</div>
          </uni-col>
          <uni-col :span="16">
            <div class="attr-value">
              <uni-easyinput
                :inputBorder="false"
                v-model="name"
                placeholder="请输入昵称"
                label="姓名"
                trim="all"
              >
              </uni-easyinput>
            </div>
          </uni-col>
        </div>
      </uni-row>
      <uni-row>
        <div class="row">
          <uni-col :span="8">
            <div class="attr">登录账号：</div>
          </uni-col>
          <uni-col :span="16">
            <div class="attr-value">
              <uni-easyinput
                :inputBorder="false"
                v-model="user"
                placeholder="请输入账号"
                trim="all"
              >
              </uni-easyinput>
            </div>
          </uni-col>
        </div>
      </uni-row>
      <uni-row>
        <div class="row">
          <uni-col :span="8">
            <div class="attr">联系电话：</div>
          </uni-col>
          <uni-col :span="16">
            <div class="attr-value">
              <uni-easyinput
                :inputBorder="false"
                v-model="phone"
                placeholder="请输入电话"
                trim="all"
              >
              </uni-easyinput>
              <div v-show="error_phone" class="error-msg">手机号格式不对</div>
            </div>
          </uni-col>
        </div>
      </uni-row>
      <uni-row>
        <div class="row">
          <uni-col :span="8">
            <div class="attr">联系邮箱：</div>
          </uni-col>
          <uni-col :span="16">
            <div class="attr-value">
              <uni-easyinput
                :inputBorder="false"
                v-model="email"
                placeholder="请输入邮箱"
                trim="all"
              >
              </uni-easyinput>
              <div v-show="error_email" class="error-msg">邮箱格式不对</div>
            </div>
          </uni-col>
        </div>
      </uni-row>
      <uni-row>
        <uni-col :span="12">
          <div class="attr">
            <van-button v-if="type == 1" type="primary" @click="onUpdate"
              >修改</van-button
            >
            <van-button v-else type="primary" @click="onAdd">添加</van-button>
          </div>
        </uni-col>
        <uni-col :span="12">
          <div class="attr-value">
            <van-button type="info" @click="onBack">取消</van-button>
          </div>
        </uni-col>
      </uni-row>
    </div>
  </div>
</template>

<script>
import {
  reqOneAdmin,
  reqAllRoles,
  reqUpdateAdmin,
  reqAddOneAdmin,
} from "../../../api/index";
export default {
  data() {
    return {
      type: null, //1 详情修改，2 添加
      id: null,
      user: null,
      name: null,
      phone: null,
      email: null,
      role: null,
      role_list: [],
      error_phone: false,
      error_email: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let { id, type } = this.$Route.query;
      if (id) {
        let res = await reqOneAdmin({ id });
        let { name, user, phone, email, roles } = res.data;
        this.id = id;
        this.name = name;
        this.user = user;
        this.phone = phone;
        this.email = email;
        this.role = roles;
      }
      this.type = type;
      let p = await reqAllRoles();
      if (p.code != 200) {
        return this.toast(p.msg);
      }
      this.role_list = p.data;
      this.actions = this.roles;
    },
    async onUpdate() {
      let { id, name, user, phone, email } = this;
      let obj = { id, name, user, phone, email };
      if (this.error_phone || this.error_email) {
        return this.toast("请输入正确的数据格式");
      }
      let res = await reqUpdateAdmin(obj);
      if (res.code != 200) {
        return this.toast(res.msg);
      }
      this.$Router.back();
    },
    async onAdd() {
      let { name, user, phone, email } = this;
      let obj = { name, user, phone, email };
      if (this.error_phone || this.error_email) {
        return this.toast("请输入正确的数据格式");
      }
      let res = await reqAddOneAdmin(obj);
      if (res.code != 200) {
        return this.toast(res.msg);
      }
      this.$Router.back();
    },
    onBack() {
      this.$Router.back();
    },
  },
  watch: {
    phone: function (newVal, oldVal) {
      // let reg = /^1[0-9]{10}$/
      let reg =
        /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(newVal)) {
        this.error_phone = true;
      } else {
        this.error_phone = false;
      }
    },
    email: function (val) {
      let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!reg.test(val)) {
        this.error_email = true;
      } else {
        this.error_email = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  background: rgb(244, 239, 239);
  min-height: 100vh;
  padding: 20rpx;
  overflow: hidden;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}

.row {
  height: 100rpx;
  overflow: hidden;
  /* background: rgb(223, 210, 210); */
  margin: 20rpx 0 20rpx 0;
}

.attr {
  /* background: rgb(232, 198, 198); */
  /* color: rgb(47, 156, 251); */
  text-align: center;
  height: 100rpx;
  line-height: 100rpx;
}

.attr-value {
  height: 100rpx;
  line-height: 100rpx;
  /* border-bottom: 1px solid rgb(201, 184, 184); */
}

.error-msg {
  /* background: rgb(204, 185, 185); */
  height: 40rpx;
  font-size: 25rpx;
  line-height: 40rpx;
  padding-left: 30rpx;
  transform: translateY(-100%);
  color: red;
}
</style>