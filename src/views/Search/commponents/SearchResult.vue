<template>
  <div>
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
    }
  },
  props: {
    result: {
      default: () => []
    }
  }

}
</script>

<style scoped lang="less">
.listAll {
  border-bottom: 1px solid #eee;
}
</style>
