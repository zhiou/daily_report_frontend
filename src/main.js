/*
 * @Author: your name
 * @Date: 2021-09-22 17:11:13
 * @LastEditTime: 2021-11-08 10:17:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import moment from "moment";
import i18n from "./i18n";
import lodash from "lodash";
const echarts = require("echarts")

Vue.config.productionTip = false

var prod = process.env.NODE_ENV === 'production';
console.log = (function (oriLogFunc) {
  return function () {
    if (!prod) {
      oriLogFunc.apply(this, arguments);
    }
  }
})(console.log);

moment.locale("zh-cn"); //设置语言 或 moment.lang('zh-cn');
Object.defineProperty(Vue.prototype, "$_", { value: lodash });
Vue.prototype.$echarts = echarts;

Vue.use(Antd);

Vue.directive("title", function(el) {
    document.title = el.dataset.title;
  });

  router.beforeEach((to, from, next) => {
    const token = store.state.user.token
    if (!to.meta.requireAuth || (token && token != "")) {
      next();
      return;
    }
    next({
      path: "/login",
      query: {
        redirect: to.name,
      },
    });
  });

new Vue({
    router,
    store,
    i18n,
    moment,
 render: h => h(App)
}).$mount('#app')
