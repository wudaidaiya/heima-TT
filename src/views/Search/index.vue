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
    <component :is="componentName" :keywords='keywords'></component>
  </div>
</template>

<script>
import SearchHistory from './commponents/SearchHistory'
import SearchResult from './commponents/SearchResult'
import SearchSuggestion from './commponents/SearchSuggestion'
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
      keywords: '',
      isShowSearchResult: false
    }
  },
  methods: {
    onSearch() {
      this.isShowSearchResult = true
    },
    backToPrePage() {
      this.$router.go(-1)
    },
    visibleSearchSuggestion() {
      this.isShowSearchResult = false
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
