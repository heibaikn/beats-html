<template>
  <footer id="footer">
    <section class="container">
      <div class="grid">
        <div class="logo">
          <a href="/"><img src="/static/logo.png" alt="" class="logo"></a>
        </div>
        <div class="grid__links">
          <div class="grid__links__item">
            <h2>{{$language.category}}</h2>
            <ul>
              <li v-for="(item, index) in cateList" :key="index"><a :href="setCateHref(item.id)">{{item.categoryName}}</a></li>
            </ul>
          </div>
          <div class="grid__links__item">
            <h2>{{$language.featuredProducts}}</h2>
            <ul>
              <li v-for="(item, index) in productList" :key="index"><a :href="setProductHref(item.id)">{{item.goodsName}}</a></li>
            </ul>
          </div>
          <div class="grid__links__item">
            <!-- <h2>产品</h2>
            <ul>
              <li><a href="">耳机</a></li>
              <li><a href="">耳机</a></li>
              <li><a href="">耳机</a></li>
            </ul> -->
          </div>
        </div>
      </div>
      <p class="copyright">{{$language.copyright}}</p>
    </section>
  </footer>
</template>


<script>
import Event from '@shared/utils/event'
export default {
  data(){
    return {  
      cateList: [],
      productList: [],
    }
  },
  created() {
    Event.$on('cate-list', (data)=>{
      this.cateList = data;
    })
    Event.$on('product-list', (data)=>{
      if(data.length > 3){
        this.productList = data.splice(0, 3);
      }
      else {
        this.productList = data;
      }
    })
  },
  methods: {
    setCateHref(cid){
      return '/productList/index.html?cid='+cid;
    },
    setProductHref(id){
      return '/detail/index.html?id='+id;
    },
  },
}
</script>