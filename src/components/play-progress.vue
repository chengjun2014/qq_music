<template>
<div class="progress-wrap">
    <div class="time">{{currentTime | sec2Time}}</div>
    <div class="play-progress">
        <div class="bar-bg" :style="{width: width + '%'}"></div>
    </div>
    <div class="time">{{totalTime | sec2Time}}</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            width: 0
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
    methods: {

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
</style>
