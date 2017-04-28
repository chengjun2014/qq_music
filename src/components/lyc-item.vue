<template>
  <div class="lyc">
      <div class="lyc-wrap-inner" ref="lycList" :style="{top: top}">
            <template v-for='(item, index) in lycArr'>
                <p :class='{"lyc-active": index == curIndex}'>{{item.lyc}}</p>
            </template>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            curIndex: 0,
            top: 0
        }
    },
    props: {
        lycArr: Array,
        currentTime: Number
    },
    methods: {

    },
    watch: {
        currentTime: function(newNum, oldNum) {
            if (!this.lycArr[this.curIndex]) {
                return;
            }

            if(this.lycArr[this.curIndex + 1] && newNum >= this.lycArr[this.curIndex + 1]['time']) {
                this.curIndex++;
            }

            if (this.curIndex > 3 && this.curIndex < this.lycArr.length - 5) {
                this.top = (3 - this.curIndex) * 2 + 'rem';
            }
        },
        lycArr: function(lyc, oldlyc) {
            this.top = 0;
            this.curIndex = 0;
        }
    }
}
</script>

<style lang='less'>
.lyc {
    height: 18rem;
    width: 100%;
    overflow: hidden;
    position: relative;

    .lyc-wrap-inner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        transition: top 350ms;
        p {
            padding: 0 1rem;
            box-sizing: border-box;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

.lyc-active {
    color: #31c27c;
}

</style>
