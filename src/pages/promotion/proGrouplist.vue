<template>
  <div class="global_div proGrouplist">
    <content-top titlename="成团管理"></content-top>
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
            <span class="list_conditions">商品状态:</span>
            <el-select placeholder="请选择拼单状态" v-model="status" clearable class="search-input">
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

                <el-table-column prop="id" label="拼团编号"></el-table-column>

                <el-table-column prop="goodsName" label="商品名称"></el-table-column>

                <el-table-column prop="groupMaxNum" label="拼团状态">
                    <template slot-scope="scope">{{ scope.row.assembleState | getPromotionStatus }}</template>
                </el-table-column>

                <el-table-column label="团规格" prop="groupSpec"></el-table-column>

                <el-table-column label="团价/元">
                    <template slot-scope="scope">{{ '¥' + scope.row.groupPrice  }}</template>
                </el-table-column>

                <el-table-column prop="groupNum" label="已参团人数"></el-table-column>

                <el-table-column prop="commanderName" label="团长"></el-table-column>

                <el-table-column prop="invitationTimes" label="邀请次数"></el-table-column>

                <el-table-column prop="createTime" label="开团时间"></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span class="col_span" @click="$router.push({name:'proOrder',query:{id:scope.row.id}})">查看订单</span>
                        <span class="col_span" @click="cancelPromotion(scope.row.id)">取消拼团</span>
                        <span class="col_span" @click="showLog(scope.row.id)">日记</span>
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
                title="提示"
                :append-to-body="true"
                :visible.sync="dialogVisible">
                <el-table class="promotion-table" :data="dialogData" style="width: 100%">
                <el-table-column prop="createTime" label="操作时间"></el-table-column>
                <el-table-column prop="content" label="操作内容"></el-table-column>
                <el-table-column prop="merchantName" label="操作者"></el-table-column>
                </el-table>
                <div class="dialog-pagination-wrap">
                <el-pagination
                    @current-change="dialoghandleCurrentChange"
                    :current-page.sync="dialogCurrentPage"
                    :total="dialogTotal"
                    :page-size="dialogPageSize"
                    background
                    layout="total, prev, pager, next, jumper">
                </el-pagination>
                </div>
            </el-dialog>
        </div>

        


    </div>
  </div>
</template>

<script>
import {Message} from 'element-ui'
export default {
  name: 'proGrouplist',
  data(){
    return {
        visibleSearch:false,
        navName:"",
        status:"",
        tableData3:[],
        loading:true,
        idList:[],
        currentPage:1,
        total:null,
        dialogVisible:false,
        dialogData: [],
        dialogCurrentPage:1,
        dialogTotal:null,
        dialogPageSize:10,
        id:""
    }
  },
  created() {
      this.getStatepage(1);
  },
  methods: {
    cancelPromotion(id){
        this.$confirm("确认取消拼团吗?取消后该团下面所有订单将会全部取消").then(() => {
          this.$http.post("group_manage/cancel/" + id).then(() => {
            this.getStatepage(1);
            Message.success("操作成功");
          },(err) => {
            Message.success(err.msg);
          })
        })
    },
    showLog(id){
        this.dialogVisible = true;
        this.$http.post("group_manage_log/list", {
          id: id,
          currentPage: this.dialogCurrentPage,
          pageSize: this.dialogPageSize,
        }).then((res) => {
          this.dialogData = res.list;
          this.dialogTotal = res.totalCount;
        })
    },
    dialoghandleCurrentChange(val){
        this.dialogCurrentPage = val;
        this.showLog(this.groupId);
    },
    getStatepage(page){
        this.$http.post('group_manage/list',{
            currentPage: page,
            pageSize: 10,
            goodsName: this.navName || null,
            id: this.id || null,
            assembleState: this.status || null,
        }).then((res) => {
            this.total = res.totalCount;
            this.tableData3 = res.list;
            this.loading = false;
        },(err) => {
            Message.error(err.msg);
        });
    },
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
      }
  }
}
</script>

<style lang="less" scoped>
.proGrouplist{
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
            margin-left: 40px;
      }
    }
  }
  .col_span {
      color: #1abc9c;
      cursor: pointer;
      margin-left:6px;
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
