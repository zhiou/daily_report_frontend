/*
 * @Author: your name
 * @Date: 2021-11-02 15:43:20
 * @LastEditTime: 2021-11-12 15:24:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/store/module/project.js
 */

import { list, update, create } from "../../api/product";

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
          commit("SET_PRODUCTS", data.products);
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
  update({ commit }, products) {
    return new Promise((resolve, reject) => {
      update(products)
        .then(() => {
          commit("SET_PRODUCTS", products);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  create({ commit }, product) {
    return new Promise((resolve, reject) => {
      create(product)
        .then(() => {
          commit("ADD_PRODUCT", product);
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
  ADD_PRODUCT: (state, product) => {
    state.all = [...state.all, product];
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
