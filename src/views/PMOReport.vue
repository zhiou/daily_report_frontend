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
      <a-row type="flex" justify="start" :gutter="2">
        <a-space>
          <span>请选择查询项：</span>
          <a-col :span="4">
            <a-select
                show-search
                option-filter-prop="children"
                :filter-option="filterOption"
                style="width: 150px"
                v-model="selected"
                @change="onQueryTypeChanged()"
            >
              <a-select-option v-for="(item, index) in queryitems" :key="index">
                {{ item }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="8">
            <a-select
                v-model="clearflag"
                show-search
                @focus="onQueryTypeChanged"
                option-filter-prop="children"
                :filter-option="filterOption"
                style="width: 150px"
                @change="onQueryContentChanged($event)"
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

        <a-col :span="24"></a-col>
      </a-row>
      <a-spin :spinning="spinning">
        <a-table
            :columns="columns"
            :data-source="tasks"
            :rowKey="(record,index)=>{return index}"
            style="margin: 16px"
            :defaultExpandedRowKeys="[0]"
            :pagination="true"
        >
          <template slot="text" slot-scope="text">
            <span>
              {{ text || "其他" }}
            </span>
          </template>
        </a-table>
      </a-spin>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment'
import i18n from "../i18n";
const OTHER = '其他'

function unique2(arr, name) {
  var hash = [];
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      if (arr[i][name] === arr[j][name]) {
        j = ++i;
      }
    }
    if (null == arr[i][name]) {
      hash.push(OTHER);
    } else {
      hash.push(arr[i][name]);
    }

  }
  return hash;
}

function formfilter(arr) {
  var filtersList = [];
  for (let i = 0, taskslen = arr.length; i < taskslen; i++) {
    filtersList.push({text: arr[i], value: arr[i]});
  }
  return filtersList;
}

let queryitems = [
  '无', "产品", "项目", "员工", "部门"
];

function filter(match, target) {
  let t = target ?? OTHER
  console.log('filter', match, t, t.indexOf(match))
  return t.indexOf(match) > -1;
}

let columns = [
  {
    label: "产品线",
    prop: "product_line",
    title: i18n.t("report.column.line"),
    dataIndex: "product_line",
    key: "product_line",
    filters: [],
    width: 100,
    scopedSlots: {customRender: "text"},
    onFilter: (value, record) => {
      return filter(value, record.product_line)
    },
  },
  {
    label: "产品",
    prop: "product_display",
    title: i18n.t("report.column.prod"),
    dataIndex: "product_display",
    key: "product_display",
    filters: [],
    width: 150,
    scopedSlots: {customRender: "text"},
    onFilter: (value, record) => {
      return filter(value, record.product_display)
    },
  },
  {
    label: "部门",
    prop: "department",
    title: i18n.t("report.column.depart"),
    dataIndex: "department",
    key: "department",
    filters: [],
    width: 100,
    scopedSlots: {customRender: "text"},
    onFilter: (value, record) => filter(value, record.department),
  },
  {
    label: "员工姓名",
    prop: "staff_name",
    title: i18n.t("report.column.user"),
    dataIndex: "staff_name",
    key: "staff_name",
    filters: [],
    width: 90,
    onFilter: (value, record) => filter(value, record.staff_name),
  },
  {
    label: "工时",
    prop: "task_cost",
    title: i18n.t("report.column.cost"),
    dataIndex: "task_cost",
    key: "task_cost",
    width: 60,
  },
  {
    label: "项目",
    prop: "project_display",
    title: i18n.t("report.column.proj"),
    dataIndex: "project_display",
    key: "project_display",
    filters: [],
    width: 100,
    scopedSlots: {customRender: "text"},
    onFilter: (value, record) => {
      return filter(value, record.project_display)
    },
  },
  {
    label: "报告日期",
    prop: "report_date",
    title: i18n.t("report.column.oday"),
    dataIndex: "report_date",
    key: "report_date",
    width: 100,
    defaultSortOrder: "descend",
    sorter: (a, b) => {
      return a.report_date > b.report_date ? 1 : -1
    },
  },
  {
    label: "任务名",
    prop: "task_name",
    title: i18n.t("report.column.name"),
    dataIndex: "task_name",
    width: 100,
    key: "task_name",
  },
  {
    label: "任务详情",
    prop: "task_detail",
    title: i18n.t("report.column.detail"),
    dataIndex: "task_detail",
    key: "task_detail",
  },
  {
    label: "提交日期",
    prop: "commit_date",
    title: i18n.t("report.column.cday"),
    dataIndex: "commit_date",
    key: "commit_date",
    defaultSortOrder: "descend",
    sorter: (a, b) => {
      return a.commit_date > b.commit_date ? 1 : -1
    },
  },
];
const index2id = [null, 3, 2, 0, 1]
export default {
  name: "PMOReport",
  components: {},
  mounted() {
    if (0 === this.products.length) {
      this.$store
          .dispatch("product/list")
          .catch((error) => {
            this.$message.error(error, 3);
          });
    }
    if (0 === this.projects.length) {
      this.$store
          .dispatch("project/list")
          .catch((error) => {
            this.$message.error(error, 3);
          });
    }
    if (0 === this.employers.length) {
      this.$store
          .dispatch("user/list")
          .catch((error) => {
            this.$message.error(error, 3);
          });
    }
    if (0 === this.departments.length) {
      this.$store
      .dispatch("department/list")
      .catch((error) => {
        this.$message.error(error, 3)
      })
    }
  },
  data() {
    return {
      count: 0,
      queryitems,
      conditionid: null,
      clearflag: "",
      resetdate: [moment().startOf('week'), moment().endOf('week')],
      searching: false,
      downloading: false,
      tasks: [],
      columns,
      selected: null,
    };
  },
  computed: {
    fromtime() {
      return this.resetdate[0].format('yyyy-MM-DD')
    },
    totime() {
      return moment(this.resetdate[1]).add(1, 'day').format('yyyy-MM-DD')
    },
    spinning() {
      return this.$store.state.report.spinning;
    },
    products() {
      return this.$store.state.product.all
    },
    projects() {
      let nodes = []
      this.$store.state.project.all.forEach(project => {
        nodes.push(project)
        if (project.children && project.children.length > 0) {
          nodes = nodes.concat(project.children)
        }
      })
      return nodes;
    },
    employers() {
      return this.$store.state.user.all
    },
    departments() {
      return this.$store.state.department.all
    },
    typeid() {
      return this.selected ? index2id[this.selected] : null;
    },
    multiItems() {
      switch (this.selected) {
        case 1:
          return this.products
        case 2:
          return this.projects
        case 3:
          return this.employers
        case 4:
          return this.departments
      }
      return []
    },
    excelItems() {
      return this.tasks.map(task => {
        let nt = {...task}
        if (!nt.project_number) {
          nt.project_display = '其他'
        }
        if (!nt.product_number) {
          nt.product_display = '其他'
          nt.product_line = '其他'
        }
        return nt
      })
    }
  },
  methods: {
    onQueryTypeChanged() {
      this.clearflag = "";
    },
    onQueryContentChanged(number) {
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
            tasksTemp = unique2(tasks, 'product_display');
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
            data: this.excelItems,
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
  padding: 8px 8px;
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