<template>
  <div>
    <!-- 头部搜索 -->
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backToPrePage"
        @focus="visibleSearchSuggestion"
      />
    </form>
    <!-- 搜索结果 -->
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestion></SearchSuggestion> -->
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
        ><component
          :is="componentName"
          :keywords="keywords"
          :result="result"
          :str="str"
          @clickFn="fn1"
          @delfn="delfn"
          @dleall="dleall"
        ></component>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import SearchHistory from './commponents/SearchHistory'
import SearchResult from './commponents/SearchResult'
import SearchSuggestion from './commponents/SearchSuggestion'
import storage from '@/utils/storage'
// 搜索结果
import { getSearchResult } from '@/api/search'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  computed: {
    componentName() {
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  data() {
    return {
      loading: false,
      error: false,
      finished: false,
      isLoading: false,
      keywords: '',
      page: '',
      isShowSearchResult: false,
      // 搜索结果数组
      result: [],
      // 历史记录数组
      str: storage.get('Keywordslist') || []
    }
  },
  methods: {
    async onSearch() {
      this.isShowSearchResult = true
      // 搜索结果
      try {
        const res = await getSearchResult(this.keywords)
        console.log(res)
        this.page = res.data.data.page
        console.log(res.data.data.page)
        this.result = res.data.data.results
        // console.log(this.result)
        // console.log(this.keywords)
        const index = this.str.indexOf(this.keywords)
        if (index !== -1) {
          this.str.splice(index, 1)
        }
        this.str.push(this.keywords)
        storage.set('Keywordslist', this.str)
        // console.log(this.str)
      } catch (error) {
        this.$toast.fail('获取文章列表失败，请重新刷新')
      }
    },
    async loadNextPage() {
      try {
        // 模拟错误
        // if (Math.random() < 0.7) {
        //   //  throw抛出
        //   throw new Error('错误了')
        // }
        // 滚动条触底 加载下一页数据
        const res = await getSearchResult(this.page, this.per_page)
        if (!res.data.data.page) {
          this.finished = true
        }
        // 是否处于下拉加载状态 把数据添加到数组前面
        if (this.isLoading) {
          this.result.unshift(...res.data.data.results)
        } else {
          // 将第n页的数据，放在articles
          this.result.push(...res.data.data.results)
        }
        // 更新页数 页码
        this.page++
        console.log(res.data.data.page)
        this.loading = false
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.isLoading = false
      }
    },

    // 返回上一页
    backToPrePage() {
      this.$router.go(-1)
    },
    // 显示那个页面
    visibleSearchSuggestion() {
      this.isShowSearchResult = false
    },
    // 把值放进输入框
    fn1(item) {
      console.log(item)
      this.keywords = item
      this.onSearch()
    },
    delfn(index) {
      this.str.splice(index, 1)
      console.log(this.str)
      storage.remove('Keywordslist')
    },
    dleall() {
      this.str = []
      storage.remove('Keywordslist')
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-search) {
  background-color: rgb(50, 150, 250);
}
:deep(.van-search__action) {
  color: #fff;
}
</style>
