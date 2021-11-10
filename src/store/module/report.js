/*
 * @Author: your name
 * @Date: 2021-10-11 10:15:57
 * @LastEditTime: 2021-11-04 16:13:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/store/module/report.js
 */

import {
  update,
  selfQuery,
  dmQuery,
  pmQuery,
  pmoQuery,
  download,
} from "../../api/report";

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
  selfQuery({ commit },info) {
    return new Promise((resolve, reject) => {
      selfQuery(info)
        .then((data) => {
          resolve(data.tasks);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  dmQuery({ commit },info) {
    return new Promise((resolve, reject) => {
      dmQuery(info)
        .then((data) => {
          resolve(data.tasks);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  pmQuery({ commit },info) {
    return new Promise((resolve, reject) => {
      pmQuery(info)
        .then((data) => {
          resolve(data.tasks);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  pmoQuery({ commit },info) {
    return new Promise((resolve, reject) => {
      pmoQuery(info)
        .then((data) => {
          resolve(data.tasks);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  download({ commit }, info) {
    return new Promise((resolve, reject) => {
      download(info)
        .then(() => {
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });
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
