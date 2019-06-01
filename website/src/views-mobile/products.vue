<template>
  <section class="products-body">

    <div class="products-filter-menu" @click="clickShowMask">
      {{$language.filter}}: <span>{{currCateName}}</span>
    </div>

    <transition name="catemask">
      <div class="products-cate-fixed" v-show="isShowMask">
        <div class="bg" @click="hideCateMask"></div>
        <div class="product-cate">
          <div class="title">{{$language.category}}: </div>
          <div class="category-list">
            <div class="item" :class="{active: currIndex == -1}" @click="clickCategory({categoryName: $language.all, id: 0}, -1)">
              {{$language.all}}
            </div>
            <div class="item" :class="{active: currIndex == index}" v-for="(item,index) in categoryList" :key="index" @click="clickCategory(item,index)">
              {{item.categoryName}}
            </div>
          </div>
        </div>
      </div>
    </transition>


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
        <p>{{$language.cateNotGoods}}</p>
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
      currCateName: this.$language.all,
      categoryList: [],
      productList: [],
      searchParams: {
        id: 0,
        pageIndex: 1,
        pageMaxSize: 10
      },
      mescrollDown:{
        use: false
      },
      mescrollUp: {
        callback: this.upCallback,
        page: { num: 0, size: 10, },
        htmlNodata: `<p class="upwarp-nodata">-- ${this.$language.noMoreGoods} --</p>`,
        noMoreSize: 1,
      },
    }
  },
  mixins: [mixins],
  components: {
    banner,
    MescrollVue
  },
  created() {
    this.requestCateList();
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page) {
      this.searchParams.pageIndex = page.num;
      this.searchParams.pageMaxSize = page.size;
      this.$api.categoryGoods(this.searchParams).then(d=>{
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
    requestCateList(){
      this.$api.categories({id: 0}).then(d=>{
        d = d.data;
        if(d && d.length > 0){
          this.categoryList = d;
          if(this.cid){
            let findParamsCid = this.categoryList.findIndex(item=>{
              return item.id == this.cid
            })
            if(findParamsCid > -1){
              this.currIndex = findParamsCid;
            }
          }
        }
      })
    },

    clickShowMask(){
      this.isShowMask = true;
    },
    hideCateMask(){
      this.isShowMask = false;
    },
    clickCategory(item, index){
      this.hideCateMask();
      this.currIndex = index;
      this.searchParams.id = item.id;
      this.currCateName = item.categoryName;
      this.productList = [];
      this.mescroll.resetUpScroll();
    }
    
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
