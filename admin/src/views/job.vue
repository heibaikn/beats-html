<template>
    <section>
      <div class="ueditor-popup" id="ueditor-popup">
        <vue-ueditor-wrap v-model="msg"></vue-ueditor-wrap>
      </div>
      <div class="buttons">
        <Button type="primary" size="large" @click="confirm">提交更改</Button>
      </div>
    </section>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'

export default {
	name: 'job',
	data () {
		return {
			msg: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>'
		}
  },
  components: { 
    VueUeditorWrap 
  },
	computed: {
		
	},
	mounted(){
		
	},
	methods: {
		confirm(){
      console.log(this.msg)
    }
	},
	
}
</script>

<style scoped>
.buttons{
  padding: 30px 30px;
}
</style>
