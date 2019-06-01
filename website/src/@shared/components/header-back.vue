<template>
  <section class="header-back">
    <div class="back-icon" @click="clickBack">
      <i class="iconfont iconzuo"></i>
    </div>
    <div class="back-content">
      <p>{{content}}</p>
    </div>
  </section>
</template>


<script>

export default {
  data(){
    return {
      
    }
  },
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  components: {
   
  },
  watch: {
    content(content){
      this.content = content;
    }
  },
  mounted() {
    
  },
  methods: {
    clickBack(){
      this.$router.back()
    },
  },
}
</script>

<style lang="less">

</style>
