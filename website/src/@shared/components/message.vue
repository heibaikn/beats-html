<template>
  <section>
    <h3>{{$language.messageTitle}}</h3>

    <div class="feedback">

        <div class="group" :class="{'group--error': errorData.key == 'name'}">
          <div class="label">{{$language.userName}}: </div>
          <div class="content">
            <input type="text" class="input"  v-model="userData.name"/>
            <span class="red">*</span>
          </div>
          <span class="error" v-show="errorData.key == 'name'">{{errorData.msg}}</span>
        </div>

        <div class="group" :class="{'group--error': errorData.key == 'company'}">
          <div class="label">{{$language.company}}: </div>
          <div class="content">
            <input type="text" class="input"  v-model="userData.company"/>
            <span class="red">*</span>
          </div>
          <span class="error" v-show="errorData.key == 'company'">{{errorData.msg}}</span>
        </div>

        <div class="group" :class="{'group--error': errorData.key == 'mobilePhone'}">
          <div class="label">{{$language.phone}}: </div>
          <div class="content">
            <input type="text" class="input"  v-model="userData.mobilePhone"/>
            <span class="red">*</span>
          </div>
          <span class="error" v-show="errorData.key == 'mobilePhone'">{{errorData.msg}}</span>
        </div>

        <div class="group" :class="{'group--error': errorData.key == 'mailAddress'}">
          <div class="label">{{$language.email}}: </div>
          <div class="content">
            <input type="text" class="input"  v-model="userData.mailAddress"/>
            <span class="red">*</span>
          </div>
          <span class="error" v-show="errorData.key == 'mailAddress'">{{errorData.msg}}</span>
        </div>

        <div class="group">
          <div class="label">{{$language.fax}}: </div>
          <div class="content">
            <input type="text" class="input"  v-model="userData.fax"/>
          </div>
        </div>

        <div class="group">
          <div class="label">{{$language.postcode}}: </div>
          <div class="content">
            <input type="text" class="input"  v-model="userData.postalCode"/>
          </div>
        </div>

        <div class="group group--column" :class="{'group--error': errorData.key == 'opinion'}">
          <div class="label label--full">{{$language.opinion}}: <span class="red">*</span></div>
          <div class="content">
            <textarea name="" v-model="userData.opinion"></textarea>
            <span class="error error--big" v-show="errorData.key == 'opinion'">{{errorData.msg}}</span>
          </div>
        </div>

        <div class="group group--column">
          <div class="label label--full">{{$language.accessPurpose}}: </div>
          <div class="content">
            <textarea name="" v-model="userData.accessPurpose"></textarea>
          </div>
        </div>

        <div class="group ">
          <div class="label">{{$language.address}}: </div>
          <div class="content">
            <input type="text" class="input"  v-model="userData.address"/>
          </div>
        </div>

        <div class="group ">
          <div class="label">{{$language.product}}: </div>
          <div class="content rel">
            <div class="f-product-list">
              <div class="f-product-list__item" :class="[userData.goodsIds.indexOf(item.id) > -1 && 'active']" v-for="(item,index) in productList" :key="index" @click="selectedProduct(item)"><span class="mask"><i class="iconfont iconduihao"></i></span><img :src="item.goodsImageKey" alt=""></div>
            </div>
          </div>
        </div>

        <div class="group group--full">
          <div class="label label--full">{{$language.purposeFlag}}: </div>
          <div class="content">
            <label><input type="radio" name="mudi" value="1" v-model="userData.purposeFlag"> {{$language.yes}}</label>
            <label><input type="radio" name="mudi" value="0" v-model="userData.purposeFlag"> {{$language.no}}</label>
            <label><input type="radio" name="mudi" value="2" v-model="userData.purposeFlag"> {{$language.portion}}</label>
            <label><input type="radio" name="mudi" value="3" v-model="userData.purposeFlag"> {{$language.browsing}}</label>
          </div>
        </div>

        <div class="group group--full">
          <div class="label label--full">{{$language.dealFlag}}: </div>
          <div class="content">
            <label><input type="radio" name="2" value="是" v-model="userData.dealFlag"> {{$language.yes}}</label>
            <label><input type="radio" name="2" value="否" v-model="userData.dealFlag"> {{$language.no}}</label>
          </div>
        </div>

        <div class="group group--full">
          <div class="label label--full">{{$language.documentQuality}}: </div>
          <div class="content">
            <label><input type="radio" name="3" value="3" v-model="userData.documentQuality"> {{$language.veryGood}}</label>
            <label><input type="radio" name="3" value="2" v-model="userData.documentQuality"> {{$language.good}}</label>
            <label><input type="radio" name="3" value="1" v-model="userData.documentQuality"> {{$language.average}}</label>
            <label><input type="radio" name="3" value="0" v-model="userData.documentQuality"> {{$language.poor}}</label>
          </div>
        </div>

    </div>

    <div class="group-btn">
      <a class="button-holder button-holder--big button-holder--red2" @click="clickApply" :class="{'button-holder--disabled': isLoading}"><span class="button-inner">{{$language.send}}</span><span class="mask"></span></a>
      <a class="button-holder " @click="clickRestart"><span class="button-inner">{{$language.reset}}</span><span class="mask"></span></a>
    </div>

  </section>
</template>

<script>
import dataRuleCheck from '@shared/utils/ruleCheck'
import { addCustomerMessage } from '@/api'

export default {
  data(){
    return {
      errorData: {},
      isLoading: false,
      productList: [],
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
        "purposeFlag": "",
        "productId": "",
        "goodsIds": [],
      },
      rules: {
        name: {
          required: '姓名不能为空 | Name cannot be empty',
          reg: /^[A-Za-z0-9\.\u4e00-\u9fa5]{2,3}$/,
          errorMsg: '姓名格式不正确 | Name format is incorrect'
        },
        company: {
          required: '公司名称不能为空 | Company name cannot be empty',
          reg: /^[A-Za-z0-9\.\u4e00-\u9fa5]{2,20}$/,
          errorMsg: '公司名称格式不正确 | Company name format is incorrect'
        },
        mobilePhone: {
          required: '电话不能为空 | Phone cannot be empty',
          reg: /^\d{7,11}$/,
          errorMsg: '电话格式不正确 | Phone format is incorrect'
        },
        mailAddress: {
          required: '邮箱不能为空 | E-mail can not be empty',
          reg: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
          errorMsg: '邮箱格式不正确 | E-mail format is incorrect'
        },
        opinion: {
          required: '意见不能为空 | Comments cannot be empty',
        }
      },
    }
  },
  created() {
    var storage = localStorage.getItem('productList');
    try {
      if(storage){
        storage = JSON.parse(storage);
      }
    } catch(e) {}

    if(storage){
      this.productList = storage;
    }
  },
  methods: {
    clickApply(){
      var check = dataRuleCheck(this.rules, this.userData);
      if(check === true){
        this.errorData = {}
        this.requestAjax();
      }
      else{
        this.errorData = check;
      }
    },
    requestAjax(){
      if(this.isLoading) return;
      this.isLoading = true;
      addCustomerMessage(this.userData).then(d=>{
        this.isLoading = false;
        this.$layer.alert(this.$language.submitSuccess);
        this.clickRestart();
      }).catch(()=>{
        this.isLoading = false;
      })
    },
    selectedProduct(item){
      var findIndex = this.userData.goodsIds.indexOf(item.id);
      if(findIndex > -1){
        this.userData.goodsIds.splice(findIndex, 1)
      }
      else{
        this.userData.goodsIds.push(item.id);
      }
    },
    clickRestart(){
      this.userData = {
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
      }
    }
  },
}
</script>