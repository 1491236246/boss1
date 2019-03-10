<template>
  <div class="addImage global_div">
    <content-top titlename="添加属性"></content-top>
    <div class="center_div">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="form">
            <el-form-item label="相册名称: " prop="name">
            <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="相册封面: " prop="cover">
            <img :src="ruleForm.cover" alt="" class="form-img" v-if="ruleForm.cover">
            <div class="upload-btn-wrap">
                <label for="upload"><el-button type="primary" size="small">上传图片</el-button></label>
                <input id="upload" type="file" class="upload-input" accept="image/jpeg, image/png" @change="uploadLogo">
                <p class="form-tips">只能上传jpg/png格式文件，文件不能超过50kb</p>
            </div>
            </el-form-item>
            <el-form-item label="排序: " prop="sorting">
            <el-input v-model="ruleForm.sorting" type="number"></el-input>
            </el-form-item>
            <el-form-item label="相册描述: " prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="$router.push({name:'goodsimage'})">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
import {Message} from 'element-ui'
export default {
    name: 'addimage',
    data(){
        let validCover = (item, value, callback) => {
            if (!this.ruleForm.cover){
                callback(new Error('请上传相册封面'));
            }else{
                callback();
            }
        };
        return {
            ruleForm: {
                name: '',
                cover: '',
                sorting: '',
                description: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入相册名称', trigger: 'blur' },
                    { max: 20, message: '长度必须小于20个字符', trigger: 'blur' }
                ],
                cover: [
                    { validator: validCover, required: true, trigger: 'change' }
                ],
            },
            isAdd:true
        }
    },
    created() {
      if (this.$route.query.id){
        this.$http.post('merchant_goods_galleries/query_by_id',{
            id: this.$route.query.id
        },{type: 'form'}).then((res) => {
            this.isAdd = false;
            this.ruleForm.name=res.name;
            this.ruleForm.cover=res.cover;
            this.ruleForm.sorting=res.sorting;
            this.ruleForm.description=res.description;
        },(err) => {
          Message.error(err.msg);
        })
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.isAdd){
              this.addEdit("merchant_goods_galleries/add");
            } else {
              this.ruleForm.id=this.$route.query.id;
              this.addEdit("merchant_goods_galleries/update");
            }
          } else {
            return false;
          }
        });
      },
      addEdit(url){
        this.$http.post(url, this.ruleForm).then(() => {
          Message.success("提交成功");
          setTimeout(() => {
            this.$router.push("/index/goodsimage");
          }, 500)
        },(err) => {
          Message.error(err.msg);
        })
      },
        uploadFile(event){
          return new Promise((resolve, reject) => {
            if (event.target.files.length > 0){
              let formData = new FormData();
              formData.append('file', event.target.files[0]);
              this.$http.post('merchant/upload_file', formData, {
                type: 'form',
                file: 'image'
              }).then((res) => {
                resolve({
                  imgUrl: res.imgUrl + res.image
                });
              },(err) => {
                Message.error(err.msg);
                reject(err);
              })
            }
          })
        },
        uploadLogo(file){
          this.uploadFile(file).then((res) => {
            this.ruleForm.logo=res.imgUrl;
          })
        },
        uploadAreaLogo(file){
          this.uploadFile(file).then((res) => {
            this.ruleForm.areaLogo=res.imgUrl;
          })
        },
    },
}
</script>
<style lang="less" scoped>
.addImage{
    .form{
        margin-top:20px;
        width:600px;
        .upload-btn-wrap{
            position:relative;
            .upload-input{
                position: absolute;
                left: 0;
                top: 4px;
                width: 80px;
                height: 32px;
                opacity: 0;
                z-index: 3;
                cursor: pointer;
            }
        }
        .form-img{
          width:150px;
        }
    }
}
</style>