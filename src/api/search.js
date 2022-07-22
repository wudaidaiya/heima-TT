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
