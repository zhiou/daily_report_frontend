/*
 * @Author: your name
 * @Date: 2021-11-02 15:29:28
 * @LastEditTime: 2021-11-12 15:56:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/api/mock/mock-project.js
 */
export const mockProduct = {
  list: {
    api: /\/product/,
    method: "get",
    enabled: true,
    template: {
      "message|1": "@csentence",
      "code|1": [0],
      "data|1-10": [
        {
          "number|1": "@natural(1,1000)",
          "name|1": "@cword(3,10)",
          "in_line|1": "@string",
          "remark|1": "@csentence",
          "status|1": "@integer(0,3)",
        },
      ],
    },
  },
  update: {
    api: /\/product/,
    method: "put",
    enabled: true,
    template: {
    },
  },
  create: {
    api: /\/product/,
    method: "post",
    enabled: true,
    template: {
    },
  },
};
