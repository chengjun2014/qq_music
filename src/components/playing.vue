<template>
	<div class="song-wrap">
		<div class="song-bg" :style="bodyStyle"></div>
		<div class="song-mask"></div>
		<audio :src='songUrl' autoplay="autoplay" ref="audio"></audio>
		<div class="song_info">
			<div class="album-cover-wrap">
				<img :src="pic" alt="" class="album-cover" :class="[isPlaying ? 'rotateAnim' : '']" ref="album">
			</div>
			<div class="info">
				<h1 class="nowrap">{{playingsong.songname}}</h1>
				<p>
				<template v-for="item in playingsong.singer">{{item.name}}&nbsp;</template>
				</p>
			</div>
			<span class="icon" :class="[isPlaying ? 'play-icon' : 'pause-icon']" @click="palyOrPause"></span>
		</div>

	    <div class="lyc-wrap">
	      	<lyc-item :lycArr="lycArr" :currentTime="currentTime"></lyc-item>
	    </div>

	    <div class="controller">

	    </div>
	</div>
</template>

<script>
	import Base64 from '../base64'
	import store from '../vuex/store'
  	import LycItem from './lyc-item'

	export default {
		data () {
      		let song = store.getters.getSong,
          		pic = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000' + song.albummid +'.jpg';
      		
			return {
				songId: this.$route.params.songid,
				playingsong: song,
				bodyStyle: {
					color: '#f30',
					backgroundImage: "url(" + pic + ")",
					fontSize: '12px'
				},
				isPlaying: true,
		        pic: pic,
		        lycArr: [],
		        currentTime: 0,
		        timer: null
			}
		},
		components:{
			Base64,
      		LycItem
		},
		computed: {
			songUrl: function () {
				return 'http://ws.stream.qqmusic.qq.com/'+this.songId+'.m4a?fromtag=46';
			}
		},
		props: {

		},
		methods: {
			palyOrPause: function () {
			    let _this = this,
			    	audio = this.$refs.audio;

				if (this.isPlaying) {
          			audio.pause();
          			clearInterval(this.timer);
				} else {
          			audio.play();
          			this.timer = setInterval(function(audio) {
						return function() {
							_this.currentTime = audio.currentTime;
						}
					}(audio), 500);
				}
				this.isPlaying = !this.isPlaying;
			}
		},
		beforeMount () {
			this.playingsong = store.getters.getSong;

			let getTime = function (time) {
			    let secArr = time.split('.'),
              		secArr2 = secArr[0].split(':'),
              		sec = +secArr2[0] * 60 + secArr2[1] * 1;

          		return sec + '.' + secArr[1]
      		}

      		let _this = this;

			this.$http.jsonp('https://api.darlin.me/music/lyric/' + this.songId , {
			  	jsonp: 'callback'
			})
			.then(function (response) {
          		Base64.decode(response.data.lyric)
              		.split('[')
              		.slice(7)
              		.map(function(str) {
		                var t = str.split(']');
		                if (t[1].length > 1) {
		                    _this.lycArr.push({
		                        time: getTime(t[0]),
		                        lyc: t[1]
		                    });
		                }
              		})
			});
		},
		created () {
		    var _this = this,
		    	refs = _this.$refs;

			this.timer = setInterval(function(refs) {
				return function() {
					_this.currentTime = refs.audio.currentTime;
					// 需要检测歌曲播放完毕，清除定时器
				}
			}(refs), 500);
		},
		beforeDestroy() {
			clearInterval(this.timer);
		}
	}
</script>

<style lang='less'>
	html, body {
		height: 100%;
	}
	.song-bg {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background-position: bottom center;
		background-size: cover;
		background-repeat: no-repeat;
		z-index: 1;
		-webkit-filter: blur(15px);
		-webkit-transform: scale(1.15);
	}
	.song-mask {
		position: fixed;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    z-index: 2;
	    width: 100%;
	    background-color: #000;
	    opacity: 0.6;
	}
	.song_info {
		position: fixed;
	    width: 100%;
	    box-sizing: border-box;
		z-index: 3;
		color: #fff;
		padding: 0.75rem;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    background-color: rgba(0,0,0,.1);

		.album-cover-wrap {
			width: 4rem;
			height: 4rem;
			margin-right: 0.75rem;
		}

		.album-cover {
			width: 4rem;
			height: 4rem;
      		border-radius: 50%;
      		transform:rotate(0deg);
      		transition: transform 200ms;
		}
		.info {
			-webkit-box-flex: 1;
			-webkit-flex: 1;
			flex: 1;
			width: 0;
			font-size: 0.7rem;
      		line-height: 1.35rem;
			h1 {
				font-size: 0.9rem;
				font-weight: normal;
			}
		}
		.icon {
			display: block;
			width: 2.1rem;
			height: 2.1rem;
			margin-left: 0.5rem;
			background: url(../assets/list_sprite.png) no-repeat;
			background-size: 100%;
			flex: none;
		}

		.play-icon {
			background-position: 0 0;
		}
		.pause-icon {
			background-position: 0 -2.2rem;
		}
	}

	.lyc-wrap {
		position: fixed;
		top:5.5rem;
		bottom: 8rem;
		width: 100%;
		z-index: 10;
		color: rgba(255,255,255,.6);
		text-align: center;
		line-height: 2rem;
		font-size: 0.8rem;
		-webkit-box-flex: 1;
		overflow: hidden;
		display: flex;
		display: -webkit-box;
		-webkit-box-align: center;
	}

	.rotateAnim {
		animation: mymove 4s infinite linear;
	}

	.controller {
		height: 8rem;
		position: fixed;
		bottom: 0;
		z-index: 2;
		width: 100%;
		box-sizing: border-box;
		background: rgba(0,0,0,0.3);
	}

@keyframes mymove{
	0% {transform:rotate(0deg);}
	50% {transform:rotate(180deg);}
	100% {transform:rotate(360deg);}
}
</style>
