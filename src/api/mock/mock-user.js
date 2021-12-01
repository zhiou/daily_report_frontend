/*
 * @Author: your name
 * @Date: 2021-10-11 10:45:45
 * @LastEditTime: 2021-11-12 15:53:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/api/mock/mock-user.js
 */
export const mockUser = {
    list: {
        api: /\/user$/,
        method: 'get',
        enabled: true,
        template: {
            "message|1": "@csentence",
            "code|1": [0],
            "data|1-20": [
                {
                    "work_code|1": "@string",
                    "roles|1-2": ['admin', 'pmo'],
                    "name|1": "@cname",
                    "department|1": ["研发一部", "研发二部", "研发X部"],
                },
            ],
        }
    },
    info: {
        api: /\/user\/info/,
        method: 'get',
        enabled: true,
        template: {
            "message|1": "@csentence",
            "code|1": [0],
            "data|1": [
                {
                    "account|1": "@string",
                    "roles|1-4": ['admin', 'pmo', 'pm', 'dm'],
                    "name|1": "@cname",
                    "department|1": ["研发一部", "研发二部", "研发X部"],
                    "projects|0-4": [
                        {
                            "number|1": "@natural(1,1000)",
                            "name|1": "@cword(7,10)",
                            "manager_number|1": "@cname",
                            "status|1": "@integer(0,3)",
                            "remark|1": "@csentence",
                        },
                    ]
                },
            ],
        }
    },
    login: {
        api: /\/user\/login/,
        method: "post",
        enabled: true,
        template: {
            "message|1": "@csentence",
            "code|1": [0],
            "data|1": [
                {
                    "token|1": "@string",
                    "account|1": "@string",
                    "roles|1-4": ['admin', 'pmo', 'pm', 'dm'],
                    "name|1": "@cname",
                    "department|1": ["研发一部", "研发二部", "研发X部"],
                    "projects|0-4": [
                        {
                            "number|1": "@natural(1,1000)",
                            "name|1": "@cword(7,10)",
                            "manager_number|1": "@cname",
                            "status|1": "@integer(0,3)",
                            "remark|1": "@csentence",
                        },
                    ]
                },
            ],
        },
    },
    logout: {
        api: /\/user\/logout/,
        method: "post",
        enabled: true,
        template: {
            "message|1": "@csentence",
            "code|1": [0],
            "data|1": {}
        },
    },
    addRole: {
        api: /\/user\/role/,
        method: "post",
        enabled: true,
        template: {
            "message|1": "@csentence",
            "code|1": [0],
            "data|1": {}
        },
    },
    delRole: {
        api: /\/user\/role/,
        method: "delete",
        enabled: true,
        template: {
            "message|1": "@csentence",
            "code|1": [0],
            "data|1": {}
        },
    },
};
