<!--
 * @Author: your name
 * @Date: 2021-10-13 16:14:42
 * @LastEditTime: 2021-11-04 18:22:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/ProjectReport.vue
-->
<template>
  <div id="report" v-title data-title="项目日志">
    <div class="report-frame">
      <a-row :gutter="16">
        <a-col :span="4">
          <a-input :value="projectName" addonBefore="Project" disabled />
        </a-col>

        <a-col :span="20"> </a-col>
      </a-row>

      <a-table
        :columns="columns"
        :data-source="reports"
        style="margin: 16px"
        :defaultExpandedRowKeys="[0]"
        :pagination="false"
      >
        <template slot="name" slot-scope="text, record">
          <editable-cell
            :text="text"
            @change="onCellChange(record.key, 'name', $event)"
          />
        </template>
        <template slot="cost" slot-scope="number, record">
          <editable-number-cell
            :number="number"
            @change="onCellChange(record.key, 'cost', $event)"
          />
        </template>
        <template slot="department" slot-scope="department, record">
          <editable-cell
            :text="department"
            @change="onCellChange(record.key, 'department', $event)"
          />
        </template>
        <template slot="details" slot-scope="tasks">
          <ol>
            <li v-for="(task, index) in tasks" :key="index">
              {{ task }}
            </li>
          </ol>
        </template>
 
      </a-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EditableCell from "./components/EditableAreaCell.vue";
import EditableNumberCell from "./components/EditableNumberCell.vue";
import moment from "moment";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "Cost",
    dataIndex: "cost",
    key: "cost",
    scopedSlots: { customRender: "cost" },
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    scopedSlots: { customRender: "department" },
  },
  {
    title: "Tasks",
    dataIndex: "tasks",
    key: "tasks",
    scopedSlots: { customRender: "details" },
  },
];


export default {
  name: "ProjectReport",
  components: {
    EditableCell,
    EditableNumberCell,
  },
  beforeCreate() {
    //TODO: 参数不对,要改
    this.$store
      .dispatch("report/pmQuery", {
        from: moment(),
        to: moment(),
      })
      .then((tasks) => {
        this.projectName = tasks[0].project_name;
        console.log("project reports queried", tasks);
        let nameBased = this.$_.groupBy(tasks, 'staff_name')
        console.log("nameBased projects", nameBased);
        this.reports = Object.keys(nameBased).map(name => {
          let tasks = nameBased[name];
          let department = tasks[0].department
           let cost = 0;
          let content = [];
          tasks.forEach((task) => {
            cost += task.task_cost;
            let tc = "<" + task.task_name + ">";

            if (task.product_name) {
                tc += "[" + task.product_name + "]";
            }

            tc += task.task_detail;
            content.push(tc);
          });
          let key = this.count;
          this.count++;
          return { name, cost, tasks: content, department, key };
        })
        console.log("this.reports", this.reports);
      });
  },
  data() {
    return {
      count: 0,
      reports: [],
      columns,
      onDay: moment(),
      project: "11223344",
      projectName: "",
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style lang="css" scoped>
.report-frame {
  background-color: white;
  margin: 30px 30px;
}

.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
.editable-cell:hover /deep/ .editable-cell-icon {
  display: none;
}
</style>