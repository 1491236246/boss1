<template>
<div class="orderSeting global_div">
    <content-top titlename="订单设置"></content-top>
    <div class="center_div">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="正常订单超过" prop="normalEndpayTime">
                <el-input v-model="ruleForm.normalEndpayTime" placeholder="请输入时间"></el-input>
                <span>分</span><em>未付款，订单自动关闭</em>
            </el-form-item>
            <el-form-item label="发货超过" prop="sendEndTime">
                <el-input v-model="ruleForm.sendEndTime" placeholder="请输入时间"></el-input>
                <span>天</span><em>未收货，订单自动完成</em>
            </el-form-item>
            <el-form-item label="最终评论时间" prop="commentEndTime">
                <el-input v-model="ruleForm.commentEndTime" placeholder="请输入时间"></el-input>
                <span>天</span><em>好评并完成</em>
            </el-form-item>
            <el-form-item label="完成收货后" prop="finalEndTime">
                <el-input v-model="ruleForm.finalEndTime" placeholder="请输入时间"></el-input>
                <span>天</span><em>不能申请售后</em>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
import {Message} from 'element-ui'
export default {
    name: 'orderseting',
    data(){
    return {
        id:null,
         ruleForm: {
          normalEndpayTime: '',
          sendEndTime: '',
          commentEndTime: '',
          finalEndTime: ''
        },
        rules: {
            normalEndpayTime: [
                {required: true, message: '请输入时间', trigger: 'blur'},
            ],
            sendEndTime: [
                {required: true, message: '请输入时间', trigger: 'blur'}
            ],
            commentEndTime: [
                {required: true, message: '请输入时间', trigger: 'blur'}
            ],
            finalEndTime: [
                {required: true, message: '请输入时间', trigger: 'blur'}
            ]
        }
    }
    },
    created() {
        this.getList();
    },
    methods: {
        getList(){
            this.$http.post('/merchant_order_set/queryOrderSet', {
                merchantId: JSON.parse(localStorage.userInfo).merchantId
            }).then((res) => {
                this.ruleForm.normalEndpayTime=res.normalEndpayTime;
                this.ruleForm.sendEndTime=res.sendEndTime;
                this.ruleForm.commentEndTime=res.commentEndTime;
                this.ruleForm.finalEndTime=res.normalEndpayTime;
                this.id = res.id
            }).catch((res) => {
                Message.error(res.error);
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$http.post('/merchant_order_set/add_or_update', {
                    normalEndpayTime: this.ruleForm.normalEndpayTime,
                    sendEndTime: this.ruleForm.sendEndTime,
                    commentEndTime: this.ruleForm.commentEndTime,
                    finalEndTime: this.ruleForm.finalEndTime,
                    id: this.id,
                    merchantId: JSON.parse(localStorage.userInfo).merchantId
                }).then((res) => {
                    Message.success("提交成功");
                })
            } else {
                return false;
            }
            });
        }
    }
}
</script>

<style lang="less" scoped>
.orderSeting{
    .demo-ruleForm{
        margin:20px auto;
        width:700px;
        &>.el-form-item{
            .el-input{
                width:250px;
                
            }
            span{
                // float:left;
                display:inline-block;
                text-align:center;
                line-height:center;
                height:40px;
                width:40px;
                background:#cccccc;
                color:#000000;
                border:1px solid #cccccc;
                border-radius:2px;
            }
            em{
                font-style: normal;
                display: inline-block;
                width: 190px;
                color: #606266;
                text-align: left;
                margin-left: 10px;
            }
        }
    }
}
</style>
