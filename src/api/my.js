import { Http } from '@/utils/request';

const api = import.meta.env.VITE_APP_API;

/* 登录 */
export function postSignIn(params) {
  return Http.post(`${api}/jeecg-boot/sys/appLogin`, params);
}

/* 个人信息 */
export function getUserInfo(params) {
  return Http.get(`${api}/jeecg-boot/sys/user/userInfo`, params, true);
}

/* 获取字典数据 */
export function getDictItem(params) {
  return Http.get(`${api}/jeecg-boot/sys/dict/getDictItem/${params}`);
}

/* 修改个人信息 */
export function postAppEdit(params) {
  return Http.post(`${api}/jeecg-boot/sys/user/appEdit`, params);
}

/* 任职受雇信息 */
export function getCompanyList(params) {
  return Http.get(`${api}/jeecg-boot/tax/taxCompany/companyList`, params, true);
}
