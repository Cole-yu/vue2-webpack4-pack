import Vue from 'vue';

// 开发环境模拟第三方app中指令返回的伪造数据
let devConfig = {
  token: "11111",
}

function isAndroid() {
  let u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('OpenHarmony') > -1;
}

function isIOS() {
  let u = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(u);
}

let isAndroidFlag = isAndroid();
let isIOSFlag = isIOS();

// 获取登录账号信息
function getAccount() {
  return new Promise((resolve, reject) => {
    // 开发环境账号获取token
    if (Vue.prototype.$store.state.dev) {
      let result = {
        token: devConfig.token,
      }
      return resolve(result);
    }

    window.getAccountResult = function (accountInfoStr) {
      try {
        // console.log("accountInfoStr", accountInfoStr);
        let result = JSON.parse(accountInfoStr); // 字符串转对象
        if (result) {
          resolve(result);
        }
      } catch (err) {
        reject(err);
      }
    }
    if (isAndroidFlag) {
      try {
        window.ThirdApp.getAccount(); // 第三方App的指令
      } catch (error) {
        reject('请在指定App中打开');
      }
    } else {
      if (window?.webkit?.messageHandlers?.getAccount) {
        window.webkit.messageHandlers.getAccount.postMessage(null);
      } else {
        reject('请在指定App中打开');
      }
    }
  })
}

export default {
  isAndroid,
  isIOS,
  getAccount,
}