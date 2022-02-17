/* eslint-disable vue/no-unused-vars */
/* eslint-disable vue/no-unused-vars */
<!--
 * @Author: your name
 * @Date: 2021-09-26 15:34:38
 * @LastEditTime: 2021-12-03 17:37:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Report.vue
-->
<template>
  <div id="report" v-title data-title="工作日志-创建">
    <div class="report-frame">
      <a-row :gutter="16" style="margin: 8px">
        <a-col :span="18">
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
                @change="onDateChanged"
            />
            <a-week-picker
                v-else
                :allow-clear="false"
                v-model="onDay"
                @change="onDateChanged"
            />
            <a-input :value="author" addonBefore="Name" disabled/>
            <a-input
                :value="department"
                addonBefore="Department"
                disabled
            />
          </a-space>
        </a-col>
        <a-col :span="2" :offset="4">
          <a-button
              v-show="editable"
              :loading="saving" type="primary" @click="(e) => update(1)">
            {{ $t("report.button.submit") }}
          </a-button>
        </a-col>
      </a-row>
      <a-spin :spinning="spinning">
        <a-table
            :columns="columns"
            :data-source="datasource"
            style="margin: 16px"
            :defaultExpandedRowKeys="[0]"
            :pagination="false"
        >
          <template slot="task_name" slot-scope="text, record">
            <editable-cell
                :text="text"
                @change="onCellChange(record.key, 'task_name', $event)"
            />
          </template>
          <template slot="product-selector" slot-scope="number, record">
            <editable-selector-cell
                :default_value="number"
                :options="refreshProducts"
                v-if="editable"
                @change="onProductChanged(record.key, 'product_number', $event)"
            />
            <span v-else> {{ record.product_name }}</span>
          </template>
          <template slot="project-selector" slot-scope="number, record">
            <editable-cascader-cell
                :default_value="number"
                :options="refreshProjects"
                v-if="editable"
                @change="onProjectChanged(record.key, 'project_number', $event)"
            />
            <span v-else> {{ record.project_name }}</span>
          </template>

          <template slot="day" slot-scope="date">
            <span>
              <b>{{ week(date) }}</b>
              <br/>
              <i style="font-size: small">{{ date }}</i>
            </span>
          </template>
          <template slot="report" slot-scope="tasks">
            <ul style="list-style-type: decimal;">
              <li v-for="(task, index) in tasks" :key="index">
                <b>{{ task.tc }}</b>
                <br/>
                <p v-html="task.td" style="text-align:left;"></p>
              </li>
            </ul>
          </template>
          <template slot="text" slot-scope="text">
            <span>
              {{ text || "其他" }}
            </span>
          </template>
          <template slot="cost" slot-scope="number, record">
            <editable-number-cell
                :number="number"
                v-if="editable"
                @change="onCellChange(record.key, 'task_cost', $event)"
            />
            <span v-else> {{ number }}</span>
          </template>
          <template slot="details" slot-scope="text, record">
            <editable-area-cell
                :text="text"
                v-if="editable"
                @change="onCellChange(record.key, 'task_detail', $event)"
            />
            <span v-else> {{ text }}</span>
          </template>
          <template slot="operation" slot-scope="text, record">
            <a-space>
              <a-button
                  type="danger"
                  shape="circle"
                  icon="delete"
                  v-show="editable && tasks.length"
                  @click="() => onDelete(record.key)"
              />
              <a-button
                  shape="circle"
                  icon="copy"
                  v-show="editable && tasks.length"
                  @click="() => onCopy(record.key)"
              />
            </a-space>
          </template>
        </a-table>
        <div style="width: 40%; margin-left: 30%; padding: 8px;"
             v-if="copied.length > 0"
             v-show="editable && mode === 'day'">
          <a-button
              type="dashed"
              style="width: 50%;"
              @click="handlePasteTask"
          >
            <a-icon type="plus"/>
            {{ $t('task.button.paste') }}
            <a-badge :count="this.copied.length" style="margin-left:8px"></a-badge>
          </a-button>
          <a-button
              type="dashed"
              style="width: 50%;"
              @click="() => {this.copied = []}"
          >
            <a-icon type="delete"/>
            {{ $t('button.cancel') }}
          </a-button>
        </div>

        <a-button
            v-else
            v-show="editable && mode === 'day'"
            type="dashed"
            style="width: 40%; margin-top: 8px; margin-left: 30%"
            @click="handleCreateTask"
        >
          <a-icon type="plus"/>
          {{ $t('task.button.add') }}
        </a-button>
      </a-spin>
    </div>
    <task-modal-form
        ref="taskForm"
        :visible="visible"
        @create="onCreate"
        @cancel="() => (visible = false)"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import EditableCell from "./components/EditableAreaCell.vue";
