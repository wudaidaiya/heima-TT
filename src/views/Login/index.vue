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
    <van-form class="form" @submit="login">
      <van-field
        v-model="mobile"
        name="用户名"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="密码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button round size="mini" class="code-btn">发送验证码</van-button>
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
import { login } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async login() {
      const res = await login(this.mobile, this.code)
      console.log(res)
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
</style>
