<template>
  <section>
      <Table stripe :columns="columns1" :data="dataList" :loading="loading"></Table>
      <!-- <div class="table-page">
          <Page :total="total" :current="formSearch.pageIndex" show-total @on-change="changePage"></Page>
      </div> -->
      
      <Modal v-model="modal2" width="360" @on-ok="enterRemoveAjax">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除</span>
          </p>
          <div style="text-align:center">
              <p>您确定要删除这个人才招聘吗？</p>
          </div>
      </Modal>
  </section>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'

export default {
	name: 'job',
	data () {
		return {
      loading: false,
      modal2: false,
      dataList: [],
      modal2Data: {},
			columns1: [
        {
            title: 'ID',
            key: 'id',
            width: 60,
        },
        {
            title: '招聘标题',
            key: 'title'
        },
        {
            title: '添加时间',
            key: 'createDate',
            width: 400
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
                                let argu = { id: params.row.id };
                                this.$router.push({
                                    name: 'job_edit',
                                    params: argu
                                });
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
      formSearch:{
        name: '',
        pageIndex: 1,
      },
		}
  },
  components: { 
    VueUeditorWrap 
  },
	computed: {
		
	},
	mounted(){
		this.init()
	},
	methods: {
		init(){
      this.queryList();
    },
    queryList(){
      this.loading = true;
      this.api.getRecruitmentInfos(this.formSearch).then(res=>{
          this.loading = false;
          this.dataList = res;
      }).catch(()=>{
          this.loading = false;
      })
    },
    clickRemove(d, index){
      this.modal2Data = d;
      this.modal2Data.index = index;
      this.modal2 = true;
    },
    enterRemoveAjax(){
      this.api.delRecruitmentInfo({id: this.modal2Data.id}).then(d=>{
          this.dataList.splice(this.modal2Data.index, 1);
      }).catch(()=>{
          
      })
    },
	},
	
}
</script>

<style scoped>
.buttons{
  padding: 30px 30px;
}
</style>
