// 引入mockjs

import Mock from 'mockjs';

// 获取 mock.Random 对象
const Random = Mock.Random;

// mock一组数据
const getUserInfo = function () {
  let userinfo = {
    title: Random.csentence(5, 30),
    face: Random.dataImage('300x250', 'mock的图片'),
    name: Random.cname(),
    date: Random.date() + ' ' + Random.time()
  }
  return {
    ...userinfo
  }
}

Mock.mock('/api/queryUserInfo', 'post', getUserInfo);

const addCustomerMessage = function () {
  return {
    "code": 0,
    "data": {},
    "message": "string",
    "result": true,
    "serverTime": 0,
    "version": "string"
  }
}

// Mock.mock('/api/customerMessage/addCustomerMessage', 'post', addCustomerMessage);