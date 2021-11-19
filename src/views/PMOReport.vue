<!--
 * @Author: your name
 * @Date: 2021-10-13 16:14:42
 * @LastEditTime: 2021-11-19 15:39:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/ProjectReport.vue
-->

<template>
  <div id="PMOreport" v-title data-title="PMO日志">
    <div class="report-frame">
      <a-row type="flex" justify="start" :gutter="2" style="margin: 30px 20px">
        <a-space>
          <span>请选择查询项：</span>
          <a-col :span="4">
            <a-select
              show-search
              option-filter-prop="children"
              :filter-option="filterOption"
              style="width: 150px"
              @change="onQueryItemChanged($event)"
            >
              <a-select-option v-for="item in queryitems" :key="item.number">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="4">
            <a-select
              v-model="clearflag"
              show-search
              option-filter-prop="children"
              :filter-option="filterOption"
              style="width: 150px"
              @change="onProductorProjectorEmployerChanged($event)"
            >
              <a-select-option v-for="item in multiItems" :key="item.key">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-col>
          <span>请选择查询时间：</span>
          <a-col :span="4">
            <a-range-picker
              v-model="resetdate"
              showTime
              format="YYYY-MM-DD"
              :placeholder="['开始时间', '结束时间']"
              @change="onChange"
            />
          </a-col>
          <a-button
            :span="4"
            type="primary"
            :loading="searching"
            @click="onQueryLog"
          >
            查询
          </a-button>
          <a-button
            :span="4"
            type="primary"
            :disabled="tasks.length == 0"
            :loading="downloading"
            @click="onDownload"
          >
            {{ $t('button.export') }}
          </a-button>
        </a-space>

        <a-col :span="24"> </a-col>
      </a-row>
      <a-spin :spinning="spinning">
        <a-table
          :columns="columns"
          :data-source="reports"
          style="margin: 16px"
          :defaultExpandedRowKeys="[0]"
          :pagination="false"
        >
          <template slot="name" slot-scope="text">
            <editable-cell :text="text" />
          </template>
          <template slot="cost" slot-scope="number">
            <editable-number-cell :number="number" />
          </template>
          <template slot="department" slot-scope="department">
            <editable-cell :text="department" />
          </template>
          <template slot="details" slot-scope="tasks">
            <editable-cell
              v-for="(task, index) in tasks"
              :key="index"
              :text="task"
            />
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
import i18n from "../i18n";

const columns = [
  {
    title: i18n.t("report.column.user"),
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "name" },
    width: 120,
  },
  {
    title: i18n.t("report.column.cost"),
    dataIndex: "cost",
    key: "cost",
    scopedSlots: { customRender: "cost" },
    width: 100,
  },
  {
    title: i18n.t("report.column.depart"),
    dataIndex: "department",
    key: "department",
    scopedSlots: { customRender: "department" },
    width: 140,
  },
  {
    title: i18n.t("report.column.tasks"),
    dataIndex: "tasks",
    key: "tasks",
    scopedSlots: { customRender: "details" },
  },
];

let queryitems = [
  { number: "0", name: "产品" },
  { number: "1", name: "项目" },
  { number: "2", name: "员工" },
];

let excel_columns = [
  {
    label: "产品线",
    prop: "product_line",
  },
  {
    label: "产品",
    prop: "product_name",
  },
  {
    label: "部门",
    prop: "department",
  },
  {
    label: "员工姓名",
    prop: "staff_name",
  },
  {
    label: "工时",
    prop: "task_cost",
  },
  {
    label: "项目",
    prop: "project_name",
  },
  {
    label: "报告日期",
    prop: "report_date",
  },
  {
    label: "任务名",
    prop: "task_name",
  },
  {
    label: "任务详情",
    prop: "task_detail",
  },
  {
    label: "提交日期",
    prop: "commit_date",
  },
];

export default {
  name: "PMOReport",
  components: {
    EditableCell,
    EditableNumberCell,
  },
  beforeCreate() {
    //todo, 这里需要加判断，如果数据已经存在，则不需要再去获取了
    this.$store
      .dispatch("product/list")
      .then(() => {
        this.$store
          .dispatch("project/list")
          .then(() => {
            this.$store
              .dispatch("user/employerlist")
              .then(() => {})
              .catch((error) => {
                this.$message.error(error, 3);
              });
          })
          .catch((error) => {
            this.$message.error(error, 3);
          });
      })
      .catch((error) => {
        this.$message.error(error, 3);
      });
  },
  /*
  mounted() {
    //TODO: 参数不对,要改
    this.$store
      .dispatch("report/pmoQuery", {
        type: 0,
        condition: "ES0092",
        from: "2021-10-26",//moment()
        to: "2021-10-26",//moment()
      })
      .then((tasks) => {
        this.projectName = tasks[0].project_name;

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
  },*/
  data() {
    return {
      count: 0,
      multiItems: [],
      columns,
      queryitems,
      typeid: 0,
      conditionid: "001",
      fromtime: "",
      totime: "",
      clearflag: "",
      resetdate: ["", ""],
      searching: false,
      downloading: false,
      tasks: [],
      excel_columns,
    };
  },
  computed: {
    spinning() {
      return this.$store.state.report.spinning;
    },
    refreshProducts() {
      return this.$store.state.product.all.map((product) => {
        return { ...product, key: product.number };
      });
    },
    refreshProjects() {
      return this.$store.state.project.all.map((project) => {
        return { ...project, key: project.number };
      });
    },
    refreshEmployers() {
      return this.$store.state.user.workerlist.map((worker) => {
        return { ...worker, key: worker.work_code };
      });
    },
    reports() {
      let nameBased = this.$_.groupBy(this.tasks, "staff_name");
      return Object.keys(nameBased).map((name) => {
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

          tc += task.task_detail || '';
          content.push(tc);
        });
        let key = this.count;
        this.count++;
        return { name, cost, tasks: content, department, key };
      });
    },
  },
  methods: {
    onQueryItemChanged(number) {
      if (0 == number) {
        this.multiItems = this.refreshProducts;
        this.typeid = 3;
      } else if (1 == number) {
        this.multiItems = this.refreshProjects;
        this.typeid = 2;
      } else {
        this.multiItems = this.refreshEmployers;
        this.typeid = 0;
      }
      this.clearflag = "";
      this.resetdate = ["", ""];
    },
    onProductorProjectorEmployerChanged(number) {
      this.conditionid = number;
    },
    onChange(dates, dateStrings) {
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      this.fromtime = dateStrings[0];
      this.totime = dateStrings[1];
    },
    onQueryLog() {
      this.searching = true;
      this.$store
        .dispatch("report/pmoQuery", {
          type: this.typeid,
          condition: this.conditionid,
          from: this.fromtime,
          to: this.totime,
        })
        .then((tasks) => {
          this.projectName = tasks[0].project_name;
          this.tasks = tasks;
        })
        .catch((e) => {
          console.log(e);
          this.$message.error(e);
        })
        .finally(() => {
          this.searching = false;
        });
    },
    onDownload() {
      this.downloading = true;
      this.$export.excel({
        columns: this.excel_columns,
        data: this.tasks,
      })
      .finally(() => {
        this.downloading = false;
      });
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