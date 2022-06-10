<template>
    <div class="container">
        <div class="form">
            <uni-row>
                <div class="row">
                    <uni-col :span="8">
                        <div class="attr">名称：</div>
                    </uni-col>
                    <uni-col :span="16">
                        <div class="attr-value">
                            <uni-easyinput :inputBorder="false" v-model="name" placeholder="请输入名称" label="姓名"
                                trim="all"></uni-easyinput>
                        </div>
                    </uni-col>
                </div>
            </uni-row>
            <uni-row>
                <uni-col :span="8">
                    <div class="attr">陵园地址：</div>
                </uni-col>
                <uni-col :span="16">
                    <div class="attr-value">
                        <view class="uni-list-cell-db">
                            <picker mode="region" value="" fields="day" start="1800-1" end="2050-1"
                                @change="placeChange">
                                <view class="uni-input">{{ place || '点击选择' }}</view>
                            </picker>
                        </view>
                    </div>
                </uni-col>
            </uni-row>
            <uni-row>
                <uni-col :span="12">
                    <div class="attr">
                        <van-button v-if="type == 1" type="primary" @click="onUpdate">修改</van-button>
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
import { reqOneMartyrCemetery, reqAddOneMartyrCemetery, reqUpdOneMartyrCemetery } from '../../api/index'
export default {
    data() {
        return {
            type: null,//1 详情修改，2 添加
            //
            id: null,
            name: null,
            place: null,
            position: null,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            let { id, type } = this.$Route.query
            if (id) {
                let res = await reqOneMartyrCemetery({ id })
                let { name, place, position } = res.data
                this.id = id
                this.name = name
                this.place = place
                this.position = position
            }
            this.type = type
        },
        placeChange(e) {
            this.place = e.detail.value.join("")
        },
        async onUpdate() {
            let { id, name, place } = this
            let newMartyrCemetery = {
                id, name, place
            }
            let res = await reqUpdOneMartyrCemetery(newMartyrCemetery)
            if (res.code != 200) {
                return this.toast(res.msg)
            }
            this.$Router.back()
        },
        async onAdd() {
            let { name, place } = this
            let newMartyrCemetery = {
                name, place
            }
            let res = await reqAddOneMartyrCemetery(newMartyrCemetery)
            if (res.code != 200) {
                return this.toast(res.msg)
            }
            this.$Router.back()
        },
        onBack() {
            this.$Router.back()
        }
    }
}
</script>

<style scoped>
.container {
    background: rgb(244, 239, 239);
    min-height: 100vh;
    padding: 20rpx;
    overflow: hidden;
}

/* .form {
    background: rgb(235, 213, 213);
} */

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
</style>