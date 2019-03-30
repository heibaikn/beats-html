<template>
  <div id="pages">
    <mainHeader />
    <banner />
    <section id="main-content" class="container">
      <message />
    </section>

    <mainFooter />
  </div>
</template>

<script>
import mainHeader from '@shared/components/header'
import mainFooter from '@shared/components/footer'
import banner from '@shared/components/banner'
import message from '@shared/components/message'

export default {
  name: 'about',
  data(){
    return{
      
    }
  },
  components: {
    mainHeader,
    mainFooter,
    message,
    banner
  },
  computed: {
    
  },
  created(){
    document.title = this.$language.messageTitle;
  },
  methods: {
    
  },
}
</script>

<style>

</style>
