/* eslint-disable vue/no-unused-vars */
/* eslint-disable vue/no-unused-vars */
<!--
 * @Author: your name
 * @Date: 2021-09-26 15:34:38
 * @LastEditTime: 2021-10-13 14:51:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Report.vue
-->
<template>
  <div id="report" v-title data-title="工作日志-创建">
    <div class="report-frame">
      <a-row :gutter="16">
        <a-col :span="4">
          <a-date-picker :allowClear="false" v-model="onDay"
        /></a-col>
        <a-col :span="4">
          <a-input :default-value="author" addonBefore="Name" disabled />
        </a-col>
        <a-col :span="6">
          <a-input :default-value="department" addonBefore="Department" disabled />
        </a-col>
        <a-col :span="4" :offset="6">
          <a-button-group>
            <a-button @click="(e) => update(0)">
              {{ $t("report.button.save") }}
            </a-button>
            <a-button type="primary" @click="(e) => update(1)">
              {{ $t("report.button.submit") }}
            </a-button>
          </a-button-group>
        </a-col>
      </a-row>

      <a-table
        :columns="columns"
        :data-source="tasks"
        style="margin: 16px"
        :defaultExpandedRowKeys="[0]"
        :pagination="false"
      >
        <span slot="product-selector" slot-scope="selector, record">
          <a-select
            show-search
            option-filter-prop="children"
            :filter-option="filterOption"
            style="width: 150px"
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
            show-search
            option-filter-prop="children"
            :filter-option="filterOption"
            style="width: 150px"
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
        <template slot="details" slot-scope="text, record">
          <editable-area-cell
            :text="text"
            @change="onCellChange(record.key, 'details', $event)"
          />
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
      <a-button
        type="dashed"
        style="width: 40%; margin-top: 8px; margin-left: 30%;"
        @click="handleCreateTask"
      >
        <a-icon type="plus" /> Add Task
      </a-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EditableCell from "./components/EditableAreaCell.vue";
import EditableNumberCell from "./components/EditableNumberCell.vue";
import EditableAreaCell from "./components/EditableAreaCell.vue";
import moment from "moment";

const columns = [
  {
    title: "Project",
    dataIndex: "project",
    key: "project",
    scopedSlots: { customRender: "project-selector" },
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    scopedSlots: { customRender: "product-selector" },
  },
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
    title: "Details",
    dataIndex: "details",
    key: "details",
    scopedSlots: { customRender: "details" },
  },
  {
    title: "",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

let projects = [
  { number: "00000000", name: "未立项" },
  { number: "11223344", name: "中国人民银行" },
  { number: "22334455", name: "贵州农信银" },
  { number: "33445566", name: "贵州安元通" },
  { number: "44556677", name: "深圳农商行" },
  { number: "55667788", name: "河北银行" },
  { number: "66778899", name: "天威诚信信创" },
  { number: "77889900", name: "江苏智慧CA" },
  { number: "88990011", name: "福建凯特" },
  { number: "99001122", name: "奔凯" },
];

let productTable = {
  0: [{ number: "0", name: "自定义" }],
  11223344: [
    { number: "0", name: "自定义" },
    { number: "12345", name: "OTP" },
  ],
  22334455: [
    { number: "0", name: "自定义" },
    { number: "67890", name: "KEY线" },
  ],
};

export default {
  name: "Report",
  props: ['date'],
  components: {
    EditableCell,
    EditableNumberCell,
    EditableAreaCell,
  },
  beforeCreate() {
    this.$store
      .dispatch("report/query", {
        on_day: this.onDay,
        author: this.author,
      })
      .then((report) => {
        console.log("report queried", report);
        let tasks = report.tasks;
        this.tasks = tasks.map((task) => {
          console.log(
            "project index",
            this.projects.findIndex(
              (project) => task.project_id === project.number
            )
          );
          let selectedProject = this.projects.findIndex(
              (project) => task.project_id === project.number
            )
          const project = {
            selected: selectedProject < 0 ? 0 : selectedProject,
            options: this.projects,
          };
          console.log(
            "products for project",
            project,
            this.productTable[task.project_id]
          );
          console.log(
            "product index",
            this.productTable[task.project_id].findIndex(
              (product) => task.product_id === product.number
            )
          );
          let selectedProduct = this.productTable[task.project_id].findIndex(
              (product) => task.product_id === product.number
            )
          const product = {
            selected: selectedProduct < 0 ? 0 : selectedProduct,
            options: this.productTable[task.project_id],
          };
          let key = this.count
          this.count = key + 1
          return { ...task, project, product, key: key };
        });

        console.log("this.tasks", this.tasks);
      });
  },
  data() {
    return {
      count: 0,
      tasks: [],
      columns,
      onDay: this.date ? moment(this.date) : moment(),
      projects,
      productTable,
    };
  },
  computed: {
    department() {
      return this.$store.state.user.department ? this.$store.state.user.department : "研发X部"
    },
    author() {
      return this.$store.state.user.name ? this.$store.state.user.name:  "周煌";
    },
    dayString() {
      return this.onDay.format("yyyy-MM-DD")
    }
  },
  methods: {
    update(status) {
      console.log("submit report", this.tasks, this.dayString);
      this.$store.dispatch("report/update", {
        ...this.tasks,
        on_day: this.dayString,
        author: this.author,
        status,
      })
      .then(() => {
        this.$message.success("工作日志已" + (status == 0 ? "保存" : "提交"))
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
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  },
};
</script>

<style scoped>
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
</style>