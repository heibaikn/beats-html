import axios from 'axios';
import { Message } from 'iview';
import Cookies from 'js-cookie';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let language = localStorage.getItem('language') || 'chinese';
axios.defaults.headers.post['language'] = language;
axios.defaults.headers.post['loginName'] = Cookies.get('user') || '';
axios.defaults.headers.post['adminToken'] = Cookies.get('token') || '';

// 请求拦截器
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

// 封装axios的post请求
export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                let resData = response.data;
                if (response.status === 200 && resData && resData.code === 200) {
                    resolve(resData.data);
                } else {
                    if (params.tips === undefined) {
                        let msg = (resData && resData.description) ? resData.description : '后台系统繁忙，请稍后再试';
                        Message.error(msg);
                    }
                    if (resData.code == 605) {
                        setTimeout(() => {
                            Cookies.remove('user');
                            Cookies.remove('password');
                            Cookies.remove('access');
                            Cookies.remove('identity');
                            localStorage.clear();
                            location.reload();
                        }, 1500);
                        return;
                    }
                    reject(response);
                }
            })
            .catch((error) => {
                reject(error);
                let msg = '后台系统繁忙，请稍后再试';
                if (error.response && error.response.data && error.response.data.message) {
                    msg = error.response.data.message;
                }
                if (params.tips === undefined) {
                    Message.error(msg);
                }
            });
    });
}

// 封装axios的get请求
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params)
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
