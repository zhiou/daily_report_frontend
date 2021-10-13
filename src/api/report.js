/*
 * @Author: your name
 * @Date: 2021-10-11 11:05:41
 * @LastEditTime: 2021-10-13 16:24:44
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

  export function query(report) {
    return request({
      url: '/report',
      method: 'get',
      data: report
    })
  }

  export function queryMonth(report) {
    return request({
      url: '/lookup',
      method: 'get',
      data: report
    })
  }

  export function queryDepartment(report) {
    return request({
      url: '/depart',
      method: 'get',
      data: report
    })
  }

  export function queryProject(report) {
    return request({
      url: '/project',
      method: 'get',
      data: report
    })
  }