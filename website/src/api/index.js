import { post, get } from './fetch'

export const getLanguage = (param = {}) => {
  return get('/static/language/language.json', param)
}

export const getNewsIndex = (param = {}) => {
  return post('/news/index', param)
}

export const getUserInfo = (param = {}) => {
  return post('/api/queryUserInfo', param)
}

export const login = (param = {}) => {
  return post('/api/user/login', param);
};

// 按产品名模糊搜索产品
export const searchApi = (param = {}) => {
  return post('/api/goods/search', param)
}

// 公司介绍
export const getCompanyInfo = (param = {}) => {
  return post('/api/companyInfo/getCompanyInfo', param)
}

// 客户留言
export const addCustomerMessage = (param = {}) => {
  return post('/api/customerMessage/addCustomerMessage', param)
}

// 联系我们
export const getContractInfo = (param = {}) => {
  return post('/api/contractInfo/getContractInfo', param)
}

// 人才中心
export const getRecruitmentInfos = (param = {}) => {
  return post('/api/recruitmentInfo/getRecruitmentInfos', param)
}

// 分类
export const categories = (param = {}) => {
  return post('/api/goods/categories', param)
}

// 商品
export const categoryGoods = (param = {}) => {
  return post('/api/goods/categoryGoods', param)
}

export const goodsSearch = (param = {}) => {
  return post('/api/goods/search', param)
}

// 获取某一个产品下所有不同规格产品
export const goodsDetails = (param = {}) => {
  return post('/api/goods/goodsDetails', param)
}

// 获取某一个产品下某一具体规格的详情
export const goodsSpecDetails = (param = {}) => {
  return post('/api/goods/goodsSpecDetails', param)
}

// 新闻
export const getNewsInfos = (param = {}) => {
  return post('/api/newsInfo/getNewsInfos', param)
}
export const getNewsInfo = (param = {}) => {
  return post('/api/newsInfo/getNewsInfo', param)
}
