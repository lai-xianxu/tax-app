import { createRouter, createWebHashHistory } from 'vue-router';
// import { getStorage } from '@/utils/utils';

import demoRouters from './modules/demo';
import tabbarRouters from './modules/tabbar';
import loginRouters from './modules/login';
import serviceRouters from './modules/service';
import myRouters from './modules/my';
import homeRouters from './modules/home';
import handleTaxRouters from './modules/handleTax';
import publicRouters from './modules/public';

const routes = [
  ...demoRouters,
  ...tabbarRouters,
  ...loginRouters,
  ...serviceRouters,
  ...myRouters,
  ...homeRouters,
  ...handleTaxRouters,
  ...publicRouters,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

/* 路由导航守卫 监听登录 */
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next();
//   const token = getStorage('tax-app-store')?.state_user_info?.token;
//   if (!token) return next('/login');
//   next();
// });
export default router;
