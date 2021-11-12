/*
 * @Author: your name
 * @Date: 2021-11-10 15:27:12
 * @LastEditTime: 2021-11-12 11:30:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /daily-report-frontend/src/api/request/download.js
 */
import axios from "axios";
import { getToken, removeToken } from "./token";
import fileDownload from "js-file-download";

export const downloader = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  method: 'get',
  responseType: 'blob',
});

downloader.interceptors.request.use(
  (request) => {
    request.headers["Authorization"] = getToken();
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);

downloader.interceptors.response.use(
  (response) => {
    console.log(response);
    console.log("Content-disposition", response.headers['content-disposition']);
    const [, filename] = response.headers['content-disposition'].split('=')
    fileDownload(response.data, decodeURI(filename), "application/vnd.ms-excel");
  },
  (error) => {
    return Promise.reject(error);
  }
);
