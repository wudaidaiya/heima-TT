<template>
  <div>
    <van-cell title="历史记录">
      <div v-if="isshow">
        <span @click="dleall">删除全部</span>
        <span @click="isshow = false">完成</span>
      </div>
      <van-icon @click="isshow = true" v-else name="delete" />
    </van-cell>
    <van-cell
      @click="clickFn(item)"
      v-for="(item, index) in str"
      :key="index"
      :title="item"
    >
      <template #default>
        <div class="delfn" @click="delfn(index)">
          <van-icon v-show="isshow" class="icons" name="close" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isshow: false
    }
  },
  props: {
    str: {
      default: () => []
    }
  },
  methods: {
    clickFn(item) {
      if (this.isshow === false) {
        this.$emit('clickFn', item)
      }
    },
    delfn(index) {
      if (this.isshow === true) {
        this.$emit('delfn', index)
      }
    },
    dleall() {
      this.$emit('dleall')
    }
  }
}
</script>

<style scoped lang="less">
.icons {
  z-index: 999;
  font-size: 40px;
}
</style>
