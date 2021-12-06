<!--
 * @Author: your name
 * @Date: 2021-10-13 16:14:42
 * @LastEditTime: 2021-11-22 15:29:21
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
            :disabled="!tasks || tasks.length == 0"
            :loading="downloading"
            @click="onDownload"
          >
            {{ $t("button.export") }}
          </a-button>
        </a-space>

        <a-col :span="24"> </a-col>
      </a-row>
      <a-spin :spinning="spinning">
        <a-table
          :columns="columns"
          :data-source="tasks"
          style="margin: 16px"
          :defaultExpandedRowKeys="[0]"
          :pagination="false"
        >
        </a-table>
      </a-spin>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import i18n from "../i18n";

function unique2(arr, name) {
  var hash = [];
  var len = arr.length;
  for (var i = 0; i < len; i++) {
      for (var j = i + 1; j < len; j++) {
          if (arr[i][name] === arr[j][name]) {
              j = ++i;
          }
      }
      hash.push(arr[i][name]);
  }
  return hash;
}
function formfilter(arr) {
  var filtersList = [];
  for(let i= 0, taskslen = arr.length; i<taskslen; i++)
  {
    filtersList.push({text:arr[i], value:arr[i]});
  }
  return filtersList;
}

let queryitems = [
  { number: "0", name: "产品" },
  { number: "1", name: "项目" },
  { number: "2", name: "员工" },
];

let columns = [
  {
    label: "产品线",
    prop: "product_line",
    title: i18n.t("report.column.line"),
    dataIndex: "product_line",
    key: "product_line",
    filters: [],
    onFilter: (value, record) => record.product_line.indexOf(value) === 0,
  },
  {
    label: "产品",
    prop: "product_name",
    title: i18n.t("report.column.prod"),
    dataIndex: "product_name",
    key: "product_name",
    filters: [],
    onFilter: (value, record) => record.product_name.indexOf(value) === 0,    
  },
  {
    label: "部门",
    prop: "department",
    title: i18n.t("report.column.depart"),
    dataIndex: "department",
    key: "department",
    filters: [],
    onFilter: (value, record) => record.department.indexOf(value) === 0,
  },
  {
    label: "员工姓名",
    prop: "staff_name",
    title: i18n.t("report.column.user"),
    dataIndex: "staff_name",
    key: "staff_name",
    filters: [],
    onFilter: (value, record) => record.staff_name.indexOf(value) === 0,
  },
  {
    label: "工时",
    prop: "task_cost",
    title: i18n.t("report.column.cost"),
    dataIndex: "task_cost",
    key: "task_cost",
    width: 20,
  },
  {
    label: "项目",
    prop: "project_name",
    title: i18n.t("report.column.proj"),
    dataIndex: "project_name",
    key: "project_name",
    filters: [],
    onFilter: (value, record) => record.project_name.indexOf(value) === 0,
  },
  {
    label: "报告日期",
    prop: "report_date",
    title: i18n.t("report.column.oday"),
    dataIndex: "report_date",
    key: "report_date",
    defaultSortOrder: "descend",
    sorter: (a, b) => {return a.report_date>b.report_date?1:-1},
  },
  {
    label: "任务名",
    prop: "task_name",
    title: i18n.t("report.column.name"),
    dataIndex: "task_name",
    key: "task_name",
  },
  {
    label: "任务详情",
    prop: "task_detail",
    title: i18n.t("report.column.detail"),
    dataIndex: "task_detail",
    key: "task_detail",
    width: 200,
  },
  {
    label: "提交日期",
    prop: "commit_date",
    title: i18n.t("report.column.cday"),
    dataIndex: "commit_date",
    key: "commit_date",
    defaultSortOrder: "descend",
    sorter: (a, b) => {return a.commit_date>b.commit_date?1:-1},
  },
];

export default {
  name: "PMOReport",
  components: {},
  beforeCreate() {
    //todo, 这里需要加判断，如果数据已经存在，则不需要再去获取了
    this.$store.dispatch("product/list").catch((error) => {
      this.$message.error(error, 3);
    });
    this.$store.dispatch("project/list").catch((error) => {
      this.$message.error(error, 3);
    });
    this.$store.dispatch("user/list").catch((error) => {
      this.$message.error(error, 3);
    });
  },
  data() {
    return {
      count: 0,
      multiItems: [],
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
      columns,
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
      return this.$store.state.user.all.map((worker) => {
        return { ...worker, key: worker.work_code };
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
          this.tasks = tasks;
          let tasksTemp = unique2(tasks, 'product_line');
          this.columns[0].filters = formfilter(tasksTemp);
          tasksTemp = unique2(tasks, 'product_name');
          this.columns[1].filters = formfilter(tasksTemp);
          tasksTemp = unique2(tasks, 'department');
          this.columns[2].filters = formfilter(tasksTemp); 
          tasksTemp = unique2(tasks, 'staff_name');
          this.columns[3].filters = formfilter(tasksTemp);
          tasksTemp = unique2(tasks, 'project_name');
          this.columns[5].filters = formfilter(tasksTemp);
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
      this.$export
        .excel({
          columns: this.columns,
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