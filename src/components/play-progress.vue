<template>
<div>
    <div class="controller-wrap">
        <div class="row" v-if="showController">
            <i class="icon icon-list" @click="toggleFlag"></i>
            <i class="icon icon-prev"></i>
            <i class="icon icon-next"></i>
            <i class="icon icon-fav"></i>
        </div>
        <div class="songList" v-else>
            <p>播放列表 <span>({{list.length}}首)</span><i class="icon-back" @click="toggleFlag"></i></p>
            <ul>
                <template v-for="(item, index) in list">
                    <li :class='{"active": index == _index}'>{{item.data.songname}}
                        <b v-if="index == _index"><i></i><i></i><i></i><i></i></b>
                    </li>
                </template>
            </ul>
        </div>
    </div>
    
    <div class="progress-wrap" v-if="showController">
        <div class="time">{{currentTime | sec2Time}}</div>
        <div class="play-progress">
            <div class="bar-bg" :style="{width: width + '%'}"></div>
        </div>
        <div class="time">{{totalTime | sec2Time}}</div>
    </div>
</div>
</template>

<script>
import store from '../vuex/store'
export default {
    data() {
        return {
            width: 0,
            list: store.state.songList,
            showController: true,
            _index: 0
        }
    },
    props: {
        currentTime: Number,
        totalTime: Number
    },
    filters: {
        sec2Time: function(sec) {
            var sec = parseInt(sec);
            return ('0'+Math.floor(sec/60)).slice(-2) + ':' + ('0' + sec%60).slice(-2);
        }
    },
    mounted: function() {
        // this._index = store.state.songIndex;
    },
    methods: {
        toggleFlag: function() {
            this.showController = !this.showController;
            this._index = store.state.songIndex;
        }
    },
    watch: {
        currentTime: function(newNum, oldNum) {
            this.width = newNum *100 / this.totalTime;
        }
    }
}
</script>

<style lang='less'>

.progress-wrap {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    color: #808080;
    font-size: 0.7rem;
    margin-bottom: 1.2rem;
    .time {
        text-align: center;
        width: 18%;
    }
}
.play-progress {
    height: 2px;
    width: 0;
    position: relative;
    top: 0.5rem;
    background-color: rgba(255,255,255,.2);
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    .bar-bg {
        background-color: #31c27c;
        position: absolute;
        left: 0;
        top: 0;
        height: 2px;
        transition: width 50ms; /* 如何动画更平滑 */
        &:after {
            content: '';
            position: absolute;
            right: -2px;
            top: -2px;
            height: 6px;
            width: 6px;
            border-radius: 50%;
            background-color: #31c27c;
            box-shadow: 0 0 4px #31c27c;
        }
    }
}

.active b {
    position: absolute;
    right: 0.75rem;
    top: 0.5rem;
    width: 0.5rem;
    height: 0.6rem;
    overflow: hidden;
}

.active i {
    float:left;
    width: 1px;
    height: 0.6rem;
    margin-right: 0.1rem;
    background-color: #31c27c;
    animation: upAndDown 4s infinite linear;
}

.active i:nth-of-type(1) {
    -webkit-animation-duration:800ms;
}

.active i:nth-of-type(2) {
    -webkit-animation-duration:1200ms;
}

.active i:nth-of-type(3) {
    -webkit-animation-duration:1400ms;
}

.active i:nth-of-type(4) {
    margin-right:0;
    -webkit-animation-duration:1000ms;
}

@keyframes upAndDown{
    0% {transform: translateY(0);}
    15% {transform: translateY(0.2rem);}
    35% {transform: translateY(0.4rem);}
    50% {transform: translateY(0.6rem);}
    65% {transform: translateY(0.4rem);}
    85% {transform: translateY(0.2rem);}
    100% {transform: translateY(0);}
}


.controller-wrap {
    .row {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;

        .icon {
            width: 1.5rem;
            height: 1.5rem;
            display: inline-block;
            margin: 0.75rem 1rem;
            background-image: url(https://y.gtimg.cn/mediastyle/mobile/app/share/img/sprite_play.png);
            background-size: 160%;
        }
        .icon-prev, .icon-next {
            flex: 1;
            width: 0;
            background-image: none;
        }
        .icon-list {
            background-position: 0 -14.1rem;
        }
        .icon-fav {
            background-position: 0 0.2rem;
            
        }
    }

    .songList {
        color: #fff;
        font-size: 0.7rem;
        max-height: 13.8rem;
        padding: 0.5rem 0.75rem 0.75rem;
        background-color: rgba(0, 0, 0, 0.55);
        p {
            line-height: 2rem;
            font-size: 0.9rem;
            position: relative;
            text-align: center;
            border-bottom: 1px solid rgba(255,255,255,.3);
            span {
                color: rgba(255, 255, 255, 0.6);
                font-size: 0.75rem;
            }
        }
        .icon-back {
            position: absolute;
            right: 0rem;
            top: 0.4rem;
            width: 1rem;
            height: 1rem;
            &:before, &:after {
                position: absolute;
                content: '';
                right: 0;
                top: 50%;
                width: 100%;
                height: 1px;
                background-color: #fff;
                transform: rotate(45deg);
            }
            &:after {
                transform: rotate(-45deg);
            }
        }
        li {
            line-height: 2rem;
            border-bottom: 1px solid rgba(255,255,255,.15);
        }
        .active {
            color: #31c27c;
            position: relative;
        }
    }
}
</style>
