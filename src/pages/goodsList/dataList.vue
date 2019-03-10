<template>
    <div class="dataList">
        <div class="form-label" style="top:50px;">基本信息</div>
        <div class="form-label" style="top:400px;">库存规格</div>
        <div class="data-form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商品分类:">
              <span style="color:#5BC0BF;">{{categoryName}}<span v-show="childCategoryName">></span>{{childCategoryName}}</span>
            </el-form-item>
            <el-form-item label="商品名称:" prop="goodsName">
              <el-input v-model="ruleForm.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="副标题:" prop="goodsSubtitle">
              <el-input v-model="ruleForm.goodsSubtitle"></el-input>
            </el-form-item>
            <el-form-item label="商品品牌:" prop="brandId">
              <el-select v-model="ruleForm.brandId" placeholder="请选择品牌">
                <el-option :label="item.name" :value="item.id" v-for="item in brandList"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品介绍:" prop="goodsDesc">
              <el-input type="textarea" v-model="ruleForm.goodsDesc"></el-input>
            </el-form-item>
            <el-form-item label="商品货号:" prop="goodsNo">
              <el-input v-model="ruleForm.goodsNo"></el-input>
              <p class="dataNum">如果您不输入商品货号，系统将自动生成一个唯一的货号</p>
            </el-form-item>
            <el-form-item label="商品售价:" prop="goodsPrice">
              <el-input v-model="ruleForm.goodsPrice"></el-input>
            </el-form-item>
            <el-form-item label="市场价:" prop="marketPrice">
              <el-input v-model="ruleForm.marketPrice" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品库存:" prop="goodsStock">
              <el-input v-model="ruleForm.goodsStock" type="number"></el-input>
              <p class="dataNum">该设置只对单品有效，当商品存在多规格货品时为不可编辑状态，库存数值取决于货品数量</p>
            </el-form-item>
            <el-form-item label="库存预警值:" prop="goodsWarning">
              <el-input v-model="ruleForm.goodsWarning" type="number"></el-input>
            </el-form-item>
            <el-form-item label="计量单位:" prop="goodsUnit">
              <el-input v-model="ruleForm.goodsUnit"></el-input>
            </el-form-item>
            <el-form-item label="商品重量:" prop="goodsWeight">
              <el-input v-model="ruleForm.goodsWeight"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button  @click="resetForm('ruleForm')">上一步,选择商品分类</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">下一步,填写商品属性</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'index',
  data(){
    let validGoodsStock = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入商品库存'));
        } else if (value > 99999) {
          callback(new Error('商品库存最大值为99999'));
        } else if (value < 0) {
          callback(new Error('商品库存不能小于0'));
        } else {
          callback();
        }
    };
     return {
        brandList:[],
        rules: {
          goodsName: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {max: 20, message: '长度必须小于20个字符', trigger: 'blur'},
          ],
          goodsSubtitle: [
            {required: true, message: '请输入副标题', trigger: 'blur'},
            {max: 20, message: '长度必须小于20个字符', trigger: 'blur'},
          ],
          brandId: [
            {required: true, message: '请选择品牌', trigger: 'change'},
          ],
          goodsDesc: [
            {required: true, message: '请输入商品介绍', trigger: 'blur'},
          ],
          goodsPrice: [
            {required: true, message: '请输入商品售价', trigger: 'blur'},
          ],
          goodsStock: [
            {required: true, validator: validGoodsStock, trigger: 'blur'},
          ],
          goodsWarning: [
            {required: true, message: '请输入库存预警值', trigger: 'blur'},
          ],
        },
      };
  },
  methods: {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push({name:"goodsAttr"});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
  mounted() {
    this.$http.post("merchant_goods_brand/query_list").then((res) => {
      this.brandList = res;
    });
    let categoryName=this.$route.query.cla1;
    let childCategoryName=this.$route.query.cla2;
    this.$store.commit("add_data",{"categoryName":categoryName,"childCategoryName":childCategoryName});
  },
  computed: {
    ...mapState([
      'ruleForm',
      'categoryName',
      'childCategoryName'
    ])
  },
}
</script>

<style lang="less" scoped>
.dataList{
  position:relative;
  height:1000px;
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
    .data-form{
      position:absolute;
      width:500px;
      left:50%;
      top:50px;
      margin-left:-250px;
    }
    .dataNum{
      font-size: 12px;
      color: #5a5a5a;
      line-height: 16px;
      margin-top: 5px;
    }
}
</style>
