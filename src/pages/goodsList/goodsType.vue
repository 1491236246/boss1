<template>
  <div class="goodsType global_div">
    <content-top titlename="商品类型"></content-top>
    <div class="center_div">
        <div class="list_content">
            <div class="list_title">
                <span>
                <img src="@/assets/list/u28.png">&nbsp;数据列表
                </span>
                <el-button class="el_right" @click="dialog = true">添加类型</el-button>
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

            <el-table-column label="类型名称" prop="styleName"></el-table-column>

            <el-table-column label="属性数量" prop="propertyNum"></el-table-column>

            <el-table-column prop="paramNum" label="参数数量"></el-table-column>

            <el-table-column label="设置" width="210px">
                <template slot-scope="scope">
                    <span
                    class="col_span"
                    @click="goProp(scope.row.id)"
                    >属性列表</span>&nbsp;
                    <span
                    class="col_span"
                    @click="goPramas(scope.row.id)"
                    >参数列表</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <span
                    class="col_span"
                    @click="goAsed(scope.row)"
                    >编辑</span>&nbsp;
                    <span class="col_span" @click="deleDates([scope.row.id])">删除</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="list_footer">
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
  name: 'goodsType',
  data(){
    return {
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
        isAdd:true
    }
  },
  created() {
      this.getDatas();
  },
  methods: {
    goAsed(data){
      this.isAdd = false;
      this.dialog = true;
      this.ruleForm.id = data.id;
      this.ruleForm.styleName = data.styleName;
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
    addEdit(url){
        this.$http.post(url, this.ruleForm).then(() => {
            Message.success("操作成功");
            this.getDatas();
            this.dialog = false;
        }, (err) => {
            Message.error(err.msg);
        })
    },
    goProp(ids){
        console.log(ids);
        this.$router.push({name:"propsd",params:{id:ids}});
    },
    goPramas(id){
        this.$router.push({name:"params",params:{id:id}});
        // console.log(id);
    },
    getDatas(){
        this.loading= true;
        this.$http.post("merchantGoodsStyle/merchant_goods_style_list_page", {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        }).then((res) => {
          this.totalCount = res.totalCount;
          this.tableData3 = res.list;
        }).finally(() => {
          this.loading= false;
        })
    }
  },
}
</script>

<style lang="less" scoped>
.goodsType{
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
