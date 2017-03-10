<template>
  <li :data-time=lyc.time>{{lyc.lyc}}</li>
</template>

<script>

  export default {
    props: {
      lyc: {
        type: Object,
        default: {}
      }
    },
    methods: {

    }
  }
</script>

<style lang='less'>

</style>
