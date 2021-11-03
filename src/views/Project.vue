<!--
 * @Author: your name
 * @Date: 2021-11-02 13:54:50
 * @LastEditTime: 2021-11-03 11:22:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Project.vue
-->
<template>
  <div id="project" v-title data-title="项目信息">
    <a-table :columns="columns" :data-source="datasource">
      <span slot="tags" slot-scope="status">
        <a-tag
          :color="
            status === 4
              ? 'gray'
              : status == 3
              ? 'volcano'
              : status == 2
              ? 'geekblue'
              : 'green'
          "
        >
          {{ status }}
        </a-tag>
      </span>
      <template slot="name" slot-scope="text, record">
        <editable-cell
          :text="text"
          @change="onCellChange(record.key, 'name', $event)"
        />
      </template>
      <template slot="manager_number" slot-scope="text, record">
        <editable-cell
          :text="text"
          @change="onCellChange(record.key, 'manager_number', $event)"
        />
      </template>
      <template slot="remark" slot-scope="text, record">
        <editable-cell
          :text="text"
          @change="onCellChange(record.key, 'remark', $event)"
        />
      </template>
      <span slot="state" slot-scope="tag, record">
          <a-select
            :default-value="tag"
            @change="onCellChange(record.key, 'status', $event)"
          >
            <a-select-option
              v-for="(value, index) in [0, 1, 2, 3]"
              :key="index"
            >
              {{ nameIt(value) }}
            </a-select-option>
          </a-select>
        </span>
    </a-table>
  </div>
</template>

<script>
import EditableCell from "./components/EditableAreaCell.vue";

const columns = [
  {
    dataIndex: "number",
    key: "number",
    title: "项目编号",
  },
  {
    dataIndex: "name",
    key: "name",
    title: "项目名",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "项目状态",
    key: "status",
    dataIndex: "status",
    scopedSlots: { customRender: "state" },
  },
  {
    title: "项目经理",
    key: "manager_number",
    dataIndex: "manager_number",
    scopedSlots: { customRender: "manager_number" },
  },
  {
    title: "备注",
    key: "remark",
    dataIndex: "remark",
    scopedSlots: { customRender: "remark" },
  },
];

export default {
  name: "Project",
  components: {
    EditableCell,
  },
  data: function () {
    return {
      columns,
    };
  },
  beforeCreate() {
    this.$store.dispatch("project/list");
  },
  computed: {
    datasource() {
      return this.$store.state.project.all.map((project) => {
        return { ...project, key: project.number };
      });
    },
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      console.log("on project changed", key, dataIndex, value);
      const projects = [...this.datasource];
      const target = projects.find((item) => item.key === key);
      if (target && target[dataIndex] !== value) {
        console.log("on cell change", key, dataIndex, value);
        target[dataIndex] = value;
        console.log("target = ", target)
        // this.tasks = tasks;
      }
    },
    nameIt(value) {
      const stateName = ['激活', '结项', '暂停', '取消']
      return stateName[value]
    }
  },
};
</script>
