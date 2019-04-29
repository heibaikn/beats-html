<template>
  <header id="header">
    <section class="container">
      <div class="logo">
       <a href="/"><img src="/static/logo.png" alt="" class="mainlogo" width="50"></a>
      </div>
      <nav>
        <ul>
          <li class="hover "><a href="/index.html">{{$language.home}}</a></li>
          <li class="hover active"><a href="/about/index.html">{{$language.about}}</a></li>
          <li class="hover"><a href="/news/index.html">{{$language.news}}</a></li>
          <li class="">
            <a
            @mouseover="MenuHover(0)" 
            @mouseout="MenuHoverOut(0)" 
            href="/productList/index.html">{{$language.products}} 
              <i :class="{ 'arrow-active' : menuStatus}" class="iconfont iconjiantou_liebiaozhankai"></i>
            </a>
          </li>
          <li class="hover"><a href="/job/index.html">{{$language.job}}</a> </li>
          <li class="hover"><a href="/feedback/index.html">{{$language.feedback}}</a></li>
          <li class="hover"><a href="/contact/index.html">{{$language.contact}}</a></li>
          <!-- <li class="last"><a><i class="iconfont iconcaidan"></i></a></li> -->
        </ul> 
        <div class="nav-right">
          <div class="menu">{{currLanguage}}</div>
          <div class="language-list">
            <div class="list" v-for="(lan,index) in languageList" :key="index" @click="selectLanguage(lan)">{{lan.label}}</div>
          </div>
        </div>
      </nav>
      <div class="right-icon flex-center" @click="clickSearchIcon">
        <i class="iconfont iconicon_search"></i>
      </div>
    </section>
    <transition name="fade">
    <section class="header-mask" v-show="menuStatus">
      <div class="header-mask__body"
          @mouseover="MenuContentHover(0)" 
          @mouseout="MenuContentHoverOut(0)" 
          :class="{ 'animate-fade-active' : menuStatus}">
        <div class="container">
          <div class="header-mask__body__browse flex-center">
            <div class="animate-fade animate-fade1">
              <h2>{{$language.browse}}: </h2>
              <ul>
                <li v-for="(item, index) in cateList" :key="index"><a :href="setCateHref(item.id)">{{item.categoryName}}</a></li>
              </ul>
              <div class="button-holder">
                <a href="/productList/index.html">
                <span class="button-inner">{{$language.browseAll}}</span>
                <span class="mask"></span>
                </a>
              </div>
            </div>
          </div>
          <div class="header-mask__body__group">
            <div class="image-wrapper main-img animate-fade animate-fade2" v-if="productList[0]">
              <a :href="setProductHref(productList[0].id)"><img :src="productList[0].goodsImageKey" alt=""></a>
              <p>{{productList[0].goodsName}}</p>
            </div>
            <div class="image-wrapper animate-fade animate-fade3" v-if="productList[1]">
              <div class="image__content">
                <a :href="setProductHref(productList[1].id)"><img :src="productList[1].goodsImageKey" alt=""></a>
                <span>{{productList[1].goodsName}}</span>
              </div> 
            </div>
            <div class="image-wrapper animate-fade animate-fade4" v-if="productList[2]">
              <div class="image__content">
                <a :href="setProductHref(productList[2].id)"><img :src="productList[2].goodsImageKey" alt=""></a>
                <span>{{productList[2].goodsName}}</span>
              </div> 
            </div>
            <div class="image-wrapper animate-fade animate-fade5" v-if="productList[3]">
              <div class="image__content">
                <a :href="setProductHref(productList[3].id)"><img :src="productList[3].goodsImageKey" alt=""></a>
                <span>{{productList[3].goodsName}}</span>
              </div> 
            </div>
            <div class="image-wrapper animate-fade animate-fade6" v-if="productList[4]">
              <div class="image__content">
                <a :href="setProductHref(productList[4].id)"><img :src="productList[4].goodsImageKey" alt=""></a>
                <span>{{productList[4].goodsName}}</span>
              </div> 
            </div>
            <div class="image-wrapper animate-fade animate-fade7" v-if="productList[5]">
              <div class="image__content">
                <a :href="setProductHref(productList[5].id)"><img :src="productList[5].goodsImageKey" alt=""> </a>
                <span>{{productList[5].goodsName}}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </transition>

    <transition name="fade">
    <section class="header-search" v-show="searchPopup" @click="hideSearchMask">
      <div class="container">
        <div class="search">
          <form action="" @submit.stop.prevent="goToSearch">
            <input type="text" v-model="keyword" :placeholder="$language.search" ref="search" @click.stop.prevent>
          </form>
        </div>
        <div class="search-close" @click="hideSearchMask">
          <i class="iconfont iconguanbi"></i>
        </div>

        <div class="search-box" @click.stop.prevent>
          <p>{{$language.hotSearch}}</p>
          <ul class="clear">
            <li><a href="">耳机</a></li>
            <li><a href="">耳机</a></li>
            <li><a href="">耳机</a></li>
            <li><a href="">耳机</a></li>
            <li><a href="">耳机</a></li>
          </ul>
        </div>
      </div>
    </section>
    </transition>

  </header>
</template>


<script>
import { categories, categoryGoods } from '@/api'

export default {
  data(){
    return {
      cateList: [],
      productList: [],
      keyword: '',
      menuStatus: false,
      searchPopup: false,
      currLanguage: '',
      languageList: [
        {label: '中文', value: 'chinese'},
        {label: 'English', value: 'english'},
      ]
    }
  },
  created() {
    let language = localStorage.getItem('language') || 'chinese';
    let curr = this.languageList.find(v=>{
      return v.value == language ? true : false
    })
    this.currLanguage = curr.label;
    this.requestProduct()
  },
  methods: {
    requestProduct(){
      categories({id: 0}).then(data=>{
        data = data.data;
        let list = data || []
        if(list && list.length > 0){
          this.cateList = list.splice(0, 3);
        }
      });
      categoryGoods({id: 0, pageIndex: 1}).then(data=>{
        data = data.data;
        let list = data && data.list;
        if(list && list.length > 0){
          this.productList = list.splice(0, 6);
        }
      });
    },
    setCateHref(cid){
      return '/productList/index.html?cid='+cid;
    },
    setProductHref(id){
      return '/detail/index.html?id='+id;
    },
    MenuHover(){
      this.menuStatus = true
      clearTimeout(this.hoverId)
    },
    MenuHoverOut(){
      this.hoverId = setTimeout(()=>{
        this.menuStatus = false
      }, 800)
    },
    MenuContentHover(){
      clearTimeout(this.hoverId)
    },
    MenuContentHoverOut(){
      this.hoverId = setTimeout(()=>{
        this.menuStatus = false
      }, 100)
    },
    clickSearchIcon(){
      this.searchPopup = true;
      document.body.classList.add('hidden');
      setTimeout(() => {
        this.$refs.search.focus();
      }, 300);
    },
    hideSearchMask(){
      this.searchPopup = false;
      document.body.classList.remove('hidden');
    },
    selectLanguage(language){
      localStorage.setItem('language', language.value);
      location.reload(); 
    },

    goToSearch(){
      location.href = '/search/index.html?search=' + this.keyword;
    }
  },
}
</script>