<template>
	<div :style="{backgroundColor: color}">
		<div class="header rel">
			<img :src="src" alt="" class="header-bg">
			
			<div class="album-mask" :style="{color: color}"></div>
			<div class="album-info">
				<div class="album-title">
					<h1 class="nowrap">{{topinfo.name}}</h1>
					<p class="nowrap">粉丝&nbsp;{{fans}}&nbsp;万人</p>
				</div>
				<div class="album-play"></div>
			</div>
		</div>

		<ul class="songlist">
			<template v-for="list in songlist">
				<li class="flex-box">
					<div class="flex-body">
						<h3 class="nowrap">{{list.musicData.songname}}</h3>
						<p class="song-info nowrap">
							<template v-for='(item, index) in list.musicData.singer'>
								<span v-if='index > 0'>&nbsp;/&nbsp;</span>{{item.name}}
							</template>
							<span class="icon icon-point"></span>
							{{list.musicData.albumname}}
						</p>
					</div>
				</li>
			</template>
		</ul>
		<h3 class="title">最新专辑</h3>
		<ul class="albumList">
			<template v-for="item in albumList">
				<li>
					<img :src="item.pic" alt="">
					<div class="albumInfo">
						<h3 class="nowrap">{{item.name}}</h3>
						<p>{{item.publish_date}}</p>
					</div>
				</li>
			</template>
		</ul>
		<h3 class="title">简介</h3>
		<p class="intro">{{intro}}</p>
	</div>
</template>

<script>

	export default {
		data () {
	      return {
	        songlist: [],
	        topinfo: [],
	        mid: this.$route.params.singerid,
	        color: "rgb(224, 224, 224)",
	        fans: '',
	        albumList: [],
	        intro: ''
	      }
	    },
		computed: {
			src: function () {
				return "https://y.gtimg.cn/music/photo_new/T001R300x300M000"+this.mid+".jpg"
			},

			transferColor: function() {
				var t = this.color;
				function n(t) {
					return t > 16 ? t.toString(16) : "0" + t.toString(16);
				}
				if (t) {
					var o = (16711680 & t) >> 16, a = (65280 & t) >> 8, i = 255 & t;

					var s = n(o) + n(a) + n(i);
					this.color = '#' + s;
				} else {
					this.color = '#000';
				}
				console.log(this.color, 'color')
				return this.color;
			}
		},
		components: {
		},
		beforeMount () {
			this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg', {
			    params: {
			    	order:'listen',
			    	begin:0,
					num:8,
					singermid: this.mid,
					g_tk:5381,
					uin:0,
					format: 'jsonp',
					inCharset: 'utf-8',
					outCharset: 'utf-8',
					notice:0,
					platform:'h5page',
					needNewCode:1,
					from:'h5',
					_: new Date().getTime()
			    },
			    jsonp: 'jsonpCallback'
			}).then(function (response) {
				var _data = response.body.data;
			  	this.color = _data.color;
			  	this.topinfo.name = _data.singer_name;
			  	this.fans = (_data.fans/10000).toFixed(1);
			  	this.songlist = _data.list;
			  	this.intro = _data.SingerDesc;
			  	this.albumList = _data.albumlist;
			})
		}
	}
</script>

<style lang='less'>
	.flex-box {
		display: -webkit-box;
		display: -webklit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
	}

	.flex-body {
		-webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
	    -webkit-box-orient: vertical;
	    -webkit-box-pack: center;
	}

	.title {
		font-size: 0.9rem;
		padding: 1.25rem 0;
		line-height: 1.2rem;
		text-align: center;
	}
	.intro {
		padding: 0 0.75rem 3rem;
		font-size: 0.7rem;
		line-height: 1.1rem;
		text-align: justify;
	}

	.header {
		.header-bg {
			width: 100%;
			display: block;
		}

		.album-mask {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			padding-top: 60%;
			height: 0;
			z-index: 2;
			background-image: -webkit-linear-gradient(top,transparent,currentColor 80%);
		}

		.album-info {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 3;
			display: -webkit-box;
			display: flex;
			-webkit-box-align: center;
		    -webkit-align-items: center;
		    align-items: center;
			margin: 0 15px 25px;
			color: #fff;

			.album-title {
				-webkit-box-flex: 1;
				-webklit-flex: 1;
				flex: 1;
				width: 0;
				line-height: 1.5em;
				h1 {
					font-weight: normal;
					font-size: 1.2rem;
				}
				p {
					font-size: 0.7rem;
				}
			}

			.album-play {
				margin-left: 0.6rem;
				width: 2rem;
				height: 2rem;
				background: url(../assets/list_sprite.png);
				background-size: cover;
			}
		}
	}

	.songlist {
		border-top: 1px solid rgba(0,0,0,.15);
		padding: 0 0 0 0.5rem;
		margin: 0;
		li {
			font-size: 0.9rem;
			height: 3rem;
			box-sizing: border-box;
			border-bottom: 1px solid rgba(0,0,0,.15);
			h3 {
				font-size: 0.9rem;
				font-weight: normal;
				display: -webkit-box;
				font-weight: normal;
			}
			p {
				font-size: 0.7rem;
				display: -webkit-box;
			}
		}
	}

	.albumList {
		overflow: hidden;
		li {
			width: 32%;
			margin-right: 2%;
			font-size: 0;
			float: left;
			&:last-child {
				margin-right: 0;
			}
			img {
				width: 100%;
			}
			.albumInfo {
				font-size: 0.6rem;
				padding: 0.4rem 0.3rem 0;
				p {
					color: gray;
				}
			}
		}
	}

	.icon-point {
		display: inline-block;
		width: 2px;
		height: 2px;
		border-radius: 50%;
		background-color: gray;
		margin: 0 4px;
		vertical-align: middle;
	}
</style>
