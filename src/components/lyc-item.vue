<template>
  <div class="lyc">
      <div class="lyc-wrap-inner">
        <template v-for='(item, index) in lycArr'>
          <p class="nowrap" :data-time=item.time :class='{"lyc-active": index==0}'>{{item.lyc}}</p>
        </template>
      </div>
  </div>
</template>

<script>
  export default {
      props: {
          lycArr: {
              type: Array,
              default: []
          }
      },
      methods: {

      }
  }
</script>

<style lang='less'>
.lyc {
    height: 16rem;
    width: 100%;
    overflow: hidden;
    position: relative;

    .lyc-wrap-inner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;

        p {
            padding: 0 1rem;
            box-sizing: border-box;
        }
    }
}

.lyc-active {
    color: #31c27c;
}

</style>
