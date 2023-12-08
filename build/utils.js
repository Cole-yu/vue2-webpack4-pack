const path = require('path');
const root = path.resolve(__dirname, '..');
function rootResolve(...args){
    return path.resolve(root, ...args);
}
  
const devMode = process.env.NODE_ENV === 'development';

module.exports = {
    rootResolve,
    devMode
}