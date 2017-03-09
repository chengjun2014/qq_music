<template>
	<div class="song-wrap">
		<div class="song-bg" :style="bodyStyle"></div>
		<div class="song-mask"></div>
		<audio :src='songUrl' autoplay="autoplay" id="audio"></audio>
		<div class="song_info">
			<img :src="playingsong.pic" alt="" class="album-cover">
			<div class="info">
				<h1 class="nowrap">{{playingsong.songname}}</h1>
				<p>
				<template v-for="item in playingsong.singer">{{item.name}}&nbsp;</template>
				</p>
			</div>
			<span class="icon" :class="[isPlaying ? 'play-icon' : 'pause-icon']" @click="palyOrPause"></span>
		</div>
	</div>
</template>

<script>
	var songlist = [
		{
			"songid":200792496,
			"songmid":"002jv1Pi4Xus4g",
			"songname":"那个静默的阳光午后 (《那个静默的阳光午后》电影主题曲)",
			"songtitle":"那个静默的阳光午后 (《那个静默的阳光午后》电影主题曲)",
			"songsubtitle":"《那个静默的阳光午后》电影主题曲",
			"type":0,"cdIdx":0,
			"interval":170,
			"isonly":1,
			"singer":[{"id":4351,"mid":"003vyG9q2klWs4","name":"范玮琪","title":"范玮琪","type":0,"uin":0}],
			"albumid":1865453,"albummid":"001QtkDB26Uouq","albumname":"那个静默的阳光午后",
			"strMediaMid":"002MhvBh31wYZg","sizeape":13381885,"sizeogg":3460908,
			"preview":{"trybegin":0,"tryend":0,"trysize":0},
			"pay":{"payalbumprice":0,"paydownload":1,"payplay":0,"timefree":0},
			"msgid":14,"switch":636675,"alertid":100002,"vid":"e0022t1va2m","language":0,
			"action":{
				"play_lq":1,"play_hq":0,"play_sq":0,"down_lq":0,
				"down_hq":0,"down_sq":0,"soso":0,"fav":1,"share":1,"bgm":1,
				"ring":0,"sing":1,"radio":1,"try":0,"give":1,"play":1
			},
			"playTime":"02:50","tryPlay":0,"anyPlay":1,"tryIcon":0,"disabled":0,"singername":"范玮琪","formatted":1,
			"m4aUrl":"http://dl.stream.qqmusic.qq.com/C400002MhvBh31wYZg.m4a?fromtag=38&vkey=C01C82E3260F29E067CE1BACAB85DF0CC5CB6D920CBF4FC594BEAF2C61D708E169013B39D691F479B48FECD752ABBEF67A1702EB79E30A3B&guid=501760672",
			"pic":"//y.gtimg.cn/music/photo_new/T002R150x150M000001QtkDB26Uouq.jpg?max_age=2592000"
		}
	];

	import Base64 from '../base64'
	import store from '../vuex/store'

	export default {
		data () {
			console.log('playingsong', store.getters.getSong)
			return {
				songId: this.$route.params.songid,
				playingsong: store.getters.getSong,
				bodyStyle: {
					color: '#f30',
					backgroundImage: "url(" + songlist[0].pic + ")",
					fontSize: '12px'
				},
				isPlaying: true,
				curSong: store.getters.getSong
			}
		},
		components:{
			Base64
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
				if (this.isPlaying) {
					document.getElementById('audio').pause();
				} else {
					document.getElementById('audio').play();
				}
				this.isPlaying = !this.isPlaying;
			}
		},
		beforeMount () {
			this.playingsong = store.getters.getSong || localStorage.getItem('playSong');
			console.log('this.playingsong', this.playingsong);
			this.$http.jsonp('https://api.darlin.me/music/lyric/' + this.songId , {
			  jsonp: 'callback'
			}).then(function (response) {
				/*console.log(Base64.decode(response.data.lyric)
		            .split('[')
		            .slice(5)
		            .map(function(str) {
		              var t = str.split(']')
		              console.log(t[0], t[1])
		              //return {[t[0]]: [[t[0]], t[1]]}
		            })
		        )*/
			})
			/*this.$http.jsonp('https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg', {
			    params: {
			    	nobase64: 1,
					songtype:0,
					musicid: 7413070,
					callback: 'jsonp1'
			    }
			}).then(function (response) {
				console.log('jsonp1', response);
			  	
			})*/
		}
	}
</script>

<style lang="less">
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
		position: relative;
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
		.album-cover {
			width: 4rem;
			height: 4rem;
			margin-right: 0.5rem;
		}
		.info {
			-webkit-box-flex: 1;
			-webklit-flex: 1;
			flex: 1;
			width: 0;
			font-size: 0.7rem;
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
</style>