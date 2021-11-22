/*
 * @Author: your name
 * @Date: 2021-11-02 15:43:20
 * @LastEditTime: 2021-11-22 16:06:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/store/module/project.js
 */

import { list, update, create, remove} from "../../api/product";

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
          commit("SET_PRODUCTS", data);
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
  update({ commit }, product) {
    return new Promise((resolve, reject) => {
      update(product)
        .then(() => {
          commit("UPDATE_PRODUCT", product);
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
  remove({ commit }, product) {
    return new Promise((resolve, reject) => {
      remove(product)
        .then(() => {
          commit("REMOVE_PRODUCT", product);
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
    state.all = products
  },
  UPDATE_PRODUCT: (state, target) => {
    let products = state.all
    let index = products.findIndex((product) => product.number === target.number)
    if (index > -1) {
      products[index] = target
    }
    state.all = products
  },
  ADD_PRODUCT: (state, product) => {
    state.all = [...state.all, product];
  },
  SET_SPINNING(state, spinning) {
    state.spinning = spinning;
  },
  REMOVE_PRODUCT: (state, product) => {
    let products = [];
    for (let p of state.all)
    { 
      if(p.number !== product.numbers[0])
      {
        products.push(p);
      }
    }
    state.all = products;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
