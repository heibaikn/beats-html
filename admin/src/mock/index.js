// 引入mockjs

import Mock from 'mockjs';

// 获取 mock.Random 对象
const Random = Mock.Random;

// mock一组数据
const getUserInfo = function () {
    let arrData = [];
    function getUser () {
        return {
            id: Mock.mock({
                'number|1-100': 100
            }).number,
            title: Random.csentence(5, 30),
            face: Random.dataImage('300x250', 'mock的图片'),
            name: Random.cname(),
            date: Random.date() + ' ' + Random.time()
        };
    }
    for (let index = 0; index < 10; index++) {
        arrData.push(getUser());
    }
    return {
        code: 200,
        data: {
            list: arrData,
            count: 33
        },
        msg: ''
    };
};

Mock.mock('/api/queryUserInfo', 'post', getUserInfo);
