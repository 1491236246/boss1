<template>
  <div class="global_div home">
    <content-top titlename="系统首页"></content-top>
      <div class="center_div">
        <div class="center_list">
          <ul>
            <li>
              <img src="@/assets/home/u2480.png" />
              <p class="p_title">今日订单总数</p><br/>
              <p>{{res_data.todayOrderNum}}</p>
            </li>
            <li>
              <img src="@/assets/home/u2501.png" />
              <p class="p_title">今日销售总额</p><br/>
              <p>￥{{res_data.todayOrderMoney}}</p>
            </li>
            <li>
              <img src="@/assets/home/u2590.png" />
              <p class="p_title">昨销售总额</p><br/>
              <p>￥{{res_data.yesterdayOrderMoney}}</p>
            </li>
            <li>
              <img src="@/assets/home/u2470.png" />
              <p class="p_title">近7天销售总额</p><br/>
              <p>￥{{res_data.nearlySevenDaysOrderMoney}}</p>
            </li>
          </ul>
        </div>
        <div class="affair_div">
          <div class="affair_head">待处理事务</div>
          <div class="affair_list">
            <div>
                <div>
                  <span>待付款订单</span>
                  <span>(<span class="red_span">{{res_data.dfk}}</span>)</span>
                </div>
                <div>
                  <span>待发货订单</span>
                  <span>(<span class="red_span">{{res_data.dfh}}</span>)</span>
                </div>
                <div>
                  <span>已发货订单</span>
                  <span>(<span class="red_span">{{res_data.dsh}}</span>)</span>
                </div>
            </div>
            <div>
                <div>
                  <span>已完成订单</span>
                  <span>(<span class="red_span">{{res_data.ywc}}</span>)</span>
                </div>
                <div>
                  <span>已关闭订单</span>
                  <span>(<span class="red_span">{{res_data.ygb}}</span>)</span>
                </div>
                <div>
                  <span>待处理退货订单</span>
                  <span>(<span class="red_span">10</span>)</span>
                </div>
            </div>
            <div>
                <div>
                  <span>待确认退货订单</span>
                  <span>(<span class="red_span">{{res_data.dqrth}}</span>)</span>
                </div>
                <div>
                  <span>待处理退款订单</span>
                  <span>(<span class="red_span">{{res_data.dcltk}}</span>)</span>
                </div>
                <div>
                  <span>广告位即将到期</span>
                  <span>(<span class="red_span">10</span>)</span>
                </div>
            </div>
          </div>
        </div>
        <div class="affair_div">
          <div class="affair_head">运营快捷入口</div>
          <ul class="affair_contul">
            <li @click="$router.push({name:'basic'})">
              <img src="@/assets/home/u349.png" />
              <p>添加商品</p>
            </li>
            <li @click="$router.push({name:'orderList'})">
              <img src="@/assets/home/u349.png" />
              <p>订单列表</p>
            </li>
            <li>
              <img src="@/assets/home/u349.png" />
              <p>用户管理</p>
            </li>
            <li>
              <img src="@/assets/home/u349.png" />
              <p>交易统计</p>
            </li>
            <li>
              <img src="@/assets/home/u349.png" />
              <p>广告管理</p>
            </li>
          </ul>
        </div>
        <div class="affair_overview">
          <div class="overview_sp">
            <div>商品总览</div>
            <div>
              <div>
                <p>100</p>
                <span>已下架</span>
              </div>
              <div>
                <p>400</p>
                <span>已上架</span>
              </div>
              <div>
                <p>50</p>
                <span>库存紧张</span>
              </div>
              <div>
                <p>500</p>
                <span>全部商品</span>
              </div>
            </div>
          </div>
          <div class="overview_yh">
            <div>用户总览</div>
            <div>
              <div>
                <p>100</p>
                <span>今日新增</span>
              </div>
              <div>
                <p>200</p>
                <span>昨日新增</span>
              </div>
              <div>
                <p>1000</p>
                <span>本月新增</span>
              </div>
              <div>
                <p>5000</p>
                <span>会员总数</span>
              </div>
            </div>
          </div>
        </div>
        <div class="affair_echarts">
          <div class="affair_head">统计订单</div>
          <div class="ech_Statistics">
            <p>
              <span class="ech_znumber">本月订单总数</span><br />
              <span class="ech_bignum">10000</span><br />
              <span>
                <img src="@/assets/home/u1291.png" />
                <span class="ech_green">10%</span>
                <span class="ech_hui">同比上周</span>
              </span>
            </p>
            <p>
              <span class="ech_znumber">本月订单总数</span><br />
              <span class="ech_bignum">1000</span><br />
              <span>
                <img src="@/assets/home/u1284.png" />
                <span class="ech_red">10%</span>
                <span class="ech_hui">同比上周</span>
              </span>
            </p>
          </div>
          <div class="echarts_ldi">
            <div class="ech_date">
              <span :class="{gre:gre_index==1}" @click="gre_index=1">今日</span>
              <span :class="{gre:gre_index==2}" @click="gre_index=2">本周</span>
              <span :class="{gre:gre_index==3}" @click="gre_index=3">本月</span>
               <el-date-picker
                v-model="value6"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="echarts_model" id="echarts_div">

            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

