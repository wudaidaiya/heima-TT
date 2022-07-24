<template>
  <div>
    <van-nav-bar
      class="navs"
      :title="`${
        item.reply_count === 0 ? '暂无' : item.reply_count + '条'
      }回复`"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell>
      <div class="pinglist">
        <div>
          <van-image round width="1rem" height="1rem" :src="item.aut_photo" />
        </div>
        <div class="pinghao">
          <p class="text4">{{ item.aut_name }}</p>
          <p class="text3">{{ item.content }}</p>
          <div class="text5">
            <span class="span3">{{ articitem }}</span
            ><van-button class="btnbtn" round type="primary" size="mini"
              >回复{{ item.reply_count }}</van-button
            >
          </div>
        </div>
        <div class="zhan">
          <span><van-icon name="good-job-o" /> 赞</span>
        </div>
      </div></van-cell
    >
    <van-divider>评论</van-divider>
    <!---------------  评论列表  ------------->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in lists" :key="index">
        <div class="pinglist">
          <div>
            <van-image round width="1rem" height="1rem" :src="item.aut_photo" />
          </div>
          <div class="pinghao">
            <p class="text4">{{ item.aut_name }}</p>
            <p class="text3">{{ item.content }}</p>
            <div class="text5">
              <span class="span3">{{ articitem }}</span
              ><van-button class="btnbtn" round type="primary" size="mini"
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
    <!-- 底部评论 -->
    <van-tabbar class="tabbarbom"
      ><van-button class="buttonbom" round type="info" @click="commentFn"
        >评论</van-button
      ></van-tabbar
    >
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
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { getcomment, fabus } from '@/api'
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  // async created() {
  //   // await this.getDetails()
  //   await this.getcomment()
  // },
  data() {
    return {
      lists: [],
      loading: false,
      finished: false,
      isshow: false,
      offid: '',
      falg: true,
      value: ''
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
  methods: {
    onClickLeft() {
      this.$emit('oncommentFn')
    },
    // 第一次请求
    async getcomment(c) {
      try {
        const str = await getcomment('c', this.item.com_id, c)
        this.lists = str.data.data.results
        this.offid = str.data.data.last_id
        console.log(this.lists)
      } catch (error) {}
    },
    // 第二次请求
    async onLoad() {
      try {
        // console.log(1111)
        console.log(this.offid)
        const res = await getcomment('c', this.item.com_id, this.offid)
        console.log(res)
        if (res.data.data.results.length === 0) {
          return (this.finished = true)
          // console.log(111)
        } else {
          this.lists.push(...res.data.data.results)
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
    // 发布
    async fabuFn() {
      // this.value
      console.log(this.item)
      const listst = await fabus(this.item.com_id, this.value, this.item.aut_id)
      console.log(listst)
      this.value = ''
      this.isshow = false
      // 加在前面
      this.lists.unshift(listst.data.data.new_obj)
    },
    // 评论弹出框
    commentFn() {
      this.isshow = true
    }
  },
  computed: {
    articitem() {
      const srts = this.lists
      //   修改时间样式
      const huiTime = dayjs(srts.pubdate).fromNow()
      return huiTime
    }
  }
  // watch: {},
  // filters: {},
  // components: {}
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
// 底部评价
.tabbarbom {
  background-color: #ff69b4;
  // 底部按钮
  .buttonbom {
    margin: 10px auto;
    width: 640px;
    height: 80px;
    background-color: #fff;
    color: #000;
    border: 1px solid #fff;
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
</style>
