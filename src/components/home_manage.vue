<template>
    <div class="container">
        <div class="top">
            <van-divider contentPosition="center" hairline
                customStyle="color: #cd84f1; border-color: #cd84f1; font-size: 18px;">
                管理中心
            </van-divider>
        </div>
        <div class="main">
            <van-grid :column-num="4" square>
                <my-link :to="`/pages${item.path}`" navType="push"  v-for="(item, index) in menu_list" :key="index">
                    <van-grid-item :icon="item.icon" :text="item.name" />
                </my-link>
            </van-grid>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menu_list: []
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.menu_list = this.$store.state.system_menu_list
        }
    }
}
</script>

<style scoped>
.main {
    margin: 70rpx 20rpx;
    overflow: hidden;
    border-radius: 20rpx;
}
</style>