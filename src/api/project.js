/*
 * @Author: your name
 * @Date: 2021-11-02 15:28:21
 * @LastEditTime: 2021-11-02 15:43:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/api/project.js
 */
import request from './request'

export function list() {
    return request({
      url: '/project',
      method: 'get',
    })
  }

  