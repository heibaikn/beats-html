<style lang="less">
    .ivu-form-item-content, .ivu-form-item-label{
    font-size: 14px;
    }
    .msg-product-list{
        width: 300px;
        span{
            float: left;
            width: 60px;
            height: 60px;
            overflow: hidden;
            display: block;
            margin-right: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            padding: 3px;
            border-radius: 4px;
            cursor: pointer;
            img{
                width: 100%;
            }
        }
    }
</style>
<template>
    <section>
        <div style="padding:5px 0 10px;" v-if="checkAdminIdentity">
            <form action="/api/admin/customerMessage/exportCustomerMessages" target="_blank" id="exportForm" method="post">
                <input type="hidden" :value="languageStorage" name="language" >
            </form>
            <Button type="success" @click="exportMessage">导出留言</Button>
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
                    <FormItem label="姓名" prop="name">
                        <Input type="text" v-model="formCustom.name"></Input>
                    </FormItem>
                    <FormItem label="注册时间" prop="date">
                        <Input type="text" v-model="formCustom.date"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="default" @click="modalCancel">取消</Button>
                <Button type="success" :loading="modal_loading" @click="modalOk('formCustom')">确定</Button>
            </div>
        </Modal>

        
        <Modal v-model="modal2" width="360" @on-ok="enterRemoveMessage">
            <p slot="header" style="color:#f60;text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>删除</span>
            </p>
            <div style="text-align:center">
                <p>您确定要删除这条留言吗？</p>
            </div>
            <!-- <div slot="footer" class="flex">
                <Button type="default" size="large"  @click="cancelModal2" style="width: 50%">取消</Button>
                <Button type="error" size="large"  @click="enterRemoveMessage" style="width: 50%" >确定</Button>
            </div> -->
        </Modal>

        <Modal v-model="modal3" width="600">
            <p slot="header" style="text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>查看留言</span>
            </p>
            <div>
                <Form :label-width="200">
                  <FormItem label="姓名：">
                      <span>{{modal3Data.name}}</span>
                  </FormItem>
                  <FormItem label="公司：">
                      <span>{{modal3Data.company}}</span>
                  </FormItem>
                  <FormItem label="电话：">
                      <span>{{modal3Data.mobilePhone}}</span>
                  </FormItem>
                  <FormItem label="邮箱：">
                      <span>{{modal3Data.mailAddress}}</span>
                  </FormItem>
                  <FormItem label="传真：">
                      <span>{{modal3Data.fax}}</span>
                  </FormItem>
                  <FormItem label="邮码：">
                      <span>{{modal3Data.postalCode}}</span>
                  </FormItem>
                  <FormItem label="意见：">
                      <span>{{modal3Data.opinion}}</span>
                  </FormItem>
                  <FormItem label="访问网站的目的：">
                      <span>{{modal3Data.accessPurpose}}</span>
                  </FormItem>
                  <FormItem label="地址：">
                      <span>{{modal3Data.address}}</span>
                  </FormItem>
                  <FormItem label="您的目的是否已经达到：">
                      <span>{{modal3Data.purposeFlag|purposeFlag}}</span>
                  </FormItem>
                  <FormItem label="是否提交服务解决问题：">
                      <span>{{modal3Data.dealFlag}}</span>
                  </FormItem>
                  <FormItem label="请评价该文档的质量：">
                      <span>{{modal3Data.documentQuality|documentQuality}}</span>
                  </FormItem>

                  <FormItem label="浏览的产品：">
                      <div class="msg-product-list">
                        <span v-for="(item,index) in modal3Data.goodsSpus" :key="index" @click="lookProduct(item)">
                            <Tooltip placement="top" :content="item.goodsName">
                                <img :src="item.goodsImageKey" alt="" srcset="">
                            </Tooltip>
                        </span>
                      </div>
                  </FormItem>
                </Form>
            </div>
            <div slot="footer" class="flex">
                <Button type="primary" size="large"  @click="modal3=false" style="width:100%">确定</Button>
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
                languageStorage: '',
                skuList: [],
                columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '公司',
                        key: 'company'
                    },
                    {
                        title: '电话',
                        key: 'mobilePhone'
                    },
                    {
                        title: '邮箱',
                        key: 'mailAddress'
                    },
                    {
                        title: '传真',
                        key: 'fax'
                    },
                    {
                        title: '邮编',
                        key: 'postalCode'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            let btn = [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                          this.modal3Data = params.row;
                                          this.modal3 = true;
                                        }
                                    }
                                }, '查看')
                            ]
                            if(this.checkAdminIdentity){
                                btn.push(h('Button', {
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
                                }, '删除'))
                            }
                            return h('div', btn);
                        }
                    }
                ],
                dataList: [],
                supplierList: [],
                formCustom: {
                    name: '',
                    date: ''
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
        filters: {
            // 文档质量
            documentQuality(val){
                if(val == 3){
                    return '非常好'
                }
                if(val == 2){
                    return '很好'
                }
                if(val == 1){
                    return '平均'
                }
                if(val == 0){
                    return '差'
                }
            },
            // 目的是否达到
            purposeFlag(val){
                if(val == 0){
                    return '否'
                }
                if(val == 1){
                    return '是'
                }
                if(val == 2){
                    return '一部分'
                }
                if(val == 3){
                    return '仅浏览'
                }
            }
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
                this.api.getCustomerMessages(this.formSearch).then(d=>{
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
            },
            cancelModal2(){
                this.modal2 = false;
            },
            clickRemoveMessage(row){
                this.modal2Data = row;
                this.modal2 = true;
            },
            enterRemoveMessage(){
                let id = this.modal2Data.id;
                this.api.delCustomerMessages({id}).then(d=>{
                    this.queryList();
                })
            },
            search(){
                this.queryList();
            },

            exportMessage(){
                document.querySelector('#exportForm').submit();
            },

            lookProduct(item){
                if(!item.id) return;
                window.open('/detail/index.html?id=' + item.id);
            }
        },
        watch: {
            
        },
        mounted () {
            this.init();
            this.languageStorage  = localStorage.getItem('language') || 'chinese'
        },
        created () {

        }
    };
</script>
