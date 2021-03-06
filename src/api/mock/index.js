/*
 * @Author: your name
 * @Date: 2021-10-11 10:55:51
 * @LastEditTime: 2021-11-08 10:17:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/api/mock/mock.js
 */
import {mockUser} from './mock-user'
import {mockReport} from './mock-report'
import {mockProject} from './mock-project'
import {mockProduct} from './mock-product'
import Mock from 'mockjs'

const mockList = [
  mockUser,
  mockReport,
  mockProject,
  mockProduct,
  // 在这个列表下面添加对应的
]
// -----这里可以添加其他mock请求配置------
const MockConfig = {
  mocks:[],
  mockEnabled:function(path){
    var result = false;
    this.mocks.forEach(item=>{
      if (item.api == path) {
        result = item.enabled;
      }
    });
    return result;
  }
};
mockList.forEach(configs=>{
  Object.keys(configs).forEach(key=>{
    MockConfig.mocks.push({...configs[key], data:Mock.mock(configs[key].template)});
  });
});
export default MockConfig;