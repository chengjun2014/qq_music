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
	    	<transition name="fade" mode="out-in">
	      		<lyc-item :lycArr="lycArr" :currentTime="currentTime"></lyc-item>
	      	</transition>
	    </div>

	    <div class="controller">
			<play-progress :currentTime="currentTime" :totalTime="totalTime" v-on:switchSong='changePlayingSong'></play-progress>
	    </div>
	</div>
</template>

<script>
	import Base64 from '../base64'
	import store from '../vuex/store'
	import router from '../router'
  	import LycItem from '../components/lyc-item'
  	import PlayProgress from '../components/play-progress'

	export default {
		data () {
      		let song = store.getters.getSong;
      		
			return {
				playingsong: song,
				isPlaying: true,
		        lycArr: [],
		        currentTime: 0,
		        timer: null,
		        playList: null
			}
		},
		components:{
			Base64,
      		LycItem,
      		PlayProgress
		},
		computed: {
			pic: function() {
			 	return 'http://y.gtimg.cn/music/photo_new/T002R300x300M000' + this.playingsong.albummid +'.jpg';
			},
			songUrl: function() {
				return 'http://ws.stream.qqmusic.qq.com/' + this.playingsong.songid + '.m4a?fromtag=46';
			},
			bodyStyle: function() {
				return {
					backgroundImage: "url(http://y.gtimg.cn/music/photo_new/T002R300x300M000" + this.playingsong.albummid + ".jpg)"
				};
			},
			totalTime: function() {
				return this.playingsong.interval;
			}
		},
		watch: {
			playingsong: function(newsong, old) {
				
			}
		},
		methods: {
			changePlayingSong: function(num) {
				var index = num;

				if (index >= store.state.songList.length) {
					index = 0;
				}

				var playingsong = store.state.songList[index].data;
				this.playingsong = playingsong;
				
				store.commit('changeSong', playingsong);
				store.commit('changeSongIndex', index);

				router.replace({
					name: 'Playing',
					params: {
						songid: playingsong.songid
					}
				});
				this.renderLyc();
				this.currentTime = 0;
				this.scrollLyc();
			},
			palyOrPause: function() {
			    let _this = this,
			    	refs = _this.$refs,
			    	audio = refs.audio;

				if (this.isPlaying) {
          			audio.pause();
          			clearInterval(this.timer);
				} else {
          			audio.play();
          			this.timer = setInterval(function(audio) {
						return function() {
							_this.currentTime = refs.audio.currentTime;
							
							if (_this.currentTime >= _this.totalTime) {
								_this.changePlayingSong(store.getters.getSongIndex + 1);
							}
						}
					}(audio), 500);
				}
				this.isPlaying = !this.isPlaying;
			},
			renderLyc: function() {
				let getTime = function (time) {
				    let secArr = time.split('.'),
	              		secArr2 = secArr[0].split(':'),
	              		sec = +secArr2[0] * 60 + secArr2[1] * 1;

	          		return sec + '.' + secArr[1];
	      		}

	      		let _this = this;

				this.lycArr = [];
				this.currentTime = 0;

				this.$http.jsonp('https://api.darlin.me/music/lyric/' + this.playingsong.songid , {
				  	jsonp: 'callback'
				}).then(function(response) {
	          		Base64.decode(response.data.lyric)
	              		.split('[')
	              		.slice(7)
	              		.map(function(str) {
			                var t = str.split(']');
			                if (t[1].length > 2) {
			                    _this.lycArr.push({
			                        time: getTime(t[0]),
			                        lyc: t[1]
			                    });
			                }
	              		});
				});
			},
			scrollLyc: function() {
			    var _this = this,
			    	refs = _this.$refs,
			    	_store = store,
			    	_router = router;

				this.timer = setInterval(function(refs) {
					return function() {
						_this.currentTime = refs.audio.currentTime;
						
						if (_this.currentTime >= _this.totalTime) {
							_this.changePlayingSong(store.getters.getSongIndex + 1);
						}
					}
				}(refs), 500);
			}
		},
		beforeMount () {
			this.playingsong = store.getters.getSong;
			this.renderLyc();
		},
		mounted () {
			this.playList = store.state.songList;
			this.scrollLyc();
		},
		beforeDestroy () {
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
			background-position: 0 -2.2rem;
		}
		.pause-icon {
			background-position: 0 0;
		}
	}

	.lyc-wrap {
		position: fixed;
		top: 5.5rem;
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
		animation: imgRorate 4s infinite linear;
	}

	.controller {
		position: fixed;
		bottom: 0;
		z-index: 11;
		width: 100%;
		box-sizing: border-box;
		background: rgba(0,0,0,0.4);
	}

@keyframes imgRorate{
	0% {transform: rotate(0deg);}
	50% {transform: rotate(180deg);}
	100% {transform: rotate(360deg);}
}
</style>
