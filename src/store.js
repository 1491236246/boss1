import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    indexs:1,
    pathName:{},
    userInfo:localStorage.getItem('userInfo') || {},
    active:0,
    categoryName:'',
    childCategoryName:'',
    ruleForm: {
        typeId: '', //一级分类ID
        childId: '', //二级分类ID
        goodsName: '', //商品名称
        goodsSubtitle: '', //副标题
        brandId: '', //商品品牌
        goodsDesc: '', //商品介绍
        goodsNo: '', //商品货号
        goodsPrice: '', //商品售价
        marketPrice: '', //市场价
        goodsStock: '', //商品库存
        goodsWarning: '', //库存预警值
        goodsUnit: '', //计量单位
        goodsWeight: '', //商品重量
        styleId: '', //类型ID
        merchantSpecifications: [], //商品属性列表
        merchantGoodsTypePropertyList: [], //商品属性值列表
        merchantParamDetailIds: {
          merchantParamDetails: [],
          mainMaterial: '',
          paramObject: '',
        }, //商品参数值列表
        goodsImg: '', //商品图片
        navId: '',
        navChildId: '',
    },
  },
  mutations: {
    increment (state,ind) {
      state.indexs=ind;
      
    },
    changeValue(state,val){
      
      let pathes=val.split("/");
      state.pathName.titlePath=pathes[2];
      state.pathName.leftPath=pathes[3];

      // let pathName1;
      // if(val=="/index/goodslist/addgoods/basic"){
      //   pathName1=val;
      // }else{
      //   pathName1="/"+pathes[1]+"/"+pathes[2];
      // }
      // state.pathName=pathName1;
      // console.log(state.pathName);


    },
    SET_USERINFO(state, userInfo){
      state.userInfo = userInfo;
      localStorage.setItem('userInfo', userInfo);
    },
    SET_ACTIVE(state,num){
      state.active=num;
    },
    add_data(state,jsones){
      console.log(jsones);
      state.categoryName=jsones.categoryName;
      state.childCategoryName=jsones.childCategoryName;
    }
  },
  actions: {

  }
})
