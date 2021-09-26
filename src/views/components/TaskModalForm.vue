<!--
 * @Author: your name
 * @Date: 2021-09-26 17:06:32
 * @LastEditTime: 2021-09-26 18:49:27
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
          <a-dropdown v-decorator="['project']">
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              Select Project <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item v-for="project in projects" :key="project.number">{{
                project.name
              }}</a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-form-item>
        <a-form-item label="Product">
          <a-dropdown v-decorator="['product']">
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              Select Product <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item v-for="product in products" :key="product.number">{{
                product.name
              }}</a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
let projects = [
  { number: "0", name: "未立项" },
  { number: "项目1编号", name: "项目1" },
  { number: "项目2编号", name: "项目2" },
];

let products = [
  { number: "0", name: "自定义" },
  { number: "产品1编号", name: "产品1" },
  { number: "产品2编号", name: "产品2" },
];

export default {
  name: "TaskModalForm",
  props: ['visible'],
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  components: {},
  data() {
    return {
      projects,
      products,
    };
  },
};
</script>
