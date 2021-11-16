<!--
 * @Author: your name
 * @Date: 2021-10-13 16:14:42
 * @LastEditTime: 2021-11-15 17:53:06
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
          :pagination="pagination"
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
    title: "Department",
    dataIndex: "department",
    key: "department",
    width: 140,
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
  mounted() {
    this.fetchProjects();
  },
  data() {
    return {
      count: 0,
      reports: [],
      columns,
      onDay: moment(),
      pagination: { current: 1, pageSize: 10 },
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
      this.fetchData(projectNumber);
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
    fetchData(projectNumber) {
      this.$store
        .dispatch("report/pmQuery", {
          project_number: projectNumber,
          page_index: this.pagination.current,
          page_size: this.pagination.pageSize,
        })
        .then((paged) => {
          let tasks = paged.records;

          let nameBased = this.$_.groupBy(tasks, "staff_name");

          this.reports = Object.keys(nameBased).map((name) => {
            let tasks = nameBased[name];
            let department = tasks[0].department;
            let cost = 0;
            let content = [];
            let sn = 1;
            tasks.forEach((task) => {
              cost += task.task_cost;
              let tc = sn + ". <" + task.task_name + ">";
              sn++;
              if (task.product_name) {
                tc += "[" + task.product_name + "]";
              }

              tc += task.task_detail;
              content.push(tc);
            });
            let key = this.count;
            this.count++;
            return { name, cost, tasks: content, department, key };
          });
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