<template>
	<li class="song-list">
		<h3 class="song-list-no">{{listindex + 1}}</h3>
		<router-link :to="{name: 'Playing', params: {songid: listdata.songid}}" class="song-list-cont">
			<div @click='toPlay(listdata)'>
			<p class="song-name nowrap">{{listdata.songname}}</p>
			
			
			<p class="song-info nowrap">
				<template v-for='(item, index) in listdata.singer'>
					<span v-if='index > 0'>&nbsp;/&nbsp;</span>{{item.name}}
				</template>
				<span class="icon icon-point"></span>
				{{listdata.albumname}}
				<template v-if='listdata.albumdesc'>
					<span class="icon icon-point"></span>
					{{listdata.albumdesc}}
				</template>
			</p>
			</div>
		</router-link>
	</li>
</template>

<script>
	import store from '../vuex/store'

	export default {
		props: {
			listdata: {
				type: Object,
				default: {}
			},
			listindex: {
				type: Number,
				default: 1
			}
		},
		methods: {
			toPlay: function(songInfo) {
				store.commit('changeSong', songInfo);
			}
		}
	}
</script>

<style lang='less'>
	.nowrap {
		white-space: nowrap;
		overflow: hidden; 
		text-overflow: ellipsis;
	}
	.song-list {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
		font-size: 0.9rem;
		height: 3rem;
		color: #fff;
		position: relative;
		.song-list-no {
			flex: none;
			width: 1.5rem;
			margin-right: 0.5rem;
			margin-top: -0.5rem;
			text-align: center;
			font-weight: normal;
			box-sizing: border-box;
			font-size: 0.85rem;
		}
		&:after {
			content: '';
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			margin-left:2rem;
			background-color: rgba(255,255,255,.15);
			-webkit-transform: scaleY(.5);
		}

		.song-list-cont {
		    -webkit-box-flex: 1;
	        -webkit-flex: 1;
			flex: 1;
			width: 0;
			color: #fff;
			display: block;
		}
		.song-info {
			font-size: 0.7rem;
			vertical-align: middle;
			color: rgba(255,255,255,.6);
			.icon-point {
				display: inline-block;
				width: 2px;
				height: 2px;
				border-radius: 50%;
				background-color: #fff;
				margin: 0 4px;
				vertical-align: middle;
			}
		}

	}
</style>