<template>
  <div class="global_div proList">
    <content-top titlename="类目列表"></content-top>
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
            <span class="list_conditions">商品状态:</span>
            <el-select placeholder="请选择商品状态" v-model="status" clearable class="search-input">
                <el-option label="上架" value="0"></el-option>
                <el-option label="下架" value="1"></el-option>
            </el-select>
            </div>
        </div>

        <div class="list_content">
            <div class="list_title">
                <span>
                <img src="@/assets/list/u28.png">&nbsp;数据列表
                </span>
                <el-button class="el_left" @click="$router.push({name:'proAddlist'})">添加拼团商品</el-button>
            </div>
            <el-table
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                v-loading="loading"
                border
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>

                <el-table-column prop="id" label="编号"></el-table-column>

                <el-table-column prop="goodsName" label="商品名称"></el-table-column>

                <el-table-column prop="groupMaxNum" label="团个数"></el-table-column>

                <el-table-column label="团规格">
                    <template slot-scope="scope">{{ `${scope.row.groupUserNum}人-${scope.row.groupPrice}元` }}</template>
                </el-table-column>

                <el-table-column label="原价/元">
                    <template slot-scope="scope">{{ scope.row.merchantGoodsTypeProperty.goodsSalePrice }}</template>
                </el-table-column>

                <el-table-column prop="openGroup" label="已开团"></el-table-column>

                <el-table-column prop="endGroup" label="已成团"></el-table-column>

                <el-table-column prop="groupUserNum" label="参团人数"></el-table-column>

                <el-table-column label="是否上架">
                    <template slot-scope="scope">
                        <el-switch @change="handleShow(scope.row.status, scope.row.id)" v-model="scope.row.status" :active-value="0" :inactive-value="1" active-color="#5BC0BF" inactive-color="#dedede"></el-switch>
                    </template>
                </el-table-column>

                <el-table-column prop="createTime" label="上架时间"></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span class="col_span" @click="$router.push({name:'proAddlist',query:{id:scope.row.id}})">编辑</span>
                        <span class="col_span" @click="switchQuery(true, scope.row.id)">日记</span>
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
  name: 'proList',
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
        dialogPageSize:10
    }
  },
  created() {
      this.getStatepage(1);
  },
  methods: {
    showLog(id){
        this.dialogVisible = true;
        this.groupId = id;
        this.$http.post("merchantGoodsGroup/query_log_pages", {
          currentPage: this.dialogCurrentPage,
          pageSize: 10,
          groupId: id
        }).then((res) => {
          this.dialogData = res.list;
          this.dialogTotal = res.totalCount;
        }, (err) => {
          Message.error(err.msg);
        })
    },
    dialoghandleCurrentChange(val){
        this.dialogCurrentPage = val;
        this.showLog(this.groupId);
    },
    getStatepage(page){
        this.$http.post('merchantGoodsGroup/goods_group_list_page',{
            currentPage: page,
            pageSize: 10,
            goodsName: this.navName,
            status: this.status
        }).then((res) => {
            this.total = res.totalCount;
            this.tableData3 = res.list;
            this.loading = false;
        },(err) => {
            Message.error(err.msg);
        });
    },
    handleSelectionChange(val){
        this.idList = val;
    },
    handleShow(status,id){
        this.$http.post("merchantGoodsGroup/group_oprate", {
          id: id,
          status: status
        }).then(() => {
          Message.success('操作成功');
          this.getStatepage(1);
        }, (err) => {
            Message.error(err.msg);
        })
    }
  },
}
</script>

<style lang="less" scoped>
.proList{
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
}
</style>
