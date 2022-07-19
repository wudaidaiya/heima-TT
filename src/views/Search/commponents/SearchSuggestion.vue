<template>
  <div>
    <van-cell-group>
      <van-cell v-for="(item, index) in highlightData" :key="index">
        <template #icon>
          <van-icon name="search" class="search-icon"></van-icon>
        </template>
        <template #title>
          <span v-html="item"></span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api'
export default {
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    // keywords: 'getSearchSuggestion'
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    async getSearchSuggestion() {
      try {
        const res = await getSearchSuggestion(this.keywords)
        //   console.log(res)
        this.suggestions = res.data.data.options
        if (this.suggestions.length === 0) {
          this.$toast.fail('没有搜索建议')
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    highlightData() {
      // 将搜索建议的每一项处理
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style='color:red'>${match}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less">
.search-icon {
  padding-top: 10px;
}
</style>
