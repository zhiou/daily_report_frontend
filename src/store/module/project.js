/*
 * @Author: your name
 * @Date: 2021-11-02 15:43:20
 * @LastEditTime: 2021-11-02 16:23:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/store/module/project.js
 */

import { list } from "../../api/project";

const state = () => ({
  all: [],
});

const actions = {
  list({ commit }, user) {
    return new Promise((resolve, reject) => {
        list()
        .then((data) => {
            console.log("projects", data.projects)
          commit("SET_PROJECTS", data.projects)
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const mutations = {
  SET_PROJECTS: (state, projects) => {
    state.all = projects;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
