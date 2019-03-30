
export default {
  data(){
    return {
      errorData: {},
      isLoading: false,
      userData: {
        "accessPurpose": "",
        "address": "",
        "company": "",
        "dealFlag": "",
        "documentQuality": "",
        "fax": "",
        "mailAddress": "",
        "mobilePhone": "",
        "name": "",
        "opinion": "",
        "postalCode": "",
        "purposeFlag": ""
      },
      rules: {
        name: {
          required: '姓名不能为空',
          reg: /^[A-Za-z0-9\.\u4e00-\u9fa5]{2,3}$/,
          errorMsg: '姓名格式不正确'
        },
        company: {
          required: '公司名称不能为空',
          reg: /^[A-Za-z0-9\.\u4e00-\u9fa5]{2,20}$/,
          errorMsg: '公司名称格式不正确'
        },
        mobilePhone: {
          required: '电话不能为空',
          reg: /^\d{7,11}$/,
          errorMsg: '电话格式不正确'
        },
        mailAddress: {
          required: '邮箱不能为空',
          reg: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
          errorMsg: '邮箱格式不正确'
        },
        opinion: {
          required: '意见不能为空',
        }
      },
    }
  }
}