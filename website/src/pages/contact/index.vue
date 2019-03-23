<template>
  <div id="pages">
    <mainHeader />
    <banner />
    <section id="main-content" class="container">
      <div class="job-center">
        <h2>联系我们</h2>
        
        <p>广州市白云区华义电子厂</p>
        <p>工厂：中国 广东 广州市 白云区 均禾工业区188号</p>
        <p>公司：中国 广东 广州市 白云区 均禾街 平沙 桂江商贸大厦11楼</p>
        <p>电话：86 020 22256879  </p>
        <p>传真：86 020 22256879</p>

      </div>
    </section>
    <mainFooter />
  </div>
</template>

<script>
import mainHeader from '@shared/components/header'
import mainFooter from '@shared/components/footer'
import banner from '@shared/components/banner'
import { getUserInfo } from '@/api'

export default {
  name: 'about',
  data(){
    return{
      
    }
  },
  components: {
    mainHeader,
    mainFooter,
    banner
  },
  computed: {
    
  },
  created(){
    
  },
  methods: {
    
  },
}
</script>

<style>

</style>
