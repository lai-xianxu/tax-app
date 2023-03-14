import axios from 'axios';
import { showLoadingToast, closeToast } from 'vant';
import { useMyStore } from '@/store/modules/my';
import router from '@/router/index';

const service = axios.create({
  timeout: 12000,
});

const myStore = useMyStore();

/* 请求拦截器 */
service.interceptors.request.use(
  (config) => {
    if (myStore.getter_user_info?.token) {
      config.headers['X-Access-Token'] = myStore.getter_user_info.token;
    }
    //  请求成功处理
    return config;
  },
  (error) => {
    // 请求失败处理
    return Promise.reject(error);
  },
);

/* 响应拦截器 */
service.interceptors.response.use(
  (response) => {
    // 响应成功处理
    return response.data;
  },
  (error) => {
    // 响应失败处理
    const dataErr = error.response?.data;
    if (dataErr?.code === 401) {
      myStore.state_user_info = {};
      router.push({
        name: 'Login',
      });
    }
    // if (dataErr?.code !== 200) {
    //   showToast({
    //     type: 'fail',
    //     message: dataErr?.message,
    //   });
    // }
    return Promise.reject(error);
  },
);

/* 导出常用函数 */
export class Http {
  static send(config, loading) {
    if (loading) {
      showLoadingToast({
        className: 'loading-toast',
        loadingType: 'spinner',
        iconSize: '26px',
        duration: 0,
      });
    }

    return service(config)
      .then((res) => {
        closeToast();
        return res;
      })
      .catch((error) => {
        closeToast();
        throw new Error(error);
      })
      .finally(() => {
        closeToast();
      });
  }

  static get(url, params = {}, loading = false) {
    const config = {
      method: 'get',
      url,
      params,
    };
    return Http.send(config, loading);
  }

  static post(url, data = {}, loading = false) {
    const config = {
      method: 'post',
      url,
      data,
    };
    return Http.send(config, loading);
  }

  static put(url, data = {}, params = {}, loading = false) {
    const config = {
      method: 'put',
      url,
      data,
      params,
    };
    return Http.send(config, loading);
  }

  static _delete(url, data = {}, loading = false) {
    const config = {
      method: 'delete',
      url,
      data,
    };
    return Http.send(config, loading);
  }
}

export default service;
