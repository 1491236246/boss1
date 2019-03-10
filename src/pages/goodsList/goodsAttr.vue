<template>
  <div class="goodsAttr">
    <div class="goodBoom">
      <div class="form-label">商品属性</div>
      <div class="goodContent">
        <el-form ref="form" label-width="80px"  v-loading="shows">
          <el-form-item label="商品类型:">
            <el-select v-model="ruleForm.styleId" placeholder="请选择商品类型" @change="getProp">
              <el-option :label="item.styleName" :value="item.id" v-for="item in typeList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品规格:" v-show="propList!=''">
            <div class="prop-wrap">
              <el-checkbox-group v-model="checkProp" v-for="(item,index) in propList" :key="index">
                <div class="font-14 gray">{{ item.name }}</div>
                <el-checkbox :label="item.name + prop" v-for="prop in item.list">{{ prop }}</el-checkbox>
              </el-checkbox-group>
              <div>
                <el-button size="small" @click="addgoods" type="primary">添加</el-button>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div>
       <table class="goods-table" border="1" v-show="propSpecList.length > 0">
          <thead>
            <td v-for="item in propHeader">{{ item }}</td>
            <td>销售价格</td>
            <td>商品库存</td>
            <td>库存预警值</td>
          </thead>
          <tbody>
            <tr v-for="item in propSpecList">
              <td v-for="val in item.nameValue">{{ val.value }}</td>
              <td><el-input v-model="item.goodsSalePrice" size="mini" type="number" :max="99999"></el-input></td>
              <td><el-input v-model="item.goodsStock" size="mini" type="number" :max="99999"></el-input></td>
              <td><el-input v-model="item.stockWarning" size="mini" type="number" :max="99999"></el-input></td>
              <!--<td><el-input v-model="item.skuCode" size="mini"></el-input></td>-->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'goodsAttr',
  data(){
    return {
      typeList:[],
      checkProp:[],
      propList:[],
      shows:false,
      propSpecList:[]
    }
  },
  methods: {
    roublack(){
        this.$router.go(-1)
    },
    addgoods(){
      console.log(this.checkProp);
    },
    getProp(){
      this.shows=true;
      this.propList=[];
      this.$http.post("merchantGoodsProperty/merchant_goods_property_list_page",{
        styleId: this.ruleForm.styleId,
        currentPage: 1,
        pageSize: 100,
      }).then((res)=>{
        console.log(res);
        this.propList=res.list.map((val,ind)=>{
          return {
            "name":val.propertyName,
            "list":val.propertyList.split(",")
          }
        });
        this.shows=false;
        this.$http.post("merchantGoodsParam/merchant_goods_property_list_page",{
          styleId: this.ruleForm.styleId,
          currentPage: 1,
          pageSize: 100,
        }).then((res)=>{
          console.log(res);
          
        });
      });
    }
  },
  mounted() {
    this.$http.post("merchantGoodsStyle/merchant_goods_style_list_page",{
      currentPage: 1,
      pageSize: 100,
    }).then((res)=>{
      this.typeList=res.list;
    });
  },
  computed: {
    ...mapState([
      'ruleForm',
    ])
  }
}
</script>

<style lang="less" scoped>
.goodsAttr{
  position:relative;
  padding-top:40px;
  .goodBoom{
    position:relative;
    margin:10px 0px;
  }
  .form-label{
        width: 175px;
        height: 50px;
        line-height: 50px;
        color: #fff;
        padding: 0 20px;
        box-sizing: border-box;
        background-color: #a29c9c;
        position: absolute;
        margin-right: 100px;
        font-size:18px;
        &::after{
            content: '';
            display: block;
            position: absolute;
            top: 0;
            right: -50px;
            border: 25px solid transparent;
            border-left-color: #a29c9c;
        }
    }
    .goodContent{
      width:800px;
      // height:200px;
      margin-left:270px;
    }
    .prop-wrap{
      border:1px solid #cccccc;
      border-radius:4px;
      padding:20px;
    }
}
</style>
