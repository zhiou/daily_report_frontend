/* eslint-disable vue/no-unused-vars */
/* eslint-disable vue/no-unused-vars */
<!--
 * @Author: your name
 * @Date: 2021-09-26 15:34:38
 * @LastEditTime: 2021-09-28 18:08:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Report.vue
-->
<template>
  <div id="report" v-title data-title="工作日志-创建">
    <div class="report-frame">
      <h1>{{ "工作日志-" + department + "-" + author + "-" + onDay.format("yyyy-MM-DD") }}</h1>
      <a-row :gutter="16">
        <a-col :span="4">
          <a-date-picker :allowClear="false" v-model="onDay"
        /></a-col>
        <a-col :span="4">
          <a-input :value='author' addonBefore="Name" disabled/>
        </a-col>
        <a-col :span="6">
          <a-input :value='department' addonBefore="Department" disabled/>
        </a-col>
        <a-col :span="4" :offset="6">
          <a-button-group>
            <a-button @click="save">
              {{ $t("report.button.save") }}
            </a-button>
            <a-button type="primary" @click="submit">
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
      <a-button type="dashed" style="width: 40%; margin-top: 8px" @click="handleCreateTask">
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
  { number: "0", name: "未立项" },
  { number: "项目1编号", name: "项目1" },
  { number: "项目2编号", name: "项目2" },
];

let productTable = {
  0: [{ number: "0", name: "自定义" }],
  项目1编号: [
    { number: "0", name: "自定义" },
    { number: "产品1编号", name: "产品1" },
  ],
  项目2编号: [
    { number: "0", name: "自定义" },
    { number: "产品2编号", name: "产品2" },
  ],
};

export default {
  name: "Home",
  components: {
    EditableCell,
    EditableNumberCell,
    EditableAreaCell,
  },
  beforeCreate() {},
  data() {
    return {
      moment,
      count: 0,
      tasks: [],
      columns,
      onDay: moment(),
      projects,
      productTable,
      author: '周煌',
      department: '研发X部'
    };
  },
  methods: {
    submit() {
      console.log("submit report", this.tasks, this.onDay.format());
    },
    save() {},

    handleCreateTask() {
        let defaultProject = 0
        if (this.tasks.length > 0) {
            defaultProject = this.tasks[this.tasks.length-1].project.selected
        }
      let values = {
        name: "新任务",
        details: "任务详情",
        cost: 8,
        project: defaultProject,
        product: 0,
      };
      const { count, tasks } = this;
      const project = { selected: values.project, options: this.projects };
      const product = {
        selected: values.product,
        options: this.productTable[this.projects[values.project].number],
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

<style scoped>
.report-frame {
  position: absolute;
  width: 80%;
  height: 100%;
  left: 10%;
  right: 10%;
  background-color: white;
  padding: 30px;
  margin: auto;
  min-width: 700px;
  max-width: 1200px;
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