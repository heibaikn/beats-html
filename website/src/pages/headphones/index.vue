<template>
  <div id="pages">
    <mainHeader />
    <fixedMessage />
    <section id="main-content">
      <div class="banner-pages">
        <figure :style="styleBackground"></figure>
        <h1>头戴式耳机</h1>
      </div>

      <div class="container container-margin">
        <div class="product-box">
          <div class="product-box__img">
            <img src="../../assets/img3.png" alt="">
          </div>
          <div class="product-box__content">
            <h2>Beats Studio Wireless </h2>
            <p>ABOVE THE NOISE</p>
            <ul class="bullets">
              <li>采用Apple W1 芯片，实现1 类无线蓝牙®连接，提升电池能效 </li>
              <li>Beats Pure ANC (完全自适应消噪) 主动阻隔外界噪音 </li>
              <li>Beats Pure ANC (完全自适应消噪) 主动阻隔外界噪音 </li>
              <li>采用Fast Fuel 技术，在电量不足时，充电10 分钟即可持续播放3 小时</li>
            </ul>
            <div class="price">RMB 2,863</div>
            <div class="buttons">
              <a href="" class="button-holder  button-holder--black">
                <span class="button-inner">探索</span>
                <span class="mask"></span>
              </a>
              <a href="" class="button-holder button-holder--red2">
                <span class="button-inner">购买</span>
                <span class="mask"></span>
              </a>
            </div>
          </div>
        </div>

        <div class="product-box">
          <div class="product-box__img">
            <img src="../../assets/img3.png" alt="">
          </div>
          <div class="product-box__content">
            <h2>Beats Pro </h2>
            <p>音质卓越，颠覆传统</p>
            <ul class="bullets">
              <li>清澈高音、浑厚低音，尽显卓越音质</li>
              <li>旋转式耳罩</li>
              <li>经久耐用的外壳和加垫头带，适合在录音棚长时间工作</li>
            </ul>
            <div class="price">RMB 2,863</div>
            <div class="buttons">
              <a href="" class="button-holder  button-holder--black">
                <span class="button-inner">探索</span>
                <span class="mask"></span>
              </a>
              <a href="" class="button-holder button-holder--red2">
                <span class="button-inner">购买</span>
                <span class="mask"></span>
              </a>
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
import fixedMessage from '@shared/components/fixedMessage'
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
    mainFooter,
    fixedMessage
  },
  computed: {
    styleBackground(){
      return{
        backgroundImage: `url(${pageBanner})`
      }
    }
  },
  created(){
    document.title = this.$language.homeTitle;

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
