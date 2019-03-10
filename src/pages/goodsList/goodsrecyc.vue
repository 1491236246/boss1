<template>
  <div class="goodsrectc global_div">
    <content-top titlename="商品回收站"></content-top>
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
          <span class="list_conditions">选择分类:</span>
          <el-select placeholder="请选择商品分类" v-model="typeId" clearable class="search-input">
            <el-option :label="item.typeName" :value="item.id" v-for="item in categoryList"></el-option>
          </el-select>
          <span class="list_conditions">选择品牌:</span>
          <el-select placeholder="请选择商品品牌" v-model="brandId" clearable class="search-input">
            <el-option :label="item.name" :value="item.id" v-for="item in brandList"></el-option>
          </el-select>
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

        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img :src="scope.row.goodsImg" alt class="gd_img">
          </template>
        </el-table-column>

        <el-table-column prop="goodsName" label="商品名称"></el-table-column>

        <el-table-column label="商品分类" prop="typeName"></el-table-column>

        <el-table-column prop="goodsPrice" label="价格"></el-table-column>

        <el-table-column label="货号" prop="goodsNo"></el-table-column>

        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <span
              class="col_span"
              @click="outGoods(scope.row.id)"
            >还原</span>&nbsp;
            <span class="col_span" @click="deleDates([scope.row.id])">删除</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="list_footer">
        <div class="lists_wrap">
          <el-checkbox v-model="checked" @change="toggleSelection(tableData3)">全选</el-checkbox>&nbsp;
          <el-select v-model="operation" placeholder="批量操作" size="mini">
            <el-option label="删除" value="删除"></el-option>
            <el-option label="还原" value="还原"></el-option>
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
      categoryList: [],
      brandList: [],
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
      dialogVisible: false,
      tdList: [],
      tdHeader: [],
    };
  },
  created() {
    this.$http.post("merchantGoodsType/query_goods_type_tree").then(res => {
      this.categoryList = res;
    });
    this.$http.post("merchant_goods_brand/query_list").then(res => {
      this.brandList = res;
    });
    this.getStatepage(1);
  },
  methods: {
    deleDates(ids){
        this.$confirm("确认删除吗?").then(() => {
            this.$http.post('/merchantGoods/delete_batch_recycling',ids).then(() => {
                this.getList();
                Message.success("删除成功");
            }, (err) => {
                Message.error(err.msg);
            })
        })
    },
    outGoods(ids){
        this.$confirm("确认还原吗?").then(() => {
            this.$http.post('/merchantGoods/merchant_goods_recycling_reduction',{id:ids}).then(() => {
                this.getStatepage();
                Message.success("还原成功");
            })
        }, (err) => {
            Message.error(err.msg);
        })
    },
    hyGoods(id){
        this.$confirm("确认还原吗?").then(() => {
            this.$http.post("merchantGoods/merchant_goods_batch_reduction", id).then(() => {
                this.getList();
                this.$msgSuc("还原成功");
            })
        }, (err) => {
            this.$msgErr(err.msg);
        })
    },
    dataSearch(){
        if(!this.visibleSearch){
            return false;
        }
        this.loading=true;
        this.$http.post("/merchantGoods/merchant_goods_recycling",{
            currentPage:1,
            goodsName:this.goodsName,
            pageSize:10,
            typeId:this.typeId,
            brandId:this.brandId
        }).then((res)=>{
            this.tableData3=res.list;
            this.loading=false;
        })
    },
    getStatepage(page) {
      this.$http.post("/merchantGoods/merchant_goods_recycling", {
          currentPage: page,
          pageSize: this.pageSize,
          goodsName: this.goodsName,
          typeId: this.typeId,
          brandId: this.brandId
        })
        .then(res => {
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
        if(this.operation == "还原"){
            this.hyGoods(idlists);
        }else{
            this.deleDates(idlists);
        }
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
      .el_left {
        float: right;
      }
    }
    .gd_img {
      height: 60px;
    }
    .col_span {
      color: #1abc9c;
      cursor: pointer;
    }
  }
    .spList_div {
        max-height: 150px;
        overflow: auto;

        .spList_table {
            border: 1px solid #cccccc;
            width: 100%;
            text-align: center;
            border-collapse: collapse;
            thead {
                background: #f2f2f2;
                tr {
                height: 43px;
                }
            }
            td {
                border: 1px solid #cccccc;
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
<style lang="less">
.Lists {
  .el-table .cell {
    text-align: center;
    color: #292626;
  }
}
</style>
