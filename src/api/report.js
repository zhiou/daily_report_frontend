/*
 * @Author: your name
 * @Date: 2021-10-11 11:05:41
 * @LastEditTime: 2021-11-04 15:50:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/api/report.js
 */
import request from './request'

export function update(report) {
    return request({
      url: '/report',
      method: 'post',
      data: report
    })
  }

  export function selfQuery(report) {
    return request({
      url: '/report',
      method: 'get',
      data: report
    })
  }

  export function dmQuery(report) {
    return request({
      url: '/report/dm',
      method: 'get',
      data: report
    })
  }

  export function pmQuery(report) {
    return request({
      url: '/report/pm',
      method: 'get',
      data: report
    })
  }

  export function pmoQuery(report) {
    return request({
      url: '/report/pmo',
      method: 'get',
      data: report
    })
  }