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
</style>
<template>
    <section class="form-content">
      <Form ref="formCustom" :label-width="200" :model="formCustom" :rules="ruleValidate">
        <section style="width:500px">
        <FormItem label="产品ID ：" v-if="formCustom.id">
            <span>{{formCustom.id}}</span>
        </FormItem>
        <FormItem label="产品名称 ：" prop="goodsName">
            <Input v-model="formCustom.goodsName" placeholder="" />
        </FormItem>
        <FormItem label="产品编号：" v-if="formCustom.spuNo">
            <span>{{formCustom.spuNo}}</span>
        </FormItem>
        <FormItem label="产品所属分类ID：" prop="categoryId">
          <Select v-model="formCustom.categoryId" style="width:100%">
            <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.categoryName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="产品规格ID：" v-show="formCustom.specId">
            <span>{{formCustom.specId}}</span>
        </FormItem>
        <FormItem label="产品规格名称：" prop="specName">
            <Input v-model="formCustom.specName" placeholder="" />
        </FormItem>
        <FormItem label="产品规格描述：" prop="specDescription">
            <Input v-model="formCustom.specDescription" placeholder="" />
        </FormItem>
        <FormItem label="产品规格编号 ："  v-show="formCustom.specNo">
            <Input v-model="formCustom.specNo" placeholder="" />
        </FormItem>
        <FormItem label="产品规格具体值：" prop="specValue">
            <Input v-model="formCustom.specValue" placeholder="" />
        </FormItem>
        <FormItem label="产品价格：" prop="lowPrice">
            <InputNumber
            :max="10000"
            v-model="formCustom.lowPrice"
            :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
            :parser="value => value.replace(/$s?|(,*)/g, '')">
            </InputNumber>
        </FormItem>
        <FormItem label="产品图片：">
            <span v-show="formCustom.goodsImageKey"><img :src="formCustom.goodsImageKey" alt="" class="img"></span>
            <Upload action="/api/image/upload" :name="goodsImage" :data="uploadData">
                <Button icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
        </FormItem>
        </section>
        <FormItem label="产品描述：" prop="goodsDescription">
            <vue-ueditor-wrap v-model="formCustom.goodsDescription"></vue-ueditor-wrap>
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
      formCustom: { 
        
      },
      ruleValidate: {
        goodsName: [{ required: true, message: '产品名称不能为空' }],
        specName: [{ required: true, message: '规格名称不能为空' }],
        lowPrice: [{ required: true, min: 1, message: '请输入正确的价格' }],
      },
      goodsImage: 'goodsImage',
      uploadData: {
        id: 0
      },
      categoryList: []
    }
  },
  computed: {
      
  },
  mixins: [mixins],
  methods: {
    init(){
      this.formCustom.lowPrice = 0;
      this.api.categories({id:0}).then(d=>{
        this.categoryList = d.list;
      })
    },
    requestGetGood(id = ''){
      this.api.categoryGoods({ id }).then(d=>{
          Object.assign(this.formCustom, d);
      }).catch(()=>{
        
      })
    },
    confirm(){
      this.$refs['formCustom'].validate((valid) => {
        if (valid) {
            this.modal_loading = true;
            this.modal3 = false;
        } else {
            this.$Message.error('请检测验证信息!');
        }
    });
    },
    initData(){
      this.formCustom = { }
    },
  },
  watch: {
      
  },
  mounted () {
    
  },
  created () {
    let params = this.$route.params || {}
    this.params = params;
    if(params.id){
      this.requestGetGood(params.id);
    }
    this.init();
  }
};
</script>
