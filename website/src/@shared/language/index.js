// chinese/english/japanese/french/german
let languageStorage = localStorage.getItem('language') || 'chinese';
const languageIndex = { chinese: 0, english: 1, japanese: 2, french: 3, german: 4}

const languageObj = {
  homeTitle: '广州市白云区华义电子厂 | Guangzhou Baiyun District Huayi Electronics Factory',
  messageTitle: '在线留言 | Online message',
  aboutTitle: '公司介绍 | Company Profile',
  newsTitle: '新闻中心 | News Center',
  productTitle: '产品展示 | Product Display',
  jobTitle: '人才中心 | Talent Center',
  contactTitle: '联系我们 | Contact Us',


  userName: '姓名 | UserName',
  company: '公司 | Company',
  phone: '电话 | Phone',
  email: '邮箱 | Email',
  fax: '传真 | Fax',
  postcode: '邮编 | Postcode',
  opinion: '意见 | Opinion',
  accessPurpose: '您访问网站的目的 | Access Purpose',
  address: '地址 | Address',
  purposeFlag: '您的目的是否已经达到 | Has your purpose been reached',
  dealFlag: '您是否曾经或打算提交一个服务请求以解决您的问题 | Have you ever or intend to submit a service request to resolve your issue',
  documentQuality: '请评价该文档的质量 | Please rate the quality of this document',

  yes: '是 | Yes',
  no: '否 | No',
  portion: '一部分 | portion',
  browsing: '仅在浏览，无特别目的 | Only for browsing, no special purpose',
  veryGood: '非常好 | Very good',
  good: '好 | Good',
  average: '平均 | average',
  poor: '差 | Very poor',
}


export default {
  install(Vue){
    let language = {};
    Object.keys(languageObj).forEach(key=>{
      let val = languageObj[key];
      let arr = val.split('|');
      try{
        val = arr[languageIndex[languageStorage]].trim()
      }
      catch(e){
        val = arr[0].trim();
      }
      language[key] = val;
    });
    Vue.prototype.$language = language
  }
}