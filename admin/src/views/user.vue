<style lang="less">
    
</style>
<template>
    <section>
        <div style="padding:5px 0 10px;">
            <Button type="success" @click="addModal">添加管理员</Button>
        </div>

        <!--表格-->
        <Table stripe :columns="columns1" :data="dataList" :loading="loading"></Table>
        <!-- <div class="table-page">
            <Page :total="total" :current="formSearch.pageIndex" show-total @on-change="changePage"></Page>
        </div> -->

        <Modal v-model="modal1" width="450"
            @on-visible-change="modalVisibleChange"
        >
            <p slot="header" style="text-align:center">
                <span>{{modalTitle}}</span>
            </p>
            <div style="">
                <Form ref="formCustom" :model="formCustom" :rules="ruleValidate" :label-width="80">
                    <FormItem label="登录名: " prop="name">
                        <Input type="text" v-model="formCustom.loginName"></Input>
                    </FormItem>
                    <FormItem label="用户名: " prop="name">
                        <Input type="text" v-model="formCustom.name"></Input>
                    </FormItem>
                    <FormItem label="手机号: " prop="mobilePhone">
                        <Input type="text" v-model="formCustom.mobilePhone" maxlength="11"></Input>
                    </FormItem>
                    <FormItem label="密码: " prop="password">
                        <Input type="text" v-model="formCustom.password"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="default" @click="modalCancel">取消</Button>
                <Button type="success" :loading="modal_loading" @click="modalOk('formCustom')">确定</Button>
            </div>
        </Modal>

        
        <Modal v-model="modal2" width="360" >
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{modal2Status}}{{popupTitle}}</span>
            </p>
            <div style="text-align:center">
                <p>您确定要删除“{{modal2Data.name}}”这个管理员吗？</p>
            </div>
            <div slot="footer" class="flex" style="display:flex">
                <Button type="default" size="large"  @click="cancelModal2" style="width: 50%">取消</Button>
                <Button type="error" size="large"  @click="delClick" style="width: 50%" >确定</Button>
            </div>
        </Modal>

    </section>
</template>
<script>
    import Cookies from 'js-cookie';
    import mixins from '@/libs/mixins.js';
    import md5 from '@/libs/md5'
    
    export default {
        components: {
            
        },
        data () {
            return {
                popupTitle: '管理员',
                modal1: false,
                modal2: false,
                loading: false,
                modal_loading: false,
                total: 0,
                modalTitle: '',
                modal2Status : '',
                modal2Data: {},
                skuModel: '',
                skuList: [],
                columns1: [
                    {
                        title: '登录名',
                        key: 'loginName'
                    },
                    {
                        title: '用户名',
                        key: 'name'
                    },
                    {
                        title: '手机号',
                        key: 'mobilePhone'
                    },
                    {
                        title: '注册时间',
                        key: 'date'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            var ButtonType = params.row.status == 'DISABLED' ? 'warning' : 'error';
                            return h('div', [
                                // h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         size: 'small'
                                //     },
                                //     style: {
                                //         marginRight: '5px'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.editItem(params)
                                //         }
                                //     }
                                // }, '编辑'),
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal2 = true
                                            this.modal2Data = params.row
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
                    name: '',
                    loginName: '',
                    mobilePhone: '',
                    password: ''
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
                        this.requestAdmin();
                    } else {
                        this.$Message.error('请检测验证信息!');
                    }
                })
            },
            requestAdmin(){
                if(this.modal_loading) return;
                this.modal_loading = true;
                let url = this.api.addAdmin;
                let message = '添加管理员成功'
                //更新
                if(this.modalType == 2){
                    
                }

                let sendData = Object.assign({}, this.formCustom);
                sendData.password = md5(sendData.password).toLocaleUpperCase();

                url(sendData).then(d=>{
                    this.modalCancel();
                    this.$Message.success(message);
                    this.init();
                })
                .catch(e=>{
                    this.modal_loading = false;
                })
            },
            modalCancel () {
                this.modal1 = false;
                this.modal_loading = false;
            },
            //编辑 按钮
            editItem(params){
                this.modal1 = true;
                this.modalType = 2;
                this.modal_loading = false;
                this.modalTitle = '编辑'+this.popupTitle;
                var id = params.row.id;
                this.formCustom = Object.assign({}, params.row);
            },
            cancelModal2(){
                this.modal2 = false;
            },
            // 删除
            delClick(){
                this.api.delAdmin({id: this.modal2Data.id}).then(d=>{
                    this.cancelModal2();
                    this.$Message.success('删除管理员成功');
                    this.init();
                })
            },
            queryList(){
                this.loading = true;
                this.api.getAdmin(this.formSearch).then(d=>{
                    this.loading = false;
                    this.dataList = d;
                }).catch(()=>{
                    this.loading = false;
                })
            },
            // search(){
            //     this.formSearch.pageIndex = 1;
            //     this.queryList();
            // },
            changePage(d){
                this.formSearch.pageIndex = d;
                this.queryList();
            },
            modalVisibleChange(visible){
                if(!visible){
                    this.$refs['formCustom'].resetFields();
                }
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
