import ServiceApi from './ServiceApi';

export default Object.assign({
  getCode(params){
    return this.httpGet('/getCode', params);
  },

  login(data){
    return this.httpPost('/login', data);
  },

}, ServiceApi);
