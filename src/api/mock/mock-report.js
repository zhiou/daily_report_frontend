/*
 * @Author: your name
 * @Date: 2021-10-11 11:07:46
 * @LastEditTime: 2021-11-05 15:35:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/api/mock/mock-report.js
 */
export const mockReport = {
  update: {
    api: /\/report$/,
    method: "post",
    enabled: true,
    template: {},
  },
  selfQuery: {
    api: /\/report$/,
    method: "get",
    enabled: true,
    template: {
      "tasks|1-10": [
        {
          "product_line|1":["KEY线", "OTP", "FIDO", "自定义"],
          "product_number|1":["0", "12345" ,"67890"],
          "product_name|1":["产品1", "产品2", "产品3"],
          "department|1":["研发一部"],
          "work_code|1":["ES0092"],
          "staff_name|1":"@cname",
          "task_cost|1":"@integer(1, 12)",
          "project_number|1":["11223344", "22334455", "33445566", "44556677", "55667788", "66778899", "77889900", "88990011", "99001122", "00000000"],
          "project_name|1":["贵州农信银", "贵州安元通", "深圳农商行", "深圳农商行", "中国人民银行", "河北银行", "天威诚信信创", "江苏智慧CA", "福建凯特", "奔凯", "未立项"],
          "report_date|1":"@date",
          "task_name|1":["任务1", "任务2", "任务3", "任务4", "任务5"],
          "task_detail|1":"@cparagraph(1,5)",
          "commit_data|1":"@date",
        },
      ],
    },
  },
  dmQuery: {
    api: /\/report\/dm/,
    method: "get",
    enabled: true,
    template: {
      "tasks|1-30": [
        {
          "product_line|1":["KEY线", "OTP", "FIDO", "自定义"],
          "product_number|1":["0", "12345" ,"67890"],
          "product_name|1":["产品1", "产品2", "产品3"],
          "department|1":["研发一部"],
          "work_code|1":["ES0092", "ES0011", "ES0028"],
          "staff_name|1":"@cname",
          "task_cost|1":"@integer(1, 12)",
          "project_number|1":["11223344", "22334455", "33445566", "44556677", "55667788", "66778899", "77889900", "88990011", "99001122", "00000000"],
          "project_name|1":["贵州农信银", "贵州安元通", "深圳农商行", "深圳农商行", "中国人民银行", "河北银行", "天威诚信信创", "江苏智慧CA", "福建凯特", "奔凯", "未立项"],
          "report_date|1":"@date",
          "task_name|1":["任务1", "任务2", "任务3", "任务4", "任务5"],
          "task_detail|1":"@cparagraph(1,5)",
          "commit_data|1":"@date",
        },
      ],
    },
  },
  pmoQuery: {
    api: /\/report\/pmo/,
    method: "get",
    enabled: true,
    template: {
      "tasks|30-100": [
        {
          "product_line|1":["KEY线", "OTP", "FIDO", "自定义"],
          "product_number|1":["0", "12345" ,"67890"],
          "product_name|1":["产品1", "产品2", "产品3"],
          "department|1":["研发一部", "研发二部", "研发X部"],
          "work_code|1":["ES0092", "ES0011", "ES0028"],
          "staff_name|1":["周", "吴", "郑", "王"],
          "task_cost|1":"@integer(1, 12)",
          "project_number|1":["11223344", "22334455", "33445566", "44556677", "55667788", "66778899", "77889900", "88990011", "99001122", "00000000"],
          "project_name|1":["贵州农信银", "贵州安元通", "深圳农商行", "深圳农商行", "中国人民银行", "河北银行", "天威诚信信创", "江苏智慧CA", "福建凯特", "奔凯", "未立项"],
          "report_date|1":"@date",
          "task_name|1":["任务1", "任务2", "任务3", "任务4", "任务5"],
          "task_detail|1":"@cparagraph(1,5)",
          "commit_data|1":"@date",
        },
      ],
    },
  },
  pmQuery: {
    api: /\/report\/pm/,
    method: "get",
    enabled: true,
    template: {
      "tasks|1-30": [
        {
          "product_line|1":["KEY线", "OTP", "FIDO", "自定义"],
          "product_number|1":["0", "12345" ,"67890"],
          "product_name|1":["产品1", "产品2", "产品3"],
          "department|1":["研发二部", "研发X部"],
          "work_code|1":["ES0092", "ES0011", "ES0028"],
          "staff_name|1":"@cname",
          "task_cost|1":"@integer(1, 12)",
          "project_number|1":["11223344"],
          "project_name|1":["贵州农信银"],
          "report_date|1":"@date",
          "task_name|1":["任务1", "任务2", "任务3", "任务4", "任务5"],
          "task_detail|1":"@cparagraph(1,5)",
          "commit_data|1":"@date",
        },
      ],
    },
  }
};
