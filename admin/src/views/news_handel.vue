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
  padding-left: 20px;
  margin-bottom: 40px;
}
</style>
<template>
    <section class="form-content">

      <Tabs :animated="false">
        <TabPane label="中文">
          <Form ref="formCustom" :model="formCustom" :rules="ruleValidate" :label-width="100">
              <FormItem label="新闻标题：" prop="title">
                  <Input type="text" v-model="formCustom.title"></Input>
              </FormItem>
              <FormItem label="新闻内容：" prop="content">
                  <vue-ueditor-wrap v-model="formCustom.content"></vue-ueditor-wrap>
              </FormItem>
          </Form>
        </TabPane>
        <TabPane label="Englist">
          <Form ref="formEnglist" :model="formEnglist" :rules="ruleValidate" :label-width="100">
              <FormItem label="title：" prop="title">
                  <Input type="text" v-model="formEnglist.title"></Input>
              </FormItem>
              <FormItem label="content：" prop="content">
                  <vue-ueditor-wrap v-model="formEnglist.content"></vue-ueditor-wrap>
              </FormItem>
          </Form>
        </TabPane>
      </Tabs>

      <!-- <Form ref="formCustom" :model="formCustom" :rules="ruleValidate" :label-width="100">
          <FormItem label="新闻标题" prop="title">
              <Input type="text" v-model="formCustom.title"></Input>
          </FormItem>
          <FormItem label="新闻内容" prop="content">
              <vue-ueditor-wrap v-model="formCustom.content"></vue-ueditor-wrap>
          </FormItem>
      </Form> -->
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
        title: '',
        content: '',
      },
      formEnglist: {
        title: '',
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
      this.$refs['formCustom'].validate((valid) => {
      this.$refs['formEnglist'].validate((valid_E) => {
        if(valid && valid_E){
          this.requestAjax()
        }
        else{
          this.$Message.error('请检验表单数据');
        }
      })
      })
    },
    requestAjax(){
      if(this.loading) return
      let data = this.getFormData();
      let ajax = this.api.addNewsInfo
      let message = '添加新闻成功'

      if(this.params.id){
        message = '更新新闻成功'
        ajax = this.api.updateNewsInfos;
        data.id = this.params.id;
      }

      this.loading = true;

      ajax(data).then(d=>{
        this.loading = false;
        this.$Message.success({
          content: message,
          duration: 2,
          onClose: this.removeCurrTag
        });
      })
      .catch(e=>{
        this.loading = false;
      })
    },
    requestOneNew(){
      this.api.getNewsInfo({id: this.params.id}).then(d=>{
        this.formCustom.title = d.title;
        this.formCustom.content = d.content;
      });
    },
    removeCurrTag(){
      let name = this.params.id ? 'news_edit' : 'news_handel';
      this.$store.commit('removeTag', name);
      this.$store.commit('closePage', name);
      this.$router.push({ name: 'news_index' });
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
      this.requestOneNew()
    }
  }
};
</script>
