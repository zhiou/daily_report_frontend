var _ = require('lodash');
import moment from 'moment'

// 把具有相同任务名、项目和产品的任务合并成一个，工时相加
export function merge(tasks) {
    let records = new Map()
    tasks.sort((a, b) => moment(a.report_date).diff(moment(b.report_date), 'day')).forEach((task) => {
        let key = task.staff_name + task.task_name + ':' + (task.project_number ?? '0') + ':' + (task.product_number ?? '0')
        let date = moment(task.report_date).format("MM-DD")
        let item = '- ' + '(' + task.task_cost + 'h:' + date + ')' + '<pre style="margin-left: 16px;white-space: pre-wrap;word-wrap: break-word;">' + task.task_detail + '</pre>'
        if (!records.has(key)) {
            let rt = {...task}
            rt.task_detail = item
            records.set(key, rt);
        } else {
            let merged = records.get(key)
            merged.task_detail += item
            merged.task_cost += task.task_cost
            records.set(key, merged)
        }
    })
    return [...records.values()]
}

// 把任务列表根据prop聚合，形成报告
export function conform(prop, tasks, sm=true) {
    let merged = [...tasks]
    if (sm) {
        merged = merge(tasks)
    }
    let grouped = _.groupBy(merged, prop);
    let key = 1
    return Object.keys(grouped)
        .sort()
        .map((group_name) => {
            let tasks = grouped[group_name];
            let department = tasks.length ? tasks[0].department : "";
            let work_code = tasks.length ? tasks[0].work_code : "";
            let cost = 0;
            let content = [];
            tasks.forEach((task) => {
                cost += task.task_cost;
                let tc = '【' + task.task_name + '】-';
                if (task.project_name || task.product_name) {
                    tc += "【"
                    if (task.project_name) {
                        tc += "项目：" + task.project_name + ", ";
                    }
                    if (task.product_name) {
                        tc += "产品：" +task.product_name;
                    }
                    tc += "】"
                }
                tc += "(" + task.task_cost + "h)"
                let td = task.task_detail
                content.push({tc, td});
            });
            key++;
            return {group_name, work_code, cost, content, department, key};
        });
}