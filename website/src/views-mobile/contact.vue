<template>
  <section>
    <banner/>

    <div class="body-content">
      <h2 class="content-title">{{$language.contact}}</h2>
      <div class="body-content-html" v-html="content"></div>
    </div>

  </section>
</template>

<script>
import banner from '@shared/components/banner-mobile'
import mixins from '@shared/mixins/mobile'
export default {  
  data(){
    return {
      content: ''
    }
  },
  mixins: [mixins],
  components: {
    banner,
  },
  created() {
    document.title = this.$language.contactTitle;
    this.init();
  },
  methods: {
    init(){
      this.$api.getContractInfo().then(d=>{
        if(d.data && d.data[0]){
          this.content = d.data[0].content;
        }
      });
    },
  },
}
</script>


<style lang="less" scoped>

</style>