<!--
 * @Author: your name
 * @Date: 2021-10-13 16:14:42
 * @LastEditTime: 2021-11-08 10:16:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/ProjectReport.vue
-->

<template>
  <div id="PMOreport" v-title data-title="PMO日志">
    <div class="report-frame">
      <a-row type="flex" justify="start" :gutter="2" style= "margin:30px 20px">
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
          <a-select v-model="clearflag"
            show-search
            option-filter-prop="children"
            :filter-option="filterOption"
            style="width: 150px"
            @change="onProductorProjectorEmployerChanged(record.key, 'product', $event)"
          >
            <a-select-option v-for="item in multiItems" :key="item.number">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-col>
        <span>请选择查询时间：</span>
        <a-col :span="4">
           <a-range-picker v-model="resetdate" showTime format="YYYY/MM/DD" :placeholder="['开始时间', '结束时间']" @change="onChange"/>
        </a-col>
        <a-button :span="4" type="primary" @click="onQueryLog">
          查询
        </a-button>
        <a-button :span="4" type="primary" @click="onDownload">
          Download
        </a-button>
         </a-space>
        <a-col :span="24"> </a-col>
      </a-row>

      <a-table
        :columns="columns"
        :data-source="reports"
        style="margin: 16px"
        :defaultExpandedRowKeys="[0]"
        :pagination="false"
      >
        <template slot="name" slot-scope="text">
          <editable-cell
            :text="text"
          />
        </template>
        <template slot="cost" slot-scope="number">
          <editable-number-cell
            :number="number"
          />
        </template>
        <template slot="department" slot-scope="department">
          <editable-cell
            :text="department"
          />
        </template>
        <template slot="details" slot-scope="tasks">
          <editable-cell v-for="(task, index) in tasks" :key="index"
            :text= "task"
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
    width:120,
  },
  {
    title: "Cost",
    dataIndex: "cost",
    key: "cost",
    scopedSlots: { customRender: "cost" },
    width:100,
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    scopedSlots: { customRender: "department" },
    width:140,
  },
  {
    title: "Tasks",
    dataIndex: "tasks",
    key: "tasks",
    scopedSlots: { customRender: "details" },
  },
];

let queryitems = [
    {number: "0", name: "产品"},
    {number: "1", name: "项目"},
    {number: "2", name: "员工"},
];

let products = [
  { number: "01234", name: "自定义" },
  { number: "12345", name: "OTP" },
  { number: "67890", name: "KEY线" },
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

let employers = [
  { number: "ES001", name: "开心" },
  { number: "ES002", name: "莫莫" },
  { number: "ES003", name: "小小" },
  { number: "ES004", name: "乐乐" },
  { number: "ES005", name: "芒果" },
  { number: "ES006", name: "饺子" },
  { number: "ES007", name: "辣条" },
  { number: "ES008", name: "小奶皇" },
  { number: "ES009", name: "车厘子" },
  { number: "ES010", name: "小海绵" },
];

export default {
  name: "PMOReport",
  components: {
    EditableCell,
    EditableNumberCell,
  },
  data() {
    return {
      count: 0,
      reports: [],
      multiItems: [],
      columns,
      //onDay: moment(),
      //project: "11223344",
     // projectName: "",
     // dateFormat: 'YYYY/MM/DD',
     // monthFormat: 'YYYY/MM',
      queryitems,
      projects,
      products,
      employers,
      clearflag: "",
      resetdate: ['',''],
    };
  },
  computed: {
  },
  methods: {
    onQueryItemChanged(number){
      if(0 == number){
        this.multiItems = products;
      }
      else if(1 == number){
        this.multiItems = projects;
      }
      else{
        this.multiItems = employers;
      }
      this.clearflag = "";
      this.resetdate = ['',''];
    },
    onProductorProjectorEmployerChanged(key, dataIndex, number) {
      const tasks = [...this.tasks];
      const target = tasks.find((item) => item.key === key);
      if (target) {
        target[dataIndex] = number;
        this.tasks = tasks;
      }
    },
    onChange(dates, dateStrings) {
     // console.log('From: ', dates[0], ', to: ', dates[1]);
     // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    },
    onQueryLog() {
      this.$store
      .dispatch("report/pmoQuery", {
        type:"0",
        condition:"ES0092",
        from: "2021-10-26",
        to: "2021-10-27",
      }).then((tasks) => {
        this.projectName = tasks[0].project_name;

        let nameBased = this.$_.groupBy(tasks, 'staff_name')
 
        this.reports = Object.keys(nameBased).map(name => {
          let tasks = nameBased[name];
          let department = tasks[0].department
          let cost = 0;
          let content = [];
          let sn = 1;
          tasks.forEach((task) => {
            cost += task.task_cost;
            let tc = sn +". <" + task.task_name + ">";
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
        })
      }).catch((e)=>{
        console.log(e)
          this.$message.error(e);
      }) 
    },
    onDownload() {
      this.$store
      .dispatch("report/download", {
        type:"1",
        condition:"106",
        from: "2021-10-26",
        to: "2021-10-27",
      }).catch((e)=>{
        console.log(e)
          this.$message.error(e);
      })
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