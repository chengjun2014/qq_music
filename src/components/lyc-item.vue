<template>
  <li :data-time=lyc.time :class='{"lyc-active": index==0}'>{{lyc.lyc}}</li>
</template>

<script>

  export default {
      props: {
          lyc: {
              type: Object,
              default: {}
          },
          index: {
              type: Number,
              default: 0
          }
      },
      methods: {

      }
  }
</script>

<style lang='less'>
.lyc-active {
  color: #31c27c;
}
</style>
