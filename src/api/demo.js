import { Http } from '@/utils/request';

const api = import.meta.env.VITE_APP_API;

/**
 * 测试
 */
export function postAppLogin(params) {
  return Http.post(`${api}/jeecg-boot/sys/appLogin`, params);
}
