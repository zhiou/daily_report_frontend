/*
 * @Author: your name
 * @Date: 2021-11-02 15:29:28
 * @LastEditTime: 2021-11-02 15:42:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/api/mock/mock-project.js
 */
export const mockProject = {
  login: {
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
        },
      ],
    },
  },
};
