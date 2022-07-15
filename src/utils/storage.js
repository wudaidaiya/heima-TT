class Storage {
  // key HEIMA_TOUTIAO_TOKEN   value payload
  set(key, value) {
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

export default storage
