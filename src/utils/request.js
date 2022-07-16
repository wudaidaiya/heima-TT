import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})
// 拦截器
// 请求拦截器
// 每一次请求都会执行构造函数
// 响应拦截器
request.interceptors.request.use(
  (config) => {
    const token = store.state.user.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.log(error)
    return error
  }
)
export default request