export default {
  name: 'home',
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echarts_div'));
    // 绘制图表
    myChart.setOption({
    title: {
        text: '近一周订单统计',
        textStyle:{
          //文字颜色
          color:'#ccc',
          //字体风格,'normal','italic','oblique'
          fontStyle:'normal',
          //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
          fontWeight:'bold',
          //字体系列
          fontFamily:'sans-serif',
          //字体大小
  　　　　 fontSize:14
        }
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value',
            splitLine: {
            show: false
        }
        }
    ],
    series : [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            areaStyle: {
            normal: {
                color: '#8cd5c2' //改变区域颜色
            }
            },
            itemStyle : { 
              normal : { 
                  color:'#8cd5c2', //改变折线点的颜色
                  lineStyle:{ 
                  color:'#8cd5c2' //改变折线颜色
              } 
              } 
            },
            areaStyle: {},
            data:[70, 132, 250, 134, 90, 230, 210],
            smooth: true,
            //  symbol:'none',
             showSymbol: false,
        }
    ]
    });

    this.$http.post("merchant_order/getOrderAllCount", {
      merchantId: JSON.parse(localStorage.getItem("userInfo")).merchantId
    }).then((res) => {
      this.res_data=res;
    });

    this.$http.post("merchant/merchant_index").then((res) => {
        // this.userData = res
    });
  
  },
  data(){
    return {
      value6:'',
      gre_index:1,
      res_data:{},
    }
  },
  methods: {
    
  },
}
</script>

<style lang="less" scoped>
    .home{
      .center_list{
        margin:20px 0;
        &>ul{
          overflow:hidden;
          li{
            float:left;
            width:250px;
            height:100px;
            padding-top:20px;
            padding-left:20px;
            background:#ffffff;
            border:1px solid #cccccc;
            box-sizing:border-box;
            margin-right:25px;
            &>img{
              float:left;
            }
            &>p{
              float:left;
              margin: 0px 0px 0px 18px;
              color:#666;
              font-size:20px;
              font-weight:bold;
            }
            &>p.p_title{
              font-size:16px;
              font-weight:lighter;
              color:#999999;
            }

          }
        }
      }
      .affair_div,.affair_echarts{
        width:1073px;
        height:200px;
        margin-bottom:20px;
        border:1px solid #cccccc;
        background:#ffffff;
        box-sizing:border-box;
        .affair_head{
          height:45px;
          line-height:45px;
          color:#666666;
          background:#f3f3f3;
          padding-left:20px;
          border-bottom:1px solid #cccccc;
          box-sizing:border-box;
          font-size:14px;
          font-weight:700;
        }
        .affair_contul{
          overflow:hidden;
          height:155px;
          &>li{
            float:left;
            width:120px;
            height:122px;
            padding-top:30px;
            text-align:center;
          }
          &>li:hover{
            background:#f9f9f9;
          }
        }
        .affair_list{
          display:flex;
          &>div{
            flex:1;
            padding:0 20px;
            height:145px;
            margin-top:10px;
            &>div{
              height:30px;
              padding-top:10px;
              border-bottom:1px solid #f2f2f2;
              font-size:14px;
              &>span:first-child{
                float:left;
                color:#666666;
              }
              &>span:last-child{
                float:right;
                .red_span{
                  color:#ff0000;
                }
              }
            }
          }
        }
      }
      .affair_overview{
        width:1070px;
        height:200px;
        
        &>div{
          float:left;
          width:525px;
          height:100%;
          background:#ffffff;
          margin-right:20px;
          border:1px solid #cccccc;
          box-sizing:border-box;
          &>div:first-child{
            height:45px;
            background:#f3f3f3;
            border-bottom:1px solid #cccccc;
            box-sizing:border-box;
            line-height:45px;
            padding-left:20px;
            font-size: 14px;
            font-weight: 700;
            color:#666666;
          }
          &>div:last-child{
            display:flex;
            div{
              flex:1;
              text-align:center;
              padding-top:22px;
              p{
                font-size:28px;
                color:#F04844;
                margin-bottom:10px;
              }
              span{
                font-size:14px;
                color:#666666;
                font-weight:400;
              }
            }
          }
        }
        &>div:last-child{
          margin:0;
        }
      }
      .affair_echarts{
        height:367px;
        margin-top:20px;
        .ech_Statistics{
          width:145px;
          height:302px;
          border-right:1px solid #cccccc;
          float:left;
          padding-left:20px;
          padding-top: 20px;
          &>p{
            margin-bottom: 25px;
            .ech_znumber{
              font-family: '微软雅黑';
              font-weight: 400;
              font-style: normal;
              font-size: 12px;
              color: #989898;
            }
            .ech_bignum{
              font-size: 28px;
              color: #666666;
            }
            
            &>span:last-child{
              .ech_green{
                color:#00A950;
              }
              .ech_red{
                color:#F04844;
              }
              &>img:first-child+span{
                margin:0 5px;
              }
              .ech_hui{
                color:#cccccc;
              }
            }
          }
        }
        .echarts_ldi{
          float: left;
          width:904px;
          height: 312px;
          padding-top: 10px;
          .ech_date{
            text-align: right;
            padding-right: 20px;
            &>span{
              margin:0 10px;
              cursor: pointer;
              color:#666666;
            }
            &>span.gre{
              color:#1ABC9C;
            }
          }
          .echarts_model{
            width:904px;
            height: 260px;
            margin-top: 10px;
          }
        }
      }
    }
</style>
