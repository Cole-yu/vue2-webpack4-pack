import axios from 'axios';

let instance = axios.create({
  baseURL: '/api',
  timeout: 12 * 1000,
  headers: {
    "Content-Type": 'application/json'
  }
});

export default {
  // 获取实例
  getInstanse(){
    return instance;
  },

  // 设置自定义请求头
  setHeaders(key, value){
    instance.defaults.headers.common[key] = value;
  },

  // 获取登录时验证码
  httpGet(url, params) {
    return instance.get(url, { params })
      .then(res => this.handleResponse(res, params))
      .catch(err => this.handleError(err))
  },

  httpPost(url, data={}) {
    return instance.post(url, data)
      .then(res => this.handleResponse(res, data))
      .catch(err => this.handleError(err))
  },  

  handleResponse(res, data) {
    if ( res.status === 200 && res.statusText === 'OK' && res.data) {  
      return Promise.resolve(res.data);
    }
    throw new Error('request fail');
  },

  // 接口错误打印
  handleError(err) {    
    console.log('handleError', err);
  },
};
