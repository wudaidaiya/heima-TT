import request from '@/utils/request'
// 搜索联想
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 搜索结果
export const getSearchResult = (q, page) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page,
      per_page: 15
    }
  })
}
// 文章详情
export const getDetails = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}
// 评论
export const getComment = (type, source, offset) => {
  return request({
    url: '/v1_0/comments',
    params: { type, source, offset }
  })
}
// 关注
export const follow = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: { target }
  })
}
// 取消关注
export const delfollow = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`,
    data: { target }
  })
}
// 收藏
export const Collections = (target) => {
  return request({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: '/v1_0/article/collections',
    data: { target }
  })
}
// 取消收藏
export const delCollections = (target) => {
  return request({
    method: 'DELETE',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: `/v1_0/article/collections/${target}`,
    data: { target }
  })
}
// 点赞
export const goodjobss = (target) => {
  return request({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: '/v1_0/article/likings',
    data: { target }
  })
}
// 取消点赞
export const delgoodjobss = (target) => {
  return request({
    method: 'DELETE',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: `/v1_0/article/likings/${target}`,
    data: { target }
  })
}
// 发布评论
export const fabu = (target, content) => {
  return request({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: '/v1_0/comments',
    data: { target, content }
  })
}
// 回复列表
export const getcomment = (type, source, offset) => {
  return request({
    url: '/v1_0/comments',
    params: { type, source, offset }
  })
}
// 对评论进行评论
export const fabus = (target, content, artid) => {
  return request({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: '/v1_0/comments',
    data: { target, content, artid }
  })
}
