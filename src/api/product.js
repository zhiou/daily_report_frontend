/*
 * @Author: your name
 * @Date: 2021-11-02 15:28:21
 * @LastEditTime: 2021-11-22 16:29:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/api/project.js
 */
import request from "./request";

export function list() {
  return request({
    url: "/product",
    method: "get",
  });
}

export function update(product) {
  return request({
    url: "/product",
    method: "put",
    data: product,
  });
}

export function create(product) {
  return request({
    url: "/product",
    method: "post",
    data: product,
  });
}

export function remove(product) {
  return request({
    url: "/product",
    method: "delete",
    data: product,
  });
}