<template>
  <div class="index">
    <header-top></header-top>
    <left-model/>
    <router-view v-if="isLoad"></router-view>
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
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
     isLoad:true
    }
  },
  methods: {
    reload(){
      this.isLoad=false;
      this.$nextTick(()=>{
        this.isLoad=true;
      })
    }
  },
}
</script>

<style lang="less">

</style>
