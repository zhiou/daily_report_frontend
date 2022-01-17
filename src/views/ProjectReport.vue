<!--
 * @Author: your name
 * @Date: 2021-10-13 16:14:42
 * @LastEditTime: 2021-11-22 10:40:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/ProjectReport.vue
-->
<template>
  <div id="report" v-title data-title="项目日志">
    <div class="report-frame">
      <a-row :gutter="16">
        <a-col :span="4">
          <!-- <a-input :value="projectName" addonBefore="Project" disabled /> -->
          <a-select
            show-search
            placeholder="选择一个你负责的项目"
            option-filter-prop="children"
            style="width: 200px"
            :filter-option="filterOption"
            @change="handleChange"
          >
            <a-select-option v-for="project in projects" :key="project.number">
              {{ project.name }}
            </a-select-option>
          </a-select>
        </a-col>

        <a-col :span="20"> </a-col>
      </a-row>
      <a-spin :spinning="spinning">
        <a-table
          :columns="columns"
          :data-source="reports"
          style="margin: 16px"
          :defaultExpandedRowKeys="[0]"
          @change="onTableChange"
        >
          <template slot="details" slot-scope="tasks">
            <ul style="list-style-type: decimal;">
              <li v-for="(task, index) in tasks" :key="index">
                <b>{{ task.tc }}</b>
                <br />
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
import {conform} from "../utils/taskUtils";

const columns = [
  {
    title: i18n.t("report.column.user"),
    dataIndex: "group_name",
    key: "group_name",
    width: 120,
  },
  {
    title: i18n.t("report.column.cost"),
    dataIndex: "cost",
    key: "cost",
    width: 100,
  },
  {
    title: i18n.t("report.column.depart"),
    dataIndex: "department",
    key: "department",
    width: 140,
  },
  {
    title: i18n.t("report.column.detail"),
    dataIndex: "content",
    key: "content",
    scopedSlots: { customRender: "details" },
  },
];

export default {
  name: "ProjectReport",
  mounted() {
    this.fetchProjects();
  },
  data() {
    return {
      count: 0,
      reports: [],
      columns,
      onDay: moment(),
      projectNumber: null,
    };
  },
  computed: {
    spinning() {
      return this.$store.state.report.spinning;
    },
    projects() {
      return this.$store.state.user.projects;
    },
  },
  methods: {
    handleChange(projectNumber) {
      this.projectNumber = projectNumber
      this.fetchData();
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    fetchProjects() {
      if (this.projects.length == 0) {
        this.$store.dispatch("user/info").finally(() => {
          console.log("user info fechted");
        });
      }
    },
    onTableChange(pagination) {
      this.pagination = pagination
      this.fetchData()
    },
    fetchData() {
      this.$store
        .dispatch("report/pmQuery", {
          project_number: this.projectNumber
        })
        .then((tasks) => {
          this.reports = conform('staff_name', tasks)
        })
        .catch((error) => {
          this.$message.error(error, 3);
        });
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