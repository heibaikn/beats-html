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
.spec-list-item{
  padding-top: 20px;
}
.spec-list-item:after{
  content: '';
  clear: both;
  display: block;
}
.curr{
  cursor: pointer;
}
.gray{
  color: #9c9c9c;
  font-size: 12px;
}
@import url(../styles/beats.less);
</style>
<template>
    <section class="form-content">
          <Form ref="formCustom" :label-width="200" :model="formCustom" :rules="ruleValidate" @submit.native.prevent>
            <section style="width:1000px">
            <FormItem label="产品ID ：" v-if="formCustom.id">
                <span>{{formCustom.id}}</span>
            </FormItem>
            <FormItem label="产品名称 ：" prop="goodsName">
                <div class="form-item-lanaguage form-item-lanaguage-col">
                  <div class="item"><Input type="text" v-model="formCustom.goodsName"></Input></div> 
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
            </FormItem>
            <FormItem label="产品价格：" prop="price">
                <Input
                style="width:200px"
                :maxlength="7"
                :number="true"
                v-model="price"
                @on-blur="productPriceChange" >
                </Input>
            </FormItem>

            <!-- 产品规格： -->
            <FormItem label="产品规格：" prop="specRequest">
                <div class="add-spec" @click="clickAddSpec"><i class="iconfont iconguanbi"></i></div>
                <div class="spec-list">
                  <div class="spec-list-item"  v-for="(item, index) in specRequest" :key="index" @click="clickSpecItem(item,index)">
                    <span>增加规格：</span>
                    <Select v-model="item.specValueId" style="width:200px; display:inilne-block ;margin-right:10px" @on-change="changeSpecSelect">
                      <Option v-for="item in skuList" :value="item.specValueId" :key="item.specValueId">{{ item.specName }} - {{ item.specValue }}</Option>
                    </Select>
                    <Upload 
                      :show-upload-list="false"
                      :on-success="handleSpecSuccess"
                      :format="['jpg','jpeg','png']"
                      :max-size="2048"
                      :name="goodsImage"
                      :data="uploadData"
                      action="/api/image/upload"
                      class="my-upload my-upload-mini">
                      <div>
                          <Icon type="ios-camera" size="20"></Icon>
                      </div>
                    </Upload>
                    <span v-show="item.goodsSpecImageKey"><img :src="item.goodsSpecImageKey" alt="" class="upload-img"></span>
                    <span class="sepc-remove curr" @click.prevent.stop="removeSpec(item,index)"><i class="iconfont iconguanbi"></i></span>
                    <span class="gray">（请上传600*600的产品规格图片）</span>
                  </div>
                </div>
            </FormItem>

            <!-- 产品图片： -->
            <FormItem label="产品图片：" prop="goodsImageKey">
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
                <vue-ueditor-wrap v-model="formCustom.goodsDescription" :config="ueditorConfig"></vue-ueditor-wrap>
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
      price: '',
      changeSpecIndex: -1,
      selectChildCate: '',
      modalType: 1,
      formCustom: { },
      skuList: [],
      ruleValidate: {
        goodsName: [{ required: true, message: '产品名称不能为空' }],
        specName: [{ required: true, message: '规格名称不能为空' }],
        // goodsImageKey: [{ required: true, message: '请上传产品图片' }],
        // price: [{ required: true, min: 1, message: '请输入正确的价格' }],
      },
      goodsImage: 'goodsImage',
      uploadData: {
        id: 0
      },
      categoryList: [],
      chindrenCategoryList: [],
      skuList: [],
      specRequest: [],
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
      this.formCustom.price = 1;
      this.api.categories({id: 0}).then(d=>{
        this.dataList = d;
        this.categoryList = this.getArrayGroup(d);
        this.requestGetGood(this.params.id);
      });

      this.api.getSpecInfoList().then(d=>{
        this.skuList = d.list;
      })
    },
    requestGetGood(id){
      if(!id) return;
      this.api.goodsDetails({ id }).then(d=>{
          this.formCustom = d.list && d.list[0] || {};
          this.price = this.formCustom.price = this.formCustom.lowPrice;

          // skulist
          if(d.list && d.list.length > 0){
            d.list.forEach((item)=>{
              this.specRequest.push({
                specId: item.specId,
                specValueId: item.specValueId,
                goodsSpecImageKey: item.goodsSkuImageKey,
              })
            })
          }
          

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
            var specCheck = this.checkValidateSpec();
            if(!specCheck){
              return;
            }
            if(!this.formCustom.goodsImageKey){
              this.$Message.error('请上传产品图片!');
              return;
            }
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
    handleSuccess (res, file) {
      if(res.data){
        let url = res.data.imageHost + '/' + res.data.imageKey;
        this.$set(this.formCustom, 'goodsImageKey', url);
      }
    },
    handleSpecSuccess (res, file) {
      let url = res.data.imageHost + '/' + res.data.imageKey;
      if(this.changeSpecIndex > -1){
        this.specRequest[this.changeSpecIndex]['goodsSpecImageKey'] = url;
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
    },


    // 规格相关
    checkValidateSpec(){
      var status = true;
      var index = -1;
      this.specRequest.some((spec, i)=>{
        if(spec.specId !== 0 && spec.goodsSpecImageKey == ''){
          status = false;
          index = i;
          return false;
        }
      });
      if(status == false){
        this.$Message.error('第'+(index+1)+'个规格没上传图片');
      }
      else if(status == true && this.specRequest.length > 0){
        let arr = this.specRequest.filter(item=>{
          return item.specId > 0;
        })
        this.formCustom.specRequest = arr;
      }
      return status;
    },

    clickAddSpec(){
      this.specRequest.push({
        specId: 0,
        specValueId: 0,
        goodsSpecImageKey: '',
      })
      this.changeSpecIndex = -1;
    },
    changeSpecSelect(id){
      const find = this.skuList.find(item=>{
        return item.specValueId == id;
      })
      if(this.changeSpecIndex > -1 && find.specId){
        this.specRequest[this.changeSpecIndex]['specId'] = find.specId;
      }
    },
    removeSpec(item, index){
      this.specRequest.splice(index, 1);
    },
    clickSpecItem(item,index){
      this.changeSpecIndex = index;
    },
    productPriceChange(e){
      let value = e.target.value;
      this.formCustom.price = this.price = value = value.replace(/[^\d\.]/g, '');
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
