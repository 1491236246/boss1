<template>
  <div class="Lists global_div">
    <content-top titlename="商品列表"></content-top>
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
        <el-button class="el_left">添加商品</el-button>
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

        <el-table-column label="价格/货号">
          <template slot-scope="scope">
            <span>价格：{{scope.row.goodsPrice}}</span>
            <br>
            <span>货号：{{scope.row.goodsNo}}</span>
          </template>
        </el-table-column>

        <el-table-column label="SUK库存">
          <template slot-scope="scope">
            <img src="@/assets/list/icon-edit.png" @click="getPageDate(scope.row.id)" alt>
          </template>
        </el-table-column>

        <el-table-column prop="buyNum" label="销量"></el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">{{ scope.row.status == 0 ? '未上架' : '已上架' }}</template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <span
              class="col_span"
              @click="outGoods(scope.row.id,scope.row.status)"
            >{{ scope.row.status == 0 ? '上架' : '下架' }}</span>&nbsp;
            <span class="col_span">编辑</span>&nbsp;
            <span class="col_span" @click="deleDates(scope.row.id)">删除</span>
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

    <!-- 编辑弹框 -->
    <el-dialog title="编辑货品信息" :visible.sync="dialogVisible" width="50%">
      <span>商品货号</span>
      <div class="spList_div">
        <table class="spList_table" v-loading="loadings">
          <thead>
            <tr>
              <td v-for="item in tdHeader" width="80">{{item}}</td>
              <td>销售价格</td>
              <td>商品库存</td>
              <td>库存预警值</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ite in tdList">
              <td v-for="items in ite.nameValue">{{items.name}}</td>
              <td>
                <el-input v-model="ite.goodsSalePrice" placeholder="请输入内容"></el-input>
              </td>
              <td>
                <el-input v-model="ite.goodsStock" placeholder="请输入内容"></el-input>
              </td>
              <td>
                <el-input v-model="ite.stockWarning" placeholder="请输入内容"></el-input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="hideModes">确 定</el-button>
      </span>
    </el-dialog>
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
      loadings: true
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
        this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$http.post('merchantGoods/delete_batch',[ids]).then(()=>{
                this.getStatepage(1);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
        });
    },
    dataSearch(){
        if(!this.visibleSearch){
            return false;
        }
        this.loading=true;
        this.$http.post("merchantGoods/merchant_goods_list_page",{
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
    hideModes(){
        let statuse=true;
        this.tdList.forEach((val)=>{
            if(val.goodsSalePrice=="" || val.goodsStock=="" || val.stockWarning==""){
                this.$message({
                    message: '请填写完整信息',
                    type: 'warning'
                });
                statuse=false;
                return false;
            }
        });
        if(statuse){
            this.$http.post("merchantGoods/merchant_goods_update_sku",{
                merchantGoodsTypePropertyList:this.tdList,
                id:this.goodsId
            }).then(()=>{
                this.$message({
                    message:"操作成功",
                    type:'success'
                })
            },(res)=>{
                this.$message({
                    message:res.msg,
                    type:'error'
                })
            })
            this.dialogVisible=false;
        }
        
    },
    getPageDate(ids) {
        this.goodsId=ids;
        this.dialogVisible = true;
        this.loadings = true;
        this.$http.post("merchantGoods/merchant_goods_by_id", {
          id: ids
        })
        .then(res => {
            this.tdList = res.merchantGoodsTypePropertyList;
            console.log(this.tdList);
            this.tdHeader = res.map.map(name => {
                return name.name;
            });
            this.loadings = false;
        });
    },
    getStatepage(page) {
      this.$http
        .post("merchantGoods/merchant_goods_list_page", {
          currentPage: page,
          pageSize: this.pageSize,
          goodsName: this.goodsName,
          typeId: this.typeId,
          brandId: this.brandId
        })
        .then(
          res => {
            this.loading = false;
            this.tableData3 = res.list;
            this.totalCount = res.totalCount;
          },
          err => {
            Message.error(err);
          }
        );
    },
    outGoods(ids, sta) {
      if (sta == 0) {
        this.$http
          .post("merchantGoods/merchant_goods_put", {
            id: ids
          })
          .then(
            res => {
              Message.success("上架成功");
              this.getStatepage();
            },
            err => {
              Message.error(err);
            }
          );
      } else {
        this.$http
          .post("merchantGoods/merchant_goods_pull", {
            id: ids
          })
          .then(
            res => {
              Message.success("下架成功");
              this.getStatepage();
            },
            err => {
              Message.error(err);
            }
          );
      }
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
        this.$http.post("merchantGoods/delete_batch", idlists).then(
          res => {
            Message.success("删除成功");
            this.getStatepage(1);
          },
          err => {
            Message.error(err);
          }
        );
      }
    },
    handleSelectionChange(val) {
      this.idList = val;
    }
  }
};
</script>

<style lang="less" scoped>
.Lists {
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
