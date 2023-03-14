export default [
  {
    path: '/my-info',
    name: 'MyInfo',
    component: () => import('@/views/my/myInfo/index.vue'),
  },
  {
    path: '/basic-info',
    name: 'BasicInfo',
    component: () => import('@/views/my/basicInfo/index.vue'),
  },
  {
    path: '/my-name-info',
    name: 'MyNameInfo',
    component: () => import('@/views/my/basicInfo/myNameInfo/index.vue'),
  },
  {
    path: '/company-list',
    name: 'CompanyList',
    component: () => import('@/views/my/companyList/index.vue'),
  },
  {
    path: '/company-detail',
    name: 'CompanyDetail',
    component: () => import('@/views/my/companyList/companyDetail/index.vue'),
  },
  {
    path: '/tax-preference',
    name: 'TaxPreference',
    component: () => import('@/views/my/myInfo/taxPreference/index.vue'),
  },
  {
    path: '/other-identity-documents',
    name: 'OtherIdentityDocuments',
    component: () => import('@/views/my/myInfo/otherIdentityDocuments/index.vue'),
  },
];
