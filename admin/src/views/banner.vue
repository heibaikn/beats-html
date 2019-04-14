<style lang="less">
  @import '../styles/beats.less';
  .ivu-form-item-content, .ivu-form-item-label{
    font-size: 14px;
  }
</style>
<template>
    <section>
        <div style="padding:5px 0 10px;">
            <h1>Banner管理</h1>
        </div>

        <div class="banner-container">
          <div class="item" v-for="(item,index) in dataList" :key="index">
            <div class="img"><img :src="item.imageKey" alt=""></div>
            <div class="info">
              链接：{{item.url}}
            </div>
            <div class="close" @click="clickRemove(item)"><i class="iconfont iconguanbi"></i></div>
          </div>

          <div class="item">
            <div class="img">
              <h3>添加Banner：</h3>
              <p>提示：建议上传1980*600的图片</p>
              <div class="upload-center">
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
                <span v-show="formCustom.imageKey"><img :src="formCustom.imageKey" alt="" class="upload-img"></span>
              </div>
            </div>
            <div class="info">
              <Form ref="formCustom" :model="formCustom" :label-width="50" label-position="left">
                <FormItem label="链接: " prop="url">
                    <Input type="text" v-model="formCustom.url" style="width:200px;"></Input>
                    <Button type="primary" @click="confirm">添加</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
        
        <Modal v-model="modal2" width="360" @on-ok="enterRemove">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除</span>
          </p>
          <div style="text-align:center">
              <p>您确定要删除这条{{popupTitle}}吗？</p>
          </div>
        </Modal>

    </section>
</template>
<script>
    import Cookies from 'js-cookie';
    import mixins from '@/libs/mixins.js';
    
    export default {
        components: {
            
        },
        data () {
            return {
                color: '',
                color2: '',
                popupTitle: 'Banner',
                modal1: false,
                modal2: false,
                modal2Data: {},
                loading: false,
                modal_loading: false,
                total: 0,
                modalTitle: '',
                goodsImage: 'goodsImage',
                uploadData: {
                  id: 0
                },
                modalType: 1,
                dataList: [],
                formCustom: { },
                formEnglist: { },
            };
        },
        computed: {
           
        },
        filters: {
         
        },
        mixins: [mixins],
        methods: {
            init(){
                this.queryList();
            },
            addModal(){
                this.modal1 = true;
                this.modalTitle = '添加'+this.popupTitle;
                this.modalType  = 1;
            },
            modalOk (name) {
                
            },
            modalCancel () {
                this.modal1 = false;
                this.modal_loading = false;
            },
            queryList(){
                this.loading = true;
                this.api.getBannerList(this.formSearch).then(d=>{
                  this.loading = false;
                  this.dataList = d;
                }).catch(()=>{
                  this.loading = false;
                })
            },
            modalVisibleChange(visible){
                if(!visible){
                  this.$refs['formCustom'].resetFields();
                  this.$refs['formEnglist'].resetFields();
                }
            },
            handleSuccess (res, file) {
              if(res.data){
                let url = res.data.imageHost + '/' + res.data.imageKey;
                this.$set(this.formCustom, 'imageKey', url);
              }
            },
            clickRemove(item){
              this.modal2 = true;
              this.modal2Data = item;
            },
            enterRemove(){
              this.api.delBanner({id: this.modal2Data.id}).then(d=>{
                this.$Message.success('删除Banner成功');
                this.queryList();
              });
            },
            confirm(){
              if(!this.formCustom.imageKey){
                return this.$Message.error('请上传图片');
              }
              this.api.addBanner(this.formCustom).then(d=>{
                this.formCustom.url = '';
                this.formCustom.imageKey = '';
                this.$Message.success('添加Banner成功');
                this.queryList();
              });
            }
        },
        watch: {
            
        },
        mounted () {
            this.init();
        },
        created () {

        }
    };
</script>
