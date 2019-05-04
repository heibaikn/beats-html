<style lang="less">
  @import '../styles/beats.less';
  .ivu-form-item-content, .ivu-form-item-label{
    font-size: 14px;
  }
</style>
<template>
    <section>
        <div style="padding:5px 0 10px;">
            <Button type="success" @click="addModal">添加规格</Button>
        </div>

        <!--表格-->
        <Table stripe :columns="columns1" :data="dataList" :loading="loading"></Table>
        <div class="table-page">
            <Page :total="total" :current="formSearch.pageIndex" show-total @on-change="changePage"></Page>
        </div>

        <Modal v-model="modal1" width="500" @on-visible-change="modalVisibleChange" >
            <p slot="header" style="text-align:center">
                <span>{{modalTitle}}</span>
            </p>
            <div class="form-body">
                <Form ref="formCustom" :model="formCustom" :rules="ruleValidate" :label-width="100">
                  <FormItem label="规格名称：" prop="specName">
                      <Input type="text" v-model="formCustom.specName"></Input>
                  </FormItem>
                  <FormItem label="规格值：" prop="specValue">
                      <Input type="text" v-model="formCustom.specValue"></Input>
                      <div style="font-size:12px;padding-top:10px">
                            <span>如果是颜色请选择：</span>
                            <ColorPicker v-model="color"  @on-change="changeColor"/>
                      </div>
                  </FormItem>
                  <FormItem label="规格描述：" prop="specDescription">
                      <Input type="textarea" v-model="formCustom.specDescription"></Input>
                  </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="default" @click="modalCancel">取消</Button>
                <Button type="success" :loading="modal_loading" @click="modalOk">确定</Button>
            </div>
        </Modal>

        
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
                popupTitle: '规格',
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
                skuList: [],
                modalType: 1,
                columns1: [
                    {
                        title: '规格名称',
                        key: 'specName'
                    },
                    {
                        title: '规格值',
                        key: 'specValue',
                        render: (h, params) => {
                            let val =  params.row.specValue
                            let isColor = /^#[a-z0-9A-Z]{6}/.test(params.row.specValue); 
                            let array = [];
                            if(isColor){
                                val = {
                                    style: {
                                        width: '12px',
                                        height: '12px',
                                        display: 'inline-block',
                                        marginLeft: '10px',
                                        borderRadius: '50%',
                                        background: params.row.specValue
                                    },
                                }
                                array.push(h('span', params.row.specValue))
                            }

                            array.push(h('span', val));

                            return h('div', array);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            var btn = [ h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                          this.formCustom = Object.assign({}, params.row);
                                          delete this.formCustom.translation;
                                          this.modalTitle = '编辑'+this.popupTitle;
                                          this.modal1 = true;
                                          this.modalType  = 2;
                                        }
                                    }
                                }, '编辑'),
                            ]
                            if(this.checkRemoveIdentity){
                                btn.push(h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                          this.clickRemoveMessage(params)
                                        }
                                    }
                                }, '删除'))
                            }
                            
                            return h('div', btn);
                        }
                    }
                ],
                dataList: [],
                supplierList: [],
                formCustom: { },
                formSearch:{
                    name: '',
                    pageIndex: 1,
                },
                ruleValidate: { 
                  specName: [{ required: true, message: '规格名称不能为空' }],
                  specValue: [{ required: true, message: '规格值不能为空' }],
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
            },
            addModal(){
                this.modal1 = true;
                this.modalTitle = '添加'+this.popupTitle;
                this.modalType  = 1;
            },
            modalOk (name) {
                this.$refs['formCustom'].validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        //添加
                        if(this.modalType == 1){
                            this.requestAddSKU()
                        }
                        //更新
                        else if(this.modalType == 2){
                            this.updateSpecInfo();
                        }
                    } else {
                        this.$Message.error('请检测验证信息!');
                    }
                })
            },
            modalCancel () {
                this.modal1 = false;
                this.modal_loading = false;
            },
            queryList(){
                this.loading = true;
                this.api.getSpecInfoList(this.formSearch).then(d=>{
                    this.loading = false;
                    if(this.formSearch.pageIndex == 1){
                        this.dataList = [];
                    }   
                    this.dataList = d.list || [];
                    this.total = d.count;
                }).catch(()=>{
                    this.loading = false;
                })
            },
            search(){
                this.formSearch.pageIndex = 1;
                this.queryList();
            },
            changePage(d){
                this.formSearch.pageIndex = d;
                this.queryList();
            },
            modalVisibleChange(visible){
                if(!visible){
                  this.$refs['formCustom'].resetFields();
                }
                this.color = '';
                this.color2 = '';
            },
            cancelModal2(){
                this.modal2 = false;
            },
            clickRemoveMessage(data){
              this.modal2Data = data;
              this.modal2 = true;
            },
            enterRemove(){
              var index = this.modal2Data.index;
              this.api.deleteSpecInfo({id: this.modal2Data.id}).then(d=>{
                this.dataList.splice(index,  1);
              })
            },
            search(){
              this.queryList();
            },
            requestAddSKU(){
              let data = this.modalType == 1 ? this.getFormData() : this.formCustom;
              this.api.addSpecInfo(data).then(d=>{
                this.modal_loading = false;
                this.$Message.success('添加规格成功!');
                this.modal1 = false;
                this.queryList();
              }).catch(()=>{
                this.modal_loading = false;
              });
            },

            updateSpecInfo(){
                console.log(this.formCustom)
                this.api.updateSpecInfo(this.formCustom).then(d=>{
                    this.modal_loading = false;
                    this.$Message.success('更新规格成功!');
                    this.modal1 = false;
                }).catch(()=>{
                    this.modal_loading = false;
                });
            },

            changeColor(e){
                this.formCustom.specValue = e;
            },
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
