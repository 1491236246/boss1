<template>
  <div class="loginIn global_div">
    <content-top titlename="登陆日志"></content-top>
    <div class="center_div">
      <div class="Login_div">
        <p class="Login_title"><img src="@/assets/home/icon-6.png" width="25" />数据列表</p>
        <table class="Login_list">
          <thead>
            <tr>
              <td>
                时间
              </td>
              <td>
                IP
              </td>
              <td>
                地区
              </td>
              <td>
                浏览器
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(val,ind) in table_list" :key="ind">
              <td>{{val.operateTime}}</td>
              <td>{{val.ip}}</td>
              <td v-if="val.description.data">{{val.description.data.country}}-{{val.description.data.region}}-{{val.description.data.city}}</td>
              <td v-else></td>
              <td>{{val.pack}}</td>
            </tr>
          </tbody>
        </table>
        <div class="page_div">
          <el-pagination
            @current-change="getData"
            :current-page="currentPage4"
            layout="total,prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"loginIn",
  data(){
    return {
      table_list:[],
      currentPage4: 1,
      totalCount:null
    }
  },
  created(){
    this.getData(1);
  },
  methods: {
    getData(page){
      this.$http.post('/merchant/get_merchant_login_info_list',{
        currentPage: page,
        pageSize: 10,
        orderBy: 'operate_time desc'
      },{'type':"form"}).then((res)=>{
        this.totalCount=res.totalCount;
        this.table_list=res.list;
        this.table_list.forEach((item,index)=>{
          if(item.description!="" && item.description!="成功"){
              this.table_list[index].description=JSON.parse(this.table_list[index].description);
          }
        });
        console.log(this.table_list);
      });
    }
  },
}
</script>

<style lang="less">
.Login_div{
  width:804px;
  margin:20px auto;
  .Login_title{
    margin:0;
    height:50px;
    background:#efefef;
    line-height:50px;
    font-size:15px;
    border:1px solid #cccccc;
  }
  .Login_list{
    width:100%;
    border-collapse: collapse;
    border-spacing: 0;
    border:1px solid #cccccc;
    text-align:center;
    td{
      border:1px solid #cccccc;
    }
    tr{
      height:50px;
    }
    thead{
      font-size:20px;
      font-weight:bold;
      color:#5a5a5a;
    }
    tbody{
      background:#ffffff;
    }
  }
  .page_div{
    text-align:right;
    margin-top:20px;
  }

}
</style>
