<template>
  <div class="maxbox1">
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
          <van-button
            v-show="list.is_followed === false"
            :class="list.is_followed === false ? 'follow' : 'delfollow'"
            round
            icon="plus"
            type="primary"
            @click="followFn"
            >关注</van-button
          >
          <van-button
            v-show="list.is_followed === true"
            :class="list.is_followed === true ? 'delfollow' : 'follow'"
            round
            type="primary"
            @click="followFn"
            >已关注</van-button
          >
        </div>
      </div>
      <!-- 主体 -->
      <p v-html="list.content"></p>
      <van-divider>评论</van-divider>
      <!---------------  评论列表  ------------->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <van-cell v-for="(item, index) in datas" :key="index">
          <div class="pinglist">
            <div>
              <van-image
                round
                width="1rem"
                height="1rem"
                :src="item.aut_photo"
              />
            </div>
            <div class="pinghao">
              <p class="text4">{{ item.aut_name }}</p>
              <p class="text3">{{ item.content }}</p>
              <div class="text5">
                <span class="span3">{{ articitem }}</span
                ><van-button
                  class="btnbtn"
                  round
                  type="primary"
                  size="mini"
                  @click="replyFn(item)"
                  >回复{{ item.reply_count }}</van-button
                >
              </div>
            </div>
            <div class="zhan">
              <span><van-icon name="good-job-o" /> 赞</span>
            </div>
          </div></van-cell
        >
      </van-list>

      <!-- 底部 -->
      <van-tabbar class="buttom1" v-model="active">
        <van-button
          @click="commentFn"
          class="btn1"
          round
          type="primary"
          size="mini"
          >写评论</van-button
        >
        <van-tabbar-item badge="2" icon="comment-o"></van-tabbar-item>
        <van-tabbar-item @click="CollectionFn">
          <template #icon>
            <van-icon v-if="list.is_collected === false" name="star-o" />
            <van-icon v-else name="star" color="#1989fa" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item @click="goodjobsFn">
          <template #icon>
            <van-icon
              v-show="list.attitude === 1"
              name="good-job"
              color="#1989fa"
            />
            <van-icon v-show="list.attitude !== 1" name="good-job-o" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item @click="shareFn" icon="share"></van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- 评论弹出层 -->
    <van-popup v-model="isshow" position="bottom" :style="{ height: '18%' }">
      <div class="fu1">
        <textarea
          v-model.trim="value"
          class="txet1"
          name=""
          id=""
          cols="20"
          rows="3"
        ></textarea>
        <span :class="falg ? 'span1' : 'colorspan'" @click="fabuFn">发布</span>
      </div>
    </van-popup>
    <!-- 分享弹出层 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
    <!-- 回复评论弹出 -->
    <van-popup
      v-model="showcomment"
      position="bottom"
      :style="{ height: '100%' }"
      class="oncomment"
    >
      <CommEnt
        @oncommentFn="oncommentFn"
        :item="item"
        :id="id"
        ref="xuanran"
      ></CommEnt
    ></van-popup>
  </div>
</template>

