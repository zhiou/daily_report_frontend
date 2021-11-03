/*
 * @Author: your name
 * @Date: 2021-09-22 17:30:02
 * @LastEditTime: 2021-11-03 10:14:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/router/index.js
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Report from '../views/Report.vue'
import Calendar from '../views/Calendar.vue'
import DepartmentReport from '../views/DepartmentReport.vue'
import ProjectReport from '../views/ProjectReport.vue'
import Project from '../views/Project.vue'
import Product from '../views/Product.vue'
Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // redirect: { name: 'Login' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: Calendar
      },
      {
        path: 'report/:date',
        name: 'Report',
        component: Report,
        props: true,
      },
      {
        path: 'dm',
        name: 'DepartmentReport',
        component: DepartmentReport,
      },
      {
        path: 'pm',
        name: 'ProjectReport',
        component: ProjectReport,
      },
      {
        path: 'proj',
        name: 'Project',
        component: Project,
      },
      {
        path: 'prod',
        name: 'Product',
        component: Product,
      }
    ],
    meta: {
      requireAuth: true
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requireAuth: true
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requireAuth: false
    },
  },
]

const router = new VueRouter({
  routes
})

export default router
