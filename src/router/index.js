/*
 * @Author: your name
 * @Date: 2021-09-22 17:30:02
 * @LastEditTime: 2021-11-22 15:00:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/router/index.js
 */

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Report from "../views/Report.vue";
import Calendar from "../views/Calendar.vue";
import DepartmentReport from "../views/DepartmentReport.vue";
import ProjectReport from "../views/ProjectReport.vue";
import Project from "../views/Project.vue";
import Product from "../views/Product.vue";
import PersonalStats from "../views/PersonalStats.vue";
import ProjectStats from "../views/ProjectStats.vue";
import CommitStats from "../views/CommitStats.vue";
import PMOReport from "../views/PMOReport.vue";
import UserRole from "../views/UserRole";
import OAuth from "../views/OAuth";
import {is_mobile} from "@/utils/helper";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const mobile_routes = [
    {
        path: '/mobile',
        name: 'MobileReports',
        component: () => import("../views/mobile/Reports.vue"),
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/tasks",
        name: 'MobileTasks',
        component: () => import("../views/mobile/Tasks.vue"),
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/oauth",
        name: "OAuth",
        component: OAuth,
        meta: {
            requireAuth: false,
        }
    },
    {
        path: "*",
        redirect: "/mobile",
    },
]

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        redirect: "/user",
        meta: {
            breadcrumb: '??????',
            requireAuth: true,
        },
        children: [
            {
                path: "user",
                name: "User",
                component: Calendar,
                meta: {
                    requireAuth: true,
                    inMenu: 'report_mng',
                    breadcrumb: '????????????'
                },
            },
            {
                path: "report",
                name: "Report",
                component: Report,
                props: true,
                meta: {
                    requireAuth: true,
                    breadcrumb: '????????????'
                },
            },
            {
                path: "dm",
                name: "DepartmentReport",
                component: DepartmentReport,
                meta: {
                    requireAuth: true,
                    requireRole: 'dm',
                    inMenu: 'report_mng',
                    breadcrumb: '????????????'
                },
            },
            {
                path: "members",
                name: "MemberReport",
                component: Report,
                meta: {
                    requireAuth: true,
                    requireRole: 'dm',
                    breadcrumb: '????????????'
                }
            },
            {
                path: "pm",
                name: "ProjectReport",
                component: ProjectReport,
                meta: {
                    requireAuth: true,
                    requireRole: 'pm',
                    inMenu: 'report_mng',
                    breadcrumb: '????????????'
                },
            },
            {
                path: "pmo",
                name: "PMOReport",
                component: PMOReport,
                meta: {
                    requireAuth: true,
                    requireRole: 'pmo',
                    inMenu: 'report_mng',
                    breadcrumb: 'PMO'
                },
            },
            {
                path: "staff",
                name: "PersonalStats",
                component: PersonalStats,
                meta: {
                    requireAuth: true,
                    inMenu: 'statistics',
                    breadcrumb: '????????????'
                },
            },
            {
                path: "proj_stats",
                name: "ProjectStats",
                component: ProjectStats,
                meta: {
                    requireAuth: true,
                    requireRole: 'pm',
                    inMenu: 'statistics',
                    breadcrumb: '????????????'
                },
            },
            {
                path: "cmt_stats",
                name: "CommitStats",
                component: CommitStats,
                meta: {
                    requireAuth: true,
                    requireRole: 'pmo',
                    inMenu: 'statistics',
                    breadcrumb: '????????????'
                },
            },
            {
                path: "proj",
                name: "Project",
                component: Project,
                meta: {
                    requireAuth: true,
                    requireRole: 'pm',
                    inMenu: 'settings',
                    breadcrumb: '????????????'
                },
            },
            {
                path: "prod",
                name: "Product",
                component: Product,
                meta: {
                    requireAuth: true,
                    requireRole: 'pmo',
                    inMenu: 'settings',
                    breadcrumb: '????????????'
                },
            },
            {
                path: "user_role",
                name: "UserRole",
                component: UserRole,
                meta: {
                    requireAuth: true,
                    requireRole: 'admin',
                    inMenu: 'settings',
                    breadcrumb: '????????????'
                },
            },
        ],
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/oauth",
        name: "OAuth",
        component: OAuth,
        meta: {
            requireAuth: false,
        }
    },
    {
        path: "*",
        redirect: '/'
    },
];

const router = new VueRouter({
       routes: is_mobile() ? mobile_routes: routes,
});

export default router;
