<template>
  <div id="pages">
    <mainHeader />
    <section id="main-content">
      <section class="container">

        <div class="product-content">
          <div class="product-content__images">
            <div class="main-image">
              <img src="../../assets/detail-img.png" alt="">
            </div>
            <div class="small-list">
              <div class="item"><img src="../../assets/detail-img.png" alt=""></div>
              <div class="item"><img src="../../assets/detail-img.png" alt=""></div>
              <div class="item"><img src="../../assets/detail-img.png" alt=""></div>
            </div>
          </div>
          <div class="product-content__info">
            <h1>BeatsX 入耳式耳机 - 丝缎银</h1>
            <!-- <p class="price">RMB 899</p> -->
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
import mainHeader from '@shared/components/header'
import mainFooter from '@shared/components/footer'
import { getUserInfo } from '@/api'
import pageBanner from '../../assets/page-img.jpg'

export default {
  name: 'headPhones',
  data(){
    return{
      
    }
  },
  components: {
    mainHeader,
    mainFooter
  },
  computed: {
    
  },
  created(){
    getUserInfo().then(d=>{
      console.log(d)
    })
  },
  methods: {
    
  },
}
</script>

<style>

</style>
