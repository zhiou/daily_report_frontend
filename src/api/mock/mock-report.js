/*
 * @Author: your name
 * @Date: 2021-10-11 11:07:46
 * @LastEditTime: 2021-10-13 16:30:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/api/mock/mock-report.js
 */
export const mockReport = {
  update: {
    api: /\/report/,
    method: "post",
    enabled: true,
    template: {},
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
          "cost|1": "@integer(0, 12)",
          "project_id|+1": ["11223344", "22334455"],
          "product_id|1": ["12345", "67890"],
        },
      ],
    },
  },
  queryMonth: {
    api: /\/lookup/,
    method: "get",
    enabled: true,
    template: {
      "reports|28-31": [
        {
          "on_day|1": "@date",
          "author|1": "@cname",
          "tasks|30-100": [
            {
              "name|1": "@ctitle",
              "details|1": "@cparagraph(1,5)",
              "cost|1": "@integer(0, 12)",
              "project_id|+1": ["11223344", "22334455"],
              "product_id|1": ["12345", "67890"],
            },
          ],
        },
      ],
    },
  },
  queryDepartment: {
    api: /\/depart/,
    method: "get",
    enabled: true,
    template: {
      "reports|28-31": [
        {
          "on_day|1": "@date",
          "author|1": "@cname",
          "tasks|1-5": [
            {
              "name|1": "@ctitle",
              "details|1": "@cparagraph(1,5)",
              "cost|1": "@integer(0, 12)",
              "project_id|+1": ["0", "11223344", "22334455"],
              "product_id|1": ["0", "12345", "67890"],
            },
          ],
        },
      ],
    },
  },
  queryProject: {
    api: /\/project/,
    method: "get",
    enabled: true,
    template: {
      "reports|28-31": [
        {
          "on_day|1": "@date",
          "author|1": "@cname",
          "department|1": ["研发一部", "研发二部", "研发X部"],
          "tasks|1-5": [
            {
              "name|1": "@ctitle",
              "details|1": "@cparagraph(1,5)",
              "cost|1": "@integer(0, 12)",
              "project_id|+1": ["0", "11223344", "22334455"],
              "product_id|1": ["0", "12345", "67890"],
            },
          ],
        },
      ],
    },
  }
};
