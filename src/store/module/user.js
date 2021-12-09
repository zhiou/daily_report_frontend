/*
 * @Author: your name
 * @Date: 2021-06-09 14:58:52
 * @LastEditTime: 2021-12-06 18:07:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /soft-otp-admin/src/store/modules/account.js
 */
import {getToken, setToken} from "../../api/request/token";

import {login, logout, modify, info, list, modify_roles} from "../../api/login";


const state = () => ({
    all: [],
    token: getToken(),
    name: "",
    department: "",
    projects: [], // not empty if you are pm
    roles: [],
});


const actions = {
    login({commit}, user) {
        return new Promise((resolve, reject) => {
            login(user.account, user.password)
                .then((data) => {
                    commit("SET_TOKEN", data["token"]);
                    commit("SET_NAME", data["name"]);
                    commit("SET_DEPARTMENT", data["department"]);
                    commit("SET_PROJECTS", data["projects"])
                    commit("SET_ROLES", data['roles'])
                    console.log('login resp', data)
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    // 退出
    logout({commit}) {
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
    update({commit}, password) {
        return new Promise((resolve, reject) => {
            modify(password.origin, password.newone)
                .then((data) => {
                    commit("SET_TOKEN", data["token"]);
                    resolve();
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
    info({commit}) {
        return new Promise((resolve, reject) => {
            info()
                .then((data) => {
                    commit("SET_NAME", data["name"]);
                    commit("SET_DEPARTMENT", data["department"]);
                    commit("SET_PROJECTS", data["projects"])
                    commit("SET_ROLES", data['roles'])
                    resolve();
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
    list({commit}) {
        return new Promise((resolve, reject) => {
            list()
                .then((data) => {
                    commit("SET_ALL", data)
                    resolve();
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },

    modify_roles({commit}, data) {
        return new Promise((resolve, reject) => {
            modify_roles(data)

                .then(() => {
                    resolve()
                })
                .catch((e) => {
                    reject(e);
                });
        })
    }
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
        setToken(token);
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_DEPARTMENT: (state, department) => {
        state.department = department;
    },
    SET_PROJECTS: (state, projects) => {
        state.projects = projects
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_ALL: (state, all) => {
        state.all = all
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
