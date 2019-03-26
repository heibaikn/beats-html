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

// 留言列表
const getCustomerMessages = function () {
    let arrData = [];
    function getUser () {
        return {
            id: Mock.mock({
                'number|1-100': 100
            }).number,
            accessPurpose: Random.csentence(5, 30),
            address: Random.csentence(5, 30),
            company: Random.csentence(2, 5),
            face: Random.dataImage('300x250', 'mock的图片'),
            dealFlag: '是',
            documentQuality: '是',
            fax: 'fax',
            mailAddress: Random.email(),
            mobilePhone: 'mobilePhone',
            name: Random.cname(),
            opinion: Random.cname(),
            postalCode: 'postalCode',
            purposeFlag: '否',
            createDate: Random.date() + ' ' + Random.time()
        };
    }
    for (let index = 0; index < 10; index++) {
        arrData.push(getUser());
    }
    return {
        code: 200,
        data: {
            list: arrData,
            count: 22
        },
        msg: ''
    };
};

Mock.mock('/api/admin/customerMessage/getCustomerMessages', 'post', getCustomerMessages);

// 分类
const categories = function () {
    let arrData = [];
    function getData (index) {
        return {
            id: index,
            categoryDescription: Random.csentence(2, 8),
            categoryName: Random.csentence(2, 8),
            isOpen: false,
            parentId: 0
        };
    }
    for (let index = 0; index < 10; index++) {
        arrData.push(getData(index));
    }
    return {
        code: 200,
        data: arrData,
        msg: ''
    };
};

Mock.mock('/api/goods/categories', 'post', categories);

// 产品列表
const categoryGoods = function () {
    let arrData = [];
    function getData () {
        return {
            id: Mock.mock({ 'number|1-100': 100 }).number,
            brandId: 1,
            categoryId: Mock.mock({ 'number|1-10': 10 }).number,
            goodsImageKey: Random.dataImage('900*900', '产品图'),
            specDescription: Random.csentence(5, 20),
            goodsDescription: Random.csentence(2, 8),
            goodsName: Random.csentence(2, 8),
            specNo: Random.csentence(2, 8),
            lowPrice: Mock.mock({ 'number|1-100': 100 }).number,
            specId: Mock.mock({ 'number|1000-10000': 100 }).number,
            specName: Random.csentence(2, 8),
            specValue: Random.csentence(2, 8),
            spuNo: Random.csentence(2, 8)
        };
    }
    for (let index = 0; index < 10; index++) {
        arrData.push(getData());
    }
    return {
        code: 200,
        data: {
            list: arrData,
            count: 22
        },
        msg: ''
    };
};
Mock.mock('/api/goods/categoryGoods', 'post', categoryGoods);

// 新闻列表
const getNewsInfos = function () {
    let arrData = [];
    function getData () {
        return {
            id: Mock.mock({ 'number|1-100': 100 }).number,
            title: Random.csentence(5, 20),
            content: Random.csentence(20, 100)
        };
    }
    for (let index = 0; index < 10; index++) {
        arrData.push(getData());
    }
    return {
        code: 200,
        data: {
            list: arrData,
            count: 22
        },
        msg: ''
    };
};

Mock.mock('/api/newsInfo/getNewsInfos', 'post', getNewsInfos);
