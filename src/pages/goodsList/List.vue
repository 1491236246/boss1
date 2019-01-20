<template>
  <div class="Lists global_div">
  <content-top titlename="商品列表"></content-top>
   <div class="center_div">
        <div class="list_head">
            <div></div>
        </div>
   </div>
  </div>
</template>

<script>
// import ContentTop from '@/components/ContentTop.vue'
export default {
  name: 'Lists',
  comments:{

  },
  data(){
    return {
     
    }
  },
  mounted() {
    // console.log(process.env.NODE_ENV);
  },
  methods: {
    
  },
}
</script>

<style lang="less">
.list_head{
    height:114px;
    background:#ffffff;
    margin-top:20px;
}
</style>
