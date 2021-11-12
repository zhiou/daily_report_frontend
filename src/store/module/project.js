/*
 * @Author: your name
 * @Date: 2021-11-02 15:43:20
 * @LastEditTime: 2021-11-12 15:30:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/store/module/project.js
 */

import { list, update, create } from "../../api/project";

const state = () => ({
  spinning: false,
  all: [],
});

const actions = {
  list({ commit }) {
    return new Promise((resolve, reject) => {
      commit("SET_SPINNING", true);
      list()
        .then((data) => {
          commit("SET_PROJECTS", data.projects);
          resolve();
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          commit("SET_SPINNING", false);
        });
    });
  },
  update({ commit }, projects) {
    return new Promise((resolve, reject) => {
      update(projects)
        .then(() => {
          commit("SET_PROJECTS", projects);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  create({ commit }, project) {
    return new Promise((resolve, reject) => {
      create(project)
        .then(() => {
          commit("ADD_PROJECT", project);
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
  ADD_PROJECT: (state, project) => {
    state.all = [...state.all, project];
  },
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
