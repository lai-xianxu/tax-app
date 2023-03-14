import { Http } from '@/utils/request';

const api = import.meta.env.VITE_APP_API;

/* 收入纳税明细（有查询按钮的页面） */
export function getTaxDeatilsSearch(params) {
  return Http.get(`${api}/jeecg-boot/sys/category/getChildListByCode`, params, true);
}
// 年份
export function getTaxDeatilsTime(params) {
  return Http.get(`${api}/jeecg-boot/tax/taxTaxableIncome/appYearList`, params);
}
// 收入纳税明细列表
export function getTaxDeatilsList(params) {
  return Http.post(`${api}/jeecg-boot/tax/taxTaxableIncome/appList`, params, true);
}
// 收入纳税详情
export function getTaxDeatils(params) {
  return Http.post(`${api}/jeecg-boot/tax/taxTaxableIncome/appGetById`, params, true);
}
