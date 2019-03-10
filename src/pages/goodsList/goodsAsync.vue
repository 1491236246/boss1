<template>
  <div class="global_div goodsAsync">
    <content-top titlename="添加分类"></content-top>
    <div class="center_div">
        <div class="goodslist">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForms" label-width="150px" class="demo-ruleForm">
                <el-form-item label="分类名称: " prop="typeName">
                <el-input v-model="ruleForm.typeName"></el-input>
                </el-form-item>
                <el-form-item label="上级分类: ">
                <el-select :disabled="isAddCategory" v-model="ruleForm.parentId" placeholder="请选择分类">
                    <el-option :label="item.typeName" :value="item.id" v-for="item in categoryList"></el-option>
                </el-select>
                <p class="form-tips" v-if="!isAddCategory">不选择分类默认为顶级分类</p>
                </el-form-item>
                <el-form-item label="数量单位: ">
                <el-input v-model="ruleForm.goodsUnit"></el-input>
                </el-form-item>
                <el-form-item label="排序: ">
                <el-input v-model="ruleForm.goodsSort" type="number"></el-input>
                </el-form-item>
                <el-form-item label="是否显示: ">
                <el-radio-group v-model="ruleForm.showStatus">
                    <el-radio :label="0">显示</el-radio>
                    <el-radio :label="1">不显示</el-radio>
                </el-radio-group>
                </el-form-item>

                <el-form-item label="分类描述: ">
                <el-input type="textarea" v-model="ruleForm.typeDesc"></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForms')">提交</el-button>
                <el-button @click="callBack">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
  </div>
</template>

<script>
import {Message} from 'element-ui'
export default {
  name: 'index',
  data(){
    return {
        isAdd:true,
        isAddCategory:false,
        ruleForm: {
            typeName: '',
            parentId: 0,
            goodsUnit: '',
            goodsSort: '',
            showStatus: '',
            typeIcon: ''
        },
        rules: {
            typeName: [
                 { required: true, message: '请输入分类名称', trigger: 'blur' },
                 { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
            ],
        },
        categoryList:[{id: 0,typeName: '顶级分类'}],
        loading: false,
    }
  },
  created() {
      this.$http("merchantGoodsType/query_goods_type_tree").then((res)=>{
        this.categoryList=[...this.categoryList,...res];
        console.log(this.categoryList);
        if (this.$route.query.id){
            this.isAdd=false;
            this.loading = true;
            this.$http.post("merchantGoodsType/merchant_goods_type_by_id",{
                id: this.$route.query.id
            }).then((res) => {
               console.log(res);
               this.ruleForm.typeName=res.typeName;
               this.ruleForm.parentId=res.parentId;
               this.ruleForm.goodsUnit=res.goodsUnit;
               this.ruleForm.goodsSort=res.goodsSort;
               this.ruleForm.showStatus=res.showStatus;
               this.ruleForm.typeIcon=res.typeIcon;
            }, (err) => {
                Message.success(err.msg);
            }).finally(() => {
                this.loading = false;
            })
        }
        if (this.$route.query.parId){
          this.ruleForm.parentId=Number(this.$route.query.parId);
          this.isAddCategory = true;
        }
      });
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           if (this.isAdd){
              this.addEdit("merchantGoodsType/merchant_add_goods_type");
            } else {
              this.ruleForm.id = this.$route.query.id;
              this.addEdit("merchantGoodsType/merchant_goods_type_update");
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addEdit(url){
        this.$http.post(url, this.ruleForm).then(() => {
          Message.success("操作成功");
          setTimeout(() => {
            this.$router.push("/index/goodsClass");
          }, 500)
        }, (err) => {
          Message.error(err.msg);
        })
      },
      callBack(){
          this.$router.go(-1)
      }
  },
}
</script>

<style lang="less" scoped>
.goodsAsync{
    .goodslist{
        padding-top:20px;
        width:600px;
    }
}
</style>
