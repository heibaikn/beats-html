<template>
  <section class="body-section">
    <div class="header-holder" :class="[isShowMask && 'header-holder--mask']">
      <header>
        <div class="search" @click="showSearchMask" v-show="!isSearchMask"><i class="iconfont iconicon_search icon-search"></i></div>
        <div class="search" @click="showSearchMask" v-show="isSearchMask"><i class="iconfont iconguanbi icon-search"></i></div>
        <div class="logo"><img src="/static/logo.png" alt="logo"></div>
        <div class="menu" @click="showMenuMask" v-show="!isShowMenu"> <i class="iconfont iconcaidan icon-menu"></i></div>
        <div class="menu" @click="hideMenuMask" v-show="isShowMenu"> <i class="iconfont iconguanbi icon-menu"></i></div>
      </header>

      <transition name="fade">
        <div class="header-menu-wrapper content-abs-wrapper" v-show="isShowMenu">
          <ul class="menu">
            <li class=""><a @click.stop.prevent="jumpTo('/')">{{$language.home}}</a></li>
            <li class=""><a @click.stop.prevent="jumpTo('/about')">{{$language.about}}</a></li>
            <li class=""><a @click.stop.prevent="jumpTo('/news')">{{$language.news}}</a></li>
            <li class=""><a @click.stop.prevent="jumpTo('/products')">{{$language.products}}</a> </li>
            <li class=""><a @click.stop.prevent="jumpTo('/job')">{{$language.job}}</a> </li>
            <li class=""><a @click.stop.prevent="jumpTo('/feedback')">{{$language.feedback}}</a></li>
            <li class=""><a @click.stop.prevent="jumpTo('/contact')">{{$language.contact}}</a></li>
          </ul>
          <div class="language">
            <div class="language-title">{{$language.language}}: </div>
            <div class="list" v-for="(lan,index) in languageList" :key="index" @click="selectLanguage(lan)">{{lan.label}}</div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div class="header-search-wrapper content-abs-wrapper" v-show="isSearchMask">
          <div class="search-input">
            <input type="text" v-model="search">
            <div class="search-btn" @click="submitSearch">{{$language.search}}</div>
          </div>
          <div class="hot">
            <!-- <p>{{$language.hotSearch}}</p>
            <ul>
              <li><a>阿斯蒂芬</a></li>
              <li><a>阿斯蒂芬</a></li>
              <li><a>阿斯蒂芬</a></li>
            </ul> -->
          </div>
        </div>
      </transition>

    </div>
    
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

  </section>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return {
      isShowMask: false,
      isShowMenu: false,
      isSearchMask: false,
      search: '',
      languageList: [
        {label: '中文', value: 'chinese'},
        {label: 'English', value: 'english'},
      ]
    }
  },
  components: {
    
  },
  created(){
    document.title = this.$language.homeTitle;
  },
  computed: {
    
  },
  methods: {
    jumpTo(name){
      this.$router.push(name);
      this.hideMenuMask();
    },
    showSearchMask(){
      if(!this.isSearchMask){
        this.isSearchMask = true;
        this.showMask();
      }
      else{
        this.isSearchMask = false;
        this.hideMask();
      }
      this.isShowMenu = false;
    },
    showMenuMask(){
      this.isShowMenu = true;
      this.showMask();
      this.isSearchMask = false;
    },
    hideMenuMask(){
      this.isShowMenu = false;
      this.hideMask();
    },
    showMask(){
      this.isShowMask = true;
    },
    hideMask(){
      this.isShowMask = false;
    },
    submitSearch(){
      this.isSearchMask = false;
      this.hideMask();
      let search = this.search;
      this.$router.push({ path: 'search', query: { search } });
    },

    selectLanguage(language){
      localStorage.setItem('language', language.value);
      location.reload(); 
    },
  },
}
</script>

<style>

</style>
