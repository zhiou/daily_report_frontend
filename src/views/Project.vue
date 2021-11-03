<!--
 * @Author: your name
 * @Date: 2021-11-02 13:54:50
 * @LastEditTime: 2021-11-03 18:46:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Project.vue
-->
<template>
  <div id="project" v-title data-title="项目信息">
    <a-row :gutter="16">
      <a-col :span="2" :offset="22">
        <a-button :disabled="notChanged" type="primary" @click="onSave">
          {{ $t("project.button.save") }}
        </a-button>
      </a-col>
    </a-row>
    <a-table
      :columns="columns"
      :data-source="projects"
      style="margin: 16px"
      :defaultExpandedRowKeys="[0]"
      :pagination="false"
    >
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
      <template slot="state" slot-scope="tag, record">
        <editable-tag-cell
          :tag="tag"
          :options="projectState"
          @change="onCellChange(record.key, 'status', $event)"
        />
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button
          type="danger"
          shape="circle"
          icon="delete"
          v-if="projects.length"
          @click="() => onDelete(record.key)"
        />
      </template>
    </a-table>
    <a-button
      type="dashed"
      style="width: 40%; margin-top: 8px; margin-left: 30%"
      @click="() => (visible = true)"
    >
      <a-icon type="plus" /> Add Project
    </a-button>
    <project-modal-form
      ref="projectForm"
      :visible="visible"
      @create="onCreate"
      @cancel="() => (visible = false)"
    />
  </div>
</template>

<script>
import EditableCell from "./components/EditableCell.vue";
import EditableTagCell from "./components/EditableTagCell.vue";
import ProjectModalForm from "./components/ProjectModalForm.vue";

const projectState = ["激活", "结项", "暂停", "取消"];
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
  {
    title: "",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  name: "Project",
  components: {
    EditableCell,
    EditableTagCell,
    ProjectModalForm,
  },
  data: function () {
    return {
      visible: false,
      columns,
      projectState,
      origin: [],
      projects: [],
    };
  },
  beforeCreate() {
    this.$store.dispatch("project/list").then(()=>{
      this.refresh()
    });
  },
  computed: {
    notChanged() {
      console.log(
        "project changed?",
        this.projects,
        this.origin,
        this.$_.isEqual(this.projects, this.origin)
      );
      return this.$_.isEqual(this.projects, this.origin);
    },
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      console.log("on project changed", key, dataIndex, value);
      const projects = [...this.projects];
      const target = projects.find((item) => item.key === key);
      if (target && target[dataIndex] !== value) {
        console.log("on cell change", key, dataIndex, value);
        target[dataIndex] = value;
        console.log("target = ", target);
        this.projects = projects;
      }
    },
    onCreate() {
      const modalForm = this.$refs.projectForm.form;
      modalForm.validateFields((err, project) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", project);
        modalForm.resetFields();
        this.visible = false;
        this.$store
          .dispatch("project/create", project)
          .then(() => {
            this.refresh();
          });
      });
    },
    onDelete(key) {
      const projects = [...this.projects];
      this.projects = projects.filter((item) => item.key !== key);
    },
    onSave() {
      console.log("save projects");
      this.$store.dispatch("project/update", this.projects).finally(() => {
        this.refresh();
      });
    },
    refresh() {
      this.origin = this.$store.state.project.all.map((project) => {
        return { ...project, key: project.number };
      });
      this.projects = this.$store.state.project.all.map((project) => {
        return { ...project, key: project.number };
      });
      console.log("projects refreshed", this.projects);
    },
  },
};
</script>
