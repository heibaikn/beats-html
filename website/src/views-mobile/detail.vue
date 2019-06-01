<template>
  <section class="body-padding-top">
    <header-back :content="productDetail.goodsName"/>
    <banner :images="imgsList"/>
    
    
    <section class="product-detail">
      <div class="title">{{$language.commodityDetails}}</div>
      <div class="product-detail-content" v-html="productDetail.goodsDescription"></div>
    </section>
  </section>
</template>

<script>
import banner from '@shared/components/banner-mobile'
import headerBack from '@shared/components/header-back'
import mixins from '@shared/mixins/mobile'
export default {  
  data(){
    return {
      productDetail: {},
      detailImg: '',
      skuList: [],
      imgsList: [],
    }
  },
  mixins: [mixins],
  components: {
    banner,
    headerBack
  },
  created() {
    let id = this.$route.query.id;
    this.id = id;
    if(id){
      this.requestProduct();
    }
  },
  methods: {
    requestProduct(){
      this.$api.goodsDetails({ id: this.id }).then(d=>{
        this.isLoading = false;
        d = d.data;
        if(d && d.list){
          this.productDetail = d.list[0];
          this.detailImg = this.productDetail.goodsImageKey;
          d.list.forEach(v=>{
            this.skuList.push({specValue: v.specValue, specName: v.specName, goodsSkuImageKey: v.goodsSkuImageKey});
            this.imgsList.push(v.goodsSkuImageKey);
          })
          this.storageProduct();
        }
      })
    },
    storageProduct(){
      var product = this.productDetail;
      if(!product.id) return;
      var data = {id: product.id, goodsName: product.goodsName, goodsImageKey: product.goodsImageKey};
      this.setStorage(data);
    },
    getStorage(){
      let list = null;
      try{
        let language = localStorage.getItem('language') || 'chinese';
        list = JSON.parse(localStorage.getItem('productList_' + language));
      } catch (e){

      }
      return list;
    },
    setStorage(data){
      let list = this.getStorage();
      let language = localStorage.getItem('language') || 'chinese';
      if(list == null){
        localStorage.setItem('productList_' + language, JSON.stringify([data]));
        return;
      }

      let isFind = list.find(item=>{
        return item.id == data.id
      });
      if(isFind) return;

      if(list.length > 9){
        list.splice(0, 1);
      }
      list.push(data);
      localStorage.setItem('productList_' + language , JSON.stringify(list));
    }
  },
}
</script>


<style lang="less" scoped>

</style>