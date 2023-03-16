import store from '@/store';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export const httpRequest = (options: any) => new Promise<any>((resolve, reject) => {
  // 创建axios实例
  const service = axios.create({
    baseURL: '/api',
    timeout: 80000,
  });

  // 请求拦截器
  service.interceptors.request.use(
    (config: any) => {
      const token = store.state.Authorization != null && store.state.Authorization != '' ? store.state.Authorization : '';
      NProgress.start();
      if (token) {
        // config.headers['X-Token'] = token;
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },

    (error) => {
      // console.log(error);
      NProgress.done();
      Promise.reject(error);
    },
  );

  service.interceptors.response.use(
    (response: any) => {
      NProgress.done();
      return response.data;
    },
    (error) => {
      // console.log(error);
      NProgress.done();
      if (error.response.status === 403) {
        ElMessage.error('错了');
      } else {
        ElMessage.error(error.response.data ? error.response.data.msg : '服务器请求错误，请稍后重试');
      }
      return Promise.reject(error);
    },
  );

  service(options)
    .then((res) => {
      resolve(res);
    })
    .catch((error) => {
      reject(error);
    });
});

export default httpRequest;
