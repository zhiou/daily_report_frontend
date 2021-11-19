<!--
 * @Author: your name
 * @Date: 2021-09-26 17:06:32
 * @LastEditTime: 2021-11-19 12:25:57
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
              'task_name',
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
              'task_detail',
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
          <a-input-number
            :min="0.5"
            :max="12"
            v-decorator="[
              'task_cost',
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
              show-search
              option-filter-prop="children"
              :filter-option="filterOption"
              style="width: 150px"
              v-decorator="[
              'project_number',
              {
                rules: [
                  {
                    required: false,
                    message: 'Please select a relative project!',
                  },
                ],
              },
            ]"
            >
              <a-select-option
                v-for="project in projects"
                :key="project.number"
              >
                {{ project.name }}
              </a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="Product">
             <a-select
              show-search
              option-filter-prop="children"
              :filter-option="filterOption"
              style="width: 150px"
              v-decorator="[
              'product_number',
              {
                rules: [
                  {
                    required: false,
                    message: 'Please select a relative product!',
                  },
                ],
              },
            ]"
            >
              <a-select-option
                v-for="product in products"
                :key="product.number"
              >
                {{ product.name }}
              </a-select-option>
            </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

export default {
  name: "TaskModalForm",
  props: ["visible"],
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  components: {},
  data() {
    return {
      
    };
  },
  computed: {
    products() {
      return this.$store.state.product.all.map((product) => {
        return { ...product, key: product.number };
      });
    },
    projects() {
      return this.$store.state.project.all.map((project) => {
        return { ...project, key: project.number };
      });
    },
  },
  methods: {
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
