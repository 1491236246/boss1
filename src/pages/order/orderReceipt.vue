<template>
    <div class="orderReceipt global_div">
        <content-top titlename="确认收货"></content-top>
        <div class="center_div"> 
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
                        <el-button @click="getData">查询结果</el-button>
                    </div>
                </div>
                <div class="div_center" v-show="visibleSearch">
                    <span class="list_conditions">输入搜索:</span>
                    <el-input placeholder="订单编号" clearable class="search_input" v-model="member"></el-input>
                    <span class="list_conditions">用户账号:</span>
                    <el-input placeholder="用户账号" clearable class="search_input" v-model="idType"></el-input>
                </div>
            </div>


            <div class="list_title">
                <span>
                    <img src="@/assets/list/u28.png">&nbsp;数据列表
                </span>
            </div>

            <el-table
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                v-loading="loading"
                border
                id="aaa"
            >

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
                    <template slot-scope="scope">待收货</template>
                </el-table-column>

                <el-table-column label="订单操作">
                <template slot-scope="scope">
                    <span
                    class="col_span"
                   @click="$router.push('/index/orderdetail?id=' + scope.row.id)"
                    >查看订单</span>&nbsp;
                    <span class="col_span" @click="update(scope.row.id)">确认收货</span>
                </template>
                </el-table-column>
            </el-table>

            <div class="list_footer">
            <el-pagination
            @current-change="getData"
            :current-page="currentPage"
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
export default {
    name:"orderreceipt",
    data(){
        return {
            visibleSearch:false,
            member:"",
            idType:"",
            tableData3:[],
            loading:false,
            pageSize:10,
            total:"",
            currentPage:1,
            totalCount:""
        }
    },
    created() {
        this.getData(1);
    },
    methods: {
        deleDates(){

        },
        outGoods(){

        },
        dataSearch(){

        },
        getData(page){
            this.loading = true;
            this.$http.post('/merchant_order/query_for_page', {
                currentPage: page,
                pageSize: this.pageSize,
                status: 3,
                phone: this.member,
                code: this.idType,
                merchantId: JSON.parse(localStorage.userInfo).merchantId
            }).then((res) => {
                this.tableData3 = res.list;
                this.totalCount = res.totalCount;
                this.loading = false;
            }, (err) => {
                Message.error(err.msg);
            });
        },
        update(id) {
            this.$confirm('确定收货嘛', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then((result) => {
            this.$http.post('/merchant_order/update', {
                id: id,
                status: 4,
                merchantId: JSON.parse(localStorage.userInfo).merchantId
            }).then((res) => {
                this.getList(1);
                Message.success("收货成功");
            })
            })
        },
    }
}
</script>
<style lang="less" scoped>
.orderReceipt{
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