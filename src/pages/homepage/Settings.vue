<template>
  <div class="settings global_div">
    <content-top titlename="账户设置"></content-top>
   <div class="center_div content">
      <div class="heard">账户设置</div>
      <div class="inContent">
          <el-upload
            class="upload-demo"
            action=""
            :http-request="uploadFile"
            accept="image/jpeg, image/png"
            :show-file-list="false">
            <img class="uploading-img-img" :src="avatar">
            <div slot="tip" class="el-upload__tip">上传头像</div>
          </el-upload>
          
          <!-- <div class="center-div userImg">
            <img src="@/assets/settings/u2865.png" />
          </div> -->
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" required>
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="旧密码"  prop="oldPassword">
              <el-input type="password" v-model="ruleForm.oldPassword"></el-input>
            </el-form-item>
             <el-form-item label="新密码" prop="newPassword">
              <el-input type="password" v-model="ruleForm.newPassword"></el-input>
            </el-form-item>
             <el-form-item label="确定密码" prop="twicePassword">
              <el-input type="password" v-model="ruleForm.twicePassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="update('ruleForm')">提交</el-button>
            </el-form-item>
          </el-form>
         
      </div>
   </div>
  </div>
</template>

<script>

export default {
  name: 'settings',
  data(){
    return {
      avatar: '',
      ruleForm: {
        name: '',
        oldPassword: '',
        newPassword: '',
        twicePassword: '',
        merchantLogo: ''
      }
    }
  },
  created(){

  },
  methods: {
    uploadFile(){
      let formData = new formData();
      formData.append('file', file.file);
      this.$http.post('merchant/upload_file',formData,{
        type: 'form',
        file: 'image'
      }).then((res) => {

      })
    }
  },
}
</script>

<style scoped lang="less">
  .settings {
    color: #666666;
    font-family: '微软雅黑';
    .center {
      text-align: center;
    }
    .content{
      border:1px solid rgba(228, 228, 228, 1);
      margin-top:20px;  
      background-color:white;  
      .heard {
        box-sizing:border-box;
        width: 1100px;
        height: 50px;
        background-color: rgba(243, 243, 243, 1);
        border-bottom: 1px solid rgba(228, 228, 228, 1);
        font-size: 12px;
        padding-left:10px;
        line-height: 50px;
      }
      .inContent { 
        text-align: center;
        .el-form-item{
          width: 400px;
          margin: 26px auto;
        }
        button{
          background: #5BC0BF;
          color: #fff;
        }
      }
      .uploading-img-img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .demo-ruleForm{
        margin-left: -120px;
      } 
    }
  }
</style>
