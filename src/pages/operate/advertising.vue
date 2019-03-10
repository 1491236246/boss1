<template>
  <div class="advertising global_div">
    <content-top titlename="商品类型"></content-top>
    <div class="center_div">
        <div class="list_content">
            <div class="list_title">
                <span>
                <img src="@/assets/list/u28.png">&nbsp;数据列表
                </span>
                <el-button class="el_left" v-show="second" @click="switchQuery(0,'')">返回</el-button>
                <el-button class="el_left" @click="$router.push({name:'Addadvert'})">添加广告</el-button>
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

                <el-table-column prop="adName" label="广告名称"></el-table-column>

                <el-table-column label="广告位置">
                     <template slot-scope="scope">
                        {{ scope.row.adPosition | getAdPosition }}
                    </template>
                </el-table-column>

                <el-table-column label="广告图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.adPicture" alt="" style="width:50px;">
                    </template>
                </el-table-column>

                 <el-table-column label="上线/下线">
                    <template slot-scope="scope">{{ scope.row.online == '1' ? '上线' : '下线' }}</template>
                </el-table-column>

                <el-table-column prop="clickNumber" label="点击次数"></el-table-column>


                 <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span class="col_span" @click="$router.push({name:'Addadvert',query:{id:scope.row.id}})">编辑</span>
                        <span class="col_span" @click="setTop(scope.row.id, scope.row.topState)">{{ scope.row.topState == 1 ? '取消置顶' : '置顶' }}</span>
                        <span class="col_span" @click="remove(scope.row.id)">删除</span>
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
  name: 'advertising',
  data(){
    return {
        second: false,
        currentPage:1,
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
        this.$http.post("merchant_ad/get_merchant_ad_list",{
          currentPage: this.currentPage,
          pageSize: 10,
        }).then((res) => {
          this.tableData3 = res.list;
          this.total = res.totalCount;
          this.loading = false;
        });
    },
    remove(id){
        this.$confirm("确认删除吗?").then(() => {
          this.$http.post("merchant_ad/delete_merchant_ad", {
            remark: id,
          }).then(() => {
            this.getStatepage();
            Message.success("删除成功");
          },(err) => {
            Message.error(err.msg);
          })
        })
    },
    setTop(id,status){
         this.$http.post('merchant_ad/change_merchant_ad',{
          id: id,
          topState: status == '1' ? '0' : '1',
        }).then(() => {
            Message.success("操作成功");
            this.getStatepage();
        }, (err) => {
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
        this.$http.post("merchant_ad/delete_merchant_ad", idlists).then(
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
      getAdPosition(val){
        let adPositionList = {
            '1': 'APP首页轮播',
            '2': '分类轮播',
        };
         return adPositionList[val]
      }
  }
}
</script>

<style lang="less" scoped>
.advertising{
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
