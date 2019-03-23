import { post } from './fetch'

export const getNewsIndex = (param = {}) => {
  return post('/news/index', param)
}

export const getUserInfo = (param = {}) => {
  return post('/api/queryUserInfo', param)
}

export const login = (param = {}) => {
  return post('/api/user/login', param);
};

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

// 新闻
export const getNewsInfos = (param = {}) => {
  return post('/api/newsInfo/getNewsInfos', param)
}