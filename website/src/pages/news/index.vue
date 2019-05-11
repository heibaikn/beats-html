<template>
  <div id="pages">
    <mainHeader />
    <banner />
    <fixedMessage />
    <section id="main-content" class="container">
      <nav>
        <div class="nav-item" :class="{active: searchParams.type == 1}" @click="clickType(1)">{{$language.companyNews}}</div>
        <div class="nav-item" :class="{active: searchParams.type == 2}" @click="clickType(2)">{{$language.industrynews}}</div>
      </nav>
      <section class="news-list">
        <div class="loading" v-show="isLoading">{{$language.loading}}...</div>
        <div class="empty"  v-show="!isLoading && newsList.length == 0">{{$language.notNews}}~</div>
        <ul v-show="!isLoading">
          <li v-for="(item,index) in newsList" :key="index"><a :href="toHref(item)" target="_blank">{{item.title}}</a> <span class="time">{{item.createDate|formatDate}}</span></li>
        </ul>
      </section>

      <navigation :pages="pages" :curr="current" @toPage="toPage" v-show="pages >= 1"/>

    </section>
    <mainFooter />
  </div>
</template>

<script>
import mainHeader from '@shared/components/header'
import mainFooter from '@shared/components/footer'
import banner from '@shared/components/banner'
import navigation from '@shared/components/navigation'
import fixedMessage from '@shared/components/fixedMessage'
import { getNewsInfos } from '@/api'
import mixins from '@shared/mixins'

export default {
  name: 'about',
  data(){
    return{
      pages: 0,
      current: 1,
      count: 0,
      searchParams: {
        type: 1,
        pageIndex: 1,
        pageMaxSize: 10
      },
      newsList: [],
      isLoading: false,
    }
  },
  mixins: [mixins],
  components: {
    mainHeader,
    mainFooter,
    fixedMessage,
    banner,
    navigation
  },
  computed: {
    
  },
  created(){
    document.title = this.$language.newsTitle;
    this.queryList()
  },
  methods: {
    queryList(){
      this.newsList = [];
      this.isLoading = true;
      getNewsInfos(this.searchParams).then(d=>{
        this.isLoading = false;
        d = d.data;
        if(d && d.list){
          this.newsList = d.list;
        }
        this.count = d.count;
        let pages = this.count / 10;
        if(pages >= 1){
          this.pages = Math.ceil(pages);
        }
      })
      .catch(()=>{
        this.isLoading = false;
      });
    },
    clickType(type){
      this.searchParams.type = type;
      this.queryList();
    },
    toPage(page){
      this.searchParams.pageIndex = page;
      this.queryList();
    },
    toHref(item){
      return '/newsDetail/index.html?id=' + item.id;
    }
  },
}
</script>

<style>

</style>
