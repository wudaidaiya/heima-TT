<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')">
          <van-icon name="search" />
          搜索
        </van-button>
      </template>
    </van-nav-bar>

    <!-- tabs选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <!-- 更多的按钮 -->
      <span class="toutiao toutiao-gengduo" @click="showPopup"></span>
    </van-tabs>

    <!-- 弹框 -->
    <!-- ref拿到组件的data -->
    <!-- 接收参数方法  delMychannel接收id  changeAcitve接收索引 addMyChannel接收对象 -->
    <EditChannelPopup
      ref="popup"
      :myChannels="myChannels"
      @del-mychanel="delMychannel"
      @change-active="changeAcitve"
      @add-mychanel="addMyChannel"
    ></EditChannelPopup>
  </div>
</template>

<script>
// 储存的token
import {
  getMyChannels,
  setMyChannelTlLocal,
  getMyChannelsByLocal,
  delMyChannel,
  addMyChannel
} from '@/api/channel'
import ArticleList from './connponent/ArticleList.vue'
import EditChannelPopup from './connponent/EditChannelPopup.vue'
export default {
  name: 'home',
  data() {
    return {
      active: 0,
      myChannels: []
    }
  },
  created() {
    // 获取我的列表
    this.getMyChannels()
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    // 获取我的列表
    async getMyChannels() {
      try {
        // const { data } = await getMyChannels()

        // this.myChannels = data.data.channels
        if (!this.isLogin) {
          // 如果你是离线状态
          // 1 如果本地储存有数据直接用本地储存的数据
          // 2 如果本地储存没有数据 发送请求获取默认频道数据
          const myChannels = getMyChannelsByLocal()
          if (myChannels) {
            this.myChannels = myChannels
          } else {
            // // 解构
            const { data } = await getMyChannels()
            // // 获取数据
            this.myChannels = data.data.channels
          }
        } else {
          // 如果是登陆状态
          // 发请求获取 登陆状态带请求头
          const { data } = await getMyChannels()
          this.myChannels = data.data.channels
        }
      } catch (error) {
        this.$toast.fail('请重新获取频道列表')
      }
    },
    showPopup() {
      // popup有isshow 属性
      // console.log(this.$refs)
      this.$refs.popup.isshow = true
    },
    // 删除我的频道
    async delMychannel(id) {
      this.myChannels = this.myChannels.filter((item) => item.id !== id)
      if (!this.isLogin) {
        // 如果你是离线状态
        // 数据储存在本地储存中
        setMyChannelTlLocal(this.myChannels)
      } else {
        try {
          // 如果时登陆状态
          await delMyChannel(id)
        } catch (error) {
          return this.$toast.fail('删除失败')
        }
      }
      this.$toast.success('删除成功')
    },
    // 点击索引等于当前索引 跳到点击的频道
    changeAcitve(active) {
      this.active = active
    },
    // 点击添加到我的频道  计算属性关联它两
    async addMyChannel(channel) {
      this.myChannels.push(channel)
      if (!this.isLogin) {
        // 如果你是离线状态
        // 数据储存在本地储存中
        setMyChannelTlLocal(this.myChannels)
      } else {
        // 如果时登陆状态
        try {
          // id和 索引
          await addMyChannel(channel.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加失败')
        }
      }
      this.$toast.success('添加成功')
    }
  },
  components: {
    ArticleList,
    EditChannelPopup
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  z-index: 99;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
