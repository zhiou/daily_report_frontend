/*
 * @Author: your name
 * @Date: 2021-11-02 15:43:20
 * @LastEditTime: 2021-11-03 10:10:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/store/module/project.js
 */

import { list } from "../../api/product";

const state = () => ({
  all: [],
});

const actions = {
  list({ commit }, user) {
    return new Promise((resolve, reject) => {
        list()
        .then((data) => {
            console.log("products", data.products)
          commit("SET_PRODUCTS", data.products)
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const mutations = {
  SET_PRODUCTS: (state, products) => {
    state.all = products;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
