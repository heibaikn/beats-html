<template>
  <div id="pages">
    <mainHeader />
    <fixedMessage />
    
    <banner />
    <section id="main-content" class="container">
      <div class="job-center">
        <h2 class="content-h2-title">{{$language.contact}}</h2>
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

import { getContractInfo } from '@/api'

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
    document.title = this.$language.contactTitle;
    this.init()
  },
  methods: {
    init(){
      getContractInfo().then(d=>{
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
