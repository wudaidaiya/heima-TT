import storage from './storage'
const TOKEN_KEY = 'HEIMA_TOUTIAO_TOKEN'

export const getToken = () => storage.get(TOKEN_KEY)
export const setToken = (token) => storage.set(TOKEN_KEY, token)
export const removeToken = () => storage.removeToken(TOKEN_KEY)

// const TOKEN_SHOUSUO = 'HEIMA_TOUTIAO_SHOUSUO'

// export const getSousuo = () => storage.get(TOKEN_SHOUSUO)
// export const setSousuo = (sousuo) => storage.set(TOKEN_SHOUSUO, sousuo)
// export const removeSousuo = () => storage.removeToken(TOKEN_SHOUSUO)
