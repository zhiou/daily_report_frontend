<!--
 * @Author: your name
 * @Date: 2021-10-13 16:14:42
 * @LastEditTime: 2021-10-14 10:26:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/ProjectReport.vue
-->
<template>
  <div id="report" v-title data-title="工作日志-创建">
    <div class="report-frame">
      <a-row :gutter="16">
        <a-col :span="4">
          <a-input :default-value="projectName" addonBefore="Project" disabled />
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
        <span slot="product-selector" slot-scope="selector, record">
          <a-select
            :default-value="selector.selected"
            @change="onProductChanged(record.key, 'product', $event)"
          >
            <a-select-option
              v-for="(value, index) in selector.options"
              :key="index"
            >
              {{ value.name }}
            </a-select-option>
          </a-select>
        </span>
        <span slot="project-selector" slot-scope="selector, record">
          <a-select
            :default-value="selector.selected"
            @change="onProjectChanged(record.key, 'project', $event)"
          >
            <a-select-option
              v-for="(value, index) in selector.options"
              :key="index"
            >
              {{ value.name }}
            </a-select-option>
          </a-select>
        </span>
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
        <template slot="operation" slot-scope="text, record">
          <a-button
            type="danger"
            shape="circle"
            icon="delete"
            v-if="tasks.length"
            @click="() => onDelete(record.key)"
          />
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

let projects = [
  { number: "0", name: "未立项" },
  { number: "11223344", name: "项目1" },
  { number: "22334455", name: "项目2" },
];

let productTable = {
  0: [{ number: "0", name: "自定义" }],
  11223344: [
    { number: "0", name: "自定义" },
    { number: "12345", name: "产品1" },
  ],
  22334455: [
    { number: "0", name: "自定义" },
    { number: "67890", name: "产品2" },
  ],
};

export default {
  name: "ProjectReport",
  components: {
    EditableCell,
    EditableNumberCell,
  },
  beforeCreate() {
    this.$store
      .dispatch("report/queryProject", {
        project: this.project,
      })
      .then((reports) => {
        console.log("report queried", reports);
        this.reports = reports["reports"].map((report) => {
          let name = report.author;
          let department = report.department
          let cost = 0;
          let content = [];
          report.tasks.forEach((task) => {
            cost += task.cost;
            let tc = "";

            if (task.product_id) {
              let product = this.productTable[task.project_id].find(
                (product) => task.product_id === product.number
              );
              if (product) {
                tc += "[" + product.name + "]";
              }
            }

            tc += task.details;
            content.push(tc);
          });
          let key = this.count;
          this.count++;
          return { name, cost, tasks: content, department, key };
        });

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
      projects,
      productTable,
    };
  },
  computed: {
    projectName() {
      let p = this.projects.find((project) => this.project === project.number)
      return p.name
    },
    department() {
      return this.$store.state.user.department
        ? this.$store.state.user.department
        : "研发X部";
    },
    author() {
      return this.$store.state.user.name ? this.$store.state.user.name : "周煌";
    },
    dayString() {
      return this.onDay.format("yyyy-MM-DD");
    },
  },
  methods: {
    update(status) {
      console.log("submit report", this.tasks, this.dayString);
      this.$store
        .dispatch("report/update", {
          ...this.tasks,
          on_day: this.dayString,
          author: this.author,
          status,
        })
        .then(() => {
          this.$message.success("工作日志已" + (status == 0 ? "保存" : "提交"));
        });
    },
    handleCreateTask() {
      let defaultProject = 0;
      if (this.tasks.length > 0) {
        console.log("tasks existed", this.tasks);
        defaultProject = this.tasks[this.tasks.length - 1].project.selected;
      }
      let values = {
        name: "新任务",
        details: "任务详情",
        cost: 8,
        project_id: defaultProject,
        product_id: 0,
      };
      const { count, tasks } = this;
      const project = { selected: values.project_id, options: this.projects };
      const product = {
        selected: values.product_id,
        options: this.productTable[this.projects[values.project_id].number],
      };
      let newTask = { ...values, key: count, project, product };
      this.tasks = [...tasks, newTask];
      this.count = count + 1;
      console.log("tasks: ", this.tasks);
    },
    onCellChange(key, dataIndex, value) {
      const tasks = [...this.tasks];
      const target = tasks.find((item) => item.key === key);
      if (target && target[dataIndex] !== value) {
        console.log("on cell change", key, dataIndex, value);
        target[dataIndex] = value;
        this.tasks = tasks;
      }
    },
    onDelete(key) {
      const tasks = [...this.tasks];
      this.tasks = tasks.filter((item) => item.key !== key);
    },
    onProjectChanged(key, dataIndex, index) {
      console.log("on project change", key, index);
      const tasks = [...this.tasks];
      const target = tasks.find((item) => item.key === key);
      if (target) {
        target[dataIndex].selected = index;
        target["product"].selected = 0;
        target["product"].options =
          this.productTable[target.project.options[index].number];
        this.tasks = tasks;
      }
    },
    onProductChanged(key, dataIndex, index) {
      console.log("on product change", key, index);
      const tasks = [...this.tasks];
      const target = tasks.find((item) => item.key === key);
      if (target) {
        target[dataIndex].selected = index;
        this.tasks = tasks;
      }
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