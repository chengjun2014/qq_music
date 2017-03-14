<template>
    <ul class="search-content">
        <template v-if='dataList.zhida.type == 2'>
            <li>
                <div class="flex-icon">
                    <img :src="src" alt="">
                </div>
                <div class="music-info">
                    <h3>{{dataList.zhida.singername}}</h3>
                    <p>
                        单曲：{{dataList.zhida.songnum}}
                        专辑：{{dataList.zhida.albumnum}}
                    </p>
                </div>
            </li>
        </template>
        <template v-for='item in dataList.song.list'>
            <li>
                <router-link :to="{name: 'Playing', params: {songid: item.songid}}">
                <div class="flex-icon">
                    <i class="icon-music"></i>
                </div>
                <div class="music-info">
                    <h3>{{item.songname}}</h3>
                    <p>
                        <template v-for='(singer, index) in item.singer'>
                            <span v-if='index'>&nbsp;/&nbsp;</span>
                            {{singer.name}}
                        </template>
                    </p>
                </div>
                </router-link>
            </li>
        </template>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        dataList: {
            type: Object,
            default: {}
        }
    },
    methods: {

    },
    computed: {
        src: function() {
            return "//y.gtimg.cn/music/photo_new/T001R68x68M000" + this.dataList.zhida.singermid + ".jpg"
        }
    }
}
</script>

<style lang='less'>
    .search-content {
        font-size: 0.6rem;
        color: #808080;
        background-color: #fff;
        li {
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            border-bottom: 1px solid #e5e5e5;
            padding: 0.4rem;
        }
        .flex-icon {
            width: 2rem;
            height: 2rem;
            margin-right: 0.6rem;
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 100%;
            }
        }
        .icon-music {
            background: url(../assets/search_sprite.png) left top no-repeat;
            background-size: cover;
            width: 1.1rem;
            height: 1rem;
            display: block;
            margin: 0.5rem 0 0 0.5rem;
        }
        .music-info {
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
            border-radius: 0;
        }
        h3 {
            font-size: 0.8rem;
            color: #000;
            font-weight: normal;
        }
    }

</style>
