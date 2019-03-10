<template>
  <div class="orderAddress global_div">
    <content-top titlename="发货点信息管理"></content-top>
    <div class="center_div">
        <div class="list_content">
        <div class="list_title">
            <span>
            <img src="@/assets/list/u28.png">&nbsp;数据列表
            </span>

            <el-button class="el_right" @click="goAsed('')">添加发货点</el-button>
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

            <el-table-column prop="id" label="编号"></el-table-column>

            <el-table-column label="发货点名称" prop="returnPname"></el-table-column>

            <el-table-column label="发货人姓名" prop="returnName"></el-table-column>

            <el-table-column label="地址" prop="returnAddress"></el-table-column>

            <el-table-column label="联系电话" prop="returnPhone"></el-table-column>

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


    </div>
  </div>
</template>

<script>
import {Message} from 'element-ui'
export default {
  name: 'orderaddress',
  data(){
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
    }
  },
  created() {
      this.getStatepage(1);
  },
  methods: {
    tableSelection(val){
        this.idList=val;
    },
    getStatepage(page){
         this.loading= true;
        this.$http.post("/return_send/query_for_page", {
          currentPage: page,
          pageSize: 10,
          merchantId: JSON.parse(localStorage.getItem("userInfo")).merchantId
        }).then((res) => {
          this.total = res.totalCount;
          this.tableData3 = res.list;
          this.loading=false;
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
    goAsed(id){
        this.$router.push({name:"orderadd",query:{id:id}})
    },
    deleDates(id){
         this.$confirm("确认删除吗?").then(() => {
          this.$http.post("return_send/delete ", {
            ids: id
          }).then(() => {
            this.getStatepage(1);
            Message.success("删除成功");
          },(err) => {
            this.error(err.msg);
          })
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
  
}
</script>

<style lang="less" scoped>
.orderAddress{
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
