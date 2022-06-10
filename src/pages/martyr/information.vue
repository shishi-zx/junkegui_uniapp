<template>
    <div class="container">
        <div class="form">
            <uni-row>
                <div class="row">
                    <uni-col :span="8">
                        <div class="attr">姓名：</div>
                    </uni-col>
                    <uni-col :span="16">
                        <div class="attr-value">
                            <uni-easyinput :inputBorder="false" v-model="name" placeholder="请输入名字" label="姓名"
                                trim="all"></uni-easyinput>
                        </div>
                    </uni-col>
                </div>
            </uni-row>
            <uni-row>
                <div class="row">
                    <uni-col :span="8">
                        <div class="attr">性别：</div>
                    </uni-col>
                    <uni-col :span="16">
                        <div class="attr-value">
                            <radio-group @change="genderChange">
                                男：
                                <radio :value="1" :checked="gender == 1" />
                                女：
                                <radio :value="0" :checked="gender == 0" />
                            </radio-group>
                        </div>
                    </uni-col>
                </div>
            </uni-row>
            <uni-row>
                <uni-col :span="8">
                    <div class="attr">出生日期：</div>
                </uni-col>
                <uni-col :span="16">
                    <div class="attr-value">
                        <view class="uni-list-cell-db">
                            <picker mode="date" :value="birth" fields="day" start="1800-1" end="2050-1"
                                @change="birthChange">
                                <view class="uni-input">{{ birth | dateFormat }}</view>
                            </picker>
                        </view>
                    </div>
                </uni-col>
            </uni-row>
            <uni-row>
                <uni-col :span="8">
                    <div class="attr">牺牲日期：</div>
                </uni-col>
                <uni-col :span="16">
                    <div class="attr-value">
                        <view class="uni-list-cell-db">
                            <picker mode="date" :value="sacrifice_time" fields="day" start="1800-1" end="2050-1"
                                @change="sacrifice_timeChange">
                                <view class="uni-input">{{ sacrifice_time | dateFormat }}</view>
                            </picker>
                        </view>
                    </div>
                </uni-col>
            </uni-row>
            <uni-row>
                <uni-col :span="8">
                    <div class="attr">牺牲地点：</div>
                </uni-col>
                <uni-col :span="16">
                    <div class="attr-value">
                        <view class="uni-list-cell-db">
                            <picker mode="region" value="" fields="day" start="1800-1" end="2050-1"
                                @change="sacrifice_placeChange">
                                <view class="uni-input">{{ sacrifice_place || '点击选择' }}</view>
                            </picker>
                        </view>
                    </div>
                </uni-col>
            </uni-row>
            <uni-row>
                <uni-col :span="8">
                    <div class="attr">安葬陵园：</div>
                </uni-col>
                <uni-col :span="16">
                    <div class="attr-value">
                        <div @click="show = true">{{ martyrCemetery ? martyrCemetery.name : '点击选择' }}</div>
                        <van-action-sheet :show="show" :actions="actions" @select="martyrCemeteryChange"
                            @click-overlay="show = false">
                            <uni-search-bar @input="martyrCemeteryInput"></uni-search-bar>
                        </van-action-sheet>
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
import { reqOneMartyr, reqAllMartyrCemetery, reqAddOneMartyr, reqUpdOneMartyr } from '../../api/index'
export default {
    data() {
        return {
            type: null,//1 详情修改，2 添加
            id: null,
            name: null,
            gender: 0,
            birth: null,
            sacrifice_time: null,
            sacrifice_place: null,
            martyrCemetery: null,
            //
            martyrCemeterys: [],
            show: false,
            actions: [],
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            let { id, type } = this.$Route.query
            if (id) {
                let res = await reqOneMartyr({ id })
                let { name, gender, birth, sacrifice_time, sacrifice_place, martyr_cemetery } = res.data
                this.id = id
                this.name = name
                this.gender = gender
                this.birth = birth
                this.sacrifice_time = sacrifice_time
                this.sacrifice_place = sacrifice_place
                this.martyrCemetery = martyr_cemetery
            }
            this.type = type
            let p = await reqAllMartyrCemetery()
            if (p.code != 200) {
                return this.toast(p.msg)
            }
            this.martyrCemeterys = p.data
            this.actions = this.martyrCemeterys
            this.martyrCemeterys.push({ name: '未知', id: -1 })
        },
        genderChange(e) {
            this.gender = Number(e.detail.value)
        },
        birthChange(e) {
            this.birth = e.detail.value
        },
        sacrifice_timeChange(e) {
            this.sacrifice_time = e.detail.value
        },
        sacrifice_placeChange(e) {
            this.sacrifice_place = e.detail.value.join("")
        },
        martyrCemeteryChange(e) {
            this.show = false
            this.martyrCemetery = e.detail
        },
        martyrCemeteryInput(val) {
            let reg = new RegExp(val)
            this.actions = this.martyrCemeterys.filter((e) => {
                return reg.test(e.name)
            })
        },
        async onUpdate() {
            let { id, name, gender, birth, sacrifice_time, sacrifice_place, martyrCemetery } = this
            let newMartyr = {
                id, name, gender, birth, sacrifice_time, sacrifice_place, martyrCemeteryId: martyrCemetery ? martyrCemetery.id : null
            }
            if (newMartyr.martyrCemeteryId == -1) {
                newMartyr.martyrCemeteryId = null
            }
            let res = await reqUpdOneMartyr(newMartyr)
            if (res.code != 200) {
                return this.toast(res.msg)
            }
            this.$Router.back()
        },
        async onAdd() {
            let { name, gender, birth, sacrifice_time, sacrifice_place, martyrCemetery } = this
            let newMartyr = {
                name, gender, birth, sacrifice_time, sacrifice_place, martyrCemeteryId: martyrCemetery ? martyrCemetery.id : null
            }
            if (newMartyr.martyrCemeteryId == -1) {
                newMartyr.martyrCemeteryId = null
            }
            let res = await reqAddOneMartyr(newMartyr)
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