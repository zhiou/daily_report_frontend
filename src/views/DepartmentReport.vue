<!--
 * @Author: your name
 * @Date: 2021-10-13 14:50:36
 * @LastEditTime: 2021-11-15 17:24:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/DepartmentReport.vue
-->
<template>
  <div id="report" v-title data-title="工作日志-创建">
    <div class="report-frame">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-input v-model="department" addonBefore="Department" disabled />
        </a-col>
        <a-col :span="4">
          <a-date-picker
            :allowClear="false"
            :default-value="onDay"
            @change="onDayChanged"
        /></a-col>

        <a-col :span="16"> </a-col>
      </a-row>
      <a-spin :spinning="spinning">
        <a-table
          :columns="columns"
          :data-source="reports"
          style="margin: 16px"
          :defaultExpandedRowKeys="[0]"
          :pagination="false"
        >
          <template slot="details" slot-scope="tasks">
            <ul>
              <li v-for="(task, index) in tasks" :key="index">
                {{ task }}
              </li>
            </ul>
          </template>
        </a-table>
      </a-spin>
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
    width: 120,
  },
  {
    title: "Cost",
    dataIndex: "cost",
    key: "cost",
    width: 100,
  },
  {
    title: "Tasks",
    dataIndex: "tasks",
    key: "tasks",
    scopedSlots: { customRender: "details" },
  },
];

export default {
  name: "DepartmentReport",
  components: {},
  mounted() {
    this.fetchDepartment();
    this.fetchData(this.onDay);
  },
  data() {
    return {
      count: 0,
      reports: [],
      columns,
      onDay: moment(),
    };
  },
  computed: {
    spinning() {
      return this.$store.state.report.spinning;
    },
    department() {
      return this.$store.state.user.department;
    },
  },
  methods: {
    onDayChanged(day) {
      console.log("day changed", day);
      this.fetchData(day);
    },
    fetchDepartment() {
      if (!this.department) {
        this.$store.dispatch("user/info").finally(() => {
          console.log("user info done");
        });
      }
    },
    fetchData(day) {
      console.log("date", day);
      this.$store
        .dispatch("report/dmQuery", {
          from: this.dayString(day),
          to: this.nextDaystring(day),
        })
        .then((tasks) => {
          let nameBased = this.$_.groupBy(tasks, "staff_name");
          this.reports = Object.keys(nameBased).map((name) => {
            let tasks = nameBased[name];
            let department = tasks[0].department;
            let cost = 0;
            let content = [];
            let sn = 1;
            tasks.forEach((task) => {
              cost += task.task_cost;
              let tc = sn + ". <" + task.task_name + ">" + "[";
              sn++;
              if (task.project_name) {
                tc += task.project_name + ":";
              }
              if (task.product_name) {
                tc += task.product_name;
              }

              tc += "]" + task.task_detail;
              content.push(tc);
            });
            let key = this.count;
            this.count++;
            return { name, cost, tasks: content, department, key };
          });
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
    dayString(day) {
      return day.format("yyyy-MM-DD");
    },
    nextDaystring(day) {
      return moment(day).add(1, "day").format("yyyy-MM-DD");
    },
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