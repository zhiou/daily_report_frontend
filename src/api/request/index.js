/*
 * @Author: zhiou
 * @Date: 2021-09-26 10:33:57
 * @LastEditTime: 2021-12-03 16:04:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/request/index.js
 */

import axios from "axios";
import { getToken, removeToken } from "./token";
import { message } from "ant-design-vue";
import router from "../../router";
import i18n from "../../i18n";
import Mock from "mockjs";
import MockConfig from "../mock";

const prod = process.env.NODE_ENV === 'production';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
});

MockConfig.mocks.forEach((config) => {
  if (config.enabled && prod) {
    Mock.mock(config.api, config.method, () => {
      return config.data
    });
  }
});

service.interceptors.request.use(
  (request) => {
    console.log('request params', request.data || request.params)
    request.headers["Authorization"] = getToken();
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const resp = response.data;
    if (resp.code === 0) {
      return resp.data;
    } else {
      if (resp.code == 101004) {
        throttle(onTokenInvalid);
      }
      return Promise.reject(resp.message);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

let onTokenInvalid = function() {
  removeToken(); // 防止每次都进了home再跳转
  router.replace({
    name: "Login",
  });
  message.error({
    content: i18n.t("error.tips.token.invalid"),
    duration: 1,
  });
};

// 一个页面可能多个调用失败, 需要限制仅返回登录页面一次
function throttle(fun) {
  if (fun.timeoutId) {
    window.clearTimeout(fun.timeoutId);
  }
  fun.timeoutId = window.setTimeout(function() {
    fun();
    fun.timeoutId = null;
  }, 1000);
}

export default service;
