<template>
  <div class="stockOut global_div">
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
            <el-select placeholder="请选择操作类型" v-model="status" clearable class="search-input">
                <el-option label="推荐中" value="0"></el-option>
                <el-option label="为推荐" value="2"></el-option>
            </el-select>
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

                <el-table-column prop="id" label="编号"></el-table-column>

                <el-table-column label="商品图片">
                </el-table-column>

                <el-table-column label="商品名称">
                  <template slot-scope="scope">
                    <p>{{ scope.row.goodsName }}</p>
                    <p>品牌: {{ scope.row.brandName }}</p>
                  </template>
                </el-table-column>

                <el-table-column label="货号/属性">
                  <template slot-scope="scope">{{ scope.row.goodsNo }}/{{ scope.row.property }}</template>
                </el-table-column>

                <el-table-column prop="orderCode" label="编号"></el-table-column>

                <el-table-column label="库存">
                  <template slot-scope="scope">
                    <p>数量: {{ scope.row.changeNumber }}</p>
                    <p>剩余: {{ scope.row.changeAfter }}</p>
                  </template>
                </el-table-column>

                <el-table-column prop="typeName" label="操作类型"></el-table-column>

                <el-table-column prop="createTime" label="操作信息"></el-table-column>
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
export default {
  name: 'stockOut',
  data(){
    return {
        visibleSearch:false,
        value6:[],
        navName:"",
        status:"",
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
       this.$http.post("merchant_goods_log/query_for_page",{
          currentPage: page,
          pageSize: 10,
          search: this.navName,
          operateType: this.status,
          beginTime: this.value6[0],
          endTime: this.value6[1],
          type: 0
        }).then((res) => {
          this.tableData3 = res.list;
          this.total = res.totalCount;
          this.loading = false;
        });
    }
  }
}
</script>

<style lang="less" scoped>
.stockOut{
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
