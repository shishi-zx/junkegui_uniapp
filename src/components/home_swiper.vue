<template>
    <div class="swiper-box">
            <swiper class="swiper-box" @change="change" :autoplay="true" :interval="3000" :circular="true">
                <swiper-item v-for="(item, index) in info" :key="index">
                    <view class="swiper-item">
                        <!-- {{ item.content }} -->
                        <image class="img-sw" :src="item.src" />
                    </view>
                </swiper-item>
            </swiper>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: [{
                src: 'https://minitest-1309252537.cos.ap-beijing.myqcloud.com/home-b1.jpeg'
            }, {
                src: 'https://minitest-1309252537.cos.ap-beijing.myqcloud.com/home-b3.jpeg'
            }, {
                src: 'https://minitest-1309252537.cos.ap-beijing.myqcloud.com/home-b2.jpeg'
            }],
        }
    },
    methods: {
        change(e) {
            this.current = e.detail.current;
        }
    }
}
</script>

<style scoped>
.swiper-box{
    background: rgb(191, 176, 176);
}
.img-sw{
    width: 100%;
}
</style>