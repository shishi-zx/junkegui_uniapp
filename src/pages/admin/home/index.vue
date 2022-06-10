<template>
    <div class="container">
        <div class="top">
            <div class="left">
                <uni-search-bar v-model="searchValue" radius="20" placeholder="请输入名字" @confirm="search" @cancel="cancel"
                    cancel-text="cancel">
                    <template v-slot:searchIcon>
                        <uni-icons color="#999999" size="18" type="search" />
                    </template>
                </uni-search-bar>
            </div>
            <div class="right">
                <van-icon class="btn" name="plus" @click="onAddOne" />
                <van-icon class="btn" name="delete-o" @click="show_del_btns = !show_del_btns" />
            </div>
        </div>
        <div class="list-box">
            <uni-list class="list">
                <my-link :to="`{ path: '/pages/admin/home/information', query: { id: ${item.id},type:1 }}`" navType="push"
                    v-for="(item, index) in list" :key="index">
                    <uni-list-item ellipsis="2" :title="item.name">
                        <template v-slot:footer>
                            <div @click.stop="onDelete(item.id)"><van-icon v-show="show_del_btns" name="delete-o" color="red" /></div>
                        </template>
                    </uni-list-item>
                </my-link>
            </uni-list>
        </div>
    </div>
</template>

<script>
import { reqAllAdmin,reqDeleteAdmin } from '../../../api/index'
export default {
    data() {
        return {
            list: [],
            total_list: [],
            searchValue: '',
            show_del_btns: false,
        }
    },
    methods: {
        async init() {
            let res = await reqAllAdmin()
            if (res.code != 200) {
                return this.toast(res.msg)
            }
            this.list = res.data
            this.total_list = res.data
            this.show_del_btns = false
        },
        search(res) {
            let pat = new RegExp(res.value)
            let list = this.total_list.filter(e => {
                return pat.test(e.name)
            })
            this.list = list
            this.current = 0
        },
        cancel(res) {
            this.init()
        },
        async onDelete(id) {
            let res =  await reqDeleteAdmin({id})
            if(res.code!=200){
                return this.toast(res.msg)
            }
            this.init()
        },
        onAddOne(){
            this.$Router.push({ path: '/pages/admin/home/information', query: { type: 2 }})
        }
    },
    onShow() {
        this.init()
    },
}
</script>

<style scoped>
.container {
    min-height: 100vh;
    background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
}

.top {
    background: #fff;
    display: flex;
    height: 120rpx;
}

.top .left {
    flex: 5;
    height: 120rpx;
    line-height: 120rpx;
}

.top .right {
    flex: 1;
    display: flex;
    justify-content: space-around;
    height: 120rpx;
    line-height: 120rpx;
}

.btn {
    width: 40rpx;
    font-size: 40rpx;
}

.list-box {
    /* background: #000; */
    margin: 20rpx;
    border-radius: 30rpx;
    overflow: hidden;
}
</style>