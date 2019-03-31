<style lang="less">
.form-content{
  max-width: 1200px;
  padding-top: 30px;
  .buttons{
    padding: 30px 100px;
  }
  .ivu-btn-large{
    padding: 8px 50px 9px;
  }
}
</style>
<template>
    <section class="form-content">
      <Form ref="formCustom" :model="formCustom" :rules="ruleValidate" :label-width="100">
          <FormItem label="招聘标题" prop="title">
              <Input type="text" v-model="formCustom.title"></Input>
          </FormItem>
          <FormItem label="招聘内容" prop="content">
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
        if(valid){
          this.requestAjax()
        }
      })
    },
    requestAjax(){
      if(this.loading) return
      let data = this.formCustom;
      this.loading = true;

      this.api.addRecruitmentInfo(data).then(d=>{
        this.loading = false;
        this.$Message.success({
          content: '添加人才招聘成功',
          duration: 2
        });
        this.initData();
      })
      .catch(e=>{
        this.loading = false;
      })
    },
    requestOneNew(){
      this.api.getRecruitmentInfos({id: this.params.id}).then(d=>{
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
    let params = this.$route.params
    this.params = params;
    if(params.id){
      this.requestOneNew()
    }
  }
};
</script>
