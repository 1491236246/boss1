<template>
    <div class="goodsDetail global_div">
        <content-top titlename="评价详情"></content-top>
        <div class="center_div">
            <div class="goods_left">
                <img src="https://img.xinzhibang168.com/FmR88ILyONmakl5P1khxHlEt3qxc.jpg" class="title_img" alt="">
                <h3 style="padding-left:40px;">{{tableDatas.userName}}</h3>
                <p>商品：{{tableDatas.goodsName}}</p>
                <p>
                    评价：
                    <img src="@/assets/goodslist/starOn.png" v-for="vale in tableDatas.commentLevel" />
                    <img src="@/assets/goodslist/starOff.png" v-for="vals in commentLevel1" />
                </p>
                <p>
                    日期：{{tableDatas.createTime}}
                </p>
                <p>
                    IP地址：{{tableDatas.commentIp}}
                </p>
                <br>
            </div>
            <div class="goods_right">
                <div class="goods_top">
                    {{tableDatas.commentContent}}
                </div>
                <div class="goods_bottom">
                    <p style="font-size:18px;font-weight:bold;">回复评价</p>
                    <p>
                        <span class="spa_dat">用户名：</span>
                        <el-input v-model="see" placeholder="请输入内容" style="width:400px;"></el-input>
                    </p>
                    <p>
                        <span class="spa_dat">
                            回复内容：
                        </span>
                        <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="请输入内容"
                            v-model="textValue"
                            style="width:400px;">
                        </el-input>
                    </p>
                    <el-button type="primary" style="margin-left:60px;" @click="submits">提交</el-button>
                    <el-button style="margin-left:20px;" @click="retGo">返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  name: 'goodsDetail',
  data(){
    return {
        tableDatas:"",
        see:JSON.parse(localStorage.getItem("userInfo")).merchantName,
        textValue:"",
        commentLevel1:"",
    }
  },
  created() {
      this.$http.post('/merchantGoodsComment/merchant_goods_type_list_page', {
            id : this.$route.query.id
        }).then((res) => {
           console.log(res);
           this.tableDatas=res.list[0];
           this.commentLevel1=5-this.tableDatas.commentLevel;
        });
        console.log(JSON.parse(localStorage.getItem("userInfo")).merchantName);
  },
  methods: {
    submits(){
        if(this.textValue==""){
            Message.success("请输入评价内容");
            return false;
        }
        this.$http.post('/merchantGoodsComment/merchant_comment_reply', {
            commentReplyContent : this.textValue,
            id : this.$route.query.id
        }).then((res) => {
            Message.success('回复成功');
        },(err)=>{
            Message.success(err);
        })
    },
    retGo(){
        this.$router.push({name:"goodseval"})
    }
  },
}
</script>

<style lang="less" scoped>
.goodsDetail{
    color:#666666;
    .center_div{
        &>div{
            float:left;
            height:510px;
            margin-top:10px;
            padding-top:30px;
        }
        .goods_left{
            width:210px;
            border:1px solid #cccccc;
            padding-left:40px;
            font-size:15px;
            &>p{
                margin:0;
            }
            .title_img{
                width:100px;
                border-radius:50%;
                margin-left:20px;
            }
        }
        .goods_right{
            width:760px;
            border:1px solid #cccccc;
            font-size:15px;
            &>div{
                padding-left:40px;
            }
            .goods_top{
                height:70px;
                border-bottom:1px solid #cccccc;
            }
            .goods_bottom{
                .spa_dat{
                    float:left;
                    width:60px;
                }
            }
        }
    }
}
</style>
