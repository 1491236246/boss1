<template>
<div class="orderReturn global_div">
    <content-top titlename="退货申请"></content-top>
    <div class="center_div">
        <el-button :class="{bakc_el:status=='all'}" @click="status='all'">全部申请({{all}})</el-button>
        <el-button :class="{bakc_el:status==1}" @click="status=1">待处理(<span class="spa_red">{{dfk}}</span>)</el-button>
        <el-button :class="{bakc_el:status==2}" @click="status=2">退货中(<span class="spa_red">{{dfh}}</span>)</el-button>
        <el-button :class="{bakc_el:status==6}" @click="status=6">已完成(<span class="spa_red">{{yfh}}</span>)</el-button>
        <el-button :class="{bakc_el:status==3}" @click="status=3">已拒绝(<span class="spa_red">{{ywc}}</span>)</el-button>
       

    <div class="list_head">
        <div class="div_search">
            <div>
                <i class="el-icon-search"></i>
                筛选查询
            </div>
            <div>
                <span class="spa_cur" @click="visibleSearch=false" v-show="visibleSearch">
                <i class="el-icon-arrow-up"></i>
                收起筛选
                </span>
                <span class="spa_cur" @click="visibleSearch=true" v-show="!visibleSearch">
                <i class="el-icon-arrow-down"></i>
                打开筛选
                </span>
                <el-button @click="getStatus(1,'')">查询结果</el-button>
            </div>
        </div>
        <div class="div_center" v-show="visibleSearch">
            <span class="list_conditions">输入搜索:</span>
            <el-input placeholder="订单编号" clearable class="search_input" v-model="searchcode"></el-input>
            <span class="list_conditions">用户账号:</span>
            <el-input placeholder="收货人姓名" clearable class="search_input" v-model="receiver"></el-input>
            <span class="list_conditions">提交时间:</span>
            <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
        </div>
    </div>

    <div class="list_title">
        <span>
            <img src="@/assets/list/u28.png">&nbsp;数据列表
        </span>
        <el-button class="button-fr" @click="exportExcel">
            导出订单
        </el-button>
    </div>

    <el-table v-loading="loading" id='aaa' class="mall-table" :data="tableData3" ref="table"
                @selection-change="tableSelection">
        <el-table-column
            type="selection"
            width="55" :selectable='checkboxT' disabled='true'>
        </el-table-column>
        <el-table-column label="服务单号">
          <template slot-scope="scope">{{ scope.row.code }}</template>
        </el-table-column>
        <el-table-column label="申请时间">
          <template slot-scope="scope">{{ scope.row.creatTime }}</template>
        </el-table-column>
        <el-table-column label="用户账号">
          <template slot-scope="scope">{{ scope.row.mobilePhone }}</template>
        </el-table-column>
        <el-table-column label="退款金额">
          <template slot-scope="scope">{{ scope.row.applicationReturnMoney }}</template>
        </el-table-column>

        <el-table-column label="申请状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">待处理</span>
            <span v-else-if="scope.row.status == 2">同意退货</span>
            <span v-else-if="scope.row.status == 3">拒绝退货</span>
            <span v-else-if="scope.row.status == 4">收到货确认退款</span>
            <span v-else-if="scope.row.status == 5">收到货拒绝退款</span>
            <span v-else>完成</span>
          </template>


        </el-table-column>
 
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="table-btn" v-if="scope.row.status == 1"
                  @click="$router.push('/order/returnGoods/returnGoodsDetail?id=' + scope.row.id)">查看详情</span>
            <span class="table-btn" v-else-if="scope.row.status == 3" @click="remove([scope.row.id])">删除</span>
          </template>
        </el-table-column>
      </el-table>

        <div class="list_footer">
            <div class="lists_wrap">
                <el-checkbox v-model="checked" @change="toggleSelection(tableData3)">全选</el-checkbox>&nbsp;
                <el-select v-model="operation" placeholder="批量操作" size="mini">
                    <el-option label="删除" value="删除"></el-option>
                </el-select>&nbsp;
                <el-button size="mini" @click="deleteEre">确定</el-button>
            </div>
            <el-pagination
            @current-change="getStatus"
            :current-page="1"
            layout="total,prev, pager, next, jumper"
            :total="total"
            style="float:right"
            ></el-pagination>
        </div>




    </div>
</div>
</template>

<script>
import {Message} from 'element-ui'
export default {
  name: 'orderreturn',
  data(){
    return {
        checked:false,
        visibleSearch:false,
        status:"all",
        orderData:{},
        all:"",
        dfk:"",
        dfh:"",
        yfh:"",
        ywc:"",
        ygb:"",
        loading:false,
        pageSize:10,
        receiver:"",
        searchcode:"",
        value1:"",
        tableData3:[],
        total:null,
        checkItemId:[],
        idList:[],
        operation:"",
    }
  },
  created() {
      this.onload();
      this.getStatus(1,"");
  },
  methods: {
    remove(id) {
        this.$confirm("确认删除吗?").then(() => {
          this.$http.post('/merchant_return_goods/delete', {ids: id}).then(() => {
            Message.success("删除成功");
            this.getStatus(1, this.status);
            this.onlond();
          }, (err) => {
            Message.error(err.msg);
          })
        })
    },
    deleDates(idlist){
        this.$confirm('确定删除订单嘛', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then((result) => {
            this.$http.post('/merchant_return_goods/delete', {
                id: idlist,
                status: 20,
                merchantId: JSON.parse(this.$store.getters.userInfo).merchantId
            }).then((res) => {
                this.getStatus(1,"");
                Message.success("删除成功");
            })
        })
    },
    tableSelection(val){
        this.idList=val;
    },
    deleteEre() {
        if (this.operation == "" || this.idList == "") {
            Message.warning("未选择操作项");
        } else {
            let idlists = this.idList.map(item => {
                return item.id;
            });
            this.deleDates(idlists);
        }
    },
    getStatus(pageSize11,val){
        this.loading=true;
        this.$http.post('/merchant_return_goods/query_for_page', {
            currentPage: pageSize11,
            pageSize: this.pageSize,
            contact: this.receiver,
            code: this.searchcode,
            creatTime: this.value1,
            status: val,
            merchantId: JSON.parse(localStorage.userInfo).merchantId
        }).then((res) => {
            this.total = res.totalCount;
            this.tableData3 = res.list;
            this.loading=false;
        }, (err) => {
            Message.error(err.msg);
        });
    },
    onload(){
        this.$http.post('/merchant_return_goods/getCountByStatus', {
          status: '',
          merchantId: JSON.parse(localStorage.userInfo).merchantId
        }).then((res) => {
          this.all = res;
        })
        this.$http.post('/merchant_return_goods/getCountByStatus', {
          status: 1,
          merchantId: JSON.parse(localStorage.userInfo).merchantId
        }).then((res) => {
          this.dfk = res;
        })
        this.$http.post('/merchant_return_goods/getCountByStatus', {
          status: 2,
          merchantId: JSON.parse(localStorage.userInfo).merchantId
        }).then((res) => {
          this.dfh = res;
					console.log(res)
        })
        this.$http.post('/merchant_return_goods/getCountByStatus', {
          status: 6,
          merchantId: JSON.parse(localStorage.userInfo).merchantId
        }).then((res) => {
          this.ywc = res;
        })
        this.$http.post('/merchant_return_goods/getCountByStatus', {
          status: 3,
          merchantId: JSON.parse(localStorage.userInfo).merchantId
        }).then((res) => {
          this.ygb = res;
        })
    }
  },
  watch: {
      status:function(nowval){
          console.log(nowval)
        this.getStatus(1,nowval);
      }
  },
}
</script>

<style lang="less" scoped>
.orderReturn{
    .center_div{
        margin-top:20px;
    }
    .bakc_el{
        background:#5BC0BF;
        color:#ffffff;
        .spa_red{
            color:#ffffff;
        }
    }
    .list_head {
        background: #ffffff;
        margin: 20px 0;
        border: 1px solid #cccccc;
    .div_search {
        overflow: hidden;
        height: 50px;
        background: #f3f3f3;
        padding: 10px 10px 0 10px;
        border-bottom: 1px solid #cccccc;
      > div:first-child {
            float: left;
            margin-top: 10px;
      }
      > div:last-child {
            float: right;
      }
      .spa_cur {
         cursor: pointer;
      }
    }
    .div_center {
        height: 42px;
        padding: 10px 20px;
      .search_input {
            width: 180px;
      }
      .list_conditions {
            color: #5a5a5a;
            font-size: 14px;
            margin-left: 40px;
      }
    }
  }
  .list_title {
      height: 60px;
      line-height: 40px;
      background: #f3f3f3;
      border: 1px solid #cccccc;
      padding: 10px 20px;
      box-sizing: border-box;
      > span {
        font-size: 16px;
        margin-top: 5px;
      }
      .el_right{
          float:right;
          margin:5px 10px;
      }
      .button-fr{
          float:right;
      }
    }
}
</style>
