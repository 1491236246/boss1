<template>
  <div class="userList global_div">
    <content-top titlename="商品入库"></content-top>
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
                <el-button @click="getStatepage(1)">查询结果</el-button>
            </div>
            </div>
            <div class="div_center" v-show="visibleSearch">
            <span class="list_conditions">输入搜索:</span>
            <el-input placeholder="商品名称/商品货号" clearable class="search_input" v-model="navName"></el-input>
            <span class="list_conditions">操作类型:</span>
            <el-input placeholder="请输入手机号" clearable class="search_input" v-model="status"></el-input>
            <span class="list_conditions">操作时间：</span>
            <div class="block">
              <el-date-picker
                v-model="value6"
                type="daterange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
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
            >

                <el-table-column prop="id" label="ID"></el-table-column>

                <el-table-column label="微信头像"></el-table-column>

                <el-table-column label="商品名称">
                  <template slot-scope="scope">
                    <p>{{ scope.row.goodsName }}</p>
                    <p>品牌: {{ scope.row.brandName }}</p>
                  </template>
                </el-table-column>

                <el-table-column label="手机号/微信号" prop="mobilePhone"></el-table-column>

                <el-table-column prop="userName" label="微信昵称"></el-table-column>

                <el-table-column prop="openId" label="openId"></el-table-column>

                <el-table-column prop="createTime" label="创建时间"></el-table-column>
            </el-table>

            <div class="list_footer">
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
  name: 'userList',
  data(){
    return {
        visibleSearch:false,
        value6:[],
        navName:null,
        status:null,
        tableData3:[],
        loading:true,
        currentPage:1,
        total:null
    }
  },
  created() {
    this.getStatepage(1);
  },
  methods: {
    getStatepage(page){
       this.$http.post("user_detail/list",{
          currentPage: page,
          pageSize: 10,
          realName: this.navName,
          mobilePhone: this.status,
          beginTime: this.value6==""?null:this.value6[0],
          endTime: this.value6==""?null:this.value6[1],
        }).then((res) => {
          this.tableData3 = res.list;
          this.total = res.totalCount;
          this.loading = false;
        },(err)=>{
            Message.error(err.msg);
            this.loading=false;
        });
    }
  }
}
</script>

<style lang="less" scoped>
.userList{
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
            margin-left: 30px;
      }
    }
  }
  .block{
    float: right;
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
