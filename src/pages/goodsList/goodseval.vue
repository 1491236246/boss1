<template>
  <div class="goodsrectc global_div">
    <content-top titlename="商品评价"></content-top>
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
            <el-button @click="dataSearch">查询结果</el-button>
          </div>
        </div>
        <div class="div_center" v-show="visibleSearch">
          <span class="list_conditions">输入搜索:</span>
          <el-input placeholder="请输入内容" clearable class="search_input" v-model="goodsName"></el-input>
          <span class="list_conditions">用户昵称:</span>
          <el-input placeholder="请输入内容" clearable class="search_input" v-model="userName"></el-input>
        </div>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="id" label="编号"></el-table-column>

        <el-table-column label="用户昵称" prop="userName"></el-table-column>

        <el-table-column prop="goodsName" label="商品名称"></el-table-column>

        <el-table-column label="评价" prop="commentLevel">
            <template slot-scope="scope">
                <img src="@/assets/goodslist/starOn.png" v-for="val in scope.row.commentLevel" />
                <img src="@/assets/goodslist/starOff.png" v-for="vals in (5-scope.row.commentLevel)" />
            </template>
        </el-table-column>

        <el-table-column prop="commentIp" label="IP地址"></el-table-column>

        <el-table-column label="评论时间" prop="createTime"></el-table-column>

        <el-table-column label="是否显示" prop="status">
            <template slot-scope="scope">
               <el-switch
                v-model="scope.row.status"
               active-color="#5BC0BF" inactive-color="#ff4949" @change="handleStatus(scope.row.id,scope.row.status)" :active-value="0" :inactive-value="2">
                </el-switch>
            </template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <span
              class="col_span"
              @click="outGoods(scope.row.id)"
            >查看</span>&nbsp;
            <span class="col_span" @click="deleDates([scope.row.id])">删除</span>
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
          @current-change="getStatepage"
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
import { Message } from "element-ui";
export default {
  name: "Lists",
  comments: {},
  data() {
    return {
      checked: false,
      visibleSearch: false,
      brandId: "",
      typeId: "",
      tableData3: [], //请求的商品数据列表
      currentPage: 1,
      pageSize: 10,
      goodsName: "",
      brandId: "",
      loading: true,
      totalCount: null,
      operation: "",
      idList: [],
      userName:"",
      userName:""
    };
  },
  created() {
    this.getStatepage(1);
  },
  methods: {
    handleStatus(id,status){
        this.$http.post('/merchantGoodsComment/delete_not_show',{
            id: id,
            status: status
        }).then((res) => {
            Message.success("操作成功");
        },(err) => {
            Message.error(err.msg);
        })
    },
    deleDates(ids){
        this.$confirm("确认删除吗?").then(() => {
            this.$http.post('/merchantGoodsComment/delete_batch',ids).then(() => {
                this.getList();
                Message.success("删除成功");
            }, (err) => {
                Message.error(err.msg);
            })
        })
    },
    outGoods(ids){
        this.$router.push({name:'goodsdetail',query:{id:ids}});
    },
    dataSearch(){
        if(!this.visibleSearch){
            return false;
        }
        this.loading=true;
        this.$http.post("/merchantGoodsComment/merchant_goods_type_list_page",{
            currentPage:1,
            goodsName:this.goodsName,
            pageSize:10,
            userName:this.userName
        }).then((res)=>{
            this.tableData3=res.list;
            this.loading=false;
        })
    },
    getStatepage(page) {
      this.$http.post("/merchantGoodsComment/merchant_goods_type_list_page", {
          currentPage: page,
          pageSize: this.pageSize,
          goodsName: this.goodsName,
          userName:this.userName
        })
        .then(res => {
            console.log(res);
            this.loading = false;
            this.tableData3 = res.list;
            this.totalCount = res.totalCount;
          },
          err => {
            Message.error(err);
          }
        );
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
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
  }
};
</script>

<style lang="less" scoped>
.goodsrectc {
  .center_div {
    margin-bottom: 20px;
  }
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
  .list_content {
    width: 1100px;
    margin: 0 auto;
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
    }
    .col_span {
      color: #1abc9c;
      cursor: pointer;
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
<style lang="less">
.Lists {
  .el-table .cell {
    text-align: center;
    color: #292626;
  }
}
</style>
