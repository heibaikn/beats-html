<template>
  <section class="scroll-body">
    <!-- <banner/> -->
    <nav class="section-nav" style="margin-top:0">
      <!-- <div class="item active"><span class="">{{$language.job}}</span></div> -->
      <div class="item" :class="{active: searchParams.type == 1}" @click="clickType(1)">{{$language.companyNews}}</div>
      <div class="item" :class="{active: searchParams.type == 2}" @click="clickType(2)">{{$language.industrynews}}</div>
    </nav>

    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit" v-show="searchParams.type == 1">
      <section class="article-list">
        <ul>
          <li v-for="(item,index) in list" :key="index" @click="toHref(item)">
            <a>{{item.title}}</a>
            <span class="time">{{item.createDate|formatDate}}</span>
          </li>
        </ul>
      </section>
    </mescroll-vue>

    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp2" @init="mescrollInit2" v-show="searchParams.type == 2">
      <section class="article-list">
        <ul>
          <li v-for="(item,index) in list2" :key="index" @click="toHref(item)">
            <a>{{item.title}}</a>
            <span class="time">{{item.createDate|formatDate}}</span>
          </li>
        </ul>
      </section>
    </mescroll-vue>
 
  </section>
</template>

<script>
import banner from '@shared/components/banner-mobile'
import mixinsIndex from '@shared/mixins'
import mixins from '@shared/mixins/mobile'
import MescrollVue from 'mescroll.js/mescroll.vue'
import 'mescroll.js/mescroll.min.css'

export default {  
  data(){
    return {
      list: [],
      list2: [],
      navIndex: 0,
      mescroll: null,
      mescroll2: null,
      searchParams: {
        type: 1,
        pageIndex: 1,
        pageMaxSize: 10
      },
      mescrollDown:{
        use: false
      },
      mescrollUp: {
        callback: this.upCallback,
        page: { num: 0, size: 10, },
        htmlNodata: `<p class="upwarp-nodata">-- ${this.$language.noMoreData} --</p>`,
        noMoreSize: 1,
      },
      mescrollUp2: {
        callback: this.upCallback2,
        page: { num: 0, size: 10, },
        htmlNodata: `<p class="upwarp-nodata">-- ${this.$language.noMoreData} --</p>`,
        noMoreSize: 1,
      }
    }
  },
  mixins: [mixinsIndex, mixins],
  components: {
    banner,
    MescrollVue
  },
  created() {
    document.title = this.$language.newsTitle;
  },
  mounted() {
    
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll;
    },
    mescrollInit2 (mescroll) {
      this.mescroll2 = mescroll;
    },
    upCallback(page) {
      this.searchParams.pageIndex = page.num;
      this.searchParams.pageMaxSize = page.size;
      this.$api.getNewsInfos(this.searchParams).then(d=>{
        d = d.data;
        let arr = d.list;
        if(arr){
          this.list = this.list.concat(arr);
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
    upCallback2(page) {
      this.searchParams.pageIndex = page.num;
      this.searchParams.pageMaxSize = page.size;
      let sendDate = Object.assign({}, this.searchParams, {type:  2})
      this.$api.getNewsInfos(sendDate).then(d=>{
        d = d.data;
        let arr = d.list;
        if(arr){
          this.list2 = this.list2.concat(arr);
          this.$nextTick(() => {
            this.mescroll2.endBySize(arr.length, d.count);
          })
        }
        else{
          this.mescroll2.endErr();
        }
      })
      .catch(e=>{
        this.mescroll2.endErr();
      })
    },
    toHref(item){
      this.$router.push({ path: 'article', query: { id: item.id, type: 'news' } });
    },
    clickType(type){
      this.searchParams.type = type;

      if(type == 1){
        // this.list = [];
      }

      if(type == 2){
        // this.list2 = [];
      }
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


<style lang="less" scoped>
</style>