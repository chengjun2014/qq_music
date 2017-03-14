<template>
	<div>
		<head-comp></head-comp>
		<div class="rank-wrap">
		<template v-for="list in topList">
			<router-link :to="{name: 'ListDetail', params: {id: list.id}}" class="">
				<div class="top-img-wrap rel">
					<img :src="list.picUrl" alt="" class="top-img">
					<p class="nowrap">{{list.listenCount | smaller}}</p>
				</div>
				<div class="top-summary rel">
					<h3>{{list.topTitle}}</h3>
					<template v-for='(item, index) in list.songList'>
						<p><span>{{index + 1}}</span>&nbsp; {{item.songname}}&nbsp;<span>-&nbsp;{{item.singername}}</span></p>
					</template>
					<i class="icon icon-arrow"></i>
				</div>
			</router-link>
		</template>
		</div>
		<a href="" class="link2client">去客户端发现更多好音乐&gt;</a>
	</div>
</template>

<script>
	import HeadComp from '../../components/header/index'

	export default {
		data () {
			return {
				topList: []
			}
	    },
		components: {
			HeadComp
		},
		filters: {
			smaller: function (num) {
				if (num) {
					return (num/10000).toFixed(1) + '万'
				}
			}
		},
		beforeMount () {
			this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
			    params: {
					g_tk: 5381,
					uin: 0,
					format: 'jsonp',
					inCharset: 'utf-8',
					outCharset: 'utf-8',
					notice: 0,
					platform: 'h5',
					needNewCode: 1,
					_: new Date().getTime()
			    },
			    jsonp: 'jsonpCallback'
			}).then(function (response) {
			  	this.topList = response.body.data.topList;
			})
		}
	}
</script>

<style lang='less'>
	.rel {
		position: relative;
	}
	.top-img-wrap {
		flex: none;

		.top-img {
			width: 5rem;
			height: 5rem;
			margin-right: 0.5rem;
			display: block;
		}
		p {
			position: absolute;
			left: 0.5rem;
			bottom: 0;
			font-size: 0.6rem;
			color: #fff;
		}
	}
	.rank-wrap {
		padding: 0.5rem;
		background-color: #f4f4f4;

		a {
			margin-bottom: 0.5rem;
			background-color: #fff;
			display: -webkit-box;
		    display: -webkit-flex;
		    display: flex;
		    font-size: 0.7rem;
		    line-height: 1.5em;
		    color: #000;
		    &:last-child {
		    	margin: 0;
		    }
		    .top-img-wrap {
		    	p {
		    		opacity: 0.6;
		    	}
		    }
		    .top-summary {
			    h3 {
			    	font-size: 0.8rem;
			    	white-space: nowrap;
			    	overflow: hidden;
			    	text-overflow: ellipsis;
			    	line-height: 1.8em;
			    	margin-bottom: 0.3rem;
			    }
			    p {
			    	white-space: nowrap;
			    	overflow: hidden;
			    	text-overflow: ellipsis;
			    	span {
			    		color: rgba(0, 0, 0, .5);
			    	}
			    }
			    .icon-arrow {
			    	position: absolute;
		    	    right: 10px;
		    	    top: 50%;
		    	    margin-top: -4px;
		    	    width: 6px;
		    	    height: 6px;
		    	    border-right: 1px solid #b2b2b2;
		    	    border-bottom: 1px solid #b2b2b2;
		    	    -webkit-transform: rotate(-45deg);
			    }
		    }
		}

		.top-summary {
			flex: 1;
			width: 0;
			padding-right: 0.6rem;
		}
	}

	.link2client {
		display: block;
		height: 1.8rem;
		line-height: 1.8rem;
		color: rgba(0,0,0,.6);
		font-size: 0.7rem;
		text-align: center;
		background-color: #f4f4f4;
		margin-bottom: 0;
	}
</style>

