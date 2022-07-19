import request from '@/utils/request'
import storage from '@/utils/storage'
// 获取我的频道列表
export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 *
 * @returns promise
 */
// 获取所有频道列表
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
// 删除频道
/**
 *
 * @param {String/Number} target
 * @returns
 */
export const delMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
// 添加频道
/**
 * 添加我的频道
 * @param {Number} id
 * @param {Number} seq
 * @returns
 */
export const addMyChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'
// 取token
export const getMyChannelsByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)
// 存token
export const setMyChannelTlLocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel)
