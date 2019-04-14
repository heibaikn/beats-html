<template>
  <div id="pages">
    <mainHeader />
    <fixedMessage />
    
    <section id="main-content" class="container">
      
    </section>
    <mainFooter />
  </div>
</template>

<script>
import mainHeader from '@shared/components/header'
import mainFooter from '@shared/components/footer'
import banner from '@shared/components/banner'
import fixedMessage from '@shared/components/fixedMessage'

import { searchApi } from '@/api'
import { getQueryString } from '@shared/utils'

export default {
  name: 'about',
  data(){
    return{
      content: '',
      keyword: ''
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
    document.title = this.$language.productListTitle;
    this.init()
  },
  methods: {
    init(){
      
    },
  },
}
</script>

<style>

</style>
