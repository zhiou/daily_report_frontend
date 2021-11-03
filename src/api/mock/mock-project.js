/*
 * @Author: your name
 * @Date: 2021-11-02 15:29:28
 * @LastEditTime: 2021-11-03 18:18:26
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
      "projects|1-10": [
        {
          "number|1": "@string",
          "name|1": "@string",
          "manager_number|1": "@string",
          "status|1": "@integer(0,3)",
          "remark|1": "@csentence",
        },
      ],
    },
  },
  update: {
    api: /\/project/,
    method: "put",
    enabled: true,
    template: {
    },
  },
  create: {
    api: /\/project/,
    method: "post",
    enabled: true,
    template: {
    },
  },
};
