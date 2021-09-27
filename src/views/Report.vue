/* eslint-disable vue/no-unused-vars */
/* eslint-disable vue/no-unused-vars */
<!--
 * @Author: your name
 * @Date: 2021-09-26 15:34:38
 * @LastEditTime: 2021-09-27 18:58:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Report.vue
-->
<template>
  <div id="report" v-title data-title="工作日志-周煌-2021.09-27">
    <div class="report-frame">
      <h1>{{ "工作日志-周煌-2021.09-27" }}</h1>
      <a-row>
        <a-col :span="6">
          <a-date-picker
            :allowClear="false"
            v-model="onDay"
        /></a-col>
        <a-col :span="2" :offset="14">
          <a-button @click="save">
            {{ $t("report.button.save") }}
          </a-button>
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="submit">
            {{ $t("report.button.submit") }}
          </a-button>
        </a-col>
      </a-row>

      <a-table :columns="columns" :data-source="tasks">
        <p slot="expandedRowRender" slot-scope="task" style="margin: 0">
          {{ task.details }}
        </p>
        <template slot="name" slot-scope="text, record">
          <editable-cell
            :text="text"
            @change="onCellChange(record.key, 'name', $event)"
          />
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            v-if="tasks.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)"
          >
            <a href="javascript:;">Delete</a>
          </a-popconfirm>
        </template>
      </a-table>

      <a-button type="dashed" style="width: 40%; margin-top:8px" @click="add">
        <a-icon type="plus" /> Add Task
      </a-button>

      <task-modal-form
        ref="collectionForm"
        :visible="visible"
        @cancel="hideTaskForm"
        @create="handleCreateTask"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TaskModalForm from "./components/TaskModalForm.vue";

import moment from "moment";

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Cost", dataIndex: "cost", key: "cost" },
  { title: "Project", dataIndex: "project", key: "project" },
  { title: "Product", dataIndex: "product", key: "product" },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  name: "Home",
  components: {
    TaskModalForm,
  },
  beforeCreate() {},
  data() {
    return {
      moment,
      visible: false,
      count: 0,
      tasks: [],
      columns,
      onDay: moment(),
    };
  },
  methods: {
    submit() {
      console.log("submit report", this.tasks, this.onDay.format());
    },
    save() {},
    prepare() {},
    showTaskForm() {
      this.visible = true;
    },
    hideTaskForm() {
      this.visible = false;
    },
    handleCreateTask() {
      const modalForm = this.$refs.collectionForm.form;
      modalForm.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        modalForm.resetFields();
        this.visible = false;
        const { count, tasks } = this;
        let newTask = { ...values, key: count };
        this.tasks = [...tasks, newTask];
        this.count = count + 1;
        console.log("tasks: ", this.tasks);
      });
    },
    add() {
      this.showTaskForm();
    },
    onCellChange(key, dataIndex, value) {
      const tasks = [...this.tasks];
      const target = tasks.find((item) => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.tasks = tasks;
      }
    },
    onDelete(key) {
      const tasks = [...this.tasks];
      this.tasks = tasks.filter((item) => item.key !== key);
    },
  },
};
</script>

<style scoped>
.report-frame {
  position: absolute;
  width: 70%;
  height: 100%;
  background-color: white;
  padding: 30px;
  margin: 30px;
  min-width: 700px;
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