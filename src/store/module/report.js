/*
 * @Author: your name
 * @Date: 2021-10-11 10:15:57
 * @LastEditTime: 2021-11-12 15:31:37
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
  spinning: false,
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
  selfQuery({ commit }, info) {
    return new Promise((resolve, reject) => {
      commit("SET_SPINNING", true);
      selfQuery(info)
        .then((data) => {
          resolve(data.tasks);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          commit("SET_SPINNING", false);
        });
    });
  },
  dmQuery({ commit }, info) {
    return new Promise((resolve, reject) => {
      commit("SET_SPINNING", true);
      dmQuery(info)
        .then((data) => {
          resolve(data.tasks);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          commit("SET_SPINNING", false);
        });
    });
  },
  pmQuery({ commit }, info) {
    return new Promise((resolve, reject) => {
      commit("SET_SPINNING", true);
      pmQuery(info)
        .then((data) => {
          resolve(data.tasks);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          commit("SET_SPINNING", false);
        });
    });
  },
  pmoQuery({ commit }, info) {
    return new Promise((resolve, reject) => {
      commit("SET_SPINNING", true);
      pmoQuery(info)
        .then((data) => {
          resolve(data.tasks);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          commit("SET_SPINNING", false);
        });
    });
  },
  download({ commit }, info) {
    return new Promise((resolve, reject) => {
      commit("SET_SPINNING", true);
      download(info)
        .then(() => {
          resolve();
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          commit("SET_SPINNING", false);
        });
    });
  },
};

const mutations = {
  SET_SPINNING(state, spinning) {
    state.spinning = spinning;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
