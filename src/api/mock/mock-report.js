/*
 * @Author: your name
 * @Date: 2021-10-11 11:07:46
 * @LastEditTime: 2021-10-12 15:34:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/api/mock/mock-report.js
 */
export const mockReport = {
  update: {
    api: /\/report/,
    method: "post",
    enabled: true,
    template: {
    },
  },
  query: {
    api: /\/report/,
    method: "get",
    enabled: true,
    template: {
      "on_day|1": "@date",
      "author|1": "@cname",
      "tasks|1-10": [
          {
              "name|1": "@ctitle",
              "details|1": "@cparagraph(1,5)",
              "cost|1":"@integer(0, 12)",
              "project_id|+1":["11223344", "22334455"],
              "product_id|1": ["12345", "67890"],
          }
      ]
    },
  },
  queryMonth: {
    api: /\/lookup/,
    method: "get",
    enabled: true,
    template: {
      "on_month|1": "@date",
      "author|1": "@cname",
      "tasks|30-100": [
          {
              "on_day|1": "@date",
              "name|1": "@ctitle",
              "details|1": "@cparagraph(1,5)",
              "cost|1":"@integer(0, 12)",
              "project_id|+1":["11223344", "22334455"],
              "product_id|1": ["12345", "67890"],
          }
      ]
    },
  }
};
