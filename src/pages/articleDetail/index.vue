<template>
    <div class="container">
        <div class="article-box">
            <uni-row>
                <uni-col>
                    <uni-title type="h1" :title="article.title" align="center"></uni-title>
                </uni-col>
            </uni-row>
            <uni-row>
                <uni-col>
                    <uni-title type="h3" :title="article.family_seeker.name" align="center"></uni-title>
                </uni-col>
            </uni-row>
            <uni-row>
                <uni-col>
                    <uni-title type="h4" :title="article.create_time | dateFormat" align="center"></uni-title>
                </uni-col>
            </uni-row>
            <uni-row>
                <uni-col>
                    <span class="content">{{ article.content }}</span>
                </uni-col>
            </uni-row>
        </div>
        <div class="btn-box">
            <button @click="show = true">{{ article.state == 0 ? '待审核' : article.state == 1 ? '通过' : '不通过' }}</button>
            <div v-if="article.state == 2" class="reason">不通过原因：{{ article.comment ? article.comment : '审核员未给出原因' }}
            </div>

            <!-- 审核按钮弹框 -->
            <van-action-sheet :show="show" :actions="actions" @select="onSelect" @click-overlay="show = false" />
            <!-- 不通过原因的输入框 -->
            <van-dialog id="van-dialog" use-slot>
                <div class="comment-input">
                    <input type="text" v-model="comment" placeholder="请输入原因">
                </div>
            </van-dialog>
        </div>

    </div>

</template>

<script>
import { reqVolunteerArticle, reqSeekerArticle, reqUpdateVolunterArticle, reqUpdateSeekerArticle } from '../../api/index'
import Dialog from '../../wxcomponents/dialog/dialog'
export default {
    data() {
        return {
            type: 0,// 1 为志愿者，2为寻亲者
            article: {},
            show: false,
            comment: '',
            actions: [{ name: '待审核', value: 0 }, { name: '通过', value: 1 }, { name: '不通过', value: 2 }],
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            let { id, type } = this.$Route.query
            let res
            if (type == 1) {
                res = await reqVolunteerArticle({ id })
            } else {
                res = await reqSeekerArticle({ id })
            }
            if (res.code != 200) {
                return this.toast(res.msg)
            }
            this.article = res.data
            this.type = type
        },
        async onSelect(item) {
            this.show = false;
            let state = item.detail.value
            let old = this.article.state
            if (state == old && state != 2) {
                return
            }
            if (state == 2) {
                await Dialog.alert({
                    title: '标题',
                    theme: 'round-button',
                });
                this.article.comment = this.comment
            }
            let res
            this.article.state = state
            if (this.type == 1) {
                res = await reqUpdateVolunterArticle(this.article)
            } else {
                res = await reqUpdateSeekerArticle(this.article)
            }
            if (res.code != 200) {
                this.toast(res.msg)
                this.state = old
            }
        },
    }
}
</script>

<style scoped>
.container {
    background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
    margin: 20rpx;
    padding: 30rpx;
    border-radius: 10rpx;
    min-height: 92vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.content {
    display: inline-block;
    text-indent: 60rpx;
    letter-spacing: 5rpx;
}

.reason{
    color: rgb(232, 125, 125);
}

.btn-box {
    margin-bottom: 40rpx;
}

.comment-input {
    padding: 20rpx;
}
</style>