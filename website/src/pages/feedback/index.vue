<template>
  <div id="pages">
    <mainHeader />
    <banner />
    <section id="main-content" class="container">
      <div class="job-center">
        <h2>客户留言</h2>
        
        <div class="feedback">

          <div class="group">
            <div class="label">姓名：</div>
            <div class="content">
              <input type="text" class="input" />
            </div>
          </div>

          <div class="group">
            <div class="label">公司：</div>
            <div class="content">
              <input type="text" class="input" />
            </div>
          </div>

          <div class="group">
            <div class="label">电话：</div>
            <div class="content">
              <input type="text" class="input" />
            </div>
          </div>

          <div class="group">
            <div class="label">邮箱：</div>
            <div class="content">
              <input type="text" class="input" />
            </div>
          </div>

          <div class="group">
            <div class="label">传真：</div>
            <div class="content">
              <input type="text" class="input" />
            </div>
          </div>

          <div class="group">
            <div class="label">邮码：</div>
            <div class="content">
              <input type="text" class="input" />
            </div>
          </div>

          <div class="group">
            <div class="label">地址：</div>
            <div class="content">
              <input type="text" class="input" />
            </div>
          </div>

          <div class="group group--full">
            <div class="label">意见：</div>
            <div class="content">
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
          </div>

          <div class="group group--full">
            <div class="label label--full">您访问网站的目的是什么：</div>
            <div class="content">
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
          </div>

          <div class="group group--full">
            <div class="label label--full">您的目的是否已经达到：</div>
            <div class="content">
              <label><input type="radio" name="mudi" value="1"> 是</label>
              <label><input type="radio" name="mudi" value="2"> 否</label>
              <label><input type="radio" name="mudi" value="3"> 一部分</label>
              <label><input type="radio" name="mudi" value="4"> 仅在浏览，无特别目的</label>
            </div>
          </div>

          <div class="group group--full">
            <div class="label label--full">您是否曾经或打算提交一个服务请求以解决您的问题：</div>
            <div class="content">
              <label><input type="radio" name="2" value="1"> 是</label>
              <label><input type="radio" name="2" value="2"> 否</label>
            </div>
          </div>

          <div class="group group--full">
            <div class="label label--full">请评价该文档的质量：</div>
            <div class="content">
              <label><input type="radio" name="3" value="1"> 非常好</label>
              <label><input type="radio" name="3" value="2"> 好</label>
              <label><input type="radio" name="3" value="3"> 平均</label>
              <label><input type="radio" name="3" value="4"> 差</label>
            </div>
          </div>

        </div>


        <div class="group-btn">
          <a class="button-holder button-holder--big button-holder--red2"><span class="button-inner">发送</span><span class="mask"></span></a>
          <a class="button-holder "><span class="button-inner">重新填写</span><span class="mask"></span></a>
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
