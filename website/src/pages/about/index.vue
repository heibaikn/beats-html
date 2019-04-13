<template>
  <div id="pages">
    <mainHeader />
    <fixedMessage />

    <banner />
    <section id="main-content" class="container">
      <div class="about-content">
        <h2 class="content-h2-title">{{$language.about}}</h2>
        <section v-html="content"></section>
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

import { getCompanyInfo } from '@/api'

export default {
  name: 'about',
  data(){
    return{
      content: ''
    }
  },
  components: {
    mainHeader,
    mainFooter,
    fixedMessage,
    banner
  },
  computed: {
    
  },
  created(){
    document.title = this.$language.aboutTitle;
    this.init();
  },
  methods: {
    init(){
      getCompanyInfo().then(d=>{
        if(d.data && d.data[0]){
          this.content = d.data[0].content;
        }
      });
    }
  },
}
</script>

<style>

</style>
