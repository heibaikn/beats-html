<style lang="less">
.ivu-form-item-content,
.ivu-form-item-label {
  font-size: 14px;
}
.img {
  width: 200px;
}
.ivu-modal-body {
  padding-right: 40px;
}
.search {
  padding-top: 20px;
}
.search .ivu-btn {
  margin-left: -50px;
}
</style>
<template>
  <section>
    <div class="search">
      <Form
        ref="formInline"
        :model="formSearch"
        label-position="left"
        :label-width="80"
        inline
        @submit.native.prevent
      >
        <FormItem label="产品名称：">
          <Input type="text" v-model="formSearch.goodsName" placeholder="产品名称" clearable></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="searchList">搜索</Button>
        </FormItem>
      </Form>
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
      </div>-->
    </Modal>
  </section>
</template>
<script>
import Cookies from "js-cookie";
import mixins from "@/libs/mixins.js";

export default {
  components: {},
  data() {
    return {
      popupTitle: "产品",
      modal1: false,
      modal2: false,
      modal3: false,
      modal3Data: {},
      loading: false,
      modal_loading: false,
      total: 0,
      modalTitle: "",
      modal2Status: "",
      modal2Name: "",
      skuModel: "",
      categoryList: [],
      columns1: [
        {
          title: "ID",
          key: "id"
        },

        {
          title: "产品名称",
          key: "goodsName"
        },
        {
          title: "产品编号",
          key: "spuNo"
        },
        {
          title: "分类名称",
          key: "categoryName"
        },
        // {
        //     title: '产品价格',
        //     render(h, params){
        //         return h('div', `¥ ${params.row.lowPrice}元`)
        //     }
        // },
        {
          title: "产品的规格名称",
          key: "specName"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            let btn = [
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "primary"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let argu = { id: params.row.id };
                      this.$router.push({
                        name: "product_edit",
                        params: argu
                      });
                      //   this.modalTitle = '编辑'+this.popupTitle;
                      //   this.formCustom = Object.assign({}, params.row);
                      //   this.modal3 = true;
                      //   this.modalVisibleChange(false)
                    }
                  }
                },
                "编辑"
              )
            ];
            if (this.checkRemoveIdentity) {
              btn.push(
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.clickRemove(params.row, params.index);
                      }
                    }
                  },
                  "删除"
                )
              );
            }

            return h("div", btn);
          }
        }
      ],
      dataList: [],
      formCustom: {},
      formSearch: {
        id: 0,
        name: "",
        goodsName: "",
        pageIndex: 1
      },
      ruleValidate: {
        goodsName: [{ required: true, message: "产品名称不能为空" }],
        specName: [{ required: true, message: "规格名称不能为空" }],
        lowPrice: [{ required: true, message: "价格不能为空" }]
      }
    };
  },
  computed: {},
  filters: {},
  mixins: [mixins],
  methods: {
    init() {
      this.queryList();
      this.api.categories({ id: 0 }).then(d => {
        this.categoryList = d;
      });
    },
    addModal() {
      this.modal3 = true;
      this.modalTitle = "添加" + this.popupTitle;
      this.modalType = 1;
      this.formCustomInit();
    },
    queryList() {
      this.loading = true;
      this.api
        .categoryGoods(this.formSearch)
        .then(d => {
          this.loading = false;
          if (this.formSearch.pageIndex == 1) {
            this.dataList = [];
          }
          this.dataList = d.list;
          this.total = d.count;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    querySearchList() {
      this.loading = true;
      let sendData = Object.assign({}, this.formSearch);
      sendData.keyWord = this.formSearch.goodsName;

      this.api
        .goodsSearch(sendData)
        .then(d => {
          this.loading = false;
          if (this.formSearch.pageIndex == 1) {
            this.dataList = [];
          }
          this.dataList = d.list;
          this.total = d.count;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    searchList() {
      this.formSearch.id = 0;
      this.formSearch.pageIndex = 1;
      this.querySearchList();
    },
    changePage(d) {
      this.formSearch.pageIndex = d;
      this.queryList();
    },
    modalVisibleChange(visible) {
      if (!visible) {
        this.$refs["formCustom"].resetFields();
      }
      this.modal_loading = false;
    },
    formCustomInit() {
      this.formCustom = {};
    },
    cancelModal2() {
      this.modal2 = false;
    },
    clickRemove(d, index) {
      this.modal2Data = d;
      this.modal2Data.index = index;
      this.modal2 = true;
    },
    enterRemoveAjax() {
      this.api
        .deleteGoods({ id: this.modal2Data.id })
        .then(d => {
          this.dataList.splice(this.modal2Data.index, 1);
        })
        .catch(() => {});
    }
  },
  watch: {},
  mounted() {
    this.init();
  },
  created() {}
};
</script>
