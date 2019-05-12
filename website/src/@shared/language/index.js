// chinese/english/japanese/french/german

import { getLanguage } from '@/api'
let languageStorage = localStorage.getItem('language') || 'chinese'
const languageIndex = { chinese: 0, english: 1, japanese: 2, french: 3, german: 4}

// const languageObj = {
//   homeTitle: '广州市白云区华义电子厂 | Guangzhou Baiyun District Huayi Electronics Factory',
//   messageTitle: '在线留言 | Feedback',
//   aboutTitle: '公司介绍 | Company Profile',
//   newsTitle: '新闻中心 | News Center',
//   productTitle: '产品展示 | Product Display',
//   jobTitle: '人才中心 | Talent Center',
//   contactTitle: '联系我们 | Contact Us',
//   searchTitle: '搜索页 | Search Products',
//   productListTitle: '产品列表 | Product Lists',


//   userName: '姓名 | UserName',
//   company: '公司 | Company',
//   phone: '电话 | Phone',
//   email: '邮箱 | Email',
//   fax: '传真 | Fax',
//   postcode: '邮编 | Postcode',
//   opinion: '意见 | Opinion',
//   accessPurpose: '您访问网站的目的 | Access Purpose',
//   address: '地址 | Address',
//   purposeFlag: '您的目的是否已经达到 | Has your purpose been reached',
//   dealFlag: '您是否曾经或打算提交一个服务请求以解决您的问题 | Have you ever or intend to submit a service request to resolve your issue',
//   documentQuality: '请评价该文档的质量 | Please rate the quality of this document',
//   product: '产品 | Product',
//   productSelect: '请选择 | Please choose',
//   category: '分类 | Category',
//   featuredProducts: '精选产品 | Featured products',
//   companyNews: '公司动态 | Company News',
//   industrynews: '行业动态 | Industry News',
//   notNews: '还没有新闻哦 | No news yet',
//   loading: '加载中 | Loading',
//   submitSuccess: '恭喜您提交成功 | Congratulations on your submission',
//   copyright: '(C) 2014-2020 广州市白云区华义电子厂版权所有 | (C) 2014-2020 Copyright',

//   yes: '是 | Yes',
//   no: '否 | No',
//   portion: '一部分 | portion',
//   browsing: '仅在浏览，无特别目的 | Only for browsing, no special purpose',
//   veryGood: '非常好 | Very good',
//   good: '好 | Good',
//   average: '平均 | Average',
//   poor: '差 | Very poor',


//   comments: '在线留言 | Feedback',
//   previousPage: '上一页 | Previous Page',
//   nextPage: '下一页 | Next Page',
//   total: '共 | Total',
//   page: '页 | Page',

//   buy: '购买 | Buy',
//   explore: '探索 | Explore',
//   price: '价格 | Price',

//   send: '发送 | Send',
//   reset: '重新填写 | Reset',
//   hotSearch: '热们搜索词 | Hot Search',
//   search: '搜索 | Search',
//   browse: '浏览 | Browse',
//   browseAll: '浏览全部 | Browse all',
//   searchResults: '搜索结果 | Search Results',


//   // 菜单的
//   home: '首页 | Home',
//   about: '公司介绍 | About Us',
//   news: '新闻中心 | News',
//   products: '产品展示 | Products',
//   job: '人才中心 | Recruiment',
//   feedback: '客户留言 | Feedback',
//   contact: '联系我们 | Contact Us',
  
// }

const requestLanguage = function(params) {
  return new Promise(resolve=>{
    getLanguage().then(data => {
      let language = {};
      Object.keys(data).forEach(key => {
        let val = data[key];
        let arr = val.split('|');
        try {
          val = arr[languageIndex[languageStorage]].trim()
        }
        catch (e) {
          val = arr[0].trim();
        }
        language[key] = val;
      });
      resolve(language)
      Vue.prototype.$language = language;
    });
  })
}

let loadFunc = [];

const LanguageExportData = {

  install(Vue){

    getLanguage().then(data => {
      let language = {};
      Object.keys(data).forEach(key => {
        let val = data[key];
        let arr = val.split('|');
        try {
          val = arr[languageIndex[languageStorage]].trim()
        }
        catch (e) {
          val = arr[0].trim();
        }
        language[key] = val;
      });
      Vue.prototype.$language = language;
      LanguageExportData.load(true);
    });

    // guid 用户唯一标识
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    function setGuid() {
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    let guid = localStorage.getItem('guid');
    if (!guid) {
      localStorage.setItem('guid', setGuid());
    }
  },

  load(success){
    return new Promise(resolve=>{
      loadFunc.push(resolve);
      if (success === true){
        loadFunc.forEach(fun=>{
          fun();
        })
      }
    })
  }


}

export default LanguageExportData