// 引入mockjs

import Mock from 'mockjs';

// 获取 mock.Random 对象
const Random = Mock.Random;

// 后台登录
Mock.mock('/api/admin/login', 'post', () => {
    return {
        'code': 200,
        'data': {
            'createBy': 'string',
            'createDate': '2019-03-31T08:16:27.398Z',
            'id': 0,
            'isDelete': 'string',
            'loginName': 'string',
            'mobilePhone': 'string',
            'name': 'string',
            'status': 'string',
            'token': 'string',
            'updateBy': 'string',
            'updateDate': '2019-03-31T08:16:27.398Z'
        },
        'msg': 'string',
        'result': true,
        'serverTime': 0,
        'version': 'string'
    };
});

// mock一组数据
const getUserInfo = function () {
    let arrData = [];
    function getUser () {
        return {
            id: Mock.mock({
                'number|1-100': 100
            }).number,
            mobilePhone: '1' + Mock.mock({ 'number|0-1000000000': 1000000000 }).number,
            password: Mock.mock({ 'number|0-1000000000': 1000000000 }).number,
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
        data: arrData,
        msg: ''
    };
};

Mock.mock('/api/admin/getAdmin', 'post', getUserInfo);

Mock.mock('/api/admin/addAdmin', 'post', () => {
    return {
        code: 200,
        data: {

        },
        msg: ''
    };
});

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
            documentQuality: Mock.mock({ 'number|0-3': 3 }).number,
            fax: 'fax',
            mailAddress: Random.email(),
            mobilePhone: 'mobilePhone',
            name: Random.cname(),
            opinion: Random.cname(),
            postalCode: 'postalCode',
            purposeFlag: Mock.mock({ 'number|0-3': 3 }).number,
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
        data: {
            list: arrData,
            count: 10
        },
        msg: ''
    };
};

// Mock.mock('/api/goods/categories', 'post', categories);

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

Mock.mock('/api/admin/newsInfo/getNewsInfos', 'post', () => {
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
});

Mock.mock('/api/admin/newsInfo/getNewsInfo', 'post', () => {
    function getData () {
        return {
            id: Mock.mock({ 'number|1-100': 100 }).number,
            title: Random.csentence(5, 20),
            content: Random.csentence(20, 100)
        };
    }
    return {
        code: 200,
        data: getData(),
        msg: ''
    };
});

Mock.mock('/api/admin/recruitmentInfo/addRecruitmentInfo', 'post', () => {
    return {
        code: 200,
        data: [],
        msg: ''
    };
});

// Mock.mock('/api/admin/goods/getSpecInfoList', 'post', () => {
//     return {
//         code: 200,
//         data: {
//             'count': 5,
//             'list': [
//                 {
//                     'id': 1,
//                     'spuNo': '132156465kjkj',
//                     'specId': 1,
//                     'specNo': '1456498132132',
//                     'specName': '颜色',
//                     'specDescription': '用于区分商品颜色',
//                     'specValueId': 1,
//                     'specValue': '红色'
//                 }
//             ]
//         },
//         msg: ''
//     };
// });
