<template>
  <div id="pages">
    <mainHeader />
    <banner />
    <section id="main-content" class="container">
      <div class="job-center">
        <h2>客户留言</h2>
        
        <div class="feedback">

          <div class="group" :class="{'group--error': errorData.key == 'name'}">
            <div class="label">姓名：</div>
            <div class="content">
              <input type="text" class="input"  v-model="userData.name"/>
              <span class="red">*</span>
            </div>
            <span class="error" v-show="errorData.key == 'name'">{{errorData.msg}}</span>
          </div>

          <div class="group" :class="{'group--error': errorData.key == 'company'}">
            <div class="label">公司：</div>
            <div class="content">
              <input type="text" class="input"  v-model="userData.company"/>
              <span class="red">*</span>
            </div>
            <span class="error" v-show="errorData.key == 'company'">{{errorData.msg}}</span>
          </div>

          <div class="group" :class="{'group--error': errorData.key == 'mobilePhone'}">
            <div class="label">电话：</div>
            <div class="content">
              <input type="text" class="input"  v-model="userData.mobilePhone"/>
              <span class="red">*</span>
            </div>
            <span class="error" v-show="errorData.key == 'mobilePhone'">{{errorData.msg}}</span>
          </div>

          <div class="group" :class="{'group--error': errorData.key == 'mailAddress'}">
            <div class="label">邮箱：</div>
            <div class="content">
              <input type="text" class="input"  v-model="userData.mailAddress"/>
              <span class="red">*</span>
            </div>
            <span class="error" v-show="errorData.key == 'mailAddress'">{{errorData.msg}}</span>
          </div>

          <div class="group">
            <div class="label">传真：</div>
            <div class="content">
              <input type="text" class="input"  v-model="userData.fax"/>
            </div>
          </div>

          <div class="group">
            <div class="label">邮码：</div>
            <div class="content">
              <input type="text" class="input"  v-model="userData.postalCode"/>
            </div>
          </div>

          <div class="group group--column" :class="{'group--error': errorData.key == 'opinion'}">
            <div class="label label--full">您对我们的建议或意见：<span class="red">*</span></div>
            <div class="content">
              <textarea name="" v-model="userData.opinion"></textarea>
              <span class="error error--big" v-show="errorData.key == 'opinion'">{{errorData.msg}}</span>
            </div>
          </div>

          <div class="group group--column">
            <div class="label label--full">您访问网站的目的是什么：</div>
            <div class="content">
              <textarea name="" v-model="userData.accessPurpose"></textarea>
            </div>
          </div>

          <div class="group">
            <div class="label">地址：</div>
            <div class="content">
              <input type="text" class="input"  v-model="userData.address"/>
            </div>
          </div>

          <div class="group group--full">
            <div class="label label--full">您的目的是否已经达到：</div>
            <div class="content">
              <label><input type="radio" name="mudi" value="是" v-model="userData.purposeFlag"> 是</label>
              <label><input type="radio" name="mudi" value="否" v-model="userData.purposeFlag"> 否</label>
              <label><input type="radio" name="mudi" value="一部分" v-model="userData.purposeFlag"> 一部分</label>
              <label><input type="radio" name="mudi" value="仅在浏览，无特别目的" v-model="userData.purposeFlag"> 仅在浏览，无特别目的</label>
            </div>
          </div>

          <div class="group group--full">
            <div class="label label--full">您是否曾经或打算提交一个服务请求以解决您的问题：</div>
            <div class="content">
              <label><input type="radio" name="2" value="是" v-model="userData.dealFlag"> 是</label>
              <label><input type="radio" name="2" value="否" v-model="userData.dealFlag"> 否</label>
            </div>
          </div>

          <div class="group group--full">
            <div class="label label--full">请评价该文档的质量：</div>
            <div class="content">
              <label><input type="radio" name="3" value="非常好" v-model="userData.documentQuality"> 非常好</label>
              <label><input type="radio" name="3" value="好" v-model="userData.documentQuality"> 好</label>
              <label><input type="radio" name="3" value="平均" v-model="userData.documentQuality"> 平均</label>
              <label><input type="radio" name="3" value="差" v-model="userData.documentQuality"> 差</label>
            </div>
          </div>

        </div>


        <div class="group-btn">
          <a class="button-holder button-holder--big button-holder--red2" @click="clickApply" :class="{'button-holder--disabled': isLoading}"><span class="button-inner">发送</span><span class="mask"></span></a>
          <a class="button-holder " @click="clickRestart"><span class="button-inner">重新填写</span><span class="mask"></span></a>
        </div>

      </div>
    </section>

    <mainFooter />
  </div>
</template>

<script>
import mainHeader from '@shared/components/header'
import mainFooter from '@shared/components/footer'
import banner from '@shared/components/banner'
import dataRuleCheck from '@shared/utils/ruleCheck'
import { addCustomerMessage } from '@/api'

export default {
  name: 'about',
  data(){
    return{
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
      errorData: {},
      isLoading: false
    }
  },
  components: {
    mainHeader,
    mainFooter,
    banner
  },
  computed: {
    
  },
  created(){
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
        this.$layer.alert('恭喜您提交成功');
        this.clickRestart();
      }).catch(()=>{
        this.isLoading = false;
      })
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

<style>

</style>
