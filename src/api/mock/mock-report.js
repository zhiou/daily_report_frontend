/*
 * @Author: your name
 * @Date: 2021-10-11 11:07:46
 * @LastEditTime: 2021-11-12 15:51:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/api/mock/mock-report.js
 */

  function rangeDate(min,max) {
    var  days = (new Date(max) - new Date(min))/1000/60/60/24;
    var  i = 0;
    var  len = Math.floor(days);
    var  dates = [];
    for(;i<len;i++){
      dates.push(format(new Date(min).getTime()+1000*60*60*24*i));
    }
    return  dates;
  }

  function format(date) {
    var dateString = new Date(date),
        month = (dateString.getMonth()+1)<10 ? '0'+(dateString.getMonth()+1): (dateString.getMonth()+1),
        day = dateString.getDate()<10 ? '0'+dateString.getDate() : dateString.getDate();
    return dateString.getFullYear()+'-'+month+'-'+day
  }

export const mockReport = {
  update: {
    api: /\/report$/,
    method: "post",
    enabled: true,
    template: {},
  },
  selfQuery: {
    api: /\/report\?/,
    method: "get",
    enabled: true,
    template: {
      "message|1": "@csentence",
      "code|1": [0],
      "data|1-10": [
        {
          "product_line|1":["KEY线", "OTP", "FIDO", "自定义"],
          "product_number|1":["0", "12345" ,"67890"],
          "product_name|1":["产品1", "产品2", "产品3"],
          "department|1":["研发一部", "研发二部", "研发三部", "研发六部", "研发六部", "研发九部", "研发十部", "研发十二部", "研发X部"],
          "work_code|1":["ES0092"],
          "staff_name|1":"@cname",
          "task_cost|1":"@integer(1, 12)",
          "project_number|1":["11223344", "22334455", "33445566", "44556677", "55667788", "66778899", "77889900", "88990011", "99001122", "00000000"],
          "project_name|1":["贵州农信银", "贵州安元通", "深圳农商行", "北京农商行", "中国人民银行", "河北银行", "天威诚信信创", "江苏智慧CA", "福建凯特", "奔凯", "未立项"],
          "report_date|1": rangeDate('2021-01-01','2021-12-31'),
          "task_name|1":["任务1", "任务2", "任务3", "任务4", "任务5", "任务6", "任务7", "任务8", "任务9", "任务10"],
          "task_detail|1":"@cparagraph(1,5)",
          "commit_data|1":rangeDate('2021-01-01','2021-12-31'),
        },
      ],
    },
  },
  dmQuery: {
    api: /\/report\/dm/,
    method: "get",
    enabled: true,
    template: {
      "message|1": "@csentence",
      "code|1": [0],
      "data|1-30": [
        {
          "product_line|1":["KEY线", "OTP", "FIDO", "自定义"],
          "product_number|1":["0", "12345" ,"67890"],
          "product_name|1":["产品1", "产品2", "产品3"],
          "department|1":["研发一部", "研发二部", "研发三部", "研发六部", "研发六部", "研发九部", "研发十部", "研发十二部", "研发X部"],
          "work_code|1":["ES0092", "ES0011", "ES0028"],
          "staff_name|1":"@cname",
          "task_cost|1":"@integer(1, 12)",
          "project_number|1":["11223344", "22334455", "33445566", "44556677", "55667788", "66778899", "77889900", "88990011", "99001122", "00000000"],
          "project_name|1":["贵州农信银", "贵州安元通", "深圳农商行", "北京农商行", "中国人民银行", "河北银行", "天威诚信信创", "江苏智慧CA", "福建凯特", "奔凯", "未立项"],
          "report_date|1":"@datetime",
          "task_name|1":["任务1", "任务2", "任务3", "任务4", "任务5"],
          "task_detail|1":"@cparagraph(1,5)",
          "commit_data|1":"@datetime",
        },
      ],
    },
  },
  pmoQuery: {
    api: /\/report\/pmo/,
    method: "get",
    enabled: true,
    template: {
      "message|1": "@csentence",
      "code|1": [0],
      "data|30-100": [
        {
          "product_line|1":["KEY线", "OTP", "FIDO", "自定义"],
          "product_number|1":["0", "12345" ,"67890"],
          "product_name|1":["产品1", "产品2", "产品3"],
          "department|1":["研发一部", "研发二部", "研发三部", "研发六部", "研发六部", "研发九部", "研发十部", "研发十二部", "研发X部"],
          "work_code|1":["ES0092", "ES0011", "ES0028"],
          "staff_name|1":"@cname",
          "task_cost|1":"@integer(1, 12)",
          "project_number|1":["11223344", "22334455", "33445566", "44556677", "55667788", "66778899", "77889900", "88990011", "99001122", "00000000"],
          "project_name|1":["贵州农信银", "贵州安元通", "深圳农商行", "北京农商行", "中国人民银行", "河北银行", "天威诚信信创", "江苏智慧CA", "福建凯特", "奔凯", "未立项"],
          "report_date|1":"@datetime",
          "task_name|1":["任务1", "任务2", "任务3", "任务4", "任务5"],
          "task_detail|1":"@cparagraph(1,5)",
          "commit_data|1":"@datetime",
        },
      ],
    },
  },
  pmQuery: {
    api: /\/report\/pm\?/,
    method: "get",
    enabled: true,
    template: {
      "message|1": "@csentence",
      "code|1": [0],
      "data|1-30": [
        {
          "product_line|1":["KEY线", "OTP", "FIDO", "自定义"],
          "product_number|1":["0", "12345" ,"67890"],
          "product_name|1":["产品1", "产品2", "产品3"],
          "department|1":["研发一部", "研发二部", "研发三部", "研发六部", "研发六部", "研发九部", "研发十部", "研发十二部", "研发X部"],
          "work_code|1":["ES0092", "ES0011", "ES0028"],
          "staff_name|1":"@cname",
          "task_cost|1":"@integer(1, 12)",
          "project_number|1":["11223344"],
          "project_name|1":["贵州农信银"],
          "report_date|1":"@datetime",
          "task_name|1":["任务1", "任务2", "任务3", "任务4", "任务5"],
          "task_detail|1":"@cparagraph(1,5)",
          "commit_data|1":"@datetime",
        },
      ],
    },
  },
    pmPageQuery: {
        api: /\/report\/pm\/page/,
        method: "get",
        enabled: true,
        template: {
            "message|1": "@csentence",
            "code|1": [0],
            "data|1": [
                {
                    "total|1": [100],
                    "current|1": [1, 3, 5, 6, 9],
                    "size|1": [10],
                    "records|10":[
                        {
                            "product_line|1":["KEY线", "OTP", "FIDO", "自定义"],
                            "product_number|1":["0", "12345" ,"67890"],
                            "product_name|1":["产品1", "产品2", "产品3"],
                            "department|1":["研发一部", "研发二部", "研发三部", "研发六部", "研发六部", "研发九部", "研发十部", "研发十二部", "研发X部"],
                            "work_code|1":["ES0092", "ES0011", "ES0028"],
                            "staff_name|1":"@cname",
                            "task_cost|1":"@integer(1, 12)",
                            "project_number|1":["11223344"],
                            "project_name|1":["贵州农信银"],
                            "report_date|1":"@datetime",
                            "task_name|1":["任务1", "任务2", "任务3", "任务4", "任务5"],
                            "task_detail|1":"@cparagraph(1,5)",
                            "commit_data|1":"@datetime",
                        },
                    ]
                }
            ],
        },
    }
};
