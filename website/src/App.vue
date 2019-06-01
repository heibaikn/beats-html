<template>
  <div id="app">
    <mainHeader />
    <fixedMessage />

    <banner />

    <!-- <section class="banner">
      <img src="./assets/banner1.jpg" alt="" />
      <div class="banner-inner">
        <div class="container">
          <div class="banner-inner__content">
            <h4>NBA COLLECTION</h4>  
            <h3>霸气登场</h3>
            <p>戴上 Beats NBA Collection，盡情享受音樂並熱情支持你所愛的球隊。</p>
            <div class="banner-inner__content__button">
              <a href="" class="button-holder button-holder--black"><span class="button-inner">探索</span> <span class="mask"></span></a>
              <a href="" class="button-holder button-holder--red"><span class="button-inner">购买</span> <span class="mask"></span></a>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    
    <section class="section-home">
      <section class="container">
        <h2 class="title">{{$language.featuredProducts}}</h2>
        <div class="product-list">

          <div class="item-wrapper" v-for="(item, index) in recommendList" :key="index">
            <div class="item">
              <div class="item-content">
                <div class="product-photos">
                  <a :href="setProductHref(item.id)"><img :src="item.goodsImageKey" alt="" /></a>
                </div>
                <div class="product-details">
                  <b class="name">{{item.goodsName}}</b>
                </div>
                <div class="product-btn">
                  <a :href="setProductHref(item.id)" class="button-holder button-holder--red2"><span class="button-inner">{{$language.explore}}</span><span class="mask"></span></a>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="product-group" :class="productListClass(index)" v-for="(item, index) in productList" :key="index">
          <div class="product-group__image">
            <a :href="setProductHref(item.id)"><img :src="item.goodsImageKey" alt="" /></a>
          </div>
          <div class="product-group__info">
            <!-- <h4>隆重介绍：</h4> -->
            <h3>{{item.goodsName}}</h3>
            <!-- <p>全新 Beats by Dr. Dre / sacai Collection，彰显你的独特风格和声音</p> -->
            <a :href="setProductHref(item.id)" class="button-holder"><span class="button-inner">{{$language.explore}}</span> <span class="mask"></span></a>
          </div>
        </div>

        <!-- <div class="product-group product-group-left">
          <div class="product-group__image">
            <img src="./assets/img2.jpg" alt="">
          </div>
          <div class="product-group__info">
            <h4>隆重介绍：</h4>
            <h3>Beats / sacai Collection</h3>
            <p>全新 Beats by Dr. Dre / sacai Collection，彰显你的独特风格和声音</p>
            <a href="" class="button-holder"><span class="button-inner">探索</span> <span class="mask"></span></a>
          </div>
        </div> -->

      </section>
    </section>

    <mainFooter />
  </div>
</template>

<script>
import mainHeader from '@shared/components/header'
import mainFooter from '@shared/components/footer'
import banner from '@shared/components/banner'
import fixedMessage from '@shared/components/fixedMessage'
import { categoryGoods } from '@/api'

export default {
  name: 'Home',
  data(){
    return {
      recommendList: [],
      productList: [],
    }
  },
  components: {
    banner,
    mainHeader,
    mainFooter,
    fixedMessage,
  },
  created(){
    document.title = this.$language.homeTitle;
    this.requestProduct();
  },
  computed: {
    
  },
  methods: {
    requestProduct(){
      categoryGoods({id: 0, pageIndex: 1}).then(data=>{
        data = data.data;
        let list = data && data.list;
        if(list && list.length > 0){
          this.recommendList = list.splice(0, 3);
          this.productList = list;
        }
      });
    },
    productListClass(index){
      return index % 2 !== 0 ? 'product-group-left' : ''
    },
    setProductHref(id){
      return '/detail/index.html?id='+id;
    },
  },
}
</script>

<style>

</style>
