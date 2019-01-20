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
                    <el-button>查询结果</el-button>
                </div>
            </div>
            <div class="div_center" v-show="visibleSearch">    
                <span class="list_conditions">
                    输入搜索:
                </span>
                <el-input
                    placeholder="请输入内容"
                    clearable
                    class="search_input"
                >
                </el-input>
                <span class="list_conditions">
                    选择分类:
                </span>
                <el-select placeholder="请选择商品分类" v-model="typeId"  clearable class="search-input">
                    <el-option :label="item.typeName" :value="item.id" v-for="item in categoryList"></el-option>
                </el-select>
                 <span class="list_conditions">
                    选择品牌:
                </span>
                <el-select placeholder="请选择商品品牌" v-model="brandId"  clearable class="search-input">
                    <el-option :label="item.name" :value="item.id" v-for="item in brandList"></el-option>
                </el-select>
            </div>
        </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'Lists',
  comments:{

  },
  data(){
    return {
        visibleSearch:false,
        categoryList:[],
        brandList:[],
        brandId:"",
        typeId:"",
    }
  },
  mounted() {
    this.$http.post('merchantGoodsType/query_goods_type_tree').then((res) => {
        this.categoryList = res;
    });
    this.$http.post('merchant_goods_brand/query_list').then((res) => {
        this.brandList = res;
    });
  },
  methods: {
 
  },
}
</script>

<style lang="less">
.list_head{
    background:#ffffff;
    margin-top:20px;
    border:1px solid #cccccc;
    .div_search{
        overflow:hidden;
        height:50px;
        background:#f3f3f3;
        padding:10px 10px 0 10px;
        border-bottom:1px solid #cccccc;
        >div:first-child{
            float:left;
            margin-top:10px;
        }
        >div:last-child{
            float:right;
        }
        .spa_cur{
            cursor:pointer;
        }
    }
    .div_center{
        height:42px;
        padding:10px 20px;
        .search_input{
            width:180px;
        }
        .list_conditions{
            color:#5a5a5a;
            font-size:14px;
            margin-left:40px;
        }
    }
}
</style>
