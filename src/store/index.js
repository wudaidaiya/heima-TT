import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/utils/storage'
import { getToken, setToken } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 取本地存储，getItem  取
    user: getToken() || {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      //  存本地存储json.stringify对象转换为字符串 setItem  存
      setToken(payload)
    }
  }
})
