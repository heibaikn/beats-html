<template>
  <div id="app">
    <mainHeader />

    <section class="banner">
      <img src="./assets/banner1.jpg" alt="">
    </section>
    
    <section class="section-container">
      
    </section>
  </div>
</template>

<script>
import mainHeader from '@shared/components/header'
import { getUserInfo } from '@/api'

export default {
  name: 'Home',
  components: {
    mainHeader
  },
  created(){
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
