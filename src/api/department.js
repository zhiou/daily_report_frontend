import request from './request'

export function list() {
    return request({
        url: '/department',
        method: 'get',
    })
}