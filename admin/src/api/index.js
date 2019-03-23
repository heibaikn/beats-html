import { post } from './fetch';

export const getNewsIndex = (param = {}) => {
    return post('/news/index', param);
};

export const getUserInfo = (param = {}) => {
    return post('/api/queryUserInfo', param);
};

export const login = (param = {}) => {
    return post('/api/admin/login', param);
};

// 公司介绍管理
export const addCompanyInfo = (param = {}) => {
    return post('/api/admin/companyInfo/addCompanyInfo', param);
};

// 公司介绍管理
export const addCompanyIndelCompanyInfofo = (param = {}) => {
    return post('/api/admin/companyInfo/delCompanyInfo', param);
};

// 客户留言管理
export const getCustomerMessages = (param = {}) => {
    return post('/api/customerMessage/getCustomerMessages', param);
};

// 联系我们管理
export const addContractInfo = (param = {}) => {
    return post('/api/admin/contractInfo/addContractInfo', param);
};
export const delContractInfo = (param = {}) => {
    return post('/api/admin/contractInfo/delContractInfo', param);
};

// 人才中心管理
export const addRecruitmentInfo = (param = {}) => {
    return post('/api/admin/recruitmentInfo/addRecruitmentInfo', param);
};
export const delRecruitmentInfo = (param = {}) => {
    return post('/api/admin/recruitmentInfo/delRecruitmentInfo', param);
};

// 人才中心管理
export const addNewsInfo = (param = {}) => {
    return post('/api/admin/newsInfo/addNewsInfo', param);
};
export const delNewsInfo = (param = {}) => {
    return post('/api/admin/newsInfo/delNewsInfo', param);
};
