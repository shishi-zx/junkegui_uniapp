<template>
  <div class="container">
    <div class="top">
      <uni-search-bar v-model="searchValue" radius="20" placeholder="请输入标题关键字查找" @input="search" @cancel="cancel"
        cancel-text="取消">
        <template v-slot:searchIcon>
          <uni-icons color="#999999" size="18" type="search" />
        </template>
      </uni-search-bar>
      <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
        activeColor="#4cd964">

      </uni-segmented-control>
    </div>
    <div class="list-box">
      <uni-list class="list">
        <my-link :to="`{ path: '/pages/articleDetail/index', query: { id: ${item.id},type:2 }}`" navType="push"
          v-for="(item, index) in article_list" :key="index">
          <uni-list-item ellipsis="2" :title="item.title"
            :rightText="item.state == 0 ? '待审核' : item.state == 1 ? '审核通过' : '审核不通过'"
            :note="item.create_time | dateFormat">
          </uni-list-item>
        </my-link>

      </uni-list>
    </div>
  </div>
</template>

<script>
import { reqAllSeekerArticle } from '../../api/index'
export default {
  data() {
    return {
      article_list: [],
      total_list: [],
      searchValue: '',
      items: ['全部', '待审核', '通过', '未通过'],
      current: 0
    }
  },
  mounted() {
  },
  methods: {
    async init() {
      let res = await reqAllSeekerArticle()
      if (res.code == 200) {
        this.article_list = res.data
        this.total_list = res.data
      } else {
        this.toast(res.msg)
      }
    },
    search(res) {
      let pat = new RegExp(res)
      let list = this.total_list.filter(e => {
        return pat.test(e.title)
      })
      this.article_list = list
      this.current = 0
    },
    cancel(res) {
      this.init()
    },
    onClickItem(e) {
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;
      } else {
        return
      }
      this.searchValue = ''
      if (e.currentIndex === 0) {
        this.article_list = this.total_list
      } else {
        let state = e.currentIndex - 1
        this.article_list = this.total_list.filter(e => {
          return e.state == state
        })
      }

    },
    onShow() {
      this.init()
    }
  }
}
</script>

<style scoped >
.container {
  min-height: 100vh;
  background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
}

.top {
  background: #fff;
}


.list-box {
  /* background: #000; */
  margin: 20rpx;
  border-radius: 30rpx;
  overflow: hidden;
}
</style>