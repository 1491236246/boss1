<template>
    <div class="orderAdd global_div">
        <content-top titlename="添加发货点"></content-top>
        <div class="center_div">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width:600px;" label-width="150px" class="form">
                <el-form-item label="发货点名称: " prop="returnPname">
                    <el-input v-model="ruleForm.returnPname"></el-input>
                </el-form-item>
                <el-form-item label="发货人姓名: " prop="returnName">
                    <el-input v-model="ruleForm.returnName"></el-input>
                </el-form-item>
                <el-form-item label="详细地址: " prop="returnAddress">
                    <el-input type="textarea" v-model="ruleForm.returnAddress"></el-input>
                </el-form-item>
                <el-form-item label="联系电话:" prop="returnPhone">
                    <el-input type="textarea" v-model="ruleForm.returnPhone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="$router.push({name:'orderaddress'})">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {Message} from 'element-ui'
export default {
    name:"orderadd",
    data(){
        return {
            isAdd:true,
            ruleForm: {
                returnPname: '',
                returnName: '',
                returnAddress: '',
                returnPhone:'',
                
            },
            rules: {
                returnPname: [
                    { required: true, message: '请输入发货点名称', trigger: 'blur' },
                    { max: 20, message: '长度必须小于20个字符', trigger: 'blur' }
                ],
                returnName: [
                    { required: true, message: '请输入发货人姓名', trigger: 'blur' },
                    { max: 20, message: '长度必须小于20个字符', trigger: 'blur' }
                ],
                returnAddress: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                    { max: 20, message: '长度必须小于20个字符', trigger: 'blur' }
                ],
                returnPhone: [
                    { required: true, message: '请输入联系电话', trigger: 'blur' },
                    { max: 20, message: '长度必须小于20个字符', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        if(this.$route.query.id){
            this.getData();
        }
    },
    methods: {
        getData(){
             this.$http.post('/return_send/query_By_Id ',{
                id: this.$route.query.id
            }).then((res) => {
                this.isAdd = false;
                this.ruleForm.returnPname=res.returnPname;
                this.ruleForm.returnName=res.returnName;
                this.ruleForm.returnAddress=res.returnAddress;
                this.ruleForm.returnPhone=res.returnPhone;
            },(err) => {
                Message.error(err.msg);
            })
        },
        addEdit(url){
            this.$http.post(url, this.ruleForm).then(() => {
                Message.success("提交成功");
                setTimeout(() => {
                    this.$router.push({name:"orderaddress"});
                }, 500)
            },(err) => {
                Message.error(err.msg);
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if (this.isAdd){
                    this.addEdit("/return_send/add_or_update");
                } else {
                    this.$set(this.ruleForm, 'id', this.$route.query.id);
                    this.addEdit("/return_send/add_or_update");
                }
            } else {
                return false;
            }
            });
        }
    },
}
</script>
<style lang="less" scoped>
.orderAdd{
    .center_div{
        padding-top:20px;
    }
}
</style>