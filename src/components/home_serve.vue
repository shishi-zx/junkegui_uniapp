<template>
    <div class="card">
        <div class="title">审核服务</div>
        <div class="list">
            <div class="list-item" v-for="(item, index) in menu" :key="index" @click="pageTo(item.path)">
                <div class="img" :style="'--i:'+item.color"><van-icon :name="item.icon" /></div>
                <div class="name" :style="'--i:'+item.color">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            menu:[]
        }
    },
    mounted(){
        this.menu = this.$store.state.dispatch_menu_list
    },
    methods:{
        pageTo(path){
            this.$Router.push("/pages"+path)
        }
    }
}
</script>

<style scoped>
.card {
    /* width: 100%; */
    min-height: 300rpx;
    /* border: 1px solid black; */
    padding: 20rpx;
    background: #fff;
    border-radius: 20rpx;
}

.title {
    height: 80rpx;
    line-height: 80rpx;
    font-size: 32rpx;
    font-weight: bold;
    padding-bottom: 5rpx;
    border-bottom: 1px solid black;
}

.list {
    /* background: rgb(209, 199, 199); */
    min-height: 210rpx;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.list-item {
    width: 200rpx;
    height: 220rpx;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.img {
    /* background: var(--i); */
    color: black;
    color: var(--i);
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    margin-bottom: 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 90rpx;
    overflow: hidden;
}

.name {
    color: black;
    color: var(--i);
    font-size: 32rpx;
    padding-top: 10rpx;
}
</style>