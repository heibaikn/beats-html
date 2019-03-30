<template>
<nav aria-label="Page navigation">
	<ul class="pagination">
		<li :class="{disabled:current==1}">
			<a href="javascript:;" @click="goPage(current==1?1:current-1)" aria-label="Previous">
				<span aria-hidden="true">{{$language.previousPage}}</span>
			</a>
		</li>
		<li v-for="(page,index) in showPageBtn" :key="index" :class="{active:page==current}">
			<a href="javascript:;" v-if="page" @click="goPage(page)">{{page}}</a>
			<a href="javascript:;" v-else>···</a>
		</li>
		<li :class="{disabled:current==pages}">
			<a href="javascript:;" @click="goPage(current==pages?pages:current+1)" aria-label="Next">
				<span aria-hidden="true">{{$language.nextPage}}</span>
			</a>
		</li>
		<li :class="{disabled:pages==pages}">
			<a href="javascript:void(0);"> {{$language.total}}  {{pages}} {{$language.page}} </a>
		</li>
	</ul>
</nav>
</template>

<script>
export default {
	props: {
         pages: {
             type: Number,
             default: 1
         },
         current: {
             type: Number,
             default: 1
         }
     },
     data:function (){
         return{
            //  current:1
         }
     },
     computed: {
         // 显示分页按钮
         showPageBtn:function() {
             let pageNum = this.pages; // 总页数
             let index = this.current; // 当前页
             let arr = [];
             if (pageNum <= 6) {
                 for (let i = 1; i <= pageNum; i++) {
                     arr.push(i)
                 }
                 return arr
             }
             // 对页码显示进行处理，动态展示
             if (index <= 3) return [1, 2, 3, 4, 0, pageNum];
             if (index >= pageNum - 1) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
             if (index === 4) return [1, 2, 3, 4, 5, 0, pageNum];
             if (index === pageNum - 2) return [1, 0, pageNum - 4, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
             return [1, 0, index - 2,index - 1, index, index + 1, index + 2, 0, pageNum];
         }
     },
     methods: {
         goPage:function(page) {
             if (page != this.current) {
                 console.log(page);
                 this.current = page;
                 this.$emit('navpage', this.current);
             }else{
                 console.log('Already in the current page');
             }
         }
     }
}
</script>

<style lang="less">

</style>