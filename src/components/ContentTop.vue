<template>
  <div class="contenttop">
      <div class="content_title">
        <span><span class="content_border"></span>&nbsp;{{titlename}}</span>
        <span class="content_refresh" @click="reload">刷新</span>
      </div>
  </div>
</template>

<script>

export default {
  inject:['reload'],
  name: 'index',
  props:["titlename"],
  data(){
    return {
     
    }
  },
  methods: {
    
  },
}
</script>

<style lang="less" scoped>
    .contenttop{
        width:100%;
        height:50px;
        background:#f3f3f3;
        padding-top:10px;
        border-bottom:1px solid #cccccc;
        box-sizing:border-box;
        .content_title{
            width:1100px;
            height:30px;
            line-height:30px;
            padding-left:3px;
            margin:0 auto;
            &>span:first-child{
                float:left;
                font-size:14px;
                color:#999999;
                .content_border{
                    float:left;
                    height:20px;
                    width:5px;
                    background:#1abc9c;
                    margin-top:5px;
                }
            }
            &>span:last-child{
                float:right;
                width:80px;
                height:30px;
                text-align:center;
                line-height:30px;
                border:1px solid #cccccc;
                box-sizing:border-box;
                color:#666666;
                background:#ffffff;
                cursor:pointer;
            }
        }
    }
</style>
