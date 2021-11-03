/*
 * @Author: your name
 * @Date: 2021-11-02 15:29:28
 * @LastEditTime: 2021-11-03 18:14:32
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
      "products|1-10": [
        {
          "number|1": "@string",
          "name|1": "@string",
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
