<template>
  <div id="pages">
    <mainHeader />
    <banner />
    <section id="main-content" class="container">
      <div class="job-center">
        <h2>人才中心</h2>
        <p>公司与工厂分开运作，现为扩大公司规模，需招外贸业务员若干名。</p>
        <p>业务运作平台：</p>
        <p>广交会（一年两度），香港环球资源电子展（一年两度），阿里巴巴国内及国际付费平台（已操作10年）</p>
        <p>公司网址：</p>
        <p>www.huayiearphone.cn  欢迎上我司阿里巴巴国际网站了解我司操作。</p>
        <p>www.huayiec.cn 阿里巴巴国内网站</p>
        <p>www.huayigz.cn （国内网站）</p>

        <p>岗位职责: 
        <p>1、执行公司的贸易业务,实施贸易规程,开拓市场; </p>
        <p>2、负责联系客户、编制报价、参与商务谈判,签订合同; </p>
        <p>3、负责生产跟踪、发货、现场; </p>
        <p>4、负责单证审核、结算、售后服务等工作; </p>
        <p>5、客户的拓展与维护; </p>
        <p>6、业务相关资料的整理和归档; </p>
        <p>7、相关业务工作的汇报。</p>
        <p>8、参加展会。</p>
        <p>任职资格: </p>
        <p>1、大专及以上学历,国际贸易、商务英语类相关专业; </p>
        <p>2、2年以上贸易领域业务操作经验,有外企工作经历者优先考虑; </p>
        <p>3、熟悉贸易操作流程及相关法律法规,具备贸易领域专业知识; </p>
        <p>4、具有较高的英语水平,较好的计算机操作水平,有报关证等相关贸易操作证书者优先考虑; </p>
        <p>5、具有良好的业务拓展能力和商务谈判技巧,公关意识强,具有较强的事业心、团队合作精神和独立处事能力,勇于开拓和创新。</p>

        <p>有意向者，请发简历到到：hyf@hyearphone.cn</p></p>

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
