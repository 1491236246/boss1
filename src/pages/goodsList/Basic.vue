<template>
    <div class="basic">
        <div class="form-label">基本信息</div>
        <div class="basic_list">
            <div class="basic_left">
                <ul>
                    <li class="li_title">选择一级分类</li>
                    <li :class="{li_checked:checkId==index}" v-for="(item,index) in dataList" @click="checkModel(index)" :key="index">
                        {{item.typeName}}
                        <span class="spa_jt">></span>
                    </li>
                </ul>
            </div>
            <div class="basic_center">
                <img src="@/assets/list/icon-arrow.png" />
            </div>
            <div class="basic_right">
                <ul>
                    <li class="li_title">选择二级分类</li>
                    <li v-if="erList==''">暂无数据...</li>
                    <li v-else v-for="(val,ind) in erList" :class="{li_checked:erIndex==ind}" @click="erCheckmodel(ind)">{{val.typeName}}</li>
                </ul>
            </div>
        </div>
        <div class="basic_current">
            <p>您当前选择的商品类别是：<span class="spa_grends">{{oneData}}<span v-show="towData!=''">&nbsp;>&nbsp;{{towData}}</span></span></p>
            <el-button type="success" @click="gorouter">下一步填写商品信息</el-button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Basic',
    data(){
        return {
            dataList:[],
            erList:[],
            checkId:null,
            erIndex:null,
            oneData:"",
            towData:""
        }
    },
    created() {
        this.$http.post('merchantGoodsType/query_goods_type_tree').then((res)=>{
            this.dataList=res;
        });
    },
    methods: {
        checkModel(ids){
            this.checkId=ids;
            this.erList=this.dataList[ids].list;
            this.oneData=this.dataList[ids].typeName;
            this.towData="";
            this.erIndex=null;
        },
        erCheckmodel(indexs){
            this.erIndex=indexs;
            this.towData=this.erList[indexs].typeName
        },
        gorouter(){
            this.$store.commit('SET_ACTIVE', 1);
            this.$router.push({name: 'dataList', query: {cla1:this.oneData,cla2:this.towData}});
        }
    },

}
</script>
<style lang="less" scoped>
.basic{
    padding-top:35px;
    background:#ffffff;
    overflow:hidden;
    .form-label{
        width: 175px;
        height: 50px;
        line-height: 50px;
        color: #fff;
        padding: 0 20px;
        box-sizing: border-box;
        background-color: #a29c9c;
        position: relative;
        margin-right: 100px;
        font-size:18px;
        &::after{
            content: '';
            display: block;
            position: absolute;
            top: 0;
            right: -50px;
            border: 25px solid transparent;
            border-left-color: #a29c9c;
        }
    }
    .basic_list{
        width:600px;
        overflow:hidden;
        margin-left:250px;
        &>div{
            height:330px;
            overflow:auto;
            float:left;
            &>img{
                margin-top:150px;
            }
        }
        &>div:first-child+div{
            width:80px;
            text-align:center;
        }
        &>div:first-child,&>div:last-child{
            width:250px;
            border-radius:5px;
            border:1px solid #cccccc;
        }
        .basic_left,.basic_right{
            ul{
                color:#999999;
                li.li_checked{
                    background:#f2f2f2;
                    color:#1ABC9C;
                }
                li.li_title{
                    background:#f9fafc;
                    color:#999999;
                }
                li{
                    height:45px;
                    font-size:15px;
                    line-height:45px;
                    padding-left:10px;
                    padding-right:20px;
                    border-bottom:1px solid #cccccc;
                    span.spa_jt{
                        float:right;
                    }
                }
                
            }
        }
    }
    .basic_current{
        margin:20px 0 20px 250px;
        span.spa_grends{
            color:#5BC0BF;
        }
    }
}
</style>
