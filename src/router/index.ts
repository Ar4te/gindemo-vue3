import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/index',
    name: 'index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue'),
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: 'articleMgr',
        name: 'articleMgr',
        component: () => import('@/views/article/articleMgr.vue'),
      }
    ]
  },
  {
    path: '/regist',
    name: 'register',
    component: () => import('@/views/Regist.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
