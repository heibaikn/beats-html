<style lang="less">
  .ivu-form-item-content, .ivu-form-item-label{
    font-size: 14px;
  }
</style>
<template>
    <section>
        <div style="padding:5px 0 10px;">
            <Button type="success" @click="addModal">添加分类</Button>
        </div>

        <!--表格-->
        <Table stripe :columns="columns1" :data="dataList" :loading="loading"></Table>

        <Modal v-model="modal1" width="450"
            @on-visible-change="modalVisibleChange"
        >
            <p slot="header" style="text-align:center">
                <span>{{modalTitle}}</span>
            </p>
            <div style="">
                <Form ref="formCustom" :model="formCustom" :rules="ruleValidate" :label-width="80">
                    <FormItem label="分类名称" prop="categoryName">
                        <Input type="text" v-model="formCustom.categoryName"></Input>
                    </FormItem>
                    <FormItem label="分类描述" prop="categoryDescription">
                        <Input type="text" v-model="formCustom.categoryDescription"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="default" @click="modalCancel">取消</Button>
                <Button type="success" :loading="modal_loading" @click="modalOk('formCustom')">确定</Button>
            </div>
        </Modal>

        
        <Modal v-model="modal2" width="360" @on-ok="enterRemoveAjax">
            <p slot="header" style="color:#f60;text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>删除</span>
            </p>
            <div style="text-align:center">
                <p>您确定要删除这个分类吗？</p>
            </div>
            <!-- <div slot="footer" class="flex">
                <Button type="default" size="large"  @click="cancelModal2" style="width: 50%">取消</Button>
                <Button type="error" size="large"  @click="enterRemoveAjax" style="width: 50%" >确定</Button>
            </div> -->
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
                popupTitle: '',
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
                columns1: [
                    {
                        title: 'ID',
                        width: 100,
                        key: 'id'
                    },
                    {
                        title: '分类名称',
                        key: 'categoryName'
                    },
                    {
                        title: '分类描述',
                        key: 'categoryDescription'
                    },
                    {
                        title: '是否有可以展开的子分类',
                        key: 'isOpen',
                        render: (h, params) => {
                            return h('div', params.row.isOpen ? '是' : '否');
                        }
                    },
                    {
                        title: '父级分类id',
                        key: 'parentId'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            var ButtonType = params.row.status == 'DISABLED' ? 'warning' : 'error';
                            return h('div', [
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                          this.clickRemoveMessage(params.row)
                                        }
                                    }
                                }, '删除'),
                            ]);
                        }
                    }
                ],
                dataList: [],
                supplierList: [],
                formCustom: {
                    categoryName: '',
                    categoryDescription: ''
                },
                formSearch:{
                    id: 0,
                    name: '',
                    pageIndex: 1,
                },
                ruleValidate: { }
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
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.requestAddCate()
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
                this.api.categories(this.formSearch).then(d=>{
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
            modalVisibleChange(visible){
                if(!visible){
                    this.$refs['formCustom'].resetFields();
                }
            },
            cancelModal2(){
                this.modal2 = false
                this.modal2Data = {}
            },
            clickRemoveMessage(row){
              this.modal2 = true;
              this.modal2Data = row;
            },
            requestAddCate(){
                if(this.modal_loading) return;
                this.modal_loading = true;
                let url = this.api.addCategory;
                let message = '添加分类成功'
                //更新
                if(this.modalType == 2){
                    
                }
                url(this.formCustom).then(d=>{
                    this.modalCancel();
                    this.$Message.success(message);
                    this.init();
                })
                .catch(e=>{
                    this.modal_loading = false;
                })
            },
            enterRemoveAjax(){
              this.api.deleteCategory({id: this.modal2Data.id}).then(d=>{
                  this.cancelModal2()
                  this.init()
              })
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
