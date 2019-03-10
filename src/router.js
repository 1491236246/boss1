import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/login/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/pages/index/Index.vue'], resolve),
      children:[
        {
          path: 'homes/home',
          name: 'home',
          component: resolve => require(['@/pages/homepage/Home.vue'], resolve)
        }
        ,{
          path: 'homes/settings',
          name: 'settings',
          component: resolve => require(['@/pages/homepage/Settings.vue'], resolve)
        },
        {
          path: 'homes/systeminfo',
          name: 'systeminfo',
          component: resolve => require(['@/pages/homepage/Systeminfo.vue'], resolve)
        },
        {
          path: 'homes/loginIn',
          name: 'loginIn',
          component: resolve => require(['@/pages/homepage/LoginIn.vue'], resolve)
        },
        {
          path: 'goodslist/list',
          name: 'list',
          component: resolve => require(['@/pages/goodsList/List.vue'], resolve)
        },
        {
          path: 'goodslist/goodsAppend',
          name: 'goodsAppend',
          component: resolve => require(['@/pages/goodsList/goodsAppend.vue'], resolve)
        },
        {
          path: 'goodslist/addgoods',
          name: 'addgoods',
          component: resolve => require(['@/pages/goodsList/addGoods.vue'], resolve),
          children:[
            {
              path: 'basic',
              name: 'basic',
              component: resolve => require(['@/pages/goodsList/Basic.vue'], resolve)
            },
            {
              path: 'dataList',
              name: 'dataList',
              meta: { keepAlive: true },
              component: resolve => require(['@/pages/goodsList/dataList.vue'], resolve),
            },
            {
              path: 'goodsAttr',
              name: 'goodsAttr',
              component: resolve => require(['@/pages/goodsList/goodsAttr.vue'], resolve)
            },
          ]
        },
        {
          path: 'goodslist/goodsrecyc',
          name: 'goodsrecyc',
          component: resolve => require(['@/pages/goodsList/goodsrecyc.vue'], resolve)
        },
        {
          path: 'goodslist/goodseval',
          name: 'goodseval',
          component: resolve => require(['@/pages/goodsList/goodseval.vue'], resolve)
        },
        {
          path: 'goodslist/goodsdetail',
          name: 'goodsdetail',
          component: resolve => require(['@/pages/goodsList/goodsDetail.vue'], resolve)
        },
        {
          path: 'goodslist/goodsclass',
          name: 'goodsclass',
          component: resolve => require(['@/pages/goodsList/goodsClass.vue'], resolve)
        },
        {
          path: 'goodslist/goodsasync',
          name: 'goodsasync',
          component: resolve => require(['@/pages/goodsList/goodsAsync.vue'], resolve)
        },
        {
          path: 'goodslist/goodstype',
          name: 'goodstype',
          component: resolve => require(['@/pages/goodsList/goodsType.vue'], resolve),
        },
        {
          path: 'goodslist/propsd/:id',
          name: 'propsd',
          component: resolve => require(['@/pages/goodsList/prop.vue'], resolve),
        },
        {
          path: 'goodslist/params/:id',
          name: 'params',
          component: resolve => require(['@/pages/goodsList/params.vue'], resolve),
        },
        {
          path: 'goodslist/addprop',
          name: 'addprop',
          component: resolve => require(['@/pages/goodsList/addProp.vue'], resolve),
        },
        {
          path: 'goodslist/addparams',
          name: 'addparams',
          component: resolve => require(['@/pages/goodsList/addParams.vue'], resolve),
        },
        {
          path: 'goodslist/goodsbrand',
          name: 'goodsbrand',
          component: resolve => require(['@/pages/goodsList/goodsBrand.vue'], resolve),
        },
        {
          path: 'goodslist/addbrand',
          name: 'addbrand',
          component: resolve => require(['@/pages/goodsList/addBrand.vue'], resolve),
        },
        {
          path: 'goodslist/goodsimage',
          name: 'goodsimage',
          component: resolve => require(['@/pages/goodsList/goodsImage.vue'], resolve),
        },
        {
          path: 'goodslist/addimage',
          name: 'addimage',
          component: resolve => require(['@/pages/goodsList/addImage.vue'], resolve),
        },
        {
          path: 'orderlist/orderList',
          name: 'orderList',
          component: resolve => require(['@/pages/order/orderList.vue'], resolve),
        },
        {
          path: 'orderlist/orderdetail',
          name: 'orderdetail',
          component: resolve => require(['@/pages/order/orderDetail.vue'], resolve),
        },
        {
          path: 'orderlist/orderreceipt',
          name: 'orderreceipt',
          component: resolve => require(['@/pages/order/orderReceipt.vue'], resolve),
        },
        {
          path: 'orderlist/orderseting',
          name: 'orderseting',
          component: resolve => require(['@/pages/order/orderSeting.vue'], resolve),
        },
        {
          path: 'orderlist/orderreturn',
          name: 'orderreturn',
          component: resolve => require(['@/pages/order/orderReturn.vue'], resolve),
        },
        {
          path: 'orderlist/orderrefund',
          name: 'orderrefund',
          component: resolve => require(['@/pages/order/orderRefund.vue'], resolve),
        },
        {
          path: 'orderlist/ordercause',
          name: 'ordercause',
          component: resolve => require(['@/pages/order/orderCause.vue'], resolve),
        },
        {
          path: 'orderlist/orderaddress',
          name: 'orderaddress',
          component: resolve => require(['@/pages/order/orderAddress.vue'], resolve),
        },
        {
          path: 'orderlist/orderadd',
          name: 'orderadd',
          component: resolve => require(['@/pages/order/orderAdd.vue'], resolve),
        },
        {
          path: 'prolist/proheader',
          name: 'proheader',
          component: resolve => require(['@/pages/promotion/proHeader.vue'], resolve),
        },
        {
          path: 'prolist/proaddheader',
          name: 'proaddheader',
          component: resolve => require(['@/pages/promotion/proAddheader.vue'], resolve),
        },
        {
          path: 'prolist/proList',
          name: 'proList',
          component: resolve => require(['@/pages/promotion/proList.vue'], resolve),
        },
        {
          path: 'prolist/proAddlist',
          name: 'proAddlist',
          component: resolve => require(['@/pages/promotion/proAddlist.vue'], resolve),
        },
        {
          path: 'prolist/proGrouplist',
          name: 'proGrouplist',
          component: resolve => require(['@/pages/promotion/proGrouplist.vue'], resolve),
        },
        {
          path: 'prolist/proOrder',
          name: 'proOrder',
          component: resolve => require(['@/pages/promotion/proOrder.vue'], resolve),
        },
        {
          path: 'stocklist/stockDity',
          name: 'stockDity',
          component: resolve => require(['@/pages/stock/stockDity.vue'], resolve),
        },
        {
          path: 'stocklist/stockOut',
          name: 'stockOut',
          component: resolve => require(['@/pages/stock/stockOut.vue'], resolve),
        },
        {
          path: 'user/userList',
          name: 'userList',
          component: resolve => require(['@/pages/user/userList.vue'], resolve),
        },
        {
          path: 'operate/advertising',
          name: 'advertising',
          component: resolve => require(['@/pages/operate/advertising.vue'], resolve),
        },
        {
          path: 'operate/Addadvert',
          name: 'Addadvert',
          component: resolve => require(['@/pages/operate/Addadvert.vue'], resolve),
        },
        {
          path: 'diction/Journal',
          name: 'Journal',
          component: resolve => require(['@/pages/diction/Journal.vue'], resolve),
        }
      ]
    }
  ]
})
