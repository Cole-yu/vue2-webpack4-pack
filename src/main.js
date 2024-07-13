import Vue from 'vue';
import store from '@/store';
import VueRouter from 'vue-router';
import routes from '@/routes';
import '@/styles/public.less';
import App from './App';
import AxiosManager from '@/api/ServiceApi';
import PublicUtils from '@/utils/publicUtils';

// import VConsole from 'vconsole';
// const vConsole = new VConsole();

// console.log('process.env', process.env);

let dev = PublicUtils.getParameterUrl("dev") === "true";
store.dispatch("setDev", dev);

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push; //修改原型对象中的push方法
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => { });
}

const router = new VueRouter({
  routes
});

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.router = router;

router.beforeEach((to, from, next) => {
  // 路由跳转过程中dev不断传递
  const toQuery = JSON.parse(JSON.stringify(to.query));
  if (from.query.dev && !to.query.dev) {
    toQuery.dev = from.query.dev;
    next({
      path: to.path,
      query: toQuery,
    });
    return;
  }

  if (from.query.token && !to.query.token) {
    toQuery.token = from.query.token;
    next({
      path: to.path,
      query: toQuery,
    });
    return;
  }

  next();
  return;
});

let app, reqInterceptor, resInterceptor;

// 设置请求拦截器
function setInterceptorsRequest(addReqObj = {}) {
  let instance = AxiosManager.getInstanse();
  // 先移除之前的请求拦截器
  if (reqInterceptor != undefined) {
    instance.interceptors.request.eject(reqInterceptor);
  }
  // 增加请求拦截器
  reqInterceptor = instance.interceptors.request.use(config => {
    if (config.method === 'post' && config.data && (config.data instanceof Object)) {
      Object.assign(config.data, addReqObj);
    }
    if (config.method === 'get' && config.params && (config.params instanceof Object)) {
      Object.assign(config.params, addReqObj);
    }
    return config;
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
}

// 设置响应拦截器
function setInterceptorsResponse() {
  let instance = AxiosManager.getInstanse();
  // 先移除之前的响应拦截器
  if (resInterceptor != undefined) {
    instance.interceptors.response.eject(resInterceptor);
  }
  // 增加响应拦截器
  resInterceptor = instance.interceptors.response.use(response => {
    return response;
  }, async error => {
    console.log('error.response.err', error);
    return Promise.reject(error);
  });
}

// 初始化页面
function initApp(userInfo) {
  let { name, token } = userInfo;

  AxiosManager.setHeaders('token', token);
  setInterceptorsRequest({
    name,
  });
  setInterceptorsResponse();

  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
}

// 根据实际业务需求处理信息
let userInfo = {
  name: '小米',
  token: '111111',
};

initApp(userInfo);