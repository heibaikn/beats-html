<template>
  <div id="pages">
    <mainHeader />
    <fixedMessage />
    
    <section id="main-content" class="container">
      <div class="category">
        <span class="label">{{$language.category}}: </span>
        <div class="category-list">
          <div class="item" :class="{active: currIndex == index}" v-for="(item,index) in categoryList" :key="index" @click="clickCategory(item,index)">
            {{item.categoryName}}
          </div>
        </div>
      </div>

      <div class="product">
        <div class="product-list">
          <div class="loading" v-show="isLoading">{{$language.loading}}...</div>

          <div class="empty" v-show="!isLoading && productList.length == 0">{{$language.cateNotGoods}}~</div>

          <div class="product-box" v-show="!isLoading" v-for="(item,index) in productList" :key="index">
            <div class="product-box__img">
              <a :href="toHref(item)"><img :src="item.goodsImageKey" alt=""></a>
            </div>
            <div class="product-box__content">
              <h2>{{item.goodsName}}</h2>
              <div class="desc" v-html="item.goodsDescription"></div>
              <!-- <ul class="bullets">
                <li>采用Apple W1 芯片，实现1 类无线蓝牙®连接，提升电池能效 </li>
                <li>Beats Pure ANC (完全自适应消噪) 主动阻隔外界噪音 </li>
                <li>Beats Pure ANC (完全自适应消噪) 主动阻隔外界噪音 </li>
                <li>采用Fast Fuel 技术，在电量不足时，充电10 分钟即可持续播放3 小时</li>
              </ul> -->
              <div class="price">{{item.lowPrice | price}}</div>
              <div class="buttons">
                <!-- <a href="" class="button-holder  button-holder--black">
                  <span class="button-inner">探索</span>
                  <span class="mask"></span>
                </a> -->
                <a :href="toHref(item)" target="_blank" class="button-holder button-holder--red2" >
                  <span class="button-inner">{{$language.explore}}</span>
                  <span class="mask"></span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <mainFooter />
  </div>
</template>

<script>
import mainHeader from '@shared/components/header'
import mainFooter from '@shared/components/footer'
import banner from '@shared/components/banner'
import fixedMessage from '@shared/components/fixedMessage'
import mixins from '@shared/mixins'

import { categories, categoryGoods } from '@/api'
import { getQueryString } from '@shared/utils'

export default {
  name: 'about',
  data(){
    return{
      currIndex: 0,
      cid: 0,
      content: '',
      keyword: '',
      categoryList: [],
      productList: [],
      isLoading: false,
      searchParams: {
        id: '',
        pageIndex: 1,
        pageMaxSize: 10
      }
    }
  },
  mixins: [mixins],
  components: {
    mainHeader,
    mainFooter,
    fixedMessage,
    banner
  },
  computed: {
    
  },
  created(){
    document.title = this.$language.productListTitle;
    this.cid = getQueryString('cid');
    this.init()
  },
  methods: {
    init(){
      categories({id: 0}).then(d=>{
        d = d.data;
        if(d && d.length > 0){
          this.categoryList = d;
          if(this.cid){
            let findParamsCid = this.categoryList.findIndex(item=>{
              return item.id == this.cid
            })
            if(findParamsCid > -1){
              this.currIndex = findParamsCid;
            }
          }
          this.queryCategoryGoods();
        }
      })
    },
    toHref(item){
      if(item.id){
        return  '/detail/index.html?id=' + item.id; 
      }
      return '/productList/index.html'
    },
    queryCategoryGoods(){
      this.isLoading = true;
      this.searchParams.id = this.categoryList[this.currIndex].id;
      categoryGoods(this.searchParams).then(d=>{
        d = d.data;
        this.isLoading = false;
        if(d && d.list){
          this.productList = d.list;
        }
      })
      .catch(()=>{
        this.isLoading = false;
      })
    },
    clickCategory(item,index){
      this.productList = [];
      this.currIndex = index;
      this.queryCategoryGoods();
    },
  },
}
</script>

<style>

</style>
