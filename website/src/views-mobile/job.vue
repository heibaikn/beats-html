<template>
  <section>
    <!-- <banner/> -->
    <nav class="section-nav">
      <!-- <div class="item active"><span class="">{{$language.job}}</span></div> -->
      <div class="item">
        <span>{{$language.job}}</span>
      </div>
    </nav>
    <section class="article-list mescroll" ref="mescroll">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <a @click="toHref(item)">{{item.title}}</a>
          <span class="time">{{item.createDate|formatDate}}</span>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import banner from '@shared/components/banner-mobile'
import mixinsIndex from '@shared/mixins'
import mixins from '@shared/mixins/mobile'
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'

export default {  
  data(){
    return {
      list: [],
      mescroll: null, //mescroll实例对象
      searchParams: {
        pageIndex: 1,
        pageMaxSize: 10
      },
    }
  },
  mixins: [mixinsIndex, mixins],
  components: {
    banner,
  },
  created() {
    document.title = this.$language.jobTitle;
    // this.init();
  },
  mounted() {
    this.mescroll = new MeScroll(this.$refs.mescroll, { 
      down: {
        use: false
      },
      up: {
        use: true,
        callback: this.scrollCallback,
          // 以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10, //每页数据条数,默认10
        },
        htmlNodata: `<p class="upwarp-nodata">-- ${this.$language.noMoreData} --</p>`,
        noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据; 避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
      }
    });
  },
  methods: {
    init(){
      this.$api.getRecruitmentInfos(this.searchParams).then(d=>{
        d = d.data;
        if(d){
          this.list = d;
        }
      });
    },
    scrollCallback(page) {
      this.searchParams.pageIndex = page.num;
      this.searchParams.pageMaxSize = page.size;

      this.$api.getRecruitmentInfos(this.searchParams).then(d=>{
        d = d.data;
        if(d){
          this.list = this.list.concat(d);
        }
        this.$nextTick(() => {
          this.mescroll.endSuccess(d.length);
        })
      })
      .catch(e=>{
        this.mescroll.endErr();
      })
    },
    toHref(item){
      this.$router.push({ path: 'article', query: { id: item.id, type: 'job' } });
    }
  },
}
</script>


<style lang="less" scoped>
</style>