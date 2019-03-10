<template>
    <div class="global_div proAddheader">
        <content-top titlename="添加类目"></content-top>
        <div class="center_div">
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width:600px;" label-width="150px" class="form">
                <el-form-item label="类目名称: " prop="navName">
                    <el-input v-model.trim="ruleForm.navName"></el-input>
                </el-form-item>
                <el-form-item label="上级类目: " prop="parentId">
                    <el-select :disabled="isChild" v-model="ruleForm.parentId" placeholder="请选择分类">
                        <el-option :label="item.navName" :value="item.id" v-for="item in headerList"></el-option>
                    </el-select>
                    <p class="form-tips" v-if="!isChild">不选择分类默认为顶级分类</p>
                </el-form-item>
                <el-form-item label="排序: " prop="navSort">
                    <el-input v-model="ruleForm.navSort" type="number"></el-input>
                </el-form-item>
                <el-form-item label="是否显示: " prop="status">
                    <el-radio-group v-model="ruleForm.status">
                        <el-radio label="0">显示</el-radio>
                        <el-radio label="1">不显示</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="类目图标: " prop="navIcon" v-if="!isChild">
                    <img :src="ruleForm.navIcon" alt="" class="form-img" v-if="ruleForm.navIcon">
                    <div class="upload-btn-wrap">
                        <label for="upload"><el-button size="small" type="primary">上传图片</el-button></label>
                        <input @change="uploadNavIcon" id="upload" type="file" class="upload-input" accept="image/jpeg, image/png">
                        <p class="form-tips">建议图标尺寸为18*18比例，图片只能为jpg、png格式</p>
                    </div>
                </el-form-item>
                <el-form-item label="类目描述: " prop="navDesc">
                    <el-input type="textarea" v-model="ruleForm.navDesc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="submitLoading">提交</el-button>
                    <el-button @click="$router.push({name:'proheader'})">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {Message} from 'element-ui'
export default {
    name: 'index',
    data(){
       let navIconValid = (item, value, callback) => {
            if (!this.ruleForm.navIcon && !this.isChild){
                callback(new Error('请上传类目图标'));
            } else {
                callback();
            }
      };
      return{
        headerList: [{id: 0, navName: '顶级类目'}],
        isChild: false,
        ruleForm: {
            navName: '',
            parentId: 0,
            navSort: '',
            status: '0',
            navIcon: '',
            navDesc: ''
        },
        rules: {
            navName: [
                { required: true, message: '请输入分类名称', trigger: 'blur' },
                { max: 20, message: '长度必须小于20个字符', trigger: 'blur' }
            ],
            navIcon: [
                { validator: navIconValid, trigger: 'change'}
            ]
        },
        loading: false,
        submitLoading: false,
      }
    },
    created(){
        this.$http.post("merchantNavigation/query_navigation_type_tree", {
        }).then((res) => {
            this.headerList = [...this.headerList, ...res];
            if (this.$route.query.parentId){
                this.$set(this.ruleForm, 'parentId', Number(this.$route.query.parentId));
                this.isChild = true;
            }
        })
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    this.addEdit("merchantNavigation/merchant_navigation_add");
                } else {
                    return false;
                }
            });
        },
      uploadFile(file){
            return new Promise((resolve, reject) => {
                if (file.target.files.length > 0){
                let formData = new FormData();
                formData.append('file', file.target.files[0]);
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
      uploadNavIcon(file){
        this.uploadFile(file).then((res) => {
            this.$set(this.ruleForm, 'navIcon', res.imgUrl);
        })
      },
      addEdit(url){
        this.$http.post(url, this.ruleForm).then(() => {
            Message.success("操作成功");
            setTimeout(() => {
                this.$router.push("/promotion/header");
                this.submitLoading = false;
            }, 500)
        }, (err) => {
            Message.error(err.msg);
            this.submitLoading = false;
        })
      }
    },
}
</script>

<style lang="less" scoped>
.proAddheader{
    .center_div{
        padding-top:20px;
    }
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
    .upload-btn-wrap{
        position: relative;
    }
}
</style>
