/*
 * @Author: your name
 * @Date: 2021-06-09 14:58:52
 * @LastEditTime: 2021-09-26 15:12:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /soft-otp-admin/src/store/modules/account.js
 */
import { getToken, setToken } from "../../api/request/token";
import { login, logout, modify } from "../../api/login";

const state = () => ({
  token: getToken(),
});

const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      login(user.account, user.password)
        .then((data) => {
          commit("SET_TOKEN", data["token"]);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 退出
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit("SET_TOKEN", "");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  update({ commit }, password) {
    return new Promise((resolve, reject) => {
      modify(password.origin, password.newone)
      .then((data) => {
        commit("SET_TOKEN", data["token"]);
        resolve()
      })
      .catch((e) => {
        reject(e)
      })
    })
  }
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
    setToken(token);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
