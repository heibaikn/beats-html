<template>
  <div id="pages">
    <mainHeader />
    <fixedMessage />
    <banner />
    <section id="main-content" class="container">
      <div class="job-center">
        <nav>
          <div class="nav-item">{{$language.job}}</div>
        </nav>

        <!-- <h2 class="content-h2-title">{{$language.job}}</h2> -->
        
        <!-- <section v-html="content"></section> -->

        <section class="news-list">
          <div class="loading" v-show="isLoading">{{$language.loading}}...</div>
          <div class="empty"  v-show="!isLoading && objList.length == 0">{{$language.notNews}}~</div>
          <ul v-show="!isLoading">
            <li v-for="(item,index) in objList" :key="index"><a :href="toHref(item)" target="_blank">{{item.title}}</a> <span class="time">{{item.createDate|formatDate}}</span></li>
          </ul>
        </section>

        <!-- <navigation :pages="pages" :curr="current" @toPage="toPage" v-show="pages >= 1"/> -->

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
import navigation from '@shared/components/navigation'
import { getRecruitmentInfos } from '@/api'
import mixins from '@shared/mixins'

export default {
  name: 'about',
  data(){
    return{
      content: '',
      pages: 0,
      current: 1,
      count: 0,
      searchParams: {
        type: 1,
        pageIndex: 1,
        pageMaxSize: 10
      },
      objList: [],
      isLoading: false,
    }
  },
  mixins: [mixins],
  components: {
    mainHeader,
    mainFooter,
    fixedMessage,
    navigation,
    banner
  },
  computed: {
    
  },
  created(){
    document.title = this.$language.jobTitle;
    this.init()
  },
  methods: {
    init(){
      this.isLoading = true;
      getRecruitmentInfos().then(d=>{
        this.isLoading = false;
        d = d.data;
        if(d){
          this.objList = d;
        }
        // this.count = d.count;
        // let pages = this.count / 10;
        // if(pages >= 1){
        //   this.pages = Math.ceil(pages);
        // }

        // if(d.data && d.data[0]){
        //   // this.content = d.data[0].content;
        // }
      })
      .catch(()=>{
        this.isLoading = false;
      });
    },
    toPage(page){
      this.searchParams.pageIndex = page;
      this.queryList();
    },
    toHref(item){
      return '/jobDetail/index.html?id=' + item.id;
    }
  },
}
</script>

<style>

</style>
