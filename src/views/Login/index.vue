<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navbar"
      title="标题"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #left><van-icon name="cross" /></template>
    </van-nav-bar>
    <!-- 手机号码、验证码表单 -->
    <van-form class="form" @submit="login" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <!-- 倒计时 -->
          <van-count-down
            v-if="isShowDown"
            :time="3 * 1000"
            @finish="isShowDown = false"
          >
            <template #default="timeData"
              ><span class="block">{{ timeData.seconds }}</span>
            </template></van-count-down
          >
          <!-- 验证码 -->
          <van-button
            v-else
            round
            size="mini"
            class="code-btn"
            @click="sendCode"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 引入api
import { login, sendCode } from '@/api/user'
// 引入校验规则
import { mobileRules, codeRules } from './rules'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowDown: false
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    // 登录
    async login() {
      this.$toast.loading({
        message: '登陆中',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        // 存储token
        this.$store.commit('setUser', res.data.data)
        // console.log(res)
        console.log(res.data.data)
        // 登陆成功返回
        this.$router.push('./profile')
        this.$toast.success('登陆成功')
      } catch (error) {
        console.log(error)
        // 登陆失败
        const status = error.response.status
        let message = '登陆错误请刷新'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    // 发送验证码
    async sendCode() {
      try {
        // 验证手机号
        await this.$refs.form.validate('mobile')
        // 发送请求获取验证码
        await sendCode(this.mobile)
        // 显示倒计时
        this.isShowDown = true
      } catch (error) {
        // 表单验证失败
        if (!error.response) {
          this.$toast.fail('手机号不正确')
        } else {
          // 验证码导致失败
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form {
  .toutiao {
    font-size: 0.49333rem;
  }
  :deep(.van-field__label) {
    width: 50px;
  }
  .code-btn {
    background-color: #ccc;
    padding: 0 10px;
    color: #666;
  }
}
.block {
  display: inline-block;
  width: 50px;
  color: #fff;
  margin-left: 60px;
  border-radius: 12px;
  text-align: center;
  font-size: 12px;
  text-align: center;
  background-color: #e5e5e5;
  color: #000;
}
</style>
