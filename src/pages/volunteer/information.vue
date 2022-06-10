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
            <div class="attr">籍贯：</div>
          </uni-col>
          <uni-col :span="16">
            <div class="attr-value">
              <picker
                mode="region"
                value=""
                fields="day"
                start="1800-1"
                end="2050-1"
                @change="placeChange"
              >
                <view class="uni-input">{{ place || "点击选择" }}</view>
              </picker>
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
  reqOneVolunteer,
  reqUpdOneVolunteer,
  reqAddOneVolunteer,
} from "../../api/index";
export default {
  data() {
    return {
      type: null, //1 详情修改，2 添加
      id: null,
      user: null,
      name: null,
      phone: null,
      place: null,
      error_phone: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let { id, type } = this.$Route.query;
      if (id) {
        let res = await reqOneVolunteer({ id });
        let { name, user, phone, place } = res.data;
        this.id = id;
        this.name = name;
        this.user = user;
        this.phone = phone;
        this.place = place;
      }
      this.type = type;
    },
    placeChange(e) {
      this.place = e.detail.value.join("");
    },
    async onUpdate() {
      let { id, name, user, phone, place } = this;
      let obj = { id, name, user, phone, place };
      if (this.error_phone) {
        return this.toast("请输入正确的数据格式");
      }
      let res = await reqUpdOneVolunteer(obj);
      if (res.code != 200) {
        return this.toast(res.msg);
      }
      this.$Router.back();
    },
    async onAdd() {
      let { name, user, phone, place } = this;
      let obj = { name, user, phone, place };
      if (this.error_phone) {
        return this.toast("请输入正确的数据格式");
      }
      let res = await reqAddOneVolunteer(obj);
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