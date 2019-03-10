<template>
  <div class="home">
    <div class="ax_default"></div>
    <div class="ax_default_content">
      <div class="ax_top"></div>
      <div class="ax_title">后台业务管理系统</div>
      <div class="ax_heis">
        <input type="text" class="ax_inp_name" v-model="logingName" placeholder="请输入用户名称" :class="{backes:ind==1}" @focus="ind=1" @blur="ind=null">
        <img src="~@/assets/login/u2176.png" alt="">
      </div>
      <div class="ax_heis">
        <input type="text" class="ax_inp_password" v-model="loginPassword" placeholder="请输入登陆密码" :class="{backes:ind==2}" @focus="ind=2" @blur="ind=null">
        <img src="~@/assets/login/u2178.png" alt="">
      </div>
      <div class="ax_err" v-show="statuse">
        <div></div>
        <span>{{statuse}}</span>
      </div>
      <span class="ax_login" @click="submits">登陆</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data(){
    return {
      ind:null,
      logingName:"13932493200",
      loginPassword:"000000",
      statuse:"",
    }
  },
  methods: {
    submits(){
      if(this.logingName==""){
        this.statuse="请填写用户账号";
      }else if(this.loginPassword==""){
        this.statuse="请填写登陆密码";
      }else{
         this.$http.post('merchant/login', {
           loginName:this.logingName,
           loginPassword:this.loginPassword
         },{
           type:"form"
         }).then((res) => {
            this.$store.commit("SET_USERINFO", JSON.stringify(res));
             this.$message({
                showClose: true,
                message: '登陆成功',
                type: 'success'
              });
            localStorage.userId = res.userId;
            localStorage.userMobile = res.merchantMobile;
            localStorage.merchantId_ID = res.merchantId;
            localStorage.moduleId = 300;
            setTimeout(() => {
               this.statuse="";
               this.$router.push("/index/homes/home");
            }, 500);
          }, (err) => {
            this.$message({
              showClose: true,
              message: err.msg,
              type: 'error'
            });
          })
       
      }
    }
  },
}
</script>

<style lang="less" scoped>
  .ax_default{
    position: absolute;
    top:50%;
    height: 220px;
    width: 100%;
    background-color: rgba(26, 188, 156, 1);
    background-image: url('~@/assets/login/u2154_state0.png');
    background-position: right top;
    background-repeat: repeat;
    background-size:2000px 360px;
    margin-top: -110px;
  }
  .ax_default_content{
    text-align: center;
    position: absolute;
    top: 50%;
    left:50%;
    width:350px;
    height: 420px;
    margin-top: -210px;
    margin-left: -210px;
    background: #ffffff;
    box-shadow: 0px 3px 9px #a09a9a;
    .ax_top{
      width:350px;
      height: 10px;
      background: rgba(26, 188, 156, 1);
      margin-top: 0;
    }
    .ax_heis{
      height: 50px;
      margin-bottom: 20px;
      position: relative;
      img{
        position: absolute;
        left: 36px;
        top: 14px;
      }
    }
    .ax_title{
      font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
      font-weight: 700;
      font-style: normal;
      font-size: 24px;
      color: #1ABC9C;
      line-height: 28px;
      margin-top: 98px;
      margin-bottom:20px;
    }
    .ax_inp_name,.ax_inp_password{
      width:250px;
      height: 50px;
      line-height: 50px;
      border:none;
      outline: none;
      background-image: url('~@/assets/login/border_u2165.png');
      background-repeat:no-repeat;
      background-position: left center;
      padding-left:50px;
    }
    .ax_login{
      display: inline-block;
      width: 300px;
      height: 50px;
      background: rgba(26, 188, 156, 1);
      text-align: center;
      line-height: 50px;
      color:#ffffff;
      font-size: 18px;
      font-family: '微软雅黑 Regular', '微软雅黑';
      font-weight: 403;
      font-style: normal;
      border-radius: 5px;
    }
    .ax_err{
      width:300px;
      height: 40px;
      border-radius: 5px;
      position: relative;
      margin:-10px auto 10px auto;
      overflow: hidden;
      div{
        width: 100%;
        height: 100%;
        background: #808080;
        position: absolute;
        top: 0;
        left: 0;
      }
      span{
        display: inline-block;
        width: 280px;
        height: 100%;
        text-align: left;
        line-height: 40px;
        color:#ffffff;
        padding-left: 20px;
        font-size: 16px;
        position: relative;
        z-index: 1;
      }
    }
    .backes{
      background-image: url('~@/assets/login/border_u2165_selected.png');
    }
  }
</style>