import EditableNumberCell from "./components/EditableNumberCell.vue";
import EditableAreaCell from "./components/EditableAreaCell.vue";
import EditableSelectorCell from "./components/EditableSelectorCell";
import EditableCascaderCell from "@/views/components/EditableCascaderCell";
import TaskModalForm from "./components/TaskModalForm.vue";
import moment from "moment";
import i18n from "../i18n";
import {conform} from '../utils/taskUtils.js'
import {storeTaskNames} from '../utils/taskfilter.js'

const day_columns = [
  {
    title: i18n.t("report.column.line"),
    dataIndex: "product_line",
    key: "product_line",
    width: 200,
    scopedSlots: {customRender: "text"},
  },
  {
    title: i18n.t("report.column.proj"),
    dataIndex: "project_number",
    key: "project_number",
    // width: 300,
    scopedSlots: {customRender: "project-selector"},
  },
  {
    title: i18n.t("report.column.prod"),
    dataIndex: "product_number",
    key: "product_number",
    // width: 300,
    scopedSlots: {customRender: "product-selector"},
  },
  {
    title: i18n.t("report.column.name"),
    dataIndex: "task_name",
    key: "name",
    width: 200,
    scopedSlots: {customRender: "task_name"}
  },
  {
    title: i18n.t("report.column.cost"),
    dataIndex: "task_cost",
    key: "cost",
    width: 100,
    scopedSlots: {customRender: "cost"},
  },
  {
    title: i18n.t("report.column.detail"),
    dataIndex: "task_detail",
    key: "details",
    width: 300,
    scopedSlots: {customRender: "details"},
  },
  {
    title: "",
    dataIndex: "operation",
    scopedSlots: {customRender: "operation"},
  },
];

const weak_column = [
  {
    title: i18n.t("report.column.day"),
    dataIndex: "group_name",
    key: "group_name",
    scopedSlots: {customRender: "day"},
    width: 120,
  },
  {
    title: i18n.t("report.column.cost"),
    dataIndex: "cost",
    key: "cost",
    scopedSlots: {customRender: "text"},
    width: 100,
  },
  {
    title: i18n.t("report.column.detail"),
    dataIndex: "content",
    key: "content",
    scopedSlots: {customRender: "report"},
  },
];

