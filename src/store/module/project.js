/*
 * @Author: your name
 * @Date: 2021-11-02 15:43:20
 * @LastEditTime: 2021-11-22 16:09:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/store/module/project.js
 */

import {list, update, create, remove} from "../../api/project";
import {removeNullChildren} from "../../utils/helper"
const state = () => ({
    spinning: false,
    all: [],
});

const actions = {
    list({commit}) {
        return new Promise((resolve, reject) => {
            commit("SET_SPINNING", true);
            list()
                .then((data) => {
                    commit("SET_PROJECTS", data);
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
    update({commit}, project) {
        return new Promise((resolve, reject) => {
            update(project)
                .then(() => {
                    commit("UPDATE_PROJECT", project);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    create({commit}, project) {
        return new Promise((resolve, reject) => {
            create(project)
                .then((proj) => {
                    commit("ADD_PROJECT", proj);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    remove({commit}, project) {
        return new Promise((resolve, reject) => {
            remove(project)
                .then(() => {
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
        state.all = removeNullChildren(projects)
    },
    UPDATE_PROJECT: (state, target) => {
        let projects = state.all
        let index = projects.findIndex((project) => project.number === target.number)
        if (index > -1) {
            projects[index] = target
        }
        state.all = projects
    },
    ADD_PROJECT: (state, project) => {
        if (project.parent_number) {
            state.all = [...state.all].map(proj => {
                if (proj.number === project.parent_number) {
                    if (proj.children) {
                        proj.children.push(project)
                    } else {
                        proj.children = [project]
                    }
                }
                return proj;
            })
        } else {
            state.all = [...state.all, project];
        }
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
