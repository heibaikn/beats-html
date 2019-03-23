<template>
  <div id="pages">
    <mainHeader />
    <banner />
    <section id="main-content" class="container">
        <h2>公司介绍</h2>
        <p>华义电子厂位于广东省广州市，是一家专业研发、制造、销售各种耳机的生产厂家，主要有免提耳机，MP3耳机及电脑耳机等。本公司自创立以来，始终坚持”以人为本，以客为尊，科技为导，诚信为基“的核心理念；遵循”创新、优质、高效“的企业精神。以优质的产品，合理的价格。良好的售后，完善的服务为企业宗旨。愿与新老客户携手合作，共创辉煌明天。</p>         
    </section>
    <mainFooter />
  </div>
</template>

<script>
import mainHeader from '@shared/components/header'
import mainFooter from '@shared/components/footer'
import banner from '@shared/components/banner'
import { getUserInfo } from '@/api'

export default {
  name: 'about',
  data(){
    return{
      
    }
  },
  components: {
    mainHeader,
    mainFooter,
    banner
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
