import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


//import login  from '@/page/login'

Vue.use(Router)


const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manager = r => require.ensure([], () => r(require('@/page/manager')), 'manager');
const addExcel = r => require.ensure([], () => r(require('@/page/addExcel')), 'addExcel');
const test1 = r => require.ensure([], () => r(require('@/components/test1')), 'test1');
const test2 = r => require.ensure([], () => r(require('@/components/test2')), 'test2');
const home = r => require.ensure([], () => r(require('@/components/home')), 'home');

export default new Router({
  routes: [
    {
      path: '/hellow',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name:'login',
      component: login
    },
    {
      path: '/manager',
      name:'manager',
      component: manager,
            children:[{
              path:'/test1',
              name:'test1',
              component:test1
            },{
              path:'/addExcel',
              name:'addExcel',
              component: addExcel
            },
            {
              path:'/test2',
              name:'test2',
              component:test2
            },
            {
              path:'/home',
              name:'home',
              component:home
            }
          ]
    },
    {
      path: '/addExcel',
      name:'addExcel',
      component: addExcel
    },
   /* {
      path: '/test1',
      name:'test1',
      component: test1
    }, */
  ]
})
