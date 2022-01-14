/*
 * @Author: your name
 * @Date: 2021-11-02 15:29:28
 * @LastEditTime: 2021-11-12 15:56:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/api/mock/mock-project.js
 */
export const mockProject = {
    list: {
        api: /\/project/,
        method: "get",
        enabled: true,
        template: {
            "message|1": "@csentence",
            "code|1": [0],
            "data|1-10": [
                {
                    "number|1": "@natural(1,1000)",
                    "name|1": "@cword(7,10)",
                    "manager_number|1": "@cname",
                    "status|1": "@integer(0,3)",
                    "remark|1": "@csentence",
                    "sublist|8": [
                        {
                            "number|1": "@natural(1,1000)",
                            "name|1": "@cword(7,10)",
                            "manager_number|1": "@cname",
                            "status|1": "@integer(0,3)",
                            "remark|1": "@csentence",
                        }
                    ]
                },
            ],
        },
    },
    update: {
        api: /\/project/,
        method: "put",
        enabled: true,
        template: {},
    },
    create: {
        api: /\/project/,
        method: "post",
        enabled: true,
        template: {},
    },
};
