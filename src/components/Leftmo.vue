<template>
  <div class="left">
    <div class="left_global" v-for="(value,index) in dataList" v-show="(indexs-1)==index" :key="index">
        <div v-for="(val,ind) in value">
            <div class="left_title">{{val.title}}</div>
            <router-link v-for="(v,i) in val.child_list" :to="v.path" tag="span" :key="v.ind">
                 <div :class="{left_content:true,left_select:pathName.leftPath==getpath(v.path)}" @click="changeValue($route.path)">{{v.name}}</div>
            </router-link>
        </div>       
    </div>
    
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'left',
  data(){
    return {
      cl_index:1,
      dataList:[
          [{
              title:"系统首页",
              child_list:[{ind:1,name:"• 系统首页",path:"/index/homes/home"},{ind:2,name:"• 账户设置",path:"/index/homes/settings"},{ind:3,name:"• 系统信息",path:"/index/homes/systeminfo"},{ind:4,name:"• 登陆日志",path:"/index/homes/loginIn"}]
          }],
          [
            {
                title:"商品管理",
                child_list:[{ind:5,name:"• 商品列表",path:"/index/goodslist/List"},{ind:6,name:"• 添加商品",path:"/index/goodslist/goodsAppend"},{ind:7,name:"• 商品回收站",path:"/index/goodslist/goodsrecyc"},{ind:8,name:"• 商品评价",path:"/index/goodslist/goodseval"}]
            },
            {
                title:"商品配置",
                child_list:[{ind:9,name:"• 商品分类",path:"/index/goodslist/goodsclass"},{ind:10,name:"• 商品类型",path:"/index/goodslist/goodstype"},{ind:11,name:"• 品牌管理",path:"/index/goodslist/goodsbrand"},{ind:12,name:"• 商品图片库",path:"/index/goodslist/goodsimage"}]
            }
          ],    
          [{
              title:"订单管理",
              child_list:[{ind:13,name:"• 订单列表",path:"/index/orderlist/orderList"},{ind:14,name:"• 确认收货",path:"/index/orderlist/orderreceipt"},{ind:15,name:"• 订单设置",path:"/index/orderlist/orderseting"}]
          },
          {
              title:"退款及退货",
              child_list:[{ind:16,name:"• 退货申请处理",path:"/index/orderlist/orderreturn"},{ind:17,name:"• 退款申请处理",path:"/index/orderlist/orderrefund"},{ind:18,name:"• 退货原因设置",path:"/index/orderlist/ordercause"},{ind:19,name:"• 发货点信息管理",path:"/index/orderlist/orderaddress"}]
          }],
          [{
              title:"头部类目",
              child_list:[{ind:20,name:"• 类目列表",path:"/index/prolist/proheader"},{ind:21,name:"• 添加类目",path:"/index/prolist/proaddheader"}]
          },
          {
              title:"拼团管理",
              child_list:[{ind:22,name:"• 拼团商品列表",path:"/index/prolist/proList"},{ind:23,name:"• 添加拼团商品",path:"/index/prolist/proAddlist"},{ind:24,name:"• 成团管理",path:"/index/prolist/proGrouplist"},{ind:25,name:"• 订单管理",path:"/index/prolist/proOrder"}]
          }
          ],
          [{
              title:"库存记录",
              child_list:[{ind:26,name:"• 商品入库",path:"/index/stocklist/stockDity"},{ind:27,name:"• 商品出库",path:"/index/stocklist/stockOut"}]
          }],
          [{
              title:"用户管理",
              child_list:[{ind:28,name:"• 用户管理",path:"/index/user/userLIst"}]
          }],
          [{
              title:"广告管理",
              child_list:[{ind:29,name:"• 广告列表",path:"/index/operate/advertising"},{ind:30,name:"• 添加广告",path:"/index/operate/Addadvert"}]
          }],
          [{
              title:"权限",
              child_list:[{ind:31,name:"• 操作日志",path:"/index/diction/Journal"}]
          }]
      ]
    }
  },
  mounted() {
  },
  methods: {
     ...mapMutations([
      'changeValue',
      'increment'
    ]),
    getpath(val){
        let psth=val.split("/")[3]
        return psth;
    }
  },
  computed: {
    ...mapState([
        'indexs',
        'pathName'
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
