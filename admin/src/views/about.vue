<style lang="less">
.form-content{
  max-width: 1200px;
  padding-top: 30px;
  .buttons{
    padding: 30px 130px;
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
      <Form ref="formCustom" :model="formCustom" :rules="ruleValidate" :label-width="130">
          <FormItem label="公司介绍内容：" prop="content">
              <vue-ueditor-wrap v-model="formCustom.content"></vue-ueditor-wrap>
          </FormItem>
      </Form>
      <div class="buttons">
        <Button type="primary" size="large" :loading="loading" @click="confirm">提交</Button>
      </div>
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
        content: '',
      },
      filterKey: ['content'],
      ruleValidate: {}
    }
  },
  computed: {
      
  },
  mixins: [mixins],
  methods: {
    init(){

    },
    confirm(){
      this.requestAjax();
    },
    requestAjax(){
      if(this.loading) return
      let data = this.formCustom;
      let ajax = this.api.addRecruitmentInfo
      let message = '添加公司介绍成功'

      if(this.isEdit){
        message = '更新公司介绍成功'
        ajax = this.api.updateRecruitmentInfo;
        data.id = this.params.id;
      }

      this.loading = true;

      ajax(data).then(d=>{
        this.loading = false;
        this.$Message.success({
          content: message,
          duration: 2
        });
        this.initData();
      })
      .catch(e=>{
        this.loading = false;
      })
    },
    requestOneNew(){
      this.api.getCompanyInfo().then(res=>{
        let d = res[0];
        this.isEdit = true;
        this.formCustom.id = d.id;
        this.formCustom.title = d.title;
        this.formCustom.content = d.content;
      });
    },
    initData(){
      this.formCustom = {
        title: '',
        content: '',
      }
    }
  },
  watch: {
      
  },
  mounted () {
    
  },
  created () {
    this.requestOneNew();
  }
};
</script>
