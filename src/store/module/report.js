/*
 * @Author: your name
 * @Date: 2021-10-11 10:15:57
 * @LastEditTime: 2021-10-12 15:01:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/store/module/report.js
 */

import { update, query, queryMonth } from "../../api/report";

const state = () => ({
  });
  
  const actions = {
    update({ commit }, report) {
      return new Promise((resolve, reject) => {
        update(report)
          .then(() => {
            commit("SET_CURRENT", report);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    query(info) {
      return new Promise((resolve, reject) => {
        query(info.author, info.on_day)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
      })
    },
    queryMonth(info) {
      return new Promise((resolve, reject) => {
        queryMonth(info.author, info.on_day)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
      })
    }
  };
  
  const mutations = {
  };
  
  export default {
    namespaced: true,
    state,
    actions,
    mutations,
  };
  