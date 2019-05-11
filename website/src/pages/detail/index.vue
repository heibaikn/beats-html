<template>
  <div id="pages">
    <mainHeader />
    <fixedMessage />
    <section id="main-content">
      <section class="container" v-if="!isLoading && productDetail.id">

        <div class="product-content">
          <div class="product-content__images">
            <div class="main-image">
              <pic-zoom :url="detailImg" :scale="3"></pic-zoom>
            </div>
            <div class="small-list">
              <div class="item" :class="{active: currIndex == index}" @click="toggleImage(img, index)" v-for="(img, index) in imgsList" :key="index"><img :src="img" alt=""></div>
            </div>
          </div>
          <div class="product-content__info">
            <h1>{{productDetail.goodsName}}</h1>
            <div class="price-box">
              <!-- <p>价格：<del class="font">¥88</del></p> -->
              <p>{{$language.price}}: <span class="red font font-fs"><span class="tm-price">{{productDetail.lowPrice | formarPrice}}</span></span></p>
            </div>
            <div class="button-buy">
              <!-- <a href="" class="button-holder button-holder--big button-holder--red2">
                <span class="button-inner">购买</span>
                <span class="mask"></span>
              </a> -->
            </div>
          </div>
        </div>

        <div class="product-detail">
          <h3>商品详情</h3>
          <div v-html="productDetail.goodsDescription"></div>
        </div>

      </section>   

      <section class="product-detail" v-if="!isLoading && !productDetail.id">
        <h3 style="padding-top:40px">没有查询到商品信息哦</h3>
      </section>

    </section>
    <mainFooter />
  </div>
</template>

<script>
import PicZoom from '@shared/components/PicZoom'
import mainHeader from '@shared/components/header'
import mainFooter from '@shared/components/footer'
import fixedMessage from '@shared/components/fixedMessage'

import { goodsDetails, goodsSpecDetails } from '@/api'
import { getQueryString } from '@shared/utils'
import mixins from '@shared/mixins'

export default {
  name: 'headPhones',
  data(){
    return{
      currIndex: -1,
      detailImg: '',
      isLoading: true,
      productDetail: {},
      skuList: [],
      imgsList: [
        
      ]
    }
  },
  mixins: [mixins],
  components: {
    mainHeader,
    mainFooter,
    fixedMessage,
    PicZoom
  },
  computed: {
    
  },
  created(){
    document.title = this.$language.homeTitle;
    this.init()
  },
  methods: {
    init(){
      let id = getQueryString('id');
      if(id){
        this.productId = id;
        goodsDetails({id: id}).then(d=>{
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
          // this.querySkuInfo();
        })
      }
    },
    querySkuInfo(){
      if(this.skuList.length == 0) return;
      this.skuList.forEach(v=>{
        this.requestSkuInfo(v.specValueId);
      })
    },
    requestSkuInfo(specValueId){
      let data = {
        id: this.productId,
        specValueId: specValueId,
      }
      goodsSpecDetails(data).then(d=>{
        
      });
    },
    toggleImage(img, index){
      if(this.currIndex == index){
        this.currIndex = -1;
        this.detailImg = this.productDetail.goodsImageKey;
        return;
      }
      this.detailImg = img
      this.currIndex = index
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
        list = JSON.parse(localStorage.getItem('productList'));
      } catch (e){

      }
      return list;
    },
    setStorage(data){
      let list = this.getStorage();
      if(list == null){
        localStorage.setItem('productList', JSON.stringify([data]));
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
      localStorage.setItem('productList', JSON.stringify(list));
    }
  },
}
</script>

<style>

</style>
