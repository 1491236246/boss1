<template>
  <div class="left">
    <div class="left_global" v-for="(value,index) in dataList" v-show="(indexs-1)==index" :key="index">
        <div v-for="(val,ind) in value">
            <div class="left_title">{{val.title}}</div>
            <router-link v-for="(v,i) in val.child_list" :to="v.path" tag="span" :key="v.ind">
                 <div :class="{left_content:true,left_select:cl_index==v.ind}" @click="cl_index=v.ind">{{v.name}}</div>
            </router-link>
        </div>       
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'left',
  data(){
    return {
      cl_index:1,
      dataList:[
          [{
              title:"系统首页",
              child_list:[{ind:1,name:"• 系统首页",path:"/index/home"},{ind:2,name:"• 账户设置",path:"/index/settings"},{ind:3,name:"• 系统信息",path:"/index/systeminfo"},{ind:4,name:"• 登陆日志",path:"/index/loginIn"}]
          }],
          [
            {
                title:"商品管理",
                child_list:[{ind:5,name:"• 商品列表",path:"/index/List"},{ind:6,name:"• 添加商品"},{ind:7,name:"• 商品回收站"},{ind:8,name:"• 商品评价"}]
            },
            {
                title:"商品配置",
                child_list:[{ind:9,name:"• 商品分类"},{ind:10,name:"• 商品类型"},{ind:11,name:"• 品牌管理"},{ind:12,name:"• 图片库管理"}]
            }
          ],
      ]
    }
  },
  mounted() {
      console.log(this.indexs);
  },
  methods: {
    
  },
  computed: {
    ...mapState([
        'indexs'
    ])
  }
}
</script>

<style lang="less" scoped>
    .left{
        width:180px;
        height:92vh;
        overflow:auto;
        background:#eaedf1;
        float:left;
        border-right:1px solid #d8d0d0;
        box-sizing: border-box;
    
        .left_title{
            height:50px;
            line-height:50px;
            padding-left:38px;
            background:#f2f2f2;
            color:#999999;
            font-size:14px;
        }
        .left_content{
            height:40px;
            line-height:40px;
            padding-left:30px;
            font-size:12px;
            color:#666666;
            border-bottom:1px solid #e2dede; 
        }
        .left_select{
            background:#ffffff;
            color:#1abc9ccc;
        }
    }
</style>
