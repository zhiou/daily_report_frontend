/*
 * @Author: your name
 * @Date: 2021-11-02 15:43:20
 * @LastEditTime: 2021-11-08 10:19:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/store/module/project.js
 */

import { list, update, create } from "../../api/project";

const state = () => ({
  all: [],
});

const actions = {
  list({ commit }) {
    return new Promise((resolve, reject) => {
      list()
        .then((data) => {
          commit("SET_PROJECTS", data.projects);
          resolve();
        })
        .catch((error) => {
          reject(error);
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
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
