/*
 * @Author: your name
 * @Date: 2021-11-02 15:28:21
 * @LastEditTime: 2021-11-03 18:13:57
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

export function update() {
  return request({
    url: "/product",
    method: "put",
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