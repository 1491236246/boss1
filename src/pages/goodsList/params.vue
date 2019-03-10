<template>
  <div class="params global_div">
    <content-top titlename="属性列表"></content-top>
    <div class="center_div">
        <div class="list_content">
            <div class="list_title">
                <span>
                <img src="@/assets/list/u28.png">&nbsp;数据列表
                </span>
                <el-button class="el_right" @click="$router.push({name:'goodstype'})">返回</el-button>
                <el-button class="el_right" @click="$router.push({name:'addparams'})">添加参数</el-button>
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

            <el-table-column label="参数名称" prop="paramName"></el-table-column>

            <el-table-column label="商品类型" prop="styleName"></el-table-column>

            <el-table-column label="参数录入方式">
                <template slot-scope="scope">
                    {{scope.row.paramSelect | capitalize}}
                </template>
            </el-table-column>

            <el-table-column label="可选值列表" prop="paramList"></el-table-column>

            <el-table-column label="排序" prop="paramSort"></el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <span
                    class="col_span"
                    @click="goAsed(scope.row.id)"
                    >编辑</span>&nbsp;
                    <span class="col_span" @click="remove([scope.row.id])">删除</span>
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
            @current-change="getDatas"
            :current-page="currentPage"
            layout="total,prev, pager, next, jumper"
            :total="totalCount"
            style="float:right"
            ></el-pagination>
        </div>
        </div>

        <el-dialog
          title="添加类型"
          :visible.sync="dialog"
          append-to-body>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="form">
          <el-form-item label="类型名称: " prop="styleName">
            <el-input v-model="ruleForm.styleName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>




    </div>
  </div>
</template>

<script>
import {Message} from 'element-ui'
export default {
  name: 'params',
  data(){
    return {
        operation:"",
        checked: false,
        tableData3:[],
        loading:false,
        currentPage:1,
        pageSize:10,
        totalCount:null,
        dialog:false,
        ruleForm:{
            styleName:""
        },
        rules:{
            styleName:[
                { required: true, message: '请输入类型名称', trigger: 'blur' },
                { max: 20, message: '长度必须小于20个字符', trigger: 'blur' }
            ]
        },
        isAdd:true,
        idList: [],
    }
  },
  created() {
      this.getDatas();
  },
  methods: {
    goAsed(id){
      this.$router.push({name:"addparams",query:{id:id}});
    },
    remove(id){
        this.$confirm("确认删除吗?").then(() => {
          this.$http.post("merchantGoodsProperty/delete_batch", id).then(() => {
            this.getDatas();
            Message.success("删除成功");
          },(err) => {
            this.$msgErr(err.msg);
          })
        })
    },
    deleteEre(){
        if (this.operation == "" || this.idList == "") {
            Message.warning("未选择操作项");
        } else {
            this.$confirm("确认删除吗?").then(() => {
                this.$http.post("merchantGoodsProperty/delete_batch", this.idList).then(() => {
                    this.getDatas();
                    Message.success("删除成功");
                },(err) => {
                    this.$msgErr(err.msg);
                })
            })
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
    submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.isAdd){
                 this.addEdit("merchantGoodsStyle/merchant_goods_type_add");
            }else {
                this.addEdit("merchantGoodsStyle/merchant_goods_type_update");
            }
          } else {
                return false;
          }
        });
    },
    getDatas(){
        this.loading= true;
        this.$http.post("merchantGoodsParam/merchant_goods_property_list_page", {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          styleId:this.$route.params.id
        }).then((res) => {
          this.totalCount = res.totalCount;
          this.tableData3 = res.list;
        }).finally(() => {
          this.loading= false;
        })
    },
    handleSelectionChange(val) {
      this.idList = val;
    }
  },
  filters: {
    capitalize: function (value) {
        if (!value) return ''
        let nowVal;
        switch(value){
            case 0:
            nowVal="唯一属性";
            break;
            case 1:
            nowVal="单选属性";
            break;
            case 2:
            nowVal="复选属性";
            break;
        }
        return nowVal
    }
  }
}
</script>

<style lang="less" scoped>
.params{
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
