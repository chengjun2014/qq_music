<template>
<div>
	<head-comp></head-comp>
	<div id="main">
		<swiper class="my-swipe">
		  <swiper-slide class="silde" v-for="item in sliderData">
		    <a v-bind:href="item.href">
		      <img :src=item.src :alt=item.alt />
		    </a>
		  </swiper-slide>
		</swiper>
	</div>

	<div class="radio-wrap section-wrap">
		<h3 class="sub-title">电台</h3>
		<ul class="radio-list">
			<li v-for="radio in radioList">
				<div>
					<div class="radio-img-wrap rel">
						<img :src="radio.picUrl" class="cover-img" alt="" />
						<span class="icon-play"></span>
					</div>
					<p class="radio-name">{{radio.Ftitle}}</p>
				</div>
			</li>
		</ul>
	</div>
	
	<div class="section-wrap">
		<h3 class="sub-title">热门歌单</h3>
	</div>
	<div class="more-info">
		<a href="" class="go2app">去客户端发现更多好音乐&gt;</a>
		<a href="" class="go2pc">查看电脑版网页</a>
		<img class="logo" src="https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/logo_footer.png?max_age=19830212&d=20151105145423" alt="">
		<p class="copy-right">Copyright © 1998 - 2017 Tencent. All Rights Reserved.</p>
	</div>
</div>
</template>

<script>
	import HeadComp from '../../components/header/index'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'

	import { mapGetters } from 'vuex'

	export default {
		data () {
	      return {
	        sliderData: [],
	        radioList: []
	      }
	    },
		components: {
			HeadComp,
			swiper,
			swiperSlide
		},
		beforeMount () {
			this.$http.jsonp('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {
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
			  	let slider = response.data.data.slider;
			    for (let i = 0; i < slider.length; i++) {
		        	this.sliderData.push({src: slider[i].picUrl, alt: slider[i].id, href: slider[i].linkUrl})
			    }

			    this.radioList = response.data.data.radioList;
			})
		},
		
		mounted () {

		}
	}
</script>

<style lang="less">
	#app {
		background-color: #f4f4f4;
	}
	ul {
		margin: 0;
		padding: 0;
	}
	#main {
		.swiper-wrapper {
			img {
				width: 100%;
				display: block;
			}
		}
		.product {
			margin-top: 15px;
			background-color: #fff;
			.product-title {
				border-bottom: 1px solid #eee;
				height: 1.8rem;
				line-height: 1.8rem;
				font-size: 0.8rem;
				padding-left: 0.8rem;
				font-weight: normal;
			}
		}
	}

	.section-wrap {
		padding: 0.7rem 0 0 0.5rem;
		.sub-title {
			font-size: 0.8rem;
			margin-bottom: 0.5rem;
			font-weight: normal;
		}
	}

	.radio-wrap {
		.radio-list {
			overflow: hidden;
			list-style: none;
			li {
				width: 50%;
				box-sizing: border-box;
				padding-right: 0.4rem;
				float: left;

				.icon-play {
					position: absolute;
					right: 0.5rem;
					bottom: 0.5rem;
					width: 1.2rem;
					height: 1.2rem;
					background: url(../../assets/list_sprite.png) no-repeat;
					background-size: cover;
				}
				.cover-img {
					width: 100%;
					display: block;
				}
				&:last-child {
					margin: 0;
				}

				.radio-name {
					font-size: 0.7rem;
					background-color: #fff;
					height: 1.6rem;
					padding: 0.2rem 0.4rem;
				}
			}
		}
	}

	.more-info {
		text-align: center;
		font-size: 0.7rem;
		color: rgba(0,0,0,.6);
		a {
			display: block;
			color: rgba(0,0,0,.6);
			line-height: 2rem;
		}
		.go2pc {
			color: #000;
		}

		.logo {
			width: 4rem;
			margin-top: 0.6rem;
		}

		.copy-right {
			line-height: 3rem;
			font-size: 0.6rem;
		}
	}
</style>