<template>
  <div class="header">
  <span class="hea_tit">零售</span>
    <el-menu
      :default-active="pathName.titlePath"
      class="el-menu-demo"
      text-color="#fff"
      mode="horizontal"
      
      >
      <el-menu-item v-for="(value,index) in logoList" :index="value.path"  @click="increment(value.ind)">{{value.name}}</el-menu-item> 
    </el-menu>
    <div class="hea_information">
      <ul class="head_ico">
        <li @mouseover="show=2" @mouseout="show=1">
        <img src="@/assets/index/u2336.png">
        <span> admin</span>
        <transition name="fade">
          <div v-show="show==2" class="head_dinsure">
            <div class="insu_head">
              <span>登陆信息</span>
              <span>账户设置</span>
            </div>
            <ul class="head_insList">
              <li>• 本次登录：2018-09-03 14:36:21</li>
              <li>• 登录地区：广东省深圳市 (IP：183.14.135.1)</li>
              <li>• 上次登录：2018-09-03 14:36:21</li>
            </ul>
          </div>
        </transition>
        </li>
        <li><img src="@/assets/index/u2338.png"></li>
        <li @mouseover="show=3" @mouseout="show=1">
          <img src="@/assets/index/u2340.png">
          <span class="head_news">50</span>
          <transition name="fade">
          <div class="head_message" v-show="show==3">
            <div class="head_div">
              订单提示
            </div>
            <div class="head_num">
              <span>代付款订单</span>
              <span>(<span>10</span>)</span>
            </div>
            <div class="head_num">
              <span>代发货订单</span>
              <span>(<span>10</span>)</span>
            </div>
            <div class="head_num">
              <span>已发货订单</span>
              <span>(<span>10</span>)</span>
            </div>
            <div class="head_num">
              <span>已完成订单</span>
              <span>(<span>10</span>)</span>
            </div>
            <div class="head_div">
              广告位提示
            </div>
            <div class="head_num">
              <span>广告位即将到期</span>
              <span>(<span>10</span>)</span>
            </div>
          </div>
          </transition>
        </li>
        <li><img src="@/assets/index/u2326.png"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations,mapState } from 'vuex'
export default {
  name: 'login',
  data(){
    return {
      show:1,
      logoList:[
        {ind:"1",name:"首页",path:"homes"},
        {ind:"2",name:"商品",path:"goodslist"},
        {ind:"3",name:"订单",path:"orderlist"},
        {ind:"4",name:"促销",path:"prolist"},
        {ind:"5",name:"库存",path:"stocklist"},
        {ind:"6",name:"用户",path:"user"},
        {ind:"7",name:"运营",path:"operate"},
        {ind:"8",name:"权限",path:"diction"},
      ]
    }
  },
  created() {
   this.getPath();
  },
  methods: {
    ...mapMutations([
      'increment',
    ]),
    getPath(){
       let nowPath="";
        this.logoList.forEach((val,index) => {
          if(val.path==this.pathName.titlePath){
            nowPath=val.ind;
            return false;
          }
        });
        this.increment(nowPath);
    }
  },
  computed: {
    ...mapState([
        'pathName'
    ])
  },
  // watch: {
  //   pathName(val){
  //     console.log(val);
  //     this.getPath()
  //   }
  // },
}
</script>
<style lang="less" scoped >
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

.header{
  position:relative;

  .hea_tit{
    position:absolute;
    left:70px;
    height:50px;
    line-height:50px;
    font-size:18px;
    font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
    font-weight: 700;
    color:#ffffff;
  }
  .hea_information{
    position:absolute;
    right:10px;
    top:0;
    width:420px;
    height:50px;
    .head_ico{
      float:right;
      margin-top:15px;
    }
    .head_ico>li{
      float:left;
      width:85px;
      padding-left:15px;
      height:20px;
      line-height:20px;
      border-right:1px solid #4a4e5a;
      position:relative;
      &>span{
        font-family: '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 12px;
        color: #FFFFFF;
      }
      span.head_news{
        position: absolute;
        left: 25px;
        top: -11px;
        width: 20px;
        height: 20px;
        background: #ff5918;
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
      }
      div.head_dinsure{
        position:absolute;
        top:35px;
        left:-14px;
        width:420px;
        height:235px;
        background:#ffffff;
        color:#999999;
        box-shadow:0px 3px 9px #cccccc;
        z-index:2;
        div.insu_head{
          width:370px;
          height:45px;
          line-height:45px;
          padding:0 10px;
          margin:0 auto;
          border-bottom:1px solid #cccccc;
          span:first-child{
            float:left;
            height:45px;
          }
          span:last-child{
            float:right;
            height:45px;
          }
        }
        ul.head_insList{
          margin-left: 26px;
          margin-top: 67px;
        }
      }
      div.head_message{
        position:absolute;
        top:35px;
        left:-220px;
        width:420px;
        height:335px;
        background:#ffffff;
        color:#999999;
        box-shadow:0px 3px 9px #cccccc;
        z-index:2;
        div.head_div{
          width:350px;
          height:45px;
          line-height:45px;
          padding-left:20px;
          padding-right:20px;
          border-bottom:1px solid #cccccc;
          box-sizing:border-box;
          color:#999999;
          margin:0 auto;
        }
        div.head_num{
          width:350px;
          height:40px;
          padding:11px 20px 0 20px;
          border-bottom:1px solid #cccccc;
          box-sizing:border-box;
          margin:0 auto;
          color:#666666;
          &>span:first-child{
            float:left;
          }
          &>span:last-child{
            font-size:16px;
            float:right;
            span{
              color:#ff0000;
            }
          }
        }
      }
    }
    .head_ico>li:last-child{
      width:80px;
    }
  }
}
</style>
<style lang="less" scoped>
  .header {
    background-color:#595e6c;
    height:50px;
    padding-left:125px;
    .el-menu{
      background-color:#595e6c;
    }
    .el-menu-item{
      border:none;
      font-size:12px;
      font-weight: 409;
      font-style: normal;
      font-size: 12px;
    }
    .el-menu-item.is-active{
        background:#828690;
        color:#ffffff;
        border:none;
    }
    .el-menu-item:not(.is-disabled):hover,.el-menu-item:not(.is-disabled):focus{
      background:#828690;
      color:#ffffff;
    }
    .el-menu--horizontal>.el-menu-item{
      height:50px;
      line-height:50px;
    }
  }
</style>


