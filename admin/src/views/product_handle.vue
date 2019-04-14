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
            <FormItem label="产品ID ：" v-if="formCustom.id">
                <span>{{formCustom.id}}</span>
            </FormItem>
            <FormItem label="产品名称 ：" prop="goodsName">
                <!-- <Input v-model="formCustom.goodsName" placeholder="" /> -->
                <div class="form-item-lanaguage form-item-lanaguage-col">
                  <div class="item"><span v-show="modalType==1">中文: </span><Input type="text" v-model="formCustom.goodsName"></Input></div> 
                  <div class="item" v-show="modalType==1"><span>Englisth: </span><Input type="text" v-model="formEnglist.goodsName"></Input></div> 
                </div>
            </FormItem>
            <FormItem label="产品编号：" v-if="formCustom.spuNo">
                <span>{{formCustom.spuNo}}</span>
            </FormItem>
            <FormItem label="产品所属分类：" prop="categoryId">
              <Select v-model="selectCate" style="width:200px; float:left; margin-right:10px" @on-change="categoryChange">
                <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.categoryName }}</Option>
              </Select>
              <Select v-model="selectChildCate" style="width:200px; float:left" @on-change="chindrenCategoryChange">
                <Option v-for="item in chindrenCategoryList" :value="item.id" :key="item.id">{{ item.categoryName }}</Option>
              </Select>
            </FormItem>
            <!-- <FormItem label="产品规格：">
              <CheckboxGroup v-model="formCustom.skuId" @on-change="checkboxChange">
                <Checkbox :label="item.specValueId" v-for="(item,index) in skuList" :key="index"> 
                    <span>{{item.specValue}} <span class="span-color" :style="skuColorStyle(item.specValue)"></span> </span>
                </Checkbox>
              </CheckboxGroup> -->
            </FormItem>
            <FormItem label="产品价格：" prop="lowPrice">
                <InputNumber
                :max="10000"
                :min="1"
                v-model="formCustom.lowPrice"
                :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
                :parser="value => value.replace(/$s?|(,*)/g, '')">
                </InputNumber>
            </FormItem>
            <FormItem label="产品图片：">
                <!-- <Upload action="/api/image/upload" :name="goodsImage" :data="uploadData">
                    <Button icon="ios-cloud-upload-outline">上传图片</Button>
                </Upload> -->
                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :name="goodsImage"
                  :data="uploadData"
                  action="/api/image/upload"
                  class="my-upload">
                  <div>
                      <Icon type="ios-camera" size="20"></Icon>
                  </div>
              </Upload>
              <span v-show="formCustom.goodsImageKey"><img :src="formCustom.goodsImageKey" alt="" class="upload-img"></span>

            </FormItem>
            </section>
            <FormItem label="产品描述：" prop="goodsDescription">
                <span class="label"  v-show="modalType==1">中文: </span>
                <vue-ueditor-wrap v-model="formCustom.goodsDescription" :config="ueditorConfig"></vue-ueditor-wrap>
                <div  v-show="modalType==1">
                  <span class="label">English: </span>
                  <vue-ueditor-wrap v-model="formEnglist.goodsDescription" :config="ueditorConfig"></vue-ueditor-wrap>
                </div>
            </FormItem>
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
      formEnglist: {},
      ruleValidate: {
        goodsName: [{ required: true, message: '产品名称不能为空' }],
        specName: [{ required: true, message: '规格名称不能为空' }],
        // lowPrice: [{ required: true, min: 1, message: '请输入正确的价格' }],
      },
      goodsImage: 'goodsImage',
      uploadData: {
        id: 0
      },
      categoryList: [],
      chindrenCategoryList: [],
      skuList: [],
      ueditorConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 200,
        // 初始容器宽度
        initialFrameWidth: '100%',
        serverUrl: '/api/image/upload',
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
      this.formCustom.lowPrice = 1;
      this.api.categories({id: 0}).then(d=>{
        this.dataList = d.list;
        this.categoryList = this.getArrayGroup(d.list);
        this.requestGetGood(this.params.id);
      });

      this.api.getSpecInfoList().then(d=>{
        this.skuList = d.list;
      })
    },
    requestGetGood(id){
      if(!id) return;
      this.api.goodsDetails({ id }).then(d=>{
          Object.assign(this.formCustom, d.list && d.list[0] || {});
          let cid = this.formCustom.categoryId;
          let findCate = this.dataList.find(v=>{
            return v.id == cid;
          });
          if(findCate.parentId != 0){
            this.categoryChange(findCate.parentId);
            this.selectChildCate = cid;
            let pCate = this.dataList.find(v=>{
              return v.id == findCate.parentId;
            });
            this.selectCate = pCate.id;
          } else {
            this.selectCate = cid;
          }
      }).catch(()=>{
        
      })
    },
    confirm(){
      this.$refs['formCustom'].validate((valid) => {
        if (valid) {
            this.modal_loading = true;
            this.modal3 = false;
            this.requestGoodHandle();
        } else {
            this.$Message.error('请检测验证信息!');
        }
      });
    },
    requestGoodHandle(){
      let url = this.params.id ? this.api.updateGoods : this.api.addGoods;
      let data = this.params.id ? this.formCustom : this.getFormData();
      url(data).then(d=>{
        this.modal_loading = false;
        if(this.params.id){
          this.$Message.success('更新产品成功!');
        }
        else{
          this.$Message.success('添加产品成功!');
        }
      })
      .catch(()=>{
        this.modal_loading = false;
      });
    },
    categoryChange(id){
      this.chindrenCategoryList =  this.dataList.filter(v=>{
        return v.parentId == id;
      })
      this.formCustom.categoryId = id;
      this.selectChildCate = '';
    },
    chindrenCategoryChange(id){
      this.formCustom.categoryId = id;
    },
    initData(){
      this.formCustom = { }
    },
    handleSuccess (res, file) {
      if(res.data){
        let url = res.data.imageHost + '/' + res.data.imageKey;
        // this.formCustom.goodsImageKey = url;
        this.$set(this.formCustom, 'goodsImageKey', url);
      }
    },
    checkboxChange(val){
      this.formCustom.skuId = val;
    },
    isColor(val){
      return /^#[a-z0-9A-Z]{6}/.test(val); 
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
