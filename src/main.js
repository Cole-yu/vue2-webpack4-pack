import Vue from 'vue';
import store from '@/store';
import VueRouter from 'vue-router';
import routes from '@/routes';
import '@/styles/public.less';
import App from './App';
import ApiManager from '@/api/ServiceApi';

Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

Vue.config.productionTip = false;
Vue.prototype.$store = store;

let instance = ApiManager.getInstanse();
// 请求拦截器
instance.interceptors.request.use(config => {
  if (config.method === 'post' && config.data && (config.data instanceof Object)) {
    Object.assign(config.data, {
      'key': 'value'
    });
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// console.log('process.env', process.env);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');