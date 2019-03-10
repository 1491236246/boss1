<template>
  <div class="goodsClass global_div">
    <content-top titlename="商品分类"></content-top>
    <div class="center_div">
        <div class="list_content">
        <div class="list_title">
            <span>
            <img src="@/assets/list/u28.png">&nbsp;数据列表
            </span>

            <el-button v-show="second" @click="getStatepage()" class="el_right">返回</el-button>
            <el-button class="el_right" @click="goAsed()">添加分类</el-button>
        </div>
        <el-table
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%"
            v-loading="loading"
            border
        >
            <el-table-column prop="id" label="编号"></el-table-column>

            <el-table-column label="分类名称" prop="typeName"></el-table-column>

            <el-table-column prop="parentId" label="级别">
                <template slot-scope="scope">{{ scope.row.parentId == '0' ? '一级' : '二级' }}</template>
            </el-table-column>

            <el-table-column label="商品数量" prop="goodsNum"></el-table-column>

            <el-table-column prop="goodsUnit" label="数量单位"></el-table-column>

             <el-table-column label="是否显示">
                <template slot-scope="scope">
                    <el-switch @change="handleShow(scope.row.showStatus,scope.row)"  v-model="scope.row.showStatus" :active-value="0" :inactive-value="1" active-color="#5BC0BF" inactive-color="#dedede"></el-switch>
                </template>
            </el-table-column>

            <el-table-column label="排序" prop="goodsSort"></el-table-column>

            <el-table-column label="设置" width="210px">
                <template slot-scope="scope">
                    <span
                    class="col_span"
                    @click="showGoods(scope.row.id)"
                    >转移商品</span>&nbsp;
                    <span class="col_span" v-if="scope.row.parentId == 0" @click="goAsync(scope.row.id)">新增下级</span>&nbsp;
                    <span class="col_span" v-if="scope.row.parentId == 0" @click="getStatepage(scope.row.id)">查看下级</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <span
                    class="col_span"
                    @click="goAsed(scope.row.id)"
                    >编辑</span>&nbsp;
                    <span class="col_span" @click="deleDates([scope.row.id])">删除</span>
                </template>
            </el-table-column>
        </el-table>

        <div class="list_footer">
            <el-pagination
            @current-change="getStatepage"
            :current-page="currentPage"
            layout="total,prev, pager, next, jumper"
            :total="totalCount"
            style="float:right"
            ></el-pagination>
        </div>
        </div>

        <el-dialog
            title="转移商品"
            :visible.sync="dialogVisible"
            :append-to-body="true">
            <div>
            <div>
                <p>原商品分类：</p>
                <el-select v-model="originalId" disabled placeholder="请选择商品分类">
                <el-option :value="item.id" :label="item.typeName" v-for="item in addCategoryList"></el-option>
                </el-select>
            </div>
            <div>
                <p>目标商品分类：</p>
                <el-select v-model="lastId" placeholder="请选择商品分类">
                <el-option :value="item.id" :label="item.typeName" v-for="item in addCategoryList"></el-option>
                </el-select>
            </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateCategoryGoods">确 定</el-button>
            </span>
        </el-dialog>





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
      childCategoryId:"",
      second:"",
      dialogVisible:false,
      addCategoryList:[],
      originalId:"",
      lastId:''
    };
  },
  created() {
    this.getStatepage();
    this.$http.post("merchantGoodsType/merchant_goods_type_list").then((res) => {
        this.addCategoryList = res;
    })
  },
  methods: {
    goAsync(id){
        this.$router.push({name:"goodsasync",query:{parId:id}});
    },
    goAsed(ids){
        if(ids){
            this.$router.push({name:"goodsasync",query:{id:ids}});
        }else{
            this.$router.push("/index/goodsasync")
        }
    },
    updateCategoryGoods(){
        this.$http.post("merchantGoodsType/merchant_goods_type_transfer", {
            originalId: this.originalId,
            lastId: this.lastId,
        }).then(() => {
            Message.success("操作成功");
            this.getStatepage();
            this.dialogVisible = false;
        }, (err) => {
             Message.error(err.msg);
        })
    },
    showGoods(id){
        this.dialogVisible = true;
        this.originalId = id;
    },
    getStatepage(id) {
        let parentIds="";
        this.loading=true;
        if(id){
            parentIds=id;
            this.childCategoryId = id;
            this.second = true;
            console.log(1111)
        }else{
            parentIds=0;
            this.second = false;
            console.log(222)
        }
        console.log(parentIds)
        this.$http.post("merchantGoodsType/merchant_goods_type_list_page",{
            parentId: parentIds,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
        }).then((res) => {  
            this.tableData3 = res.list;
            this.totalCount = res.totalCount;
        }).finally(() => {
            this.loading = false;
        })
    },
    handleShow(sataus,datas){
        let form = {
            id: datas.id,
            typeName: datas.typeName,
            parentId: datas.parentId,
            goodsUnit: datas.goodsUnit,
            goodsSort: datas.goodsSort,
            showStatus: sataus,
            typeIcon: datas.typeIcon,
        };
        this.$http.post("merchantGoodsType/merchant_goods_type_update", form).then(() => {
          Message.success("操作成功");
        }, (err) => {
          Message.error(err.msg);
        })
    }
  }
};
</script>

<style lang="less" scoped>
.goodsClass {
  .list_content {
    margin-top: 20px;
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
      .el_right{
          float:right;
          margin:5px 10px;
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
