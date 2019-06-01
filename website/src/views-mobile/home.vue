<template>
  <section>
    <banner />

    <div class="product-list">
      <div class="item-wrapper" v-for="(item, index) in productList" :key="index">
        <div class="item">
          <div class="item-content">
            <div class="product-photos">
              <a @click="jumpProductDetail(item.id)"><img :src="item.goodsImageKey" alt="" /></a>
            </div>
            <div class="product-details">
              <b class="name">{{item.goodsName}}</b>
            </div>
            <div class="product-btn">
              <a @click="jumpProductDetail(item.id)" class="button-holder button-holder--red2"><span class="button-inner">{{$language.explore}}</span><span class="mask"></span></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </section>
</template>

<script>
import banner from '@shared/components/banner-mobile'
import Footer from '@shared/components/footer-mobile'
import mixins from '@shared/mixins/mobile'
export default {  
  data(){
    return {
      productList: []
    }
  },
  mixins: [mixins],
  components: {
    banner,
    Footer
  },
  created() {
    this.requestProduct();
  },
  methods: {
    requestProduct(){
      this.$api.categoryGoods({id: 0, pageIndex: 1}).then(data=>{
        data = data.data;
        let list = data && data.list;
        this.productList = list;
      });
    },
  },
}
</script>
