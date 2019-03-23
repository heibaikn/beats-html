<template>
  <section id="banner">
    <span class="arrow arrow-left" @click="slidePrev"></span>
    <span class="arrow arrow-right" @click="slideNext"></span>
    <div class="banner-wrapper">
        <swiper ref="mySwiper" :options="options" class="swiper-no-swiping">
            <swiperSlide  v-for="(item,index) in bannerList" :key="index"><a href=""><img :src="item.src" alt=""></a></swiperSlide>
        </swiper>
    </div>
  </section>
</template>


<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import banner1 from '../../assets/banner1.png'
import banner2 from '../../assets/banner2.jpg'

export default {
  data(){
    return {
        isAnimate: true,
        bannerList: [
            {src: banner1, title: 'banner1'},
            {src: banner2, title: 'banner2'},
        ],
        options: {
            loop : true,
            autoplay: 4000
        }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
        mySwiper() {
            return this.$refs.mySwiper.swiper
        }
  },
  methods: {
        slidePrev(){
            this.mySwiper.slidePrev()
        },
        slideNext(){
            this.mySwiper.slideNext()
        },
  },
}
</script>

<style lang="less">
#banner{
    max-width: 1900px;
    min-width: 1100px;
    width: 100%;
    margin: 0 auto;
    max-height: 500px;
    position: relative;
    overflow: hidden;
    margin-bottom: 30px;
    .banner-wrapper{    
        width: 1900px;
        height: 500px;
        position: relative;
        left: 50%;
        margin-left: -950px;
        .banner-item{
            height: 100%;
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
    .arrow{
        display: block;
        position: absolute;
        left: 50px;
        top: 50%;
        margin-top: -33px;
        width: 66px;
        height: 66px;
        cursor: pointer;
        z-index: 4;
        background: url(../../assets/focus-page-btns.png) 0 0 no-repeat;
        &.arrow-right{
            left: auto;
            right: 50px;
            background: url(../../assets/focus-page-btns.png) right 0 no-repeat;
        }
    }
}

</style>
