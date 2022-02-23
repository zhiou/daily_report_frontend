<!--
 * @Author: your name
 * @Date: 2021-11-02 13:54:50
 * @LastEditTime: 2021-11-22 17:15:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Project.vue
-->
<template>
  <div id="project" v-title data-title="项目信息">

        <a-button type="primary" style="margin-left: 16px" @click="() => visible = true">
          <a-icon type="plus" /> {{ $t("project.button.add") }}
        </a-button>

    <a-spin :spinning="spinning">
      <a-table
        :columns="columns"
        :data-source="projects"
        style="margin: 16px"
        :defaultExpandedRowKeys="[0]"
        :pagination="{ pageSize: 7 }"
      >
        <template slot="name" slot-scope="text, record">
          <editable-cell
            :text="text"
            @change="onCellChange(record.key, 'name', $event)"
          />
        </template>
        <template slot="manager_number" slot-scope="number, record">
          <editable-selector-cell
            :default_value="number"
            :options="employers"
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
          <a-popconfirm  v-show="projects.length"
                         title="确认删除?"
                         okText="确定"
                         cancelText="取消"
                         @confirm="() => onDelete(record.key, record)">
          <a-button
            type="danger"
            shape="circle"
            icon="delete"
          />
          </a-popconfirm>
        </template>
      </a-table>
<!--      <a-button-->
<!--        type="dashed"-->
<!--        style="width: 40%; margin-top: 8px; margin-left: 30%"-->
<!--        @click="() => (visible = true)"-->
<!--      >-->
<!--        <a-icon type="plus" /> {{ $t("project.button.add") }}-->
<!--      </a-button>-->
    </a-spin>

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
import EditableSelectorCell from "./components/EditableSelectorCell.vue";

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
    EditableSelectorCell,
  },
  data: function () {
    return {
      visible: false,
      columns,
      projectState,
    };
  },
  beforeCreate() {
    this.$store.dispatch("user/list").catch((error) => {
      this.$message.error(error, 3);
    });
  },
  mounted() {
    this.$store
      .dispatch("project/list")
      .catch((error) => {
        this.$message.error(error, 3);
      });
  },
  computed: {
    spinning() {
      return this.$store.state.project.spinning;
    },
    employers() {
      return this.$store.state.user.all
    },
    projects() {
       return this.$store.state.project.all
    }
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      const projects = [...this.projects];
      const target = projects.find((item) => item.key === key);
      if (target && target[dataIndex] !== value) {
        target[dataIndex] = value;
        if (dataIndex === 'manager_number') {
          target['manager_name'] = this.employers.find((staff) => staff.number === value).name
        }
        this.$store.dispatch("project/update", target).catch((e) => {
          console.error(e);
          this.$message.error(e);
        });
      }
    },
    onCreate() {
      const modalForm = this.$refs.projectForm.form;
      modalForm.validateFields((err, project) => {
        if (err) {
          return;
        }
        let conflict = this.projects.find(proj => proj.number === project.number)
        if (conflict != null && conflict.number !== project.parent_number) {
          modalForm.setFields({"number":{value:"", errors:[{"message": "编号已存在", "field":"number"}]}})
          return
        }
        modalForm.resetFields();
        this.visible = false;

        const manager_name = this.employers.find((staff) => {
          return staff.number === project.manager_number;
        }).name;
        this.$store
          .dispatch("project/create", { ...project, manager_name })
          .catch((e) => {
            console.error(e);
            this.$message.error(e);
          });
      });
    },
    onDelete(key, record) {
      console.log('on delete', key, record)
      this.$store
        .dispatch("project/remove", { numbers: [key] })
          .then(() => {
            this.$store.dispatch("project/list")
            .catch((e) => {
              console.log(e);
            })
          })
        .catch((e) => {
          console.log(e);
        });
    },
    onSave() {
      this.$store.dispatch("project/update", this.projects).finally(() => {
        this.refreshOrigin();
      });
    },
  },
};
</script>
