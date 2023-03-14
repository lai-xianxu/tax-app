import { Http } from '@/utils/request';

const api = import.meta.env.VITE_APP_API;

/* 图标分页查询 */
export function getTaxIcons(params) {
  return Http.get(`${api}/jeecg-boot/tax/taxIcon/appList`, params, true);
}

/* 行政区划列表 */
export function getTaxAreaList(params) {
  return Http.get(`${api}/jeecg-boot/tax/taxArea/list`, params);
}

/* 通过字典code查询图片和标题 */
export function getQueryByDictCode(params) {
  return Http.get(`${api}/jeecg-boot/tax/taxImage/queryByDictCode`, params);
}
