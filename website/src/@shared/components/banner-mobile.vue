<template>
  <section id="banner" :class="[images.length > 0 && 'banner-big']">
    <div class="banner-wrapper">
      <swiper ref="mySwiper" :options="options">
        <swiperSlide  v-for="(item, index) in bannerList" :key="index"><a :href="setBannerUrl(item)"><img :src="item.imageKey" alt=""></a></swiperSlide>
      </swiper>
    </div>
  </section>
</template>


<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// import banner1 from '../../assets/banner1.png'

export default {
  data(){
    return {
        isAnimate: true,
        bannerList: [
          // banner1
        ],
        options: {
          loop : true,
          autoplay: 4000
        }
    }
  },
  props: {
    images: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  watch: {
    images(imgs){
      if(imgs && imgs.length > 0){
        this.mySwiper.removeAllSlides();
        imgs.forEach(src=>{
          this.mySwiper.appendSlide(`<div class="swiper-slide"><img src="${src}"/></div>`);
        })
      }
    }
  },
  mounted() {
    if(this.images.length == 0){
      this.requestBanner();
    }
  },
  computed: {
    mySwiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    requestBanner() {
      this.$api.getBannerList().then(d => {
        d = d.data;
        if (d && this.images.length == 0) {
          this.bannerList = d;
        }
      });
    },
    slidePrev(){
      this.mySwiper.slidePrev()
    },
    slideNext(){
      this.mySwiper.slideNext()
    },
    setBannerUrl(item){
      if(item.url){
        return item.url;
      }
      return 'javascript:;'
    }
  },
}
</script>

<style lang="less">
#banner{
  width: 100%;
  margin: 0 auto;
  height: 3.5rem;
  position: relative;
  overflow: hidden;
  .banner-wrapper{    
      width: 100%;
      height: 3.5rem;
      text-align: center;
      .banner-item{
        height: 100%;
      }
      img{
        // width: 100%;
        height: 100%;
      }
  }
  .swiper-container{
    height: 100%;
  }
}
#banner.banner-big{
  background: #fff;
  height: 7rem;
  .banner-wrapper{    
    height: 7rem;
  }
}
</style>
