<!--
 * @Author: your name
 * @Date: 2021-10-13 14:50:36
 * @LastEditTime: 2021-11-15 17:24:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/DepartmentReport.vue
-->
<template>
  <div id="report" v-title data-title="部门日志">
    <div class="report-frame">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-select
              :default-value="defaultDepart"
              v-model="department"
              v-if="is_pmo"
              style="width: 150px"
              @change="onDepartChange($event)"
          >
            <a-select-option v-for="item in departments" :key="item.key">
              {{ item.name }}
            </a-select-option>
          </a-select>
          <a-input v-else v-model="department" addonBefore="Department" disabled/>
        </a-col>
        <a-col :span="8">
          <a-space>
            <a-radio-group v-model="mode" @change="e => onModeChange(e.target.value)">
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

        <a-col :span="12"></a-col>
      </a-row>
      <a-spin :spinning="spinning">
        <a-table
            :columns="columns"
            :data-source="reports"
            style="margin: 16px"
            :defaultExpandedRowKeys="[0]"
            :pagination="false"
        >
          <template slot="link" slot-scope="text, report">
            <a-button type="link" @click="(e) => onNameClicked(text, report)">{{ text }}</a-button>
          </template>
          <template slot="details" slot-scope="tasks">
            <ul style="list-style-type: disc;">
              <li v-for="(task, index) in tasks" :key="index">
                <b>{{ task.tc }}</b>
                <p v-html="task.td" style="text-align:left;"></p>
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
import moment from "moment";
import i18n from '../i18n'
import {conform} from '../utils/taskUtils'

const columns = [
  {
    title: i18n.t("report.column.user"),
    dataIndex: "group_name",
    key: "group_name",
    width: 90,
    scopedSlots: {customRender: "link"},
  },
  {
    title: i18n.t("report.column.cost"),
    dataIndex: "cost",
    key: "cost",
    width: 60,
  },
  {
    title: i18n.t("report.column.detail"),
    dataIndex: "content",
    key: "content",
    scopedSlots: {customRender: "details"},
  },
];

export default {
  name: "DepartmentReport",
  components: {},
  mounted() {
    this.fetchUserInfo()
    this.fetchDepartment();
    this.onModeChange(this.mode)
  },
  data() {
    return {
      count: 0,
      reports: [],
      columns,
      onDay: this.defaultDay(),
      mode: 'day',
      department: this.defaultDepart,
    };
  },
  computed: {
    spinning() {
      return this.$store.state.report.spinning;
    },
    departments() {
      return this.$store.state.department.all
    },
    is_pmo() {
      return this.$store.state.user.roles.includes("pmo")
    },
    defaultDepart() {
      console.log("self depart", this.$store.state.user.department)
      return this.$store.state.user.department
    }
  },
  methods: {
    isWorking() {
      return moment().isSameOrBefore(moment().hour(19).minute(0).second(0))
    },
    isMonday() {
      console.log('day', moment().day())
      return moment().day() === 1;
    },
    defaultDay() {
      let subDays = this.isMonday() ? 3 : 1;
      return this.isWorking() ? moment().subtract(subDays, 'days') : moment()
    },

    dateRangeByMode(mode, date) {
      let start, end
      if (mode === 'day') {
        start = moment(date)
        end = moment(date).add(1, "day")
      } else if (mode === 'week') {
        start = moment(date).startOf('week')
        end = moment(date).endOf('week')
      }
      return {start, end}
    },
    onDepartChange(department) {
      console.log('department', department)
      let {start, end} = this.dateRangeByMode(this.mode, this.onDay)
      this.fetchData(department, start, end)
    },
    onNameClicked(name, report) {
      console.log('report', report)
      this.$router.push({
        name: 'MemberReport', params: {
          name,
          work_code: report.work_code,
          mode: this.mode,
          date: this.onDay,
          from: 'department',
        }
      })
    },
    onModeChange(mode) {
      let date = this.onDay
      let {start, end} = this.dateRangeByMode(mode, date)
      this.fetchData(this.department, start, end);
    },
    onDayChanged(date) {
      let mode = this.mode
      let {start, end} = this.dateRangeByMode(mode, date)
      this.fetchData(this.department, start, end);
    },
    fetchUserInfo() {
      if (!this.defaultDepart || this.defaultDepart.length === 0) {
        this.$store.dispatch("user/info")
            .then(() => {
              this.department = this.defaultDepart
            })
            .finally(() => {
              console.log("user info done");
            });
      }
      else {
        this.department = this.defaultDepart
      }
    },
    fetchDepartment() {
      if (this.is_pmo && this.departments.length === 0) {
        this.$store
            .dispatch("department/list")
            .catch((error) => {
              this.$message.error(error, 3)
            })
      }
    },
    fetchData(department, start, end) {
      if (this.is_pmo && department && department.length > 0) {
        this.$store
            .dispatch("report/pmoQuery", {
              type: 1,
              condition: department,
              from: this.dayString(start),
              to: this.dayString(end),
            })
            .then((tasks) => {
              this.reports = conform('staff_name', tasks)
            })
            .catch((e) => {
              this.$message.error(e);
            });
      } else {
        this.$store
            .dispatch("report/dmQuery", {
              from: this.dayString(start),
              to: this.dayString(end),
            })
            .then((tasks) => {
              this.reports = conform('staff_name', tasks)
            })
            .catch((e) => {
              this.$message.error(e);
            });
      }
    },
    dayString(day) {
      return day.format("yyyy-MM-DD");
    },
    filterOption(input, option) {
      return (
          option.componentOptions.children[0].text
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
      );
    },
  },
};
</script>

<style lang="css" scoped>
.report-frame {
  background-color: white;
  margin: 8px 8px;
  padding: 8px 8px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
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