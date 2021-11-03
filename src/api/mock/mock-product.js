/*
 * @Author: your name
 * @Date: 2021-11-02 15:29:28
 * @LastEditTime: 2021-11-03 11:31:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/api/mock/mock-project.js
 */
export const mockProduct = {
  login: {
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
};
