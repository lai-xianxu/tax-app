export default [
  {
    path: '/blank-loading',
    name: 'BlankLoading',
    component: () => import('@/views/public/blankLoading/index.vue'),
  },
  {
    path: '/family-information',
    name: 'FamilyInformation',
    component: () => import('@/views/public/familyInformation/index.vue'),
  },
  {
    path: '/bank-card',
    name: 'BankCard',
    component: () => import('@/views/public/bankCard/index.vue'),
  },
  {
    path: '/empty-page',
    name: 'EmptyPage',
    component: () => import('@/views/public/emptyPage/index.vue'),
  },
];
