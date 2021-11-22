/*
 * @Author: your name
 * @Date: 2021-11-02 15:28:21
 * @LastEditTime: 2021-11-22 16:29:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/api/project.js
 */
import request from "./request";

export function list() {
  return request({
    url: "/project",
    method: "get",
  });
}

export function update(project) {
  return request({
    url: "/project",
    method: "put",
    data: project
  });
}

export function create(project) {
  return request({
    url: "/project",
    method: "post",
    data: project,
  });
}

export function remove(project) {
  return request({
    url: "/project",
    method: "delete",
    data: project,
  });
}