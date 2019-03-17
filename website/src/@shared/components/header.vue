<template>
  <header id="header">
    <section class="container">
      <div class="logo">
       logo
      </div>
      <nav>
        <ul>
          <li>
            <a 
            @mouseover="MenuHover(0)" 
            @mouseout="MenuHoverOut(0)" 
            href="">头戴式耳机 
              <i :class="{ 'arrow-active' : menuStatus}" class="iconfont iconjiantou_liebiaozhankai"></i>
            </a>
          </li>
          <li><a>入耳式耳机</a> <i class="iconfont iconjiantou_liebiaozhankai"></i></li>
          <li><a>扬声器</a></li>
          <li><a>支持</a></li>
          <li class="last"><a><i class="iconfont iconcaidan"></i></a></li>
        </ul>
      </nav>
      <div class="right-icon flex-center">
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
  </header>
</template>


<script>
export default {
  data(){
    return {
      menuStatus: false
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
    }
  },
}
</script>