<template>
  <div>
    <!-- <van-cell v-for="item in result" :key="item.id" class="listAll" :title="item.title" /> -->
    <van-cell
      class="listAll"
      v-for="item in result"
      :key="item.id"
      :title="item.title"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // error: false,
      // loading: false
    }
  },
  props: {
    result: {
      default: () => []
    }
  }
  // methods: {
  //   onLoad() {
  //     fetchSomeThing().catch(() => {
  //       this.error = true
  //     })
  //   }
  // }
}
</script>

<style scoped lang="less">
.listAll {
  border-bottom: 1px solid #eee;
}
</style>
