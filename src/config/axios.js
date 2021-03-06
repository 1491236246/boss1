import axios from "axios"
import { Message } from 'element-ui'
import qs from 'qs'
import router from '../router'

let CONFIG={
    api:process.env.NODE_ENV === 'production' ?
    'http://106.12.81.206/ls' :
    '/api/'
}

axios.defaults.baseURL = CONFIG.api;
axios.defaults.timeout = 5000;
axios.interceptors.request.use((config) => {
  // console.log(config);
  config.withCredentials = true;
    if (config.type == 'form' && config.file != 'image'){
        config.data = qs.stringify(config.data);
    }else {
        config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    }
  return config
}, (err) => {
  Message.error('请求超时');
  return Promise.reject(err);
});

axios.interceptors.response.use((res) => {
  if (res.data.errno == 200){
    return res.data.data
  } else if(res.data.errno == 416){
    Message.error('登录失效');
    router.replace('/');
  }else if(res.data.errno == '0000'){
    //Message.error(res.data.msg);
    return Promise.reject(res.data);
  }else{
    return Promise.reject(res.data);
  }
}, (err) => {
  return Promise.reject(err);
});

export default axios;
