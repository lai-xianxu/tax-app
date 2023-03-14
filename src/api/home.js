import { Http } from '@/utils/request';

const api = import.meta.env.VITE_APP_API;

/* 首页轮播图 */
export function taxSwiper(params) {
  return Http.get(`${api}/jeecg-boot/tax/taxSwiper/appList`, params, true);
}
// 常用业务
export function getNormlBusniess(params) {
  return Http.get(`${api}/jeecg-boot/tax/taxCommon/applist`, params, true);
}
// 热点问题
export function getHotQuestion(params) {
  return Http.get(`${api}/jeecg-boot/tax/taxHotIssue/appList`, params, true);
}
