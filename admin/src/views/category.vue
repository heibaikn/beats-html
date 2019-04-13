<style lang="less">
  .ivu-form-item-content, .ivu-form-item-label{
    font-size: 14px;
  }
  @import url(../styles/beats.less);
</style>
<template>
    <section>
        <div style="padding:5px 0 10px;">
            <Button type="success" @click="handleCateModal">添加一级分类</Button>
        </div>

        <div class="beats-table">
            <div class="table-list-flex table-list-header">
                <div class="table-item">
                    <div class="item item1">ID</div>
                    <div class="item item2">分类名称</div>
                    <div class="item item3">分类描述</div>
                    <div class="item item4">操作</div>
                </div>
            </div>
            <div class="table-list-flex" v-for="(item,index) in dataList" :key="index">
                <div class="table-item">
                    <div class="item item1"><i class="iconfont iconjiantou_liebiaozhankai"></i>{{item.id}}</div>
                    <div class="item item2">{{item.categoryName}}</div>
                    <div class="item item3">{{item.categoryDescription}}</div>
                    <div class="item item4">
                        <Button type="primary" size="small" @click="handleCateModal(item, item.id)">添加分类</Button>
                        <Button type="info" size="small" @click="handleCateModal(item, 'edit')">编辑</Button>
                        <Button type="warning" size="small" @click="clickRemoveModal(item, index)">删除</Button>
                    </div>
                </div>
                <div class="table-child" v-if="item.children" v-for="(citem,cindex) in item.children" :key="cindex">
                    <div class="table-item">
                        <div class="item item1">{{citem.id}}</div>
                        <div class="item item2">{{citem.categoryName}}</div>
                        <div class="item item3">{{citem.categoryDescription}}</div>
                        <div class="item item4">
                            <Button type="info" size="small" @click="handleCateModal(citem, 'edit')">编辑</Button>
                            <Button type="warning" size="small" @click="clickRemoveModal(citem, index, cindex)">删除</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal v-model="modal1" width="550"
            @on-visible-change="modalVisibleChange"
        >
            <p slot="header" style="text-align:center">
                <span>{{modalTitle}}</span>
            </p>
            <div style="">
                <Form ref="formCustom" :model="formCustom" :rules="ruleValidate" :label-width="120">
                    <FormItem label="分类ID：" prop="id" v-show="formCustom.id">
                        <span>{{formCustom.id}}</span>
                    </FormItem>
                    <FormItem label="父级ID：" prop="parentId" v-show="formCustom.parentId">
                        <span>{{formCustom.parentId}}</span>
                    </FormItem>
                    <FormItem label="分类名称：" prop="categoryName" :class="{'form-my-label': modalType == 1}">
                        <div class="form-item-lanaguage">
                            <div class="item"><span v-show="modalType==1">中文: </span><Input type="text" v-model="formCustom.categoryName"></Input></div> 
                            <div class="item" v-show="modalType==1"><span>Englisth: </span><Input type="text" v-model="formEnglist.categoryName"></Input></div> 
                        </div>
                    </FormItem>
                    <FormItem label="分类描述：" prop="categoryDescription">
                        <div class="form-item-lanaguage">
                            <div class="item"><Input type="text" v-model="formCustom.categoryDescription"></Input></div> 
                            <div class="item" v-show="modalType==1"><Input type="text" v-model="formEnglist.categoryDescription"></Input></div> 
                        </div>
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
                dataList: [],
                supplierList: [],
                modalType: 1,
                formCustom: {
                    parentId: 0,
                    categoryName: '',
                    categoryDescription: ''
                },
                formEnglist: {
                    parentId: 0,
                    categoryName: '',
                    categoryDescription: ''
                },
                formSearch:{
                    id: 0,
                    name: '',
                    pageIndex: 1,
                },
                filterKey: ['id', 'parentId'],
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
            handleCateModal(item, pid){
                this.modal1 = true;
                if(pid == 'edit'){
                    this.modalTitle = '编辑' + this.popupTitle;
                    this.modalType  = 2;
                }
                else{  
                    this.popupTitle =  pid ? '子分类' : '分类';
                    this.modalTitle = '添加' + this.popupTitle;
                    this.modalType  = 1;
                }
                
                if(pid && pid != 'edit'){
                    this.formCustom.parentId = pid;
                }
                else if(item){
                    Object.assign(this.formCustom, item);
                }
                else{
                    this.initData()
                }
            },
            modalOk (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.requestAddCate();
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
                    this.dataList = this.getArrayGroup(d.list)
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
            clickRemoveModal(item, index, pindex){
              this.modal2 = true;
              this.modal2Data = item;
            },
            requestAddCate(pid){
                if(this.modal_loading) return;
                this.modal_loading = true;
                let url = this.api.addCategory;
                let message = '添加分类成功'
                //更新
                if(this.modalType == 2){
                    url = this.api.editCategory;
                }
                if(pid){
                    this.formCustom.parentId = pid;
                }
                let data = this.modalType == 1 ? this.getFormData() : Object.assign({}, this.formCustom);
                url(data).then(d=>{
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
                  this.cancelModal2();
                  this.init()
              })
            },

            initData(){
                this.formCustom =  {
                    categoryName: '',
                    categoryDescription: ''
                }
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
