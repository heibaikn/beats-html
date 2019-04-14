<template>
  <div id="pages">
    <mainHeader />
    <fixedMessage />
    <banner />
    
    <section id="main-content" class="container">
      <div class="job-center">
        <h2 class="content-h2-title">{{detail.title}}</h2>
        
        <section v-html="detail.content"></section>

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
import mixins from '@shared/mixins'

import { getNewsInfo } from '@/api'
import { getQueryString } from '@shared/utils'

export default {
  name: 'about',
  data(){
    return{
      currIndex: 9,
      content: '',
      keyword: '',
      detail: [],
    }
  },
  mixins: [mixins],
  components: {
    mainHeader,
    mainFooter,
    fixedMessage,
    banner
  },
  computed: {
    
  },
  created(){
    document.title = this.$language.newsTitle;
    this.init()
  },
  methods: {
    init(){
      let id = getQueryString('id');
      getNewsInfo({ id }).then(d=>{
        d = d.data;
        this.detail = d;
        document.title = this.detail.title;
      })
    },
  },
}
</script>

<style>

</style>
