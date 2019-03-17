<style lang="less">
    
</style>
<template>
    <section>

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

        
        <Modal v-model="modal2" width="360" >
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{modal2Status}}{{popupTitle}}</span>
            </p>
            <div style="text-align:center">
                <p>您将要{{modal2Status}} “{{ modal2Name }}” 这个{{popupTitle}}</p>
                <p>确定吗?</p>
            </div>
            <div slot="footer" class="flex">
                <Button type="default" size="large"  @click="cancelModal2" style="width: 50%">取消</Button>
                <Button type="error" size="large"  @click="delClick" style="width: 50%" >确定</Button>
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
                        title: '用户名',
                        key: 'name'
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
                                            this.editItem(params)
                                        }
                                    }
                                }, '编辑'),
                            ]);
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
            //编辑 按钮
            editItem(params){
                this.modal1 = true;
                this.modalType = 2;
                this.modal_loading = false;
                this.modalTitle = '编辑'+this.popupTitle;
                var id = params.row.id;
                this.formCustom = Object.assign({}, params.row);
                // this.api.queryOneSystem(id).then(d=>{
                //     d = d.data;
                //     util.extend(this.formCustom, d.data);
                // })
            },
            cancelModal2(){
                this.modal2 = false;
            },
            delClick(){
                //禁用
                if (this.modal2SType == 1) {
                    this.api.delProductType(this.modal2Id).then(d => {
                        d = d.data;
                        if (d.code == 200) {
                            this.$Message.success('禁用'+this.popupTitle+'成功');
                            this.cancelModal2();
                            this.init();
                        }
                        else {
                            this.$Message.error(d.message);
                        }
                    })
                }
                else{
                    //启用
                    this.modal2Data.status = 'ENABLED';
                    this.api.putProductType(this.modal2Data).then(d => {
                        this.modal_loading = false;
                        this.cancelModal2();
                        d = d.data;
                        if (d.code == 200) {
                            this.$Message.success('启用'+this.popupTitle+'成功');
                        }
                        else {
                            this.$Message.error(d.message);
                        }
                    })
                }
            },
            queryList(){
                this.loading = true;
                this.api.getUserInfo(this.formSearch).then(d=>{
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
            changeNumber(key){
                var value = this.formCustom[key];
                value = value.replace(/[^\d]/g,'');
                this.formCustom[key] = value;
            },
            changePriceNumber(key){
                var value = this.formCustom[key];
                value = value.replace(/[^\d\.]/g,'');
                this.formCustom[key] = value;
            },
            search(){
                this.queryList();
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
