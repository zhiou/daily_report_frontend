/*
 * @Author: your name
 * @Date: 2021-10-11 10:15:57
 * @LastEditTime: 2021-11-18 19:26:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/store/module/report.js
 */

import {
  update,
  selfQuery,
  statsQuery,
  dmQuery,
  pmQuery,
  memberQuery,
  pmPageQuery,
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
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  selfQuery({ commit }, info) {
    let times = 1
    let delay = 200
    return new Promise((resolve, reject) => {
      function retry() {
        commit("SET_SPINNING", true);
        selfQuery(info)
            .then((data) => {
              resolve(data);
            })
            .catch((e) => {
              if (times === 0) {
                reject(e);
              } else {
                times--;
                setTimeout(retry(), delay)
              }
            })
            .finally(() => {
              commit("SET_SPINNING", false);
            });
      }
      retry()
    });
  },
  stats({ commit }, range) {
    return new Promise((resolve, reject) => {
      statsQuery(range)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
    });
  },
  member({ commit }, info) {
    return new Promise((resolve, reject) => {
      commit("SET_SPINNING", true);
      memberQuery(info)
          .then((data) => {
            resolve(data);
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
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          commit("SET_SPINNING", false);
        });
    });
  },
  pmPageQuery({ commit }, info) {
    return new Promise((resolve, reject) => {
      commit("SET_SPINNING", true);
      pmPageQuery(info)
        .then((data) => {
          resolve(data);
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
          resolve(data);
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
          resolve(data);
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
      download(info)
        .then(() => {
          resolve();
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
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
