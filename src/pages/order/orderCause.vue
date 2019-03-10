<template>
  <div class="orderCause global_div">
    <content-top titlename="退货原因"></content-top>
    <div class="center_div">
        <div class="list_content">
        <div class="list_title">
            <span>
            <img src="@/assets/list/u28.png">&nbsp;数据列表
            </span>

            <el-button class="el_right" @click="goAsed('')">添加原因</el-button>
        </div>
        <el-table
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%"
            v-loading="loading"
            @selection-change="tableSelection"
            border
        >
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column prop="reasonType" label="原因类型"></el-table-column>

            <el-table-column label="排序" prop="sorts"></el-table-column>

            <el-table-column label="是否启用">
                <template slot-scope="scope">
                <el-switch @change="handleStatus(scope.row.isUse, scope.row.id)" v-model="scope.row.isUse" :active-value="1"
                       :inactive-value="0" active-color="#5BC0BF" inactive-color="#ff4949"></el-switch>
                </template>
            </el-table-column>

            <el-table-column label="添加时间" prop="creatTime"></el-table-column>

            <el-table-column label="编辑">
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
            :total="total"
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
                    <el-input v-model="reason"></el-input>
                </div>
                <div>
                    <p>目标商品分类：</p>
                    <el-input v-model="sorts"></el-input>
                </div>
                <div>
                    <p>是否显示</p>
                    <el-switch v-model="isUse" :active-value="1" :inactive-value="0" active-color="#5BC0BF"
                       inactive-color="#ff4949"></el-switch>
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
  name: "orderCause",
  comments: {},
  data() {
    return {
      loading:false,
      tableData3:[],
      checked:"",
      operation:"",
      total:1,
      isUse:1,
      dialogVisible:false,
      id:"",
      reason:"",
      sorts:"",
      currentPage:1,
      idList:[]
    };
  },
  created() {
    this.getStatepage(1);
  },
  methods: {
    updateCategoryGoods(){
        if (this.reason == "") {
          Message.error('请输入退货原因');
          return false;
        }
        if (this.sorts == "") {
          Message.error('请输入排序');
          return false;
        }
        if (this.id == '') {
          this.$http.post('/return_reason/add', {
            reasonType: this.reason,
            sorts: this.sorts,
            isUse: this.isUse,
            merchantId: JSON.parse(localStorage.userInfo).merchantId
          }).then((res) => {
            Message.success('添加成功');
            this.dialogVisible = false;
            this.getStatepage(this.pageSize2);
          }, (err) => {
            Message.error(err.msg);
          })
        } else {
          this.$http.post('/return_reason/add', {
            reasonType: this.reason,
            sorts: this.sorts,
            id: this.id,
            isUse: this.isUse,
            merchantId: JSON.parse(localStorage.userInfo).merchantId
          }).then((res) => {
            Message.success('修改成功');
            this.getStatepage(this.pageSize2);
            this.dialogVisible = false;
          }, (err) => {
            Message.error(err.msg);
          })
        }
    },
    deleDates(id){
        this.$confirm("确认删除吗?").then(() => {
            this.$http.post('/return_reason/delete', {ids: id}).then(() => {
                Message.success("删除成功");
                this.getStatepage(1);
            }, (err) => {
                Message.error(err.msg);
            })
        })
    },
    tableSelection(val){
        this.idList=val;
    },
    goAsed(id){
        this.id = id;
        if (id == "") {
          this.sorts = '',
            this.reason = '',
            this.isUse = ''
        } else {
          this.$http.post('/return_reason/selectOne', {
            id: id,
            merchantId: JSON.parse(localStorage.userInfo).merchantId
          }).then((res) => {
            this.sorts = res.sorts
            this.reason = res.reasonType
            this.isUse = res.isUse
          }, (err) => {
            Message.error(err.msg);
          })
        }
        this.dialogVisible = true;
    },
    getStatepage(page){
       this.$http.post('/return_reason/query_for_pageB',{
            currentPage: page,
            pageSize: 10,
            merchantId: JSON.parse(localStorage.userInfo).merchantId
       }).then((res) => {
            this.total = res.totalCount
            this.tableData3 = res.list;
        }, (err) => {
            Message.error(err.msg);
        });
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
     handleStatus(status, id) {
        this.$http.post('/return_reason/add', {
          id: id,
          isUse: status,
          merchantId: JSON.parse(localStorage.userInfo).merchantId
        }).then((res) => {
          Message.success("操作成功");
        }, (err) => {
          Message.error(err.msg);
        })
    },
    deleteEre(){
         if (this.operation == "" || this.idList == "") {
            Message.warning("未选择操作项");
        } else {
            let idlists = this.idList.map(item => {
                return item.id;
            });
            this.deleDates(idlists);
        }
    }
  }
};
</script>

<style lang="less" scoped>
.orderCause {
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
