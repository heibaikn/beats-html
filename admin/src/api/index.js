import { post } from './fetch';

export const getNewsIndex = (param = {}) => {
    return post('/news/index', param);
};

export const getUserInfo = (param = {}) => {
    return post('/api/queryUserInfo', param);
};
