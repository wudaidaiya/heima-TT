<template>
  <!-- 弹框 -->
  <van-popup
    v-model="isshow"
    position="bottom"
    :style="{ height: '100%' }"
    closeable
    close-icon-position="top-left"
  >
    <div class="popupMain">
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <!-- 我的频道 -->
        <van-grid :border="false" gutter="10px">
          <!-- 名字等于推荐则加上类目 -->
          <van-grid-item
            v-for="(item, index) in myChannels"
            :key="item.id"
            :text="item.name"
            :class="{ 'active-channel': item.name === '推荐' }"
            @click="onClickMyChannel(item, index)"
          >
            <template #icon>
              <!-- 要是isEdit等于true 并且名字不等于推荐 就显示小叉号 -->
              <van-icon v-show="isEdit && item.name !== '推荐'" name="cross" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <!-- 标题 -->
        <van-cell title="推荐频道"> </van-cell>
        <!-- 推荐频道 -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            v-for="item in recommendChannels"
            :key="item.id"
            :text="item.name"
            @click="addMyChannel(item)"
            icon="plus"
          >
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created() {
    this.getAllChannels()
  },
  data() {
    return {
      isshow: false,
      allChannels: [],
      isEdit: false
    }
  },
  methods: {
    //   所有频道
    async getAllChannels() {
      const { data } = await getAllChannels()
      console.log(data)
      this.allChannels = data.data.channels
    },
    onClickMyChannel(channel, index) {
      // 当isEdit为true 且名字不为推荐时触发，将id传过去
      if (this.isEdit && channel.name !== '推荐') {
        this.$emit('del-mychanel', channel.id)
      }
      // 当isEdit为false时触发，将索引index传过去
      if (!this.isEdit) {
        this.isshow = false
        this.$emit('change-active', index)
      }
    },
    addMyChannel(myChannel) {
      this.$emit('add-mychanel', { ...myChannel })
    }
  },
  computed: {
    // 遍历所有数组找到满足项
    recommendChannels() {
      return this.allChannels.filter((item) => {
        // 遍历数组找到满足项
        // const result = this.myChannels.find((i) => i.id === item.id)
        // 满足返回false
        // if (result) {
        //   return false
        // } else {
        //   return true
        // }
        // 遍历我的频道，找到符合项
        return !this.myChannels.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.active-channel {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid red;
  }
  .iconcha {
    font-size: 35px;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      background-color: #eee;
      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;
      background-color: #eee;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
