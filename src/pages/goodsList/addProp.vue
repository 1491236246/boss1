<template>
  <div class="addProp global_div">
    <content-top titlename="添加属性"></content-top>
    <div class="center_div">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="form">
        <el-form-item label="属性名称: " prop="propertyName">
          <el-input v-model="ruleForm.propertyName"></el-input>
        </el-form-item>
        <el-form-item label="商品类型: " prop="styleId">
          <el-select v-model="ruleForm.styleId" placeholder="请选择类型" class="search-input">
            <el-option :value="item.id" :label="item.styleName" v-for="item in typeList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="属性是否可选: " prop="propertySelect">
          <el-radio v-model="ruleForm.propertySelect" :label="0" disabled>唯一属性</el-radio>
          <el-radio v-model="ruleForm.propertySelect" :label="1" disabled>单选属性</el-radio>
          <el-radio v-model="ruleForm.propertySelect" :label="2" disabled>复选属性</el-radio>
          <p class="form-tips">选择"单选/复选属性"时，可以对商品该属性设置多个值，同时还能对不同属性值指定不同的价格加价，用户购买商品时需要选定具体的属性值。选择"唯一属性"时，商品的该属性值只能设置一个值，用户只能查看该值。</p>
        </el-form-item>
        <el-form-item label="属性值: " prop="propertyList">
          <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              >
            {{tag}}
          </el-tag>
          <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">添加属性值</el-button>
        </el-form-item>
        <el-form-item label="属性排序: " prop="propertyOrder">
          <el-input v-model="ruleForm.propertyOrder" type="number"></el-input>
          <p class="form-tips">排序级别最高的属性可单独上传属性图片</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {Message} from 'element-ui'
export default {
  name: 'addprop',
  data(){
        let validProp = (item, value, callback) => {
            if (this.dynamicTags.length == 0){
                callback(new Error('请添加属性值'));
            } else if (this.ruleForm.propertySelect == 0 && this.dynamicTags.length > 1){
                callback(new Error('唯一属性只能添加一个属性值'));
            }else{
                callback();
            }
        };
    return {
        isAdd:true,
        inputValue: '',
        inputVisible: false,
        dynamicTags: [],
        typeList: [],
        ruleForm: {
          propertyName: '',
          styleId: '',
          propertySelect: 1,
          propertyList: '',
          propertyOrder: '',
        },
        rules: {
          propertyName: [
            { required: true, message: '请输入属性名称', trigger: 'blur' },
            { max: 20, message: '长度必须小于20个字符', trigger: 'blur' }
          ],
          styleId: [
            { required: true, message: '请选择商品类型', trigger: 'change' },
          ],
          propertyList: [
            { validator: validProp, required: true, trigger: 'change'  },
          ],
        }
    }
  },
  created() {
      this.$http.post("merchantGoodsStyle/merchant_goods_type_list").then((res) => {
        this.typeList = res;
        if (this.$route.query.id){
            this.isAdd = false;
            this.$http.post("merchantGoodsProperty/merchant_goods_type_by_id", {
                id: this.$route.query.id
            }).then((res) => {
                this.$set(this.ruleForm, 'propertyName', res.propertyName);
                this.$set(this.ruleForm, 'styleId', res.styleId);
                this.$set(this.ruleForm, 'propertySelect', res.propertySelect);
                this.$set(this.ruleForm, 'propertyOrder', res.propertyOrder);
                if (res.propertyList.length > 0){
                this.dynamicTags = res.propertyList.split(',');
                }
            })
        }
      });
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$set(this.ruleForm, 'propertyList', this.dynamicTags.join(','));
            if (this.isAdd){
              this.addEdit('merchantGoodsProperty/merchant_goods_type_add', this.ruleForm);
            } else {
              this.ruleForm.id = this.$route.query.id;
              this.addEdit('merchantGoodsProperty/merchant_goods_type_update', this.ruleForm);
            }
          } else {
            return false;
          }
        });
    },
    addEdit(url,data){
        this.$http.post(url, data).then(() => {
            Message.success("提交成功");
            this.$router.go(-1);
        },(err) => {
            Message.error(err.msg);
        })
    },
    handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    handleInputConfirm() {
        let inputValue = this.inputValue;
        if (this.dynamicTags.indexOf(inputValue) < 0) {
            this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
  },
}
</script>

<style lang="less" scoped>
.addProp{
    .form{
        .input-new-tag{
            width:100px;
        }
        margin-top:20px;
        width:700px;
        .form-tips{
            font-size: 12px;
            color: #a29898;
            line-height: 16px;
            margin-top: 5px;
        }
    }
}
</style>
