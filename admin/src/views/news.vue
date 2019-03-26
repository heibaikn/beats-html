<style lang="less">
  .ivu-form-item-content, .ivu-form-item-label{
    font-size: 14px;
  }
  .img{
    width: 200px;
  }
</style>
<template>
    <section>
        <div style="padding:5px 0 10px;">
            <Button type="success" @click="addModal">添加新闻</Button>
        </div>

        <!--表格-->
        <Table stripe :columns="columns1" :data="dataList" :loading="loading"></Table>
        <div class="table-page">
            <Page :total="total" :current="formSearch.pageIndex" show-total @on-change="changePage"></Page>
        </div>

        <Modal v-model="modal1" width="450"
            @on-visible-change="modalVisibleChange"
        >
            <p slot="header" style="text-align:center">
                <span>{{modalTitle}}</span>
            </p>
            <div style="">
                <Form ref="formCustom" :model="formCustom" :rules="ruleValidate" :label-width="80">
                    <FormItem label="新闻标题" prop="title">
                        <Input type="text" v-model="formCustom.title"></Input>
                    </FormItem>
                    <FormItem label="新闻内容" prop="content">
                        <Input type="textarea" v-model="formCustom.content"></Input>
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
                <p>您确定要删除这个新闻吗？</p>
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
                popupTitle: '新闻',
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
                        key: 'id',
                        width: 60,
                    },
                    {
                        title: '新闻标题',
                        key: 'title'
                    },
                    {
                        title: '新闻内容',
                        key: 'content'
                    },
                    {
                        title: '添加时间',
                        key: 'createDate',
                        width: 200
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
                                          this.clickRemove(params.row, params.index)
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
                    title: '',
                    content: ''
                },
                formSearch:{
                    name: '',
                    pageIndex: 1,
                },
                ruleValidate: { }
            };
        },
        computed: {
           
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
                        this.modal_loading = true;
                        //添加
                        if(this.modalType == 1){
                            this.addItemRequest()
                        }
                        //更新
                        else if(this.modalType == 2){
                            
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
                this.api.getNewsInfos(this.formSearch).then(d=>{
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
            addItemRequest(){
                this.modal_loading = true;
                this.api.addNewsInfo(this.formSearch).then(d=>{
                    this.modal_loading = false;
                }).catch(()=>{
                    this.modal_loading = false;
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
