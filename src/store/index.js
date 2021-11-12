/*
 * @Author: your name
 * @Date: 2021-09-26 11:43:31
 * @LastEditTime: 2021-11-12 15:22:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/store/index.js
 */

import Vuex from "vuex";
import Vue from "vue";
import user from "./module/user";
import report from "./module/report";
import project from "./module/project";
import product from "./module/product";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    report,
    project,
    product,
  },
  state: {
    spinning: false,
  },
  mutations: {
    SET_SPINNING(state, spinning) {
      state.spinning = spinning;
    },
  },
  actions: {},
});
