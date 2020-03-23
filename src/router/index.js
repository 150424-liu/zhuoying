import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'  //登陆页面
import login_sign from '@/components/login_sign'  //注册页面
import index from '@/components/index'  //首页
import index_shopping from '@/components/index_shopping'  //首页商品详情
import index_order from '@/components/index_order'  //首页商品确认订单
import index_sitelist from '@/components/index_sitelist'  //地址列表
import index_siteAdd from '@/components/index_siteAdd'  //新增地址
import index_siteEdit from '@/components/index_siteEdit'  //编辑地址
import team from '@/components/team'  //我的团队
import friend from '@/components/friend'  //邀请好友
import my from '@/components/my'  //我的
import my_integral from '@/components/my_integral'  //我的页面 积分兑换页
import bottom from '@/components/bottom'  //底部导航


Vue.use(Router)

export default new Router({
  routes: [
    //首页
    {
      path: '/',
      name: 'login',
      component: login
    },
    //首页
    {
      path: '/login_sign',
      name: 'login_sign',
      component: login_sign
    },
    //首页
    {
      path: '/index',
      name: 'index',
      component: index
    },
    //首页商品详情
    {
      path: '/index_shopping',
      name: 'index_shopping',
      component: index_shopping
    },
    //首页商品确认订单
    {
      path: '/index_order',
      name: 'index_order',
      component: index_order
    },
    //地址列表
    {
      path: '/index_sitelist',
      name: 'index_sitelist',
      component: index_sitelist
    },
    //新增地址
    {
      path: '/index_siteAdd',
      name: 'index_siteAdd',
      component: index_siteAdd
    },
    //编辑地址
    {
      path: '/index_siteEdit',
      name: 'index_siteEdit',
      component: index_siteEdit
    },
    //我的团队
    {
      path: '/team',
      name: 'team',
      component:team
    },
    //邀请好友
    {
      path: '/friend',
      name: 'friend',
      component: friend
    },
    //我的
    {
      path: '/my',
      name: 'my',
      component: my
    },
    //我的页面积分兑换页
    {
      path: '/my_integral',
      name: 'my_integral',
      component: my_integral
    },
    //底部导航
    {
      path: '/bottom',
      name: 'bottom',
      component: bottom
    },

  ]
})
