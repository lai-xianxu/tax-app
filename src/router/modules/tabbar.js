export default [
  {
    path: '/',
    name: 'Tabbar',
    component: () => import('@/views/tabbar/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/tabbar/home/index.vue'),
        meta: {
          keepAlive: false,
        },
      },
      {
        path: '/handle-tax',
        name: 'HandleTax',
        component: () => import('@/views/tabbar/handleTax/index.vue'),
      },
      {
        path: '/service',
        name: 'Service',
        component: () => import('@/views/tabbar/service/index.vue'),
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('@/views/tabbar/my/index.vue'),
      },
    ],
  },
];
