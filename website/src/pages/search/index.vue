<template>
  <div id="pages">
    <mainHeader />
    <fixedMessage />
    
    <section id="main-content" class="container">
      <div class="search-content">
        <h2>{{$language.searchResults}}: {{keyword}}</h2>
        <div class="search-list-content">
          <div class="item" v-for="(item, index) in dataList" :key="index">
            <a :href="setProductHref(item.id)"> 
              <div class="img"><img :src="item.goodsImageKey" alt=""></div>
              <div class="info">{{item.goodsName}}</div> 
            </a>
          </div>
        </div>
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

import { searchApi } from '@/api'
import { getQueryString } from '@shared/utils'

export default {
  name: 'about',
  data(){
    return{
      content: '',
      dataList: [],
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
    document.title = this.$language.searchTitle;
    this.init()
  },
  methods: {
    init(){
      this.keyword = getQueryString('search');
      searchApi({keyWord: this.keyword}).then(d=>{
        d = d.data;
        if(d.list){
          this.dataList = d.list;
        }
      });
    },
    setProductHref(id){
      return '/detail/index.html?id='+id;
    },
    
  },
}
</script>

<style>

</style>
