<style lang="less">
  .ivu-form-item-content, .ivu-form-item-label{
    font-size: 14px;
  }
  .img{
    width: 200px;
  }
  .ivu-modal-body{
      padding-right: 40px;
  }
</style>
<template>
    <section>
        <div style="padding:5px 0 10px;">
            <Button type="success" @click="addModal">添加产品</Button>
        </div>

        <!--表格-->
        <Table stripe :columns="columns1" :data="dataList" :loading="loading"></Table>
        <div class="table-page">
            <Page :total="total" :current="formSearch.pageIndex" show-total @on-change="changePage"></Page>
        </div>

        
        <Modal v-model="modal2" width="360" @on-ok="enterRemoveAjax">
            <p slot="header" style="color:#f60;text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>删除</span>
            </p>
            <div style="text-align:center">
                <p>您确定要删除这个产品吗？</p>
            </div>
            <!-- <div slot="footer" class="flex">
                <Button type="default" size="large"  @click="cancelModal2" style="width: 50%">取消</Button>
                <Button type="error" size="large"  @click="enterRemoveAjax" style="width: 50%" >确定</Button>
            </div> -->
        </Modal>

        <Modal v-model="modal3" width="600" @on-visible-change="modalVisibleChange">
            <p slot="header" style="text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>{{modalTitle}}</span>
            </p>
            <div>
                <Form ref="formCustom" :label-width="200" :model="formCustom" :rules="ruleValidate">
                  <FormItem label="产品ID ：" v-show="formCustom.id">
                      <span>{{formCustom.id}}</span>
                  </FormItem>
                  <FormItem label="产品名称 ：" prop="goodsName">
                      <Input v-model="formCustom.goodsName" placeholder="" />
                  </FormItem>
                  <FormItem label="产品编号：" v-show="formCustom.spuNo">
                      <Input v-model="formCustom.spuNo" placeholder="" />
                  </FormItem>
                  <FormItem label="产品所属分类ID：" prop="categoryId">
                      <Select v-model="formCustom.categoryId" style="width:100%">
                        <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.categoryName }}</Option>
                     </Select>
                  </FormItem>
                  <!-- <FormItem label="产品所属品牌ID：">
                      <span>{{formCustom.brandId}}</span>
                  </FormItem> -->
                  <FormItem label="产品描述：" prop="goodsDescription">
                      <Input v-model="formCustom.goodsDescription" placeholder="" />
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
                      <Input v-model="formCustom.lowPrice" placeholder="" />
                  </FormItem>
                  <FormItem label="产品图片：">
                       <span v-show="formCustom.goodsImageKey"><img :src="formCustom.goodsImageKey" alt="" class="img"></span>
                       <Upload action="//jsonplaceholder.typicode.com/posts/" v-show="!formCustom.goodsImageKey">
                            <Button icon="ios-cloud-upload-outline">上传</Button>
                       </Upload>
                  </FormItem>
                  
                </Form>
            </div>
            <div slot="footer" class="flex">
                <Button type="primary" size="large" :loading="modal_loading"  @click="enterEditAjax('formCustom')" style="width:100%">确定</Button>
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
                popupTitle: '产品',
                modal1: false,
                modal2: false,
                modal3: false,
                modal3Data: {},
                loading: false,
                modal_loading: false,
                total: 0,
                modalTitle: '',
                modal2Status : '',
                modal2Name: '',
                skuModel: '',
                categoryList: [],
                columns1: [
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    
                    {
                        title: '产品名称',
                        key: 'goodsName'
                    },
                    {
                        title: '产品编号',
                        key: 'spuNo'
                    },
                    {
                        title: '产品价格',
                        render(h, params){
                            return h('div', `¥ ${params.row.lowPrice}元`)
                        }
                    },
                    {
                        title: '产品的规格名称',
                        key: 'specName'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        size: 'small', type: 'primary'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                          this.modalTitle = '编辑'+this.popupTitle;
                                          this.formCustom = Object.assign({}, params.row);
                                          this.modal3 = true;
                                          this.modalVisibleChange(false)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                          this.clickRemove(params.row, params.index)
                                        }
                                    }
                                }, '删除'),
                            ]);
                        }
                    }
                ],
                dataList: [],
                formCustom: { },
                formSearch:{
                    name: '',
                    pageIndex: 1,
                },
                ruleValidate: {
                    goodsName: [{ required: true, message: '产品名称不能为空' }],
                    specName: [{ required: true, message: '规格名称不能为空' }],
                    lowPrice: [{ required: true, message: '价格不能为空' }],
                }
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
                this.api.categories().then(d=>{
                    this.categoryList = d;
                })
            },
            addModal(){
                this.modal3 = true;
                this.modalTitle = '添加'+this.popupTitle;
                this.modalType  = 1;
                this.formCustomInit();
            },
            queryList(){
                this.loading = true;
                this.api.categoryGoods(this.formSearch).then(d=>{
                    this.loading = false;
                    if(this.formSearch.pageIndex == 1){
                        this.dataList = [];
                    }   
                    this.dataList = d.list;
                    this.total = d.count;
                }).catch(()=>{
                    this.loading = false;
                })
            },
            changePage(d){
                this.formSearch.pageIndex = d;
                this.queryList();
            },
            modalVisibleChange(visible){
                if(!visible){
                    this.$refs['formCustom'].resetFields();
                }
                this.modal_loading = false;
            },
            formCustomInit(){
                this.formCustom = { }
            },
            cancelModal2(){
                this.modal2 = false;
            },
            clickRemove(d, index){
              this.modal2Data = d;
              this.modal2Data.index = index;
              this.modal2 = true;
            },
            enterRemoveAjax(){
                this.api.delNewsInfo({id: this.modal2Data.id}).then(d=>{
                    this.dataList.splice(this.modal2Data.index, 1);
                }).catch(()=>{
                    
                })
            },
            enterEditAjax(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        this.modal3 = false;

                        this.api.delNewsInfo({id: this.modal3Data.id}).then(d=>{
                            
                        }).catch(()=>{
                            
                        })
                    } else {
                        this.$Message.error('请检测验证信息!');
                    }
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
