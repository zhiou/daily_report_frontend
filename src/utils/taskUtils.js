var _ = require('lodash');
import moment from 'moment'
// 把具有相同任务名、项目和产品的任务合并成一个，工时相加
export function merge(tasks) {
    let records = new Map()
    tasks.sort((a, b) => moment(a.report_date).diff(moment(b.report_date), 'day')).forEach((task) => {
        let key = task.staff_name + task.task_name + ':' + (task.project_number ?? '0') + ':' + (task.product_number ?? '0')
        let item = '- ' + '(' + task.task_cost + 'h)' + task.task_detail
        if (!records.has(key)) {
            task.task_detail = item
            records.set(key, task);
        } else {
            let merged = records.get(key)
            merged.task_detail += '<br/>' + item
            merged.task_cost += task.task_cost
            records.set(key, merged)
        }
    })
    return [...records.values()]
}

// 把任务列表根据prop聚合，形成报告
export function conform(prop, tasks) {
    let merged = merge(tasks)
    let grouped = _.groupBy(merged, prop);
    let key = 1
    return Object.keys(grouped).sort().map((group_name) => {
        let tasks = grouped[group_name];
        let department = tasks[0].department;
        let cost = 0;
        let content = [];
        tasks.forEach((task) => {
            cost += task.task_cost;
            let tc = '<' + task.task_name + '>';
            if (task.project_name || task.product_name) {
                tc += "["
                if (task.project_name) {
                    tc += task.project_name + ":";
                }
                if (task.product_name) {
                    tc += task.product_name;
                }
                tc += "]"
            }
            tc += "(" + task.task_cost + "h)"
            let td = task.task_detail
            content.push({tc, td});
        });
        key++;
        return {group_name, cost, content, department, key};
    });
}