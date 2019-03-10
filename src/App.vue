<template>
  <div id="app">
    <keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import './global/global.css'
export default {
  
}
</script>

<style lang="less">

</style>
