<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
html{
    font-size: 20px;
}
body, h1, h2, h3, p {
    margin: 0;
    padding: 0;
}
a {
    text-decoration: none;
}
li {
    list-style: none;
}
.f-fl {
    float: left;
}
.f-fr {
    float: right;
}
.f-cb {
    display: block;
    zoom: 1;
    &:after {
        content: "";
        display: block;
        font-size: 0;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}
</style>
