import { post } from './fetch';

export const getNewsIndex = (param = {}) => {
    return post('/news/index', param);
};

// login
export const adminLogin = (param = {}) => {
    return post('/api/admin/login', param);
};

// 后台用户
export const addAdmin = (param = {}) => {
    return post('/api/admin/addAdmin', param);
};
export const delAdmin = (param = {}) => {
    return post('/api/admin/delAdmin', param);
};
export const getAdmin = (param = {}) => {
    return post('/api/admin/getAdmin', param);
};

export const login = (param = {}) => {
    return post('/api/admin/login', param);
};

// 公司介绍管理
export const getCompanyInfo = (param = {}) => {
    return post('/api/admin/companyInfo/getCompanyInfo', param);
};
export const addCompanyInfo = (param = {}) => {
    return post('/api/admin/companyInfo/addCompanyInfo', param);
};
export const updateCompanyInfo = (param = {}) => {
    return post('/api/admin/companyInfo/updateCompanyInfo', param);
};

// 公司介绍管理
export const addCompanyIndelCompanyInfofo = (param = {}) => {
    return post('/api/admin/companyInfo/delCompanyInfo', param);
};

// 客户留言管理
export const getCustomerMessages = (param = {}) => {
    return post('/api/admin/customerMessage/getCustomerMessages', param);
};

// 联系我们管理
export const addContractInfo = (param = {}) => {
    return post('/api/admin/contractInfo/addContractInfo', param);
};
export const delContractInfo = (param = {}) => {
    return post('/api/admin/contractInfo/delContractInfo', param);
};
export const getContractInfo = (param = {}) => {
    return post('/api/admin/contractInfo/getContractInfo', param);
};
export const updateContractInfo = (param = {}) => {
    return post('/api/admin/contractInfo/updateContractInfo', param);
};

// 人才中心管理
export const getRecruitmentInfo = (param = {}) => {
    return post('/api/admin/recruitmentInfo/getRecruitmentInfo', param);
};
export const getRecruitmentInfos = (param = {}) => {
    return post('/api/admin/recruitmentInfo/getRecruitmentInfos', param);
};
export const addRecruitmentInfo = (param = {}) => {
    return post('/api/admin/recruitmentInfo/addRecruitmentInfo', param);
};
export const delRecruitmentInfo = (param = {}) => {
    return post('/api/admin/recruitmentInfo/delRecruitmentInfo', param);
};
export const updateRecruitmentInfo = (param = {}) => {
    return post('/api/admin/recruitmentInfo/updateRecruitmentInfo', param);
};

// 新闻管理
export const getNewsInfo = (param = {}) => {
    return post('/api/admin/newsInfo/getNewsInfo', param);
};
export const getNewsInfos = (param = {}) => {
    return post('/api/admin/newsInfo/getNewsInfos', param);
};
export const addNewsInfo = (param = {}) => {
    return post('/api/admin/newsInfo/addNewsInfo', param);
};
export const delNewsInfo = (param = {}) => {
    return post('/api/admin/newsInfo/delNewsInfo', param);
};
export const updateNewsInfos = (param = {}) => {
    return post('/api/admin/newsInfo/updateNewsInfos', param);
};

// 分类
export const categories = (param = {}) => {
    return post('/api/goods/categories', param);
};
export const addCategory = (param = {}) => {
    return post('/api/admin/goods/addCategory', param);
};
export const editCategory = (param = {}) => {
    return post('/api/admin/goods/updateCategory', param);
};
export const deleteCategory = (param = {}) => {
    return post('/api/admin/goods/deleteCategory', param);
};

// 商品
export const categoryGoods = (param = {}) => {
    return post('/api/goods/categoryGoods', param);
};
export const goodsDetails = (param = {}) => {
    return post('/api/goods/goodsDetails', param);
};
export const addGoodsSpec = (param = {}) => {
    return post('/api/admin/goods/addGoodsSpec', param);
};

// admin 产品
export const addGoods = (param = {}) => {
    return post('/api/admin/goods/addGoods', param);
};
export const updateGoods = (param = {}) => {
    return post('/api/admin/goods/updateGoods', param);
};
export const deleteGoods = (param = {}) => {
    return post('/api/admin/goods/deleteGoods', param);
};

// sku
export const addSpecInfo = (param = {}) => {
    return post('/api/admin/goods/addSpecInfo', param);
};
export const getSpecInfoList = (param = {}) => {
    return post('/api/admin/goods/getSpecInfoList', param);
};
export const updateSpecInfo = (param = {}) => {
    return post('/api/admin/goods/updateSpecInfo', param);
};
export const deleteSpecInfo = (param = {}) => {
    return post('/api/admin/goods/deleteSpecInfo', param);
};

// Banner
export const addBanner = (param = {}) => {
    return post('/api/admin/banner/addBanner', param);
};
export const getBannerList = (param = {}) => {
    return post('/api/admin/banner/getBannerList', param);
};
export const updateBanner = (param = {}) => {
    return post('/api/admin/banner/updateBanner', param);
};
export const delBanner = (param = {}) => {
    return post('/api/admin/banner/delBanner', param);
};
