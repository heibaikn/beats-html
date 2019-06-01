<style lang="less">
.form-content{
  max-width: 1200px;
  padding-top: 30px;
  padding-right: 50px;
  .buttons{
    padding: 30px 100px;
  }
  .ivu-btn-large{
    padding: 8px 50px 9px;
  }
}
.edui-default .edui-toolbar .edui-combox .edui-combox-body, .edui-default .edui-button-body{
  display: flex;
}
.ivu-tabs-bar{
  padding-left: 90px;
  margin-bottom: 40px;
}
@import url(../styles/beats.less);
</style>
<template>
    <section class="form-content">
          <Form ref="formCustom" :label-width="200" :model="formCustom" :rules="ruleValidate">
            <section style="width:800px">
            <FormItem label="关联产品：" prop="id">
              <Select v-model="formCustom.id" @on-change="productChange" style="width:300px">
                <Option v-for="item in productList" :value="item.id" :key="item.id">{{ item.goodsName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="关联规格：" prop="specValueId">
              <Select v-model="formCustom.specValueId" @on-change="skuChange" style="width:300px">
                <Option v-for="(item,index) in skuList" :value="item.specValueId" :key="index">{{ item.specValue }}</Option>
              </Select>
            </FormItem>
            <FormItem label="产品图片：">
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :name="goodsImage"
                  :data="uploadData"
                  :headers="uploadHeaders"
                  action="/api/image/upload"
                  class="my-upload">
                  <div>
                      <Icon type="ios-camera" size="20"></Icon>
                  </div>
              </Upload>
              <span v-show="formCustom.goodsSpecImageKey"><img :src="formCustom.goodsSpecImageKey" alt="" class="upload-img"></span>
            </FormItem>
            </section>
            <FormItem>
                <Button type="primary" size="large" :loading="loading" @click="confirm">提交</Button>
            </FormItem>
          </Form>
    </section>
</template>
<script>
import Cookies from 'js-cookie';
import mixins from '@/libs/mixins.js';
import VueUeditorWrap from 'vue-ueditor-wrap'

export default {
  components: {
    VueUeditorWrap
  },
  data () {
    return {
      loading: false,
      selectCate: '',
      selectChildCate: '',
      modalType: 1,
      formCustom: { },
      ruleValidate: {
        id: [{ required: true, message: '产品不能为空' }],
        specValueId: [{ required: true, message: '规格不能为空' }],
      },
      goodsImage: 'goodsImage',
      uploadData: {
        id: 0
      },
      productList: [],
      skuList: [],
      uploadHeaders: {
        loginName: Cookies.get('user') || '',
        adminToken: Cookies.get('token') || '',
      }
    }
  },
  computed: {
    
  },
  mixins: [mixins],
  filters: {
    
  },
  methods: {
    init(){
      this.api.categoryGoods({id: 0}).then(d=>{
        this.productList = d.list;
      });
      this.api.getSpecInfoList().then(d=>{
        this.skuList = d.list;
      })
    },
    confirm(){
      this.$refs['formCustom'].validate((valid) => {
        if (valid) {
            this.modal_loading = true;
            this.modal3 = false;
            this.requestHandle();
        } else {
            this.$Message.error('请检测验证信息!');
        }
      });
    },
    requestHandle(){
      this.api.addGoodsSpec(this.formCustom).then(d=>{
        this.modal_loading = false;
        this.$Message.success('关联产品规格成功!');
      })
      .catch(()=>{
        this.modal_loading = false;
      })
    },
    skuChange(id){
      let find = this.skuList.find(v=>{
        return v.specValueId == this.formCustom.specValueId
      });
      if(find && find.specId){
        this.formCustom.specId = find.specId;
      }
    },
    productChange(id){
      
    },
    handleSuccess (res, file) {
      if(res.data){
        let url = res.data.imageHost + '/' + res.data.imageKey;
        this.$set(this.formCustom, 'goodsSpecImageKey', url);
      }
    },
    checkboxChange(val){
      this.formCustom.skuId = val;
    },
    skuColorStyle(val){
      var is =  /^#[a-z0-9A-Z]{6}/.test(val); 
      if(is){
        return {
          background: val
        }
      }
      return {}
    }
  },
  watch: {
      
  },
  mounted () {
    
  },
  created () {
    let params = this.$route.params || {}
    this.params = params;
    if(params.id){
      this.modalType = 2;
    }
    else{
      this.modalType = 1;
    }
    this.init();
  }
};
</script>
