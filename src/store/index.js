/*
 * @Author: your name
 * @Date: 2021-09-26 11:43:31
 * @LastEditTime: 2021-09-26 14:41:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/store/index.js
 */

import Vuex from "vuex";
import Vue from "vue";
import user from "./module/user";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
    },
    state: {},
    mutations: {

    },
    actions: {
        
    }
})