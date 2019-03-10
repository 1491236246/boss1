<template>
    <div class="addgoods global_div">
        <content-top titlename="添加商品"></content-top>
        <div class="center_div">
            <div class="addSteps">
                <el-steps :active="ace" align-center>
                    <el-step title="选择商品分类"></el-step>
                    <el-step title="填写商品信息"></el-step>
                    <el-step title="填写商品属性"></el-step>
                    <el-step title="选择商品关联"></el-step>
                </el-steps>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

export default {
    name: 'addgoods',
    created(){
        console.log(this.$route.name);
        switch(this.$route.name){
            case "dataList":
            this.$store.commit('SET_ACTIVE', 1);
            break;
            case "basic":
            this.$store.commit('SET_ACTIVE', 0);
            break;
            case "goodsAttr":
            this.$store.commit('SET_ACTIVE', 2);
            break;
            default:
            this.$store.commit('SET_ACTIVE', 0);
        }
    },
    computed:{
        ace(){
            return this.$store.state.active
        }
    }
}
</script>
<style lang="less" scoped>
.addgoods{
    .addSteps{
        margin-top:20px;
    }
}
</style>
