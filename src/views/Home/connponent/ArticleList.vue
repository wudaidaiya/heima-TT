<template>
  <div>
    <!-- 事件名loadNextPage -->
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="loadNextPage"
    >
      <van-list
        @load="loadNextPage"
        offset="300"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="加载失败，重新加载"
        finished-text="没有更多了"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
          :details='item.art_id'
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './ArticeItem.vue'
import { getArticleList } from '@/api'
export default {
  data() {
    return {
      articles: [],
      loading: false,
      error: false,
      finished: false,
      isLoading: false,
      pre_timestamp: ''
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created() {
    // 调用函数
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      // 页面一开始  加载第一页数据
      try {
        // 解构 传参 id和时间戳
        const { data } = await getArticleList(this.id, +new Date())
        // 保存第一页数据
        console.log(data)
        // data 下面有 pre_timestamp 页码
        this.pre_timestamp = data.data.pre_timestamp
        // 接受数组数据
        this.articles = data.data.results
      } catch (error) {
        // 获取状态码
        const status = error.response.status
        if (status === 400) {
          //  throw 抛出
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重新刷新')
        }
      }
    },
    // 触底事件
    async loadNextPage() {
      try {
        // 模拟错误
        // if (Math.random() < 0.7) {
        //   //  throw抛出
        //   throw new Error('错误了')
        // }
        // 滚动条触底 加载下一页数据
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 是否处于下拉加载状态 把数据添加到数组前面
        if (this.isLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          // 将第n页的数据，放在articles
          this.articles.push(...data.data.results)
        }
        // 更新页数 页码
        this.pre_timestamp = data.data.pre_timestamp
        console.log(data.data.pre_timestamp)
        this.loading = false
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.isLoading = false
      }
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang="less"></style>
