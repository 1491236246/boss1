<template>
  <div class="proHeader global_div">
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
                <el-button @click="getStatepage">查询结果</el-button>
            </div>
            </div>
            <div class="div_center" v-show="visibleSearch">
            <span class="list_conditions">类目名称:</span>
            <el-input placeholder="请输入类目名称" clearable class="search_input" v-model="navName"></el-input>
            <span class="list_conditions">类目状态:</span>
            <el-select placeholder="请选择类目状态" v-model="status" clearable class="search-input">
                <el-option label="推荐中" value="0"></el-option>
                <el-option label="为推荐" value="2"></el-option>
            </el-select>
            </div>
        </div>

        <div class="list_content">
            <div class="list_title">
                <span>
                <img src="@/assets/list/u28.png">&nbsp;数据列表
                </span>
                <el-button class="el_left" v-show="second" @click="switchQuery(0,'')">返回</el-button>
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

                <el-table-column prop="navName" label="类目名称"></el-table-column>

                <el-table-column label="图标" v-if="!second">
                     <template slot-scope="scope">
                        <img :src="scope.row.navIcon | imgSrc" alt="">
                    </template>
                </el-table-column>

                <el-table-column label="级别">
                    <template slot-scope="scope">{{ scope.row.parentId == '0' ? '一级' : '二级' }}</template>
                </el-table-column>

                <el-table-column label="是否推荐">
                    <template slot-scope="scope">
                        <el-switch @change="handleShow(scope.row.status, scope.row)" v-model="scope.row.status" :active-value="0" :inactive-value="2" active-color="#5BC0BF" inactive-color="#dedede"></el-switch>
                    </template>
                </el-table-column>

                <el-table-column label="排序">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.navSort" @blur="handleNavSort($event, scope.row)" size="small" class="text-center"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="状态">
                    <template slot-scope="scope">{{ scope.row.status == 2 ? '未推荐' : '推荐中' }}</template>
                </el-table-column>

                <el-table-column label="设置" width="200" v-if="!second">
                    <template slot-scope="scope">
                        <span class="col_span" @click="$router.push('/promotion/addHeader?parentId=' + scope.row.id)">新增下级</span>
                        <span class="col_span" @click="switchQuery(true, scope.row.id)">查看下级</span>
                    </template>
                </el-table-column>

                 <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span class="col_span" @click="setTop(scope.row.id, scope.row.navTop)">{{ scope.row.navTop == 0 ? '置顶' : '取消置顶' }}</span>
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
  name: 'proheader',
  data(){
    return {
        second: false,
        currentPage:1,
        visibleSearch:false,
        goodsName:"",
        typeId:"",
        categoryList:[],
        tableData3:[],
        loading:false,
        idList:[],
        checked:"",
        operation:"",
        total:null,
        headerId:0,
        navName:"",
        status:""
    }
  },
  created() {
      this.getStatepage();
  },
  methods: {
    handleShow(status, data){
        let ruleForm = {
          id: data.id,
          navName: data.navName,
          parentId: data.parentId,
          navSort: data.navSort,
          status: status,
          navIcon: data.navIcon,
          navDesc: data.navDesc
        };
        this.$http.post("merchantNavigation/merchant_navigation_update", ruleForm).then(() => {
          Message.success("操作成功");
        }, (err) => {
          Message.success(err.msg);
        })
    },
    switchQuery(status,id){
        this.currentPage = 1;
        if (status){
          this.second = true;
          this.headerId = id;
        }else {
          this.second = false;
          this.headerId = 0;
        }
        this.getStatepage();
    },
    getStatepage(){
        this.loading = true;
        this.$http.post("merchantNavigation/merchant_navigation_list_page",{
          currentPage: this.currentPage,
          pageSize: 10,
          parentId: this.headerId,
          navName: this.navName,
          status: this.status,
        }).then((res) => {
          this.tableData3 = res.list;
          this.total = res.totalCount;
          this.loading = false;
        });
    },
    remove(id){
        this.$confirm("确认删除吗?").then(() => {
            this.$http.post("merchantNavigation/merchant_nav_batch", {
                ids: id,
                oprate: 1
            }).then(() => {
                Message.success("删除成功");
                this.getStatepage();
            }, (err) => {
                Message.error(err.msg);
            })
        })
    },
    setTop(id,status){
         this.$http.post("merchantNavigation/set_nav_top", {
          id: id,
          navTop: status == 0 ? '' : 0
        }).then(() => {
          Message.success("操作成功");
          this.getStatepage();
        },(err) => {
           Message.error(err.msg);
        })
    },
    deleteEre() {
      if (this.operation == "" || this.idList == "") {
        Message.warning("未选择操作项");
      } else {
        let idlists = this.idList.map(item => {
          return item.id;
        });
        this.$http.post("merchantNavigation/merchant_nav_batch", idlists).then(
          res => {
            Message.success("删除成功");
            this.getStatepage();
          },
          err => {
            Message.error(err);
          }
        );
      }
    },
    handleSelectionChange(val){
        this.idList = val;
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
    handleNavSort($event, data){
        if ($event.target.value < 0 || $event.target.value > 999){
          this.$msgWar("排序在0 - 999之间");
          return
        }
        let ruleForm = {
          id: data.id,
          navName: data.navName,
          parentId: data.parentId,
          navSort: $event.target.value,
          status: data.status,
          navIcon: data.navIcon,
          navDesc: data.navDesc
        };
        this.$http.post("merchantNavigation/merchant_navigation_update", ruleForm).then(() => {
            Message.success("操作成功");
            this.getStatepage();
        }, (err) => {
            Message.success(err.msg);
        })
      }
  },
  filters:{
      imgSrc(val){
         return val.split(',')[0]
      }
  }
}
</script>

<style lang="less" scoped>
.proHeader{
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
    .gd_img {
      height: 60px;
    }
    .col_span {
      color: #1abc9c;
      cursor: pointer;
      margin-left:6px;
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
