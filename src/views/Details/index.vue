<template>
  <div>
    <van-nav-bar
      class="navs"
      title="黑马头条"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="box11">
      <!-- 标题 -->
      <h1>{{ list.title }}</h1>
      <!-- 头像关注 -->
      <div class="box666">
        <div>
          <van-image round width="1rem" height="1rem" :src="list.aut_photo" />
        </div>
        <div class="box777">
          <!-- 名字 -->
          <p>{{ list.aut_name }}</p>
          <!-- 时间 -->
          <span>{{ artic }}</span>
        </div>
        <div class="box888">
          <van-button class="btns" round icon="plus" type="primary"
            >关注</van-button
          >
        </div>
      </div>
      <!-- 主体 -->
      <p v-html="list.content"></p>
      <!-- 底部 -->
    </div>
  </div>
</template>

<script>
import { getDetails } from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  data() {
    return {
      list: [],
      active: 0
    }
  },
  created() {
    this.getDetails()
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async getDetails() {
      const res = await getDetails(this.$route.query.id)
      console.log(res)
      this.list = res.data.data
      console.log(this.list)
    }
  },
  computed: {
    artic() {
      const srt = this.list
      //   修改时间样式
      const reTime = dayjs(srt.pubdate).fromNow()
      return reTime
    }
  }
}
</script>

<style scoped lang="less">
.navs {
  background-color: #3296fa;
}
:deep(.van-nav-bar__title) {
  color: #fff;
}
:deep(.van-nav-bar .van-icon) {
  color: #fff;
}
.box11 {
  padding: 0 20px;
}
h1 {
  font-size: 45px;
}
p {
  font-size: 30px;
}
img {
  width: 100px;
}
.box666 {
  display: flex;
  align-items: center;
  height: 120px;
  overflow: hidden;
  .box777 {
    margin: 30px 20px;
    p {
      line-height: 0;
      font-size: 20px;
    }
    span {
      font-size: 20px;
    }
  }
  .box888 {
    margin-left: 220px;
    .btns {
      font-size: 25px;
      height: 60px;
      background-color: rgb(50, 150, 250);
      border: 1px solid rgb(50, 150, 250);
    }
  }
}
</style>