export default {
  name: "Report",
  components: {
    EditableCell,
    EditableNumberCell,
    EditableAreaCell,
    EditableSelectorCell,
    EditableCascaderCell,
    TaskModalForm,
  },
  beforeCreate() {
    this.$store.dispatch("product/list").catch((error) => {
      this.$message.error(error, 3);
    });
    this.$store.dispatch("project/list").catch((error) => {
      this.$message.error(error, 3);
    });
  },
  mounted() {
    if (this.defaultMode) {
      this.mode = this.defaultMode
    }
    if (this.date) {
      this.onDay = this.date
    }

    this.fetchUserInfo()
    this.onModeChange(this.mode)
  },
  data() {
    return {
      count: 0,
      tasks: [],
      onDay: moment(),
      visible: false,
      saving: false,
      mode: 'day',
      copied: [],
    };
  },
  computed: {
    date() {
      return this.$route.params.date
    },
    defaultMode() {
      return this.$route.params.mode
    },
    columns() {
      return this.mode === 'day' ? day_columns : weak_column;
    },
    department() {
      return this.$store.state.user.department
    },
    author() {
      return this.$route.params.name || this.$store.state.user.name
    },
    editable() {
      return (this.author === this.$store.state.user.name) && (this.mode === 'day') && (this.$route.params.from !== 'department')
    },
    spinning() {
      return this.$store.state.report.spinning;
    },
    refreshProducts() {
      return this.$store.state.product.all
    },
    refreshProjects() {
      return this.$store.state.project.all
    },
    datasource() {
      return this.mode === 'day' ? this.tasks : this.reports
    },
    reports() {
      return conform('report_date', this.tasks)
    },
  },
  methods: {
    onModeChange(mode) {
      let date = this.onDay
      let start, end
      if (mode === 'day') {
        start = date
        end = moment(date).add(1, "day")
      } else if (mode === 'week') {
        start = moment(date).startOf('week')
        end = moment(date).endOf('week')
      }
      this.fetchData(start, end);
    },
    fetchUserInfo() {
      this.$store.dispatch("user/info").finally(() => {
        console.log("user info done");
      });
    },
    fetchData(start, end) {
      this.$store
          .dispatch("report/selfQuery", {
            from: start.format('yyyy-MM-DD'),
            to: end.format('yyyy-MM-DD'),
          })
          .then((tasks) => {
            this.tasks = tasks.map((task) => {
              let key = this.count;
              this.count = key + 1;
              return {...task, key: key};
            });
          })
          .catch((error) => {
            this.$message.error(error, 3);
          });
    },
    onDateChanged(date) {
      let start, end
      if (this.mode === 'day') {
        start = date
        end = moment(date).add(1, "day")
      } else if (this.mode === 'week') {
        start = moment(date).startOf('week')
        end = moment(date).endOf('week')
      }
      this.fetchData(start, end);
    },
    update(status) {
      this.saving = true
      this.$store
          .dispatch("report/update", {
            tasks: this.tasks,
            on_day: this.onDay.format("yyyy-MM-DD"),
            author: this.author,
            status,
          })
          .then(() => {
            this.$message.success("工作日志已" + (status === 0 ? "保存" : "提交"));
          })
          .catch((error) => {
            this.$message.error(error, 2);
          })
          .finally(() => {
            this.saving = false
          });
    },
    handleCreateTask() {
      this.visible = true;
    },
    handlePasteTask() {
      const tasks = this.tasks.concat(this.copied);
      let key = 0
      this.tasks = tasks.map((task) => {
        key += 1
        return {...task, key}
      })
      this.copied = []
    },
    onCellChange(key, dataIndex, value) {
      const tasks = [...this.tasks];
      const target = tasks.find((item) => item.key === key);
      if (target && target[dataIndex] !== value) {
        target[dataIndex] = value;
        this.tasks = tasks;
      }
    },
    onCreate() {
      const modalForm = this.$refs.taskForm.form;
      modalForm.validateFields((err, task) => {
        if (err) {
          return;
        }
        console.log('task', task)
        modalForm.resetFields();
        this.visible = false;
        const {count} = this;
        // 级联列表, 取最后一个元素
        let project_number = null
        if (task.project_number) {
          let rest
          [project_number, ...rest] = [...task.project_number].reverse();
        }
        let product_number = null
        if (task.product_number) {
          product_number = task.product_number
        }
        console.log('project_number', project_number, this.refreshProjects);
        console.log('product_number', product_number, this.refreshProducts);
        let prod = this.getProductFrom(product_number);
        let proj = this.getProjectFrom(project_number);
        console.log('proj', proj, 'prod', prod);
        let newTask = {
          ...task,
          key: count,
          product_line: prod ? prod.in_line : "其他",
          product_name: prod ? prod.name : "其他",
          project_name: (proj ? proj.name : "其他"),
          project_number
        };
        console.log('task', newTask)
        this.count = count + 1;
        this.tasks = [...this.tasks, newTask];
        this.update(0);
        //localStorage.clear();
        storeTaskNames(newTask);
      });
    },
    onDelete(key) {
      const tasks = [...this.tasks];
      this.tasks = tasks.filter((item) => item.key !== key);
    },
    onCopy(key) {
      const task = this.tasks.find((task) => task.key === key);
      this.copied.push({...task})
    },
    onProjectChanged(key, dataIndex, number) {
      const tasks = [...this.tasks];
      const target = tasks.find((item) => item.key === key);
      console.log("on project changed", dataIndex, number);
      if (target) {
        let proj = this.getProjectFrom(number);
        console.log("on project changed", proj);
        target[dataIndex] = number;
        target['project_name'] = proj.name
        this.tasks = tasks;
        console.log("tasks", this.tasks)
      }
    },
    onProductChanged(key, dataIndex, number) {
      const tasks = [...this.tasks];
      const target = tasks.find((item) => item.key === key);
      const prod = this.getProductFrom(number);
      if (target) {
        target[dataIndex] = number;
        target['product_line'] = prod ? (prod.in_line ?? '其他') : '其他'
        this.tasks = tasks;
      }
    },
    filterOption(input, option) {
      return (
          option.componentOptions.children[0].text
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
      );
    },
    getProductFrom(number) {
      if (!number) {
        return null;
      }
      return this.refreshProducts.find((prod) => prod.number === number);
    },
    getProjectFrom(number) {
      if (!number) {
        return null
      }
      for (let proj of this.refreshProjects) {
        if (proj.number === number) {
          return proj;
        } else if (proj.children && proj.children.length > 0) {
          for (let sp of proj.children) {
            if (sp.number === number) {
              return sp;
            }
          }
        }
      }
      return null;
  },
  week(date) {
    return moment(date).format('dddd')
  }
}
,
}
;
</script>

<style scoped>
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
</style>