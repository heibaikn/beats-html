<template>
  <div id="pages">
    <mainHeader />
    <fixedMessage />
    <section id="main-content">
      <section class="container">

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
              <p>{{$language.price}}: <span class="red font font-fs">¥<span class="tm-price">{{productDetail.lowPrice | formarPrice}}</span></span></p>
            </div>
            <div class="button-buy">
              <!-- <a href="" class="button-holder button-holder--big button-holder--red2">
                <span class="button-inner">购买</span>
                <span class="mask"></span>
              </a> -->
            </div>
          </div>
        </div>

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

import detailImg from '../../assets/detail-img.png'
import detailImg3 from '../../assets/img3.png'

import { goodsDetails, goodsSpecDetails } from '@/api'
import { getQueryString } from '@shared/utils'

export default {
  name: 'headPhones',
  data(){
    return{
      currIndex: 0,
      detailImg: '',
      productDetail: {},
      skuList: [],
      imgsList: [
        detailImg,
        detailImg3
      ]
    }
  },
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
    this.detailImg = this.imgsList[0];
    this.init()
  },
  methods: {
    init(){
      let id = getQueryString('id');
      if(id){
        this.productId = id;
        goodsDetails({id: id}).then(d=>{
          d = d.data;
          if(d && d.list){
            this.productDetail = d.list[0];
            d.list.forEach(v=>{
              this.skuList.push({specValueId: v.specValueId, specId: v.specId});
            })
          }
          this.querySkuInfo();
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
      this.detailImg = img
      this.currIndex = index
    }
  },
}
</script>

<style>

</style>
