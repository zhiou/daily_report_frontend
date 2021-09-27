<!--
 * @Author: your name
 * @Date: 2021-09-26 17:06:32
 * @LastEditTime: 2021-09-27 10:04:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/components/TaskForm.vue
-->
<template>
  <div id="task-modal-form">
    <a-modal
      :visible="visible"
      title="Create a new task"
      okText="Create"
      @cancel="
        () => {
          $emit('cancel');
        }
      "
      @ok="
        () => {
          $emit('create');
        }
      "
    >
      <a-form layout="vertical" :form="form">
        <a-form-item label="Task Name">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: 'Please input the name of task!' },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="Details">
          <a-input
            type="textarea"
            v-decorator="[
              'details',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input the details of task!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="Cost">
          <a-input
            v-decorator="[
              'cost',
              {
                rules: [
                  { required: true, message: 'Please input the cost of task!' },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="Project">
          <a-select
            v-decorator="['project']"
            style="width: 120px"
            @change="onProjectSelected"
          >
            <a-select-option v-for="(project, index) in projects" :key="index">
              {{ project.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Product">
          <a-select
            style="width: 120px"
            v-decorator="['product']"
          >
            <a-select-option v-for="(product, index) in products" :key="index">
              {{ product.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
let projects = [
  { number: "0", name: "未立项" },
  {
    number: "项目1编号",
    name: "项目1",
  },
  {
    number: "项目2编号",
    name: "项目2",
  },
];

let productTable = {
  0: [{ number: "0", name: "自定义" }],
  项目1编号: [
    { number: "0", name: "自定义" },
    { number: "产品1编号", name: "产品1" },
  ],
  项目2编号: [
    { number: "0", name: "自定义" },
    { number: "产品2编号", name: "产品2" },
  ],
};

export default {
  name: "TaskModalForm",
  props: ["visible"],
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.form.getFieldDecorator("project", {
      initialValue: [0],
      preserve: true,
    });
    this.form.getFieldDecorator("product", {
      initialValue: [0],
      preserve: true,
    });
  },
  components: {},
  data() {
    return {
      projects,
      products:productTable[projects[0].number],
    };
  },
  methods: {
    onProjectSelected(index) {
      this.products = productTable[projects[index].number];
    },
  },
};
</script>
