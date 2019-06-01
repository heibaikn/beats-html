<template>
  <section class="products-body">

    <div class="products-filter-menu">
      <h2>{{$language.searchResults}}: {{searchParams.keyWord}}</h2>
    </div>

    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="product-list" id="product-list">
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
      <div class="product-empty" v-show="productList.length == 0">
        <p>没有搜索到商品哦~</p>
      </div>
    </mescroll-vue>

  </section>
</template>

<script>
import banner from '@shared/components/banner-mobile'
import mixins from '@shared/mixins/mobile'
import MescrollVue from 'mescroll.js/mescroll.vue'
import 'mescroll.js/mescroll.min.css'

export default {  
  data(){
    return {
      cid: 0,
      isShowMask: false,
      mescroll: null,
      currIndex: -1,
      categoryList: [],
      productList: [],
      searchParams: {
        keyWord: '',
        pageIndex: 1,
        pageMaxSize: 10
      },
      mescrollDown:{
        use: false
      },
      mescrollUp: {
        callback: this.upCallback,
        page: { num: 0, size: 10, },
        htmlNodata: '<p class="upwarp-nodata">-- 没有更多商品了 --</p>',
        noMoreSize: 1,
        empty: {
						//列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
						warpId:	"product-list", //父布局的id (1.3.5版本支持传入dom元素)
						tip: "暂无相关产品~" //提示
					},
      },
    }
  },
  mixins: [mixins],
  components: {
    banner,
    MescrollVue
  },
  watch: {
    '$route': function(route){
      this.searchParams.keyWord = route.query.search;
      this.productList = [];
      this.mescroll.resetUpScroll();
    }
  },
  created() {
    let keyWord = this.$route.query.search;
    this.searchParams.keyWord = keyWord;
    document.title = this.$language.searchTitle;
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page) {
      this.searchParams.pageIndex = page.num;
      this.searchParams.pageMaxSize = page.size;
      this.$api.searchApi(this.searchParams).then(d=>{
        d = d.data;
        let arr = d.list;
        if(arr){
          this.productList = this.productList.concat(arr);
          this.$nextTick(() => {
            this.mescroll.endBySize(arr.length, d.count);
          })
        }
        else{
          this.mescroll.endErr();
        }
      })
      .catch(e=>{
        this.mescroll.endErr();
      })
    },
    
  },

  // 进入路由时,恢复列表状态
  beforeRouteEnter (to, from, next) {  // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      if (vm.mescroll) {
        // 恢复到之前设置的isBounce状态
        if (vm.mescroll.lastBounce != null) vm.mescroll.setBounce(vm.mescroll.lastBounce)
        // 滚动到之前列表的位置 (注意:路由使用keep-alive才生效)
        if (vm.mescroll.lastScrollTop) {
          vm.mescroll.setScrollTop(vm.mescroll.lastScrollTop)
          setTimeout(() => { // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
            vm.mescroll.setTopBtnFadeDuration(0)// 设置回到顶部按钮显示时无渐显动画
          }, 16)
        }
      }
    })
  },

  // 离开路由时,记录列表状态
  beforeRouteLeave (to, from, next) {  // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    if (this.mescroll) {
      this.mescroll.lastBounce = this.mescroll.optUp.isBounce// 记录当前是否禁止ios回弹
      this.mescroll.setBounce(true) // 允许bounce
      this.mescroll.lastScrollTop = this.mescroll.getScrollTop()// 记录当前滚动条的位置
      this.mescroll.hideTopBtn(0)// 隐藏回到顶部按钮,无渐隐动画
    }
    next()
  }
}
</script>
