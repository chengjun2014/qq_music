<template>
	<div class="head f-cb">
		<router-link to="/recommend" :class="{'active' :curTab == 0}"><span @click="changeChannel(0)">推荐</span></router-link>
		<router-link to="/rank" :class="{'active' :curTab == 1}"><span @click="changeChannel(1)">排行榜</span></router-link>
		<router-link to="/search" :class="{'active' :curTab == 2}"><span @click="changeChannel(2)">搜索</span></router-link>
	</div>
</template>

<script>
	import router from '../../router'
	import store from '../../vuex/store'

	export default {
		data: function() {
			return {
				curTab: store.getters.getTab
			}
		},
		computed: {
			
		},
		methods: {
			changeChannel (arg) {
				store.commit('changeTab', arg);
			}
		}
	}
</script>

<style lang="less">
	.head {
		background-color: #fff;
		height: 2.25rem;
		line-height: 2.25rem;
		font-size: 0.8rem;
		color: #fff;
		text-align: center;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		.active {
			position: relative;
			color: #31c27c;
			&:after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 2px;
				background-color: #31c27c;
			}
		}
		a {
			-webkit-box-flex: 1;
			-webkit-flex: 1;
			flex: 1;
			width: 0;
			color: rgba(0,0,0,.6);
			span {
				display: block;
			}
		}
		
	}
</style>