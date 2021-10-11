/*
 * @Author: your name
 * @Date: 2021-10-11 10:15:57
 * @LastEditTime: 2021-10-11 14:19:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/store/module/report.js
 */

import { update, query } from "../../api/report";

const state = () => ({
    current: null,
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
    query({ commit }, info) {
      return new Promise((resolve, reject) => {
        query(info.author, info.on_day)
        .then((data) => {
          commit("SET_CURRENT", data);
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
      })
    }
  };
  
  const mutations = {
    SET_CURRENT: (state, report) => {
      state.current = report;
    },
  };
  
  export default {
    namespaced: true,
    state,
    actions,
    mutations,
  };
  