<template>
  <div id="pages">
    <mainHeader />
    <banner />
    <section id="main-content" class="container">
      <nav>
        <div class="nav-item active">公司动态</div>
        <div class="nav-item">行业动态</div>
      </nav>
      <section class="news-list">
        <ul>
          <li><a href="">这里是公司的动态的</a> <span class="time">2019-04-01</span></li>
          <li><a href="">这里是公司的动态的</a> <span class="time">2019-04-01</span></li>
          <li><a href="">这里是公司的动态的</a> <span class="time">2019-04-01</span></li>
          <li><a href="">这里是公司的动态的</a> <span class="time">2019-04-01</span></li>
        </ul>
      </section>

      <navigation :pages="pages" :current="current"/>

    </section>
    <mainFooter />
  </div>
</template>

<script>
import mainHeader from '@shared/components/header'
import mainFooter from '@shared/components/footer'
import banner from '@shared/components/banner'
import navigation from '@shared/components/navigation'
import { getUserInfo } from '@/api'

export default {
  name: 'about',
  data(){
    return{
      pages: 33,
      current: 3
    }
  },
  components: {
    mainHeader,
    mainFooter,
    banner,
    navigation
  },
  computed: {
    
  },
  created(){
    
  },
  methods: {
    
  },
}
</script>

<style>

</style>
