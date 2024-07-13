/**
 * 防抖动：
 * 防抖技术即是可以把多个顺序地调用合并成一次，也就是在一定时间内，规定事件被触发的次数。
 * @param {Function} func 要执行的函数
 * @param {Number} wait 等待时间
 * @param {Boolean} immediate 是否立即执行一次
 */
function debounce(func = () => { }, wait = 15, immediate = false) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        let later = () => {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        let callNow = immediate && !timeout;
        window.clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}

/**
 * 节流函数：
 * 只允许一个函数在 wait 毫秒内执行一次，只有当上一次函数执行后过了你规定的时间间隔，才能进行下一次该函数的调用。
 * 它保证在 mustRun 毫秒内至少执行一次我们希望触发的事件 func。
 * @param {Function} func 要执行的函数
 * @param {Number} wait 等待多少ms后可以再次执行函数
 * @param {Number} mustRun 多少ms内至少执行一次，mustRun > wait
 */
function throttle(func = () => { }, wait = 200, mustRun = 1000) {
    let timeout;
    let startTime = new Date();
    return function () {
        let context = this;
        let args = arguments;
        let curTime = new Date();
        window.clearTimeout(timeout);
        if (curTime - startTime >= mustRun) {
            // 如果达到了规定的触发时间间隔，触发 事件
            func.apply(context, args);
            startTime = curTime;
        } else {
            // 没达到触发间隔，重新设定定时器
            timeout = window.setTimeout(func, wait);
        }
    };
}

/**
 * 
 * @param {Object} origin 原数据源
 * @returns cloneData 新数据对象
 */
function deepClone(origin) {
    let cloneData;
    if (!(origin instanceof Object)) { // "abc" "" 0 123 undefined null
        cloneData = origin;
        return cloneData;
    }
    if (origin instanceof Object && !Array.isArray(origin)) {
        cloneData = Object.create(null);
        for (let [key, value] of Object.entries(origin)) {
            if (value instanceof Object) {
                cloneData[key] = deepClone(value);
            } else {
                cloneData[key] = value;
            }
        }
        return cloneData;
    }
    if (Array.isArray(origin)) {
        if (origin.length == 0) {
            return new Array(0);
        };
        cloneData = origin.map(item => {
            return deepClone(item);
        });
        return cloneData;
    }
    return cloneData;
}

const StorageHelper = {};
StorageHelper.get = function (name) {
    return JSON.parse(localStorage.getItem(name));
};
StorageHelper.set = function (name, val) {
    try {
        localStorage.setItem(name, JSON.stringify(val));
    } catch (e) {
        // do nothing
    }
};
StorageHelper.add = function (name, addVal) {
    let oldVal = StorageHelper.get(name);
    let newVal = oldVal.concat(addVal);
    StorageHelper.set(name, newVal);
};

function getParameterUrl(name) {
    let searchStr = window.location.href.split('?')[1];
    if (searchStr) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = searchStr.match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        } else {
            return '';
        }
    } else {
        return '';
    }
}

export {
    debounce,
    throttle,
    deepClone,
    StorageHelper,
    getParameterUrl,
}

export default {
    debounce,
    throttle,
    deepClone,
    StorageHelper,
    getParameterUrl,
};