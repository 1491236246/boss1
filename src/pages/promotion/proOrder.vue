<template>
  <div class="global_div proOrder">
      <content-top titlename="订单管理"></content-top>
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
                <el-button @click="getStatepage(1)">查询结果</el-button>
            </div>
            </div>
            <div class="div_center" v-show="visibleSearch">
            <span class="list_conditions">商品名称:</span>
            <el-input placeholder="请输入商品名称" clearable class="search_input" v-model="navName"></el-input>
             <span class="list_conditions">订单编号:</span>
            <el-input placeholder="请输入订单编号" clearable class="search_input" v-model="id"></el-input>
            <span class="list_conditions">订单状态:</span>
            <el-select placeholder="请选择拼单状态" v-model="groupStatus" clearable class="search-input">
                <el-option label="已关闭" value="0"></el-option>
                <el-option label="待付款" value="1"></el-option>
                <el-option label="待发货" value="2"></el-option>
                <el-option label="待收货" value="3"></el-option>
                <el-option label="待评价" value="4"></el-option>
                <el-option label="已完成" value="5"></el-option>
                <el-option label="拼团中" value="6"></el-option>
                <el-option label="拼团成功" value="7"></el-option>
                <el-option label="拼团取消" value="8"></el-option>
                <el-option label="拼团失败" value="9"></el-option>
                <el-option label="后台取消" value="10"></el-option>  
                <el-option label="已删除" value="20"></el-option>  
            </el-select>
            <span class="list_conditions">拼团状态:</span>
            <el-select placeholder="请选择拼团状态" v-model="status" clearable class="search-input">
                <el-option label="拼团成功" value="1"></el-option>
                <el-option label="拼团失败" value="2"></el-option>
                <el-option label="后台取消" value="3"></el-option>
                <el-option label="拼团中" value="4"></el-option>
            </el-select>
            </div>
        </div>

        <div class="list_content">
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
            >

                <el-table-column prop="code" label="订单编号"></el-table-column>

                <el-table-column prop="groupManageId" label="拼团编号"></el-table-column>

                <el-table-column label="商品名称">
                    <template slot-scope="scope">{{ scope.row.details[0].goodsName }}</template>
                </el-table-column>

                <el-table-column label="拼团状态" prop="groupSpec">
                    <template slot-scope="scope">{{ scope.row.groupStatus | getPromotionStatus }}</template>
                </el-table-column>

                <el-table-column label="订单金额" prop="totalMoeny"></el-table-column>

                <el-table-column prop="groupNum" label="订单状态">
                    <template slot-scope="scope">{{ scope.row.status | getPromotionOrderStatus }}</template>
                </el-table-column>

                <el-table-column prop="mobilePhone" label="用户名"></el-table-column>

                <el-table-column prop="receiver" label="收货人"></el-table-column>

                <el-table-column prop="phone" label="收货人手机"></el-table-column>

                <el-table-column prop="address" label="收货地址"></el-table-column>

                <el-table-column label="支付方式">
                    <template slot-scope="scope">微信支付</template>
                </el-table-column>

                <el-table-column label="已取消退款状态">
                    <template slot-scope="scope">{{ scope.row.returnStatus == 0 ? '未退款' : '已退款' }}</template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                      <span class="table-btn" v-if="scope.row.status == 2" @click="ruleForm.id = scope.row.id; dialogVisible = true" >发货</span>
                    </template>
                </el-table-column>

            </el-table>

            <div class="list_footer">
                <el-pagination
                @current-change="getStatepage"
                :current-page="currentPage"
                layout="total,prev, pager, next, jumper"
                :total="total"
                style="float:right"
                ></el-pagination>
            </div>


            <el-dialog
                title="拼团发货"
                :visible.sync="dialogVisible"
                :append-to-body="true">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="快递公司" prop="sendCompany">
                    <el-input v-model="ruleForm.sendCompany"></el-input>
                </el-form-item>
                <el-form-item label="快递单号" prop="sendCode">
                    <el-input v-model="ruleForm.sendCode"></el-input>
                </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendGoods">确 定</el-button>
                </span>
            </el-dialog>

        </div>





      </div>
  </div>
</template>

<script>
import {Message} from 'element-ui'
export default {
  name: 'proOrder',
  data(){
    return {
        dialogVisible: false,
        total:null,
        visibleSearch:false,
        navName:"",
        id:"",
        status:"",
        currentPage:1,
        gropuStatus:"",
        tableData3:[],
        loading:true,
        groupManageId:"",
        ruleForm: {
          sendCompany: '',
          sendCode: '',
        },
        rules: {
          sendCompany: [
            {required: true, message: '请输入快递公司', trigger: 'blur'}
          ],
          sendCode: [
            {required: true, message: '请输入快递单号', trigger: 'blur'}
          ],
        }
    }
  },
  created() {
      if (this.$route.query.id){
        this.groupManageId = this.$route.query.id;
      }
      this.getStatepage(1)
  },
  methods: {
    getStatepage(page){
        this.loading = true;
        this.$http.post("merchant_order/groupOrderList",{
          currentPage: page,
          pageSize: 10,
          goodName: this.navName || null,
          code: this.id || null,
          groupStatus: this.groupStatus || null,
          status: this.status || null,
          groupManageId: this.groupManageId || null,
          merchantId: JSON.parse(localStorage.getItem('userInfo')).merchantId
        }).then((res) => {
          this.tableData3 = res.list;
          this.total = res.totalCount;
          this.loading = false;
        })
    }
  },
   sendGoods(){
        let ruleForm = Object.assign({
          merchantId: JSON.parse(localStorage.getItem('userInfo')).merchantId,
          status: 3,
        }, this.ruleForm);
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$http.post("merchant_order/update", ruleForm).then(() => {
              Message.success("发货成功");
              this.dialogVisible = false;
              this.ruleForm = {
                sendCompany: '',
                sendCode: '',
              };
            },(err) => {
              Message.error(err.msg);
            })
          } else {
            return false;
          }
        });
    },
  filters:{
      getPromotionStatus(val){
        let promotionStatus = {
            '1': '拼团成功',
            '2': '拼团失败',
            '3': '后台取消',
            '4': '拼团中',
        };
        return promotionStatus[val]
      },
      getPromotionOrderStatus(val){
        let promotionOrderStatus = {
            '0': '已关闭',
            '1': '待付款',
            '2': '待发货',
            '3': '待收货',
            '4': '待评价',
            '5': '已完成',
            '6': '拼团中',
            '7': '拼团成功',
            '8': '拼团取消',
            '9': '拼团失败',
            '10': '后台取消',
            '20': '已删除',
        };
        return promotionOrderStatus[val]
      }
  }
}
</script>

<style lang="less" scoped>
.proOrder{
    .list_head {
        background: #ffffff;
        margin-top: 20px;
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
            margin-left: 2px;
      }
    }
  }
  .list_content {
    width: 1100px;
    margin-top:20px;
    border: 1px solid #cccccc;
  .list_title {
      height: 60px;
      line-height: 40px;
      background: #f3f3f3;
      border-bottom: 1px solid #cccccc;
      padding: 10px 20px;
      box-sizing: border-box;
      > span {
        font-size: 16px;
        margin-top: 5px;
      }
      .el_left {
        float: right;
        margin-left:5px;
      }
    }
   }
   .list_footer {
    height: 41px;
    padding-top: 5px;
    background: #efefef;
    border-top: 1px solid #cccccc;
    .lists_wrap {
      float: left;
      margin-left: 20px;
    }
  }
}
</style>
