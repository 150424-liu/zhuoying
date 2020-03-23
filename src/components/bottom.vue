<template>
	<div class="bottom">
		<van-tabbar route v-model="value"   >
		  <van-tabbar-item replace :to="ico.url"   v-for="ico in icon" >
		    <img
		      slot="icon"
		      slot-scope="props"
		      :src="props.active ? ico.active : ico.normal"
		    >
			<span>{{ico.name}}</span>
		  </van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
	      value:0 ,
	      icon: [
			  {
				url:"/index",
				name:'首页',
				normal: '../../static/首%20页%20(2).png',
				active: '../../static/首%20页%20(2)%20(1).png'
			},
			{
				url:"/team",
				name:'我的团队',
				normal: '../../static/我的团队.png',
				active: '../../static/我的团队 (1).png'
			},
			{
				url:'/friend',
				name:'邀请好友',
				normal: '../../static/邀请好友 (7).png',
				active: '../../static/邀请好友 (6).png'
			},
			{
				url:'/My',
				name:'我的',
				normal: '../../static/我 的 (2).png',
				active: '../../static/我 的 (3).png'
			}
		  ]
	    }
	  }
	}
</script>

<style>
	.bottom{
		border: 1px solid beige;
		position: absolute;
		bottom: 20px;
		display: flex;
		flex-wrap: wrap;
	}
</style>
