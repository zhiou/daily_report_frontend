<!--
 * @Author: your name
 * @Date: 2021-11-02 13:54:50
 * @LastEditTime: 2021-11-02 17:12:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Project.vue
-->
<template>
  <div id="project" v-title data-title="项目信息">
    <a-table :columns="columns" :data-source="datasource">
      <span slot="tags" slot-scope="status">
        <a-tag :color="
            status === 4 ? 'gray' : status == 3 ? 'volcano' : status == 2 ? 'geekblue' : 'green'
          "
        >
          {{ status }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a>Invite 一 {{ record.name }}</a>
        <a-divider type="vertical" />
        <a>Delete</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
      </span>
    </a-table>
  </div>
</template>

<script>

const columns = [
  {
    dataIndex: 'number',
    key: 'number',
    title: '项目编号',
  },
  {
    dataIndex: 'name',
    key: 'name',
    title: '项目名',
  },
  {
    title: '项目状态',
    key: 'status',
    dataIndex: 'status',
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: '项目经理',
    key: 'manager_number',
    dataIndex: 'manager_number',
  },
];

export default {
  name: "Project",
  data: function () {
      return {
          columns,
      }
  },
  beforeCreate() {
    this.$store.dispatch("project/list");
  },
  computed: {
    datasource() {
      return this.$store.state.project.all.map(project => { return {...project, key:project.number}});
    },
  },
};
</script>
