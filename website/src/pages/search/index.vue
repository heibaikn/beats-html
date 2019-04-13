<template>
  <div id="pages">
    <mainHeader />
    <fixedMessage />
    
    <section id="main-content" class="container">
      <div class="search-content">
        <h2>{{$language.searchResults}}: {{keyword}}</h2>
        <div class="search-list-content">
          <div class="item">
            <a href="/"> 
            <div class="img"><img src="https://www.beatsbydre.com/content/dam/beats/web/search/featured/pb3w_featured_retina_156x156.jpg" alt=""></div>
            <div class="info">Powerbeats Wireless</div> </a>
          </div>
          <div class="item">
            <div class="img"><img src="https://www.beatsbydre.com/content/dam/beats/web/search/featured/pb3w_featured_retina_156x156.jpg" alt=""></div>
            <div class="info">Powerbeats Wireless</div>
          </div>
          <div class="item">
            <div class="img"><img src="https://www.beatsbydre.com/content/dam/beats/web/search/featured/pb3w_featured_retina_156x156.jpg" alt=""></div>
            <div class="info">Powerbeats Wireless</div>
          </div>
          <div class="item">
            <div class="img"><img src="https://www.beatsbydre.com/content/dam/beats/web/search/featured/pb3w_featured_retina_156x156.jpg" alt=""></div>
            <div class="info">Powerbeats Wireless</div>
          </div>
          <div class="item">
            <div class="img"><img src="https://www.beatsbydre.com/content/dam/beats/web/search/featured/pb3w_featured_retina_156x156.jpg" alt=""></div>
            <div class="info">Powerbeats Wireless</div>
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
    document.title = this.$language.searchTitle;
    this.init()
  },
  methods: {
    init(){
      this.keyword = this.getQueryString('search');
      searchApi({keyWord: this.keyword}).then(d=>{
        if(d.data && d.data[0]){
          this.content = d.data[0].content;
        }
      });
    },
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
      var r = window.location.search.substr(1).match(reg); 
      if (r != null) return decodeURIComponent(r[2]); 
      return null; 
    } 
  },
}
</script>

<style>

</style>
