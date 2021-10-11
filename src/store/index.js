/*
 * @Author: your name
 * @Date: 2021-09-26 11:43:31
 * @LastEditTime: 2021-10-11 13:37:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/store/index.js
 */

import Vuex from "vuex";
import Vue from "vue";
import user from "./module/user";
import report from "./module/report";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        report,
    },
    state: {},
    mutations: {

    },
    actions: {
        
    }
})