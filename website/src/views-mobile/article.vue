<template>
  <section class="body-padding-top">
    <header-back :content="detail.title"/>
    <banner/>

    <div class="body-content">
      <h2 class="content-title">{{detail.title}}</h2>
      <div class="body-content-html" v-html="detail.content"></div>
    </div>
    <Footer/>
  </section>
</template>

<script>
import banner from '@shared/components/banner-mobile'
import Footer from '@shared/components/footer-mobile'
import headerBack from '@shared/components/header-back'
import mixins from '@shared/mixins/mobile'
export default {  
  data(){
    return {
      detail: [],
      searchParams: {
        type: 1,
        pageIndex: 1,
        pageMaxSize: 10
      },
    }
  },
  mixins: [mixins],
  components: {
    banner,
    headerBack,
    Footer
  },
  created() {
    let id = this.$route.query.id;
    let type = this.$route.query.type;
    this.id = id;
    this.type = type;
    document.title = this.$language.jobTitle;
    this.queryList();
  },
  methods: {
    queryList(){
      let url = this.type == 'job' ? 'getRecruitmentInfos' : 'getNewsInfo';
      this.$api[url]({ id: this.id }).then(d=>{
        d = d.data;
        if(this.type == 'job'){
            if(d){
              d.forEach(data=>{
                if(data.id == this.id){
                  this.detail = data;
              }
            })
          }
        }

        if(this.type == 'news'){
          this.detail = d;
        }
        
      });
    }
  },
}
</script>


<style lang="less" scoped>

</style>