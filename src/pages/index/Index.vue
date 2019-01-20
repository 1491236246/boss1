<template>
  <div class="index">
    <header-top></header-top>
    <left-model/>
    <router-view/>
  </div>
</template>

<script>
import HeaderTop from '@/components/Header.vue'
import LeftModel from '@/components/Leftmo.vue'
export default {
  name: 'index',
  components:{
      HeaderTop,
      LeftModel
  },
  data(){
    return {
     
    }
  },
  methods: {
    
  },
}
</script>

<style lang="less">

</style>
