<template>
  <header id="header">
    <section class="container">
      <div class="logo">
       logo
      </div>
      <nav>
        <ul>
          <li class="hover "><a href="/index.html">首页</a></li>
          <li class="hover active"><a href="/about/index.html">公司介绍</a></li>
          <li class="hover"><a href="/news/index.html">新闻中心</a></li>
          <li class="">
            <a
            @mouseover="MenuHover(0)" 
            @mouseout="MenuHoverOut(0)" 
            href="">产品展示 
              <i :class="{ 'arrow-active' : menuStatus}" class="iconfont iconjiantou_liebiaozhankai"></i>
            </a>
          </li>
          <li class="hover"><a href="/job/index.html">人才中心</a> </li>
          <li class="hover"><a href="/feedback/index.html">客户留言</a></li>
          <li class="hover"><a href="/contact/index.html">联系我们</a></li>
          <!-- <li class="last"><a><i class="iconfont iconcaidan"></i></a></li> -->
        </ul> 
        <div class="nav-right">
          <li>语音</li>
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
              <h2>浏览：</h2>
              <ul>
                <li><a href="">BEATS POP COLLECTION</a></li>
                <li><a href="">BEATS POP</a></li>
                <li><a href="">BBBBBB</a></li>
              </ul>
              <div class="button-holder">
                <span class="button-inner">浏览全部</span>
                <span class="mask"></span>
              </div>
            </div>
          </div>
          <div class="header-mask__body__group">
            <div class="image-wrapper main-img animate-fade animate-fade2">
              <img src="../../assets/img1.jpg" alt="">
              <p>Beats Solo3 Wireless</p>
            </div>
            <div class="image-wrapper animate-fade animate-fade3">
              <div class="image__content"><img src="../../assets/img1.jpg" alt=""><span>BEATS Pro</span></div> 
            </div>
            <div class="image-wrapper animate-fade animate-fade4">
              <div class="image__content"><img src="../../assets/img1.jpg" alt=""><span>BEATS Pro</span></div> 
            </div>
            <div class="image-wrapper animate-fade animate-fade5">
              <div class="image__content"><img src="../../assets/img1.jpg" alt=""><span>BEATS Pro</span></div> 
            </div>
            <div class="image-wrapper animate-fade animate-fade6">
              <div class="image__content"><img src="../../assets/img1.jpg" alt=""><span>BEATS Pro</span></div> 
            </div>
            <div class="image-wrapper animate-fade animate-fade7">
              <div class="image__content"><img src="../../assets/img1.jpg" alt=""> <span>这里是内容</span></div>
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
          <input type="text" placeholder="搜索" ref="search" @click.stop.prevent>
        </div>
        <div class="search-close" @click="hideSearchMask">
          <i class="iconfont iconguanbi"></i>
        </div>

        <div class="search-box" @click.stop.prevent>
          <p>热们搜索词</p>
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
export default {
  data(){
    return {
      menuStatus: false,
      searchPopup: false
    }
  },
  methods: {
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
    }
  },
}
</script>