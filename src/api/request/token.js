/*
 * @Author: your name
 * @Date: 2021-09-26 10:50:21
 * @LastEditTime: 2021-09-26 14:16:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/request/token.js
 */
export function getToken() {
    return localStorage.token
}

export function setToken(token) {
    return localStorage.token = token
}

export function removeToken() {
    return localStorage.removeItem('token')
}