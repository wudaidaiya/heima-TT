<template>
  <div @click="Details(details)">
    <!-- 没有图片 -->
    <!-- 条件渲染 -->
    <!-- 动态绑定数据 articleInfo.title  articleDesc-->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
    >
    </van-cell>

    <!-- 1张图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      ></van-image>
    </van-cell>

    <!-- 3张图片 -->
    <van-cell v-if="articleInfo.cover.type === 3" :title="articleInfo.title">
      <template #label>
        <div>
          <!-- 遍历渲染三张图片  item==图片地址-->
          <van-image
            v-for="item in articleInfo.cover.images"
            :key="item"
            width="3rem"
            height="2rem"
            :src="item"
          ></van-image>
        </div>
        <!-- 插入 -->
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    // 接收数据
    articleInfo: {
      type: Object,
      required: true
    },
    details: {
      type: String,
      required: true
    }
  },
  computed: {
    // 文章描述
    articleDesc() {
      // 拼接数据
      const srt = this.articleInfo
      //   名字 评论 时间
      const relativeTime = dayjs(srt.pubdate).fromNow()
      return `${srt.aut_name} 阅读${srt.comm_count} 时间:${relativeTime}`
    }
  },
  methods: {
    // 进入详情
    Details(id) {
      this.$router.push({
        path: '/details',
        query: {
          id: id
        }
      })
      console.log(id)
    }
  }
}
</script>

<style></style>
