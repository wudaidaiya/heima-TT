class Storage {
  // key HEIMA_TOUTIAO_TOKEN 存储的名字  value payload 存储的值
  set(key, value) {
    // 将数组。对象如果他是对象就转换为JSON字符串
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  get(key) {
    // 如果parse的是一个JSON格式字符串， return JSON.parse()
    // 如果不是return value
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}
const storage = new Storage()
// 默认导出
export default storage
