import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        dontNeedLogin: true,
      }
    },
    {
      path: '/',
      name: 'Index',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue')
    },
    {
      path: '*',
      redirect: '/login'
    }
  ],
});


router.beforeEach((to, from, next) => { //全局钩子函数
  to.matched.some((route) => {
    if (route.meta.dontNeedLogin) { //通过此操作可以判断哪些页面需要登录
      next();
    } else {
      if (router.app.$options.store.state.isLogin) {
        console.log('succ')
        next();
      } else {
        router.app.$options.store.dispatch('checkLogin').then(()=>{
          if(router.app.$options.store.state.isLogin){
            next();
          } else {
            next({ name: 'Login' })
          }
        });
      }
    }
  });

});

window.logout = ()=> {
  fetch('/api/signout', { credentials: 'include' });
}
window.check = ()=>{
  router.app.$options.store.dispatch('checkLogin')
}
export default router