<script>
import {
  getDetails,
  getComment,
  follow,
  delfollow,
  Collections,
  delCollections,
  goodjobss,
  delgoodjobss,
  fabu
} from '@/api'
import dayjs from '@/utils/dayjs'
import CommEnt from './Comment/index'
export default {
  data() {
    return {
      list: [],
      active: 0,
      isshow: false,
      falg: true,
      value: '',
      id: '',
      idw: '',
      datas: [],
      offid: '',
      loading: false,
      finished: false,
      showShare: false,
      showcomment: false,
      item: '',
      idcomm: '',
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ]
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler() {
        if (this.value.trim() === '') {
          this.falg = true
        } else {
          this.falg = false
        }
      }
    }
  },
  async created() {
    await this.getDetails()
    await this.getComment()
  },

  methods: {
    onClickLeft() {
      this.$router.back()
    },
    // 文章详情
    async getDetails() {
      const res = await getDetails(this.$route.query.id)
      // console.log(this.$route.query.id)
      console.log(res)
      this.list = res.data.data
      this.id = res.data.data.art_id
      this.idw = res.data.data.art_id
      console.log(this.id)
    },
    // 评论弹出框
    commentFn() {
      this.isshow = true
    },
    // 第一次请求
    async getComment(c) {
      try {
        const str = await getComment('a', this.id, c)
        // console.log(str)
        this.datas = str.data.data.results
        this.offid = str.data.data.last_id
      } catch (error) {}
    },
    // 第二次请求
    async onLoad() {
      try {
        // console.log(1111)
        // console.log(this.offid)
        const res = await getComment('a', this.id, this.offid)
        // console.log(res)
        if (res.data.data.results.length === 0) {
          return (this.finished = true)
          // console.log(111)
        } else {
          this.datas.push(...res.data.data.results)
        }
        this.offid = res.data.data.last_id
        this.loading = false
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.isLoading = false
      }
    },
    // 关注
    async follow() {
      if (this.list.is_followed) {
        console.log(this.id)
        const { data } = await follow(this.id)
        console.log(data)
      }
    },
    // 不关注
    async delfollow() {
      if (!this.list.is_followed) {
        console.log(this.id)
        const { data } = await delfollow(this.id)
        console.log(data)
      }
    },
    // 调用
    async followFn() {
      this.list.is_followed = !this.list.is_followed
      this.follow()
      this.delfollow()
    },
    // 收藏
    async Collections() {
      if (this.list.is_collected) {
        console.log(this.id)
        const { data } = await Collections(this.idw)
        console.log(data)
        this.Collection = data.message
      }
    },
    // 不收藏
    async delCollections() {
      if (!this.list.is_collected) {
        console.log(this.id)
        const { data } = await delCollections(this.idw)
        console.log(data)
        this.Collection = data.message
      }
    },
    // 调用
    async CollectionFn() {
      this.list.is_collected = !this.list.is_collected
      this.Collections()
      this.delCollections()
    },
    // 点赞
    async goodjobss() {
      if (this.list.attitude) {
        console.log(this.id)
        const { data } = await goodjobss(this.idw)
        console.log(data)
      }
    },
    // 不点赞
    async delgoodjobss() {
      if (this.list.attitude) {
        console.log(this.id)
        const { data } = await delgoodjobss(this.idw)
        console.log(data)
      }
    },
    // 调用
    goodjobsFn() {
      if (this.list.attitude !== 1) {
        this.goodjobss()
        this.list.attitude = 1
      } else {
        this.delgoodjobss()
        this.list.attitude = -1
      }
    },
    // 分享
    shareFn() {
      this.showShare = true
    },
    // 发布
    async fabuFn() {
      // this.value
      await fabu(this.idw, this.value)
      this.value = ''
      this.isshow = false
      this.getComment()
    },
    // 回复
    replyFn(item) {
      this.showcomment = true
      // console.log(item)
      this.item = item
      console.log(this.$refs.xuanran)
      setTimeout(() => {
        this.$refs.xuanran.getcomment()
      }, 10)
    },
    // 回复评论
    oncommentFn() {
      this.showcomment = false
    }
  },
  computed: {
    artic() {
      const srt = this.list
      //   修改时间样式
      const reTime = dayjs(srt.pubdate).fromNow()
      return reTime
    },
    articitem() {
      const srt = this.datas
      //   修改时间样式
      const huiTime = dayjs(srt.pubdate).fromNow()
      return huiTime
    }
  },
  components: {
    CommEnt
  }
}
</script>

<style scoped lang="less">
.maxbox1 {
  margin-bottom: 100px;
}
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
    .follow {
      font-size: 25px;
      height: 60px;
      background-color: rgb(50, 150, 250);
      border: 1px solid rgb(50, 150, 250);
    }
    .delfollow {
      font-size: 25px;
      height: 60px;
      background-color: rgb(247, 245, 245);
      border: 1px solid rgb(75, 75, 75);
      color: #000;
    }
  }
}
:deep(pre) {
  display: block;
  font-family: monospace;
  white-space: pre;
  overflow: auto;
}
:deep(.van-tabbar-item--active) {
  color: #646566;
}
.buttom1 {
  padding-top: 10px;
}
.btn1 {
  width: 300px;
  margin: 20px 30px 0 50px;
  background-color: #fff;
  color: #000;
  border: 1px solid #333;
}
// 评论列表
.pinglist {
  display: flex;
  .pinghao {
    margin-left: 20px;
    p {
      line-height: 0;
    }
    .text3 {
      padding-top: 40px;
    }
    .text4 {
      color: #406599;
      font-size: 25px;
    }
    .text5 {
      display: flex;
      align-items: auto;
      .span3 {
        display: inline-block;
        font-size: 25px;
        margin-top: 5px;
      }
    }
    .btnbtn {
      color: #000;
      background-color: #fff;
      width: 150px;
      border: 1px solid #999;
      margin-left: 20px;
      margin-bottom: 20px;
    }
  }
  .zhan {
    margin-left: 200px;
    span {
      font-size: 30px;
      .van-icon {
        font-size: 35px;
      }
    }
  }
}
// 弹出框
:deep(.fu1) {
  position: relative;
  .txet1 {
    margin-top: 30px;
    margin-left: 50px;
  }
  .span1 {
    position: absolute;
    top: 100px;
    right: 70px;
    display: inline-block;
    font-size: 30px;
    color: #81b3e1;
  }
  .colorspan {
    position: absolute;
    top: 100px;
    right: 70px;
    display: inline-block;
    font-size: 30px;
    color: #0e8afd;
  }
}
// 收藏
.Collection {
  background-color: #fff;
}
// 回复评论
.oncomment {
  z-index: 999;
}
</style>
