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
        <a-col :span="8">
          <a-space>
            <a-radio-group v-model="mode" @change="onModeChange">
              <a-radio value="week">
                周
              </a-radio>
              <a-radio value="day">
                日
              </a-radio>
            </a-radio-group>
            <a-date-picker
                v-if="mode==='day'"
                :allowClear="false"
                v-model="onDay"
                @change="onDayChanged"
            />
            <a-week-picker
                v-else
                :allow-clear="false"
                v-model="onDay"
                @change="onDayChanged"
            />
          </a-space>
        </a-col>

        <a-col :span="12"> </a-col>
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
            <ul style="list-style-type: decimal;">
              <li v-for="(task, index) in tasks" :key="index">
                <b>{{ task.tc }}</b>
                <br />
                <p style="text-indent: 0.5em;">{{ task.td }}</p>
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
import i18n from '../i18n'

const columns = [
  {
    title: i18n.t("report.column.user"),
    dataIndex: "name",
    key: "name",
    width: 120,
  },
  {
    title: i18n.t("report.column.cost"),
    dataIndex: "cost",
    key: "cost",
    width: 100,
  },
  {
    title: i18n.t("report.column.detail"),
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
      mode: 'day'
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
    onModeChange(e) {
      let mode = e.target.value
      let date = this.onDay
      let start, end
      console.log('mode changed', mode, date)
      if (mode === 'day') {
        start = date
        end = moment(date).add(1, "day")
      }
      else if (mode === 'week') {
        start = moment(date).startOf('week')
        end = moment(date).endOf('week')
      }
      this.fetchData(start, end);
    },
    onDayChanged(date) {
      console.log("day changed", date);
      let start, end
      if (this.mode === 'day') {
        start = date
        end = moment(date).add(1, "day")
      }
      else if (this.mode === 'week') {
        start = moment(date).startOf('week')
        end = moment(date).endOf('week')
      }
      this.fetchData(start, end);
    },
    fetchDepartment() {
      if (!this.department) {
        this.$store.dispatch("user/info").finally(() => {
          console.log("user info done");
        });
      }
    },
    fetchData(start, end) {
      this.$store
        .dispatch("report/dmQuery", {
          from: this.dayString(start),
          to: this.dayString(end),
        })
        .then((tasks) => {
          let nameBased = this.$_.groupBy(tasks, "staff_name");
          this.reports = Object.keys(nameBased).map((name) => {
            let tasks = nameBased[name];
            let department = tasks[0].department;
            let cost = 0;
            let content = [];
            tasks.forEach((task) => {
              cost += task.task_cost;
              let tc =  '<' + task.task_name + '>' + "[";

              if (task.project_name) {
                tc += task.project_name + ":";
              }
              if (task.product_name) {
                tc += task.product_name;
              }

              tc += "]" + "(" + task.task_cost + "h)"
              let td = task.task_detail
              content.push({tc, td});
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
  },
};
</script>

<style lang="css" scoped>
.report-frame {
  background-color: white;
  margin: 8px 8px;
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