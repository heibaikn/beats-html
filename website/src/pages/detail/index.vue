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
            <h1>BeatsX 入耳式耳机 - 丝缎银</h1>
            <div class="price-box">
              <p>价格：<del class="font">¥88</del></p>
              <p>促销价：<span class="red font font-fs">¥<span class="tm-price">119.00</span></span></p>
            </div>
            <div class="button-buy">
              <a href="" class="button-holder button-holder--big button-holder--red2">
                <span class="button-inner">购买</span>
                <span class="mask"></span>
              </a>
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

import { getUserInfo } from '@/api'
import detailImg from '../../assets/detail-img.png'
import detailImg3 from '../../assets/img3.png'

export default {
  name: 'headPhones',
  data(){
    return{
      currIndex: 0,
      detailImg: '',
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

    this.detailImg = this.imgsList[0]
    // getUserInfo().then(d=>{
    //   console.log(d)
    // })
  },
  methods: {
    toggleImage(img, index){
      this.detailImg = img
      this.currIndex = index
    }
  },
}
</script>

<style>

</style>
