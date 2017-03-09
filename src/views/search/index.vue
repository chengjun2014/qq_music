<template>
	<div>
		<head-comp></head-comp>
		<div class="search-wrap">
			<form>
				<span class="icon icon-search"></span>
				<input class="key-word" type="text" @change='change' placeholder="搜索歌曲、歌单、专辑">
				<span class="icon icon-del"></span>
			</form>
			<div class="search-btn">搜索</div>
		</div>
		<div class="hot-keys">
			<h3 class="hot-title">热门搜索</h3>
			<div class="hot-wrap">
				<a href="" class="highlight" v-if="special_key">{{special_key}}</a>
				<template v-for="(item, index) in hotkeys">
					<a href="" v-if="item.k.length > 4">{{item.k}}</a>
				</template>
			</div>
			
			<p v-if="part">12</p>
			<p v-else>34</p>
		</div>
	</div>
</template>

<script>
	import HeadComp from '../../components/header/index'

	export default {
		data () {
	      return {
	        hotkeys: [],
	        part: true, // 搜索标志位，默认0 显示热搜词列表 1显示搜索历史记录
	        special_key: ''
	      }
	    },
		components: {
			HeadComp
		},
		methods: {
			change: function() {
				console.log(this.part)
				this.part = !this.part;
			}
		},
		beforeMount () {
			this.$http.jsonp('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', {
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
			  	this.hotkeys = response.body.data.hotkey;
			  	this.special_key = response.body.data.special_key;
			})
		}
	}
</script>

<style lang='less'>
	.search-wrap {
		background-color: #f4f4f4;
		padding: 10px;
		display: -webkit-box; 
	    display: -webkit-flex;
	    display: flex;
		form {
			background-color: #fff;
			position: relative;
			padding-left: 1rem;
			display: -webkit-box; 
		    display: -webkit-flex;
		    display: flex;
		    -webkit-box-align: center;
	        -webkit-align-items: center;
	        align-items: center;
			flex: 1;
			padding: 8px 12px 8px 35px;
			transition: all 200ms;
		}
		.key-word {
			border: 0 none;
			height: 1rem;
			line-height: 1rem;
			padding: 0;
			flex: 1;
			outline: none;
			height: 1rem;
			line-height: 1rem;
		}
		.icon-search {
			position: absolute;
			top: 8px;
			left: 8px;
			width: 1rem;
			height: 1rem;
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJlSURBVFhH7ZfRShRRHMb3Jkqzm7wJSrqIIDBxX6C0a62H6C7oqq4ixYreQMmMHkXbjLQeIYgyQuqiyIuotKDt923fyLCszv/MzF5EDnzs2T3/7zffOXNm5myjcXDUOAOtVquJ7qOn6AP6ZamtQ33NGk/ZG8VJJtEaagf1XJ7agwEdRI9zIT7RnkdT6Iz7VaO2flPf51z9I9oDtQQDNIxeGv6Nz9voaBFcNa79bu8LsYp8+/Z75FmYN3w/nwqUB204lFiDqYzd+txlek37RFkQ3pNIjDZaKsXBeMkATfloKUjOBGMMifUbXUzmYVp3oFvJ5j0M8GbNXEtiYtJzRtOru6lwAUfhsIZQdveNR30NTPccaD5sChbCXTD7btDSUCAdmqGpsClYCHPa7CdBSyeQXgEKNBI2BQthnjX7Y9DSCfTTpkNhU7AQ7jGzd4KWvgc67EDbKYH6eclOO9BmSqBsUU+HTcFCwJcdaCVo6Vyy7LZfCJuChbAfONCdoKUTKHsw6iE2FDYWFIqFthxoLImLSZsr3fqzScZ9isUyczWZiXEC6UWoF2LaaHqcDcY4+mHmheRAMmBe8oje8nmqFOQvZwS9N2uxLEcgbUuzDdpGmZnyzLxzGG3yqm1lARxH2VZEUz6DChc6NXoia83I087pRukZyozAjqCHvv6Cf0GL6Ao655MrgNr6TX1bDqF1qO/Xcv7qobymJoA+6xpxfvTd7VVqdxcw7au1h3IwbUfn0DJ6hb6ibbSJVtzX8w9B30JVWQf/QqibVQZYm7drpg5C7TmzuZnSI6JZ2yWoAnKo61UY/5f3Dy7dC4CdAEhQAAAAAElFTkSuQmCC) no-repeat;
			background-size: 100%;
		}
		.search-btn {
			font-size: 0.7rem;
			line-height: 36px;
			padding: 0 10px;
			color: #555;
		}
	}
	.hot-keys {
		background: #fff;
	    padding: 15px 15px 10px 15px;
		font-size: 0.65rem;
		.hot-title {
			line-height: 1.2em;
			margin-bottom: 0.5rem;
			color: rgba(0, 0, 0, 0.6);
		}
		a {
			color: #000;
			display: inline-block;
			height: 1.5rem;
			line-height: 1.5rem;
			border: 1px solid rgba(0,0,0,.6);
		    border-radius: 0.75rem;
		    word-break: keep-all;
		    padding: 0 10px;
		    margin: 0 0.65rem 0.5rem 0;
		    &.highlight {
		    	border-color: #fc4524;
		    	color: #fc4524;
		    }
		}
	}
</style>