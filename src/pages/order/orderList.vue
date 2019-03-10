<template>
    <div class="global_div orderList">
        <content-top titlename="订单列表"></content-top>
        <div class="center_div">
            <el-button :class="{bakc_el:status=='all'}" @click="status='all'">全部订单({{orderData.allOrder}})</el-button>
            <el-button :class="{bakc_el:status==1}" @click="status=1">待付款(<span class="spa_red">{{orderData.dfk}}</span>)</el-button>
            <el-button :class="{bakc_el:status==2}" @click="status=2">待发货(<span class="spa_red">{{orderData.dfh}}</span>)</el-button>
            <el-button :class="{bakc_el:status==3}" @click="status=3">已发货(<span class="spa_red">{{orderData.dsh}}</span>)</el-button>
            <el-button :class="{bakc_el:status==5}" @click="status=5">已完成(<span class="spa_red">{{orderData.ywc}}</span>)</el-button>
            <el-button :class="{bakc_el:status==0}" @click="status=0">已关闭(<span class="spa_red">{{orderData.ygb}}</span>)</el-button>

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
                        <el-button @click="getData(1)">查询结果</el-button>
                    </div>
                </div>
                <div class="div_center" v-show="visibleSearch">
                    <span class="list_conditions">输入搜索:</span>
                    <el-input placeholder="请输入订单编号" clearable class="search_input" v-model="name"></el-input>
                    <span class="list_conditions">用户账号:</span>
                    <el-input placeholder="请输入用户账号" clearable class="search_input" v-model="account"></el-input>
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

            <el-table
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                v-loading="loading"
                border
                @selection-change="handleSelectionChange"
                id="aaa"
            >
                <el-table-column type="selection" width="55"></el-table-column>

                <el-table-column prop="code" label="订单编号"></el-table-column>

                <el-table-column label="提交时间" prop="creatTime"></el-table-column>

                <el-table-column prop="mobilePhone" label="用户账号"></el-table-column>

                <el-table-column label="订单金额" prop="totalMoeny"></el-table-column>

                <el-table-column label="支付方式">
                    <template slot-scope="scope">微信小程序支付</template>
                </el-table-column>

                <el-table-column label="订单来源">
                    <template slot-scope="scope">微信小程序</template>
                </el-table-column>

                <el-table-column label="订单状态">
                    <template slot-scope="scope">{{scope.row.status | filStatus}}</template>
                </el-table-column>

                <el-table-column label="订单操作">
                <template slot-scope="scope">
                    <span
                    class="col_span"
                    @click="outGoods(scope.row.id,scope.row.mobilePhone)"
                    >查看订单</span>&nbsp;
                    <span class="col_span" @click="deleDates([scope.row.id])">删除订单</span>
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
                @current-change="getData"
                :current-page="1"
                layout="total,prev, pager, next, jumper"
                :total="totalCount"
                style="float:right"
                ></el-pagination>
            </div>

        </div>
    </div>
</template>

<script>
import {Message} from 'element-ui'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
export default {
    name: 'orderList',
    data(){
        return {
            operation:"",
            peration: "",
            checked: false,
            visibleSearch:false,
            name:null,
            loading:true,
            orderData:{},
            currentPage: 1,
            totalCount: null,
            tableData3:[],
            idList:[],
            status:'all',
            account:null
        }
    },
    created() {
        this.getData(1);
    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        deleDates(idlist){
            this.$confirm('确定关闭订单嘛', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then((result) => {
                this.$http.post('/merchant_order/update', {
                    id: idlist,
                    status: 20,
                    merchantId: JSON.parse(this.$store.getters.userInfo).merchantId
                }).then((res) => {
                    this.getData(1);
                    Message.success("删除成功");
                })
            })
        },
        outGoods(id,phone){
            console.log(phone);
            this.$router.push({name:"orderdetail",query:{id:id,iphone:phone}});
        },
        getData(page){
            this.$http.post('merchant_order/getOrderAllCount',{
                merchantId:JSON.parse(localStorage.getItem("userInfo")).merchantId
            }).then((res)=>{
                this.orderData=res;
            });

            let status=this.status;
            if(this.status=='all'){
                status='';
            }

            this.$http.post('/merchant_order/query_for_page',{
                currentPage: page,
                pageSize: 10,
                phone: this.account,
                code: this.name,
                status: status,
                merchantId: JSON.parse(localStorage.userInfo).merchantId
            }).then((res)=>{
                this.totalCount = res.totalCount;
                this.tableData3 = res.list;
                this.loading=false;
            });
        },
        exportExcel(){
            let date = new Date().getTime()
            //let o =
            var wb = XLSX.utils.table_to_book(document.querySelector('#aaa'),{raw:true})
            /* get binary string as output */
            var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
            try {
            FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), date + '.xlsx')
            } catch (e) {
            if (typeof console !== 'undefined') console.log(e, wbout)
            }
            return wbout
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
        handleSelectionChange(val) {    
            this.idList = val;
        }
    },
    filters:{
        filStatus:function(nowval){
            let statuse;
            switch (nowval) {//0关闭1待付款2待发货3已发货 4已收货5已评价 6已完成 20删除
              case 0:
                statuse = '已关闭'
                break
              case 1:
                statuse = '待付款'
                break
              case 2:
                statuse = '待发货'
                break
              case 3:
                statuse = '待收货'
                break
              case 4:
                statuse = '待评价'
                break
              case 5:
                statuse = '已完成'
                break
              case 20:
                statuse = '已删除'
                break
            }
            return statuse;
        }
    },
    watch: {
        status:function(val){
            console.log(val);
            this.getData(1);
        }
    },
}
</script>

<style lang="less" scoped>
.orderList{
    .center_div{
        padding-top:20px;
        .spa_red{
            color:#ff0000;
        }
        .bakc_el{
            background:#5BC0BF;
            color:#ffffff;
            .spa_red{
                color:#ffffff;
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
    .col_span{
        color:#1abc9c;
        cursor:pointer;
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
}
</style>
