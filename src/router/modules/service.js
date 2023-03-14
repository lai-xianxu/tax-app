export default [
  // 收入纳税明细查询
  {
    path: '/tax-deatils-search',
    name: 'TaxDeatilsSearch',
    component: () => import('@/views/service/taxDeatilsSearch/index.vue'),
  },
  // 收入纳税明细查询列表
  {
    path: '/tax-deatils-list',
    name: 'TaxDeatilsList',
    component: () => import('@/views/service/taxDeatilsSearchList/index.vue'),
  },
  // 收入纳税明细查询列表详情
  {
    path: '/tax-deatils-list-content',
    name: 'TaxDeatilsListontent',
    component: () => import('@/views/service/taxDeatilsListContent/index.vue'),
  },
  // 税款计算
  {
    path: '/tax-jisuan',
    name: 'TaxJisuan',
    component: () => import('@/views/service/taxJisuan/index.vue'),
  },
  // 申报查询
  {
    path: '/declaration-query',
    name: 'DeclarationQuery',
    component: () => import('@/views/service/declarationQuery/index.vue'),
  },
];
