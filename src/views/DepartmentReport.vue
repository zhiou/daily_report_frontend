<!--
 * @Author: your name
 * @Date: 2021-10-13 14:50:36
 * @LastEditTime: 2021-11-08 10:17:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/DepartmentReport.vue
-->
<template>
  <div id="report" v-title data-title="工作日志-创建">
    <div class="report-frame">
      <a-row :gutter="16">
        <a-col :span="4">
          <a-input
            :default-value="department"
            addonBefore="Department"
            disabled
          />
        </a-col>
        <a-col :span="4">
          <a-date-picker :allowClear="false" v-model="onDay"
        /></a-col>

        <a-col :span="16"> </a-col>
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
    title: "Tasks",
    dataIndex: "tasks",
    key: "tasks",
    scopedSlots: { customRender: "details" },
  },
];

export default {
  name: "DepartmentReport",
  components: {
    EditableCell,
    EditableNumberCell,
  },
  beforeCreate() {
    this.$store
      .dispatch("report/dmQuery", {
        from: moment(),
        to: moment(),
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
            let tc = "<" + task.task_name + ">" + "[";

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
      });
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
    department() {
      return this.$store.state.user.department;
    },
    dayString() {
      return this.onDay.format("yyyy-MM-DD");
    },
  },
  methods: {},
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