import axios from 'axios';
import { Message } from 'iview';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let language = localStorage.getItem('language') || 'chinese';
axios.defaults.headers.post['language'] = language;

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
export function post (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                let resData = response.data;
                if (response.status === 200 && resData && resData.code === 200) {
                    resolve(resData.data);
                } else {
                    if (params.tips === undefined) {
                        let msg = (resData && resData.msg) ? resData.msg : '后台系统繁忙，请稍后再试';
                        Message.error(msg);
                    }
                    reject(response);
                }
            })
            .catch((error) => {
                reject(error);
                if (params.tips === undefined) {
                    Message.error('后台系统繁忙，请稍后再试');
                }
            });
    });
}

// 封装axios的get请求
export function get (url, params) {
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
