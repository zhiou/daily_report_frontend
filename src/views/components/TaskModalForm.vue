<!--
 * @Author: your name
 * @Date: 2021-09-26 17:06:32
 * @LastEditTime: 2021-11-19 15:09:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/components/TaskForm.vue
-->
<template>
  <div id="task-modal-form">
    <a-modal
        :visible="visible"
        :title="$t('task.title.create')"
        :okText="$t('task.button.create')"
        :cancelText="$t('task.button.cancel')"
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
        <a-space>
          <a-form-item :label="$t('task.label.name')">
            <a-auto-complete 
            :data-source="this.tasksnames"
            :filter-option="filterOption"
            @focus="refreshtasksname"
            style="width: 350px"
                v-decorator="[
              'task_name',
              {
                rules: [
                  { required: true, message: $t('task.tips.name') },
                ],
              },
            ]"
            />
          </a-form-item>
          <a-form-item :label="$t('task.label.cost')">
            <a-input-number
                :min="0.5"
                :max="12"
                v-decorator="[
              'task_cost',
              {
                rules: [
                  { required: true, message: $t('task.tips.cost') },
                ],
              },
            ]"
            />
          </a-form-item>
        </a-space>

        <a-form-item :label="$t('task.label.detail')">
          <a-input
              style="width: 450px"
              type="textarea"
              v-decorator="[
              'task_detail',
              {
                rules: [
                  {
                    required: true,
                    message: $t('task.tips.detail'),
                  },
                ],
              },
            ]"
          />
        </a-form-item>

        <a-space>
          <a-form-item :label="$t('task.label.proj')">
            <a-select
                show-search
                option-filter-prop="children"
                :filter-option="filterOption"
                style="width: 220px"
                v-decorator="[
              'project_number',
              {
                rules: [
                  {
                    required: false,
                    message: $t('task.tips.proj'),
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
          <a-form-item :label="$t('task.label.prod')">
            <a-select
                show-search
                option-filter-prop="children"
                :filter-option="filterOption"
                style="width: 220px"
                v-decorator="[
              'product_number',
              {
                rules: [
                  {
                    required: false,
                    message: $t('task.tips.prod'),
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
        </a-space>

      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { reverseTaskNames } from '../../utils/taskfilter.js'

export default {
  name: "TaskModalForm",
  props: ["visible"],
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  components: {},
  mounted() {
    this.tasksnames = reverseTaskNames();
    console.log("ddd")
    console.log(this.tasksnames)
  },
  data() {
    return {
      tasksnames: []
    };
    
  },
  computed: {
    products() {
      return this.$store.state.product.all.map((product) => {
        return {...product, key: product.number};
      });
    },
    projects() {
      return this.$store.state.project.all.map((project) => {
        return {...project, key: project.number};
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
    refreshtasksname()
    {
      this.tasksnames = reverseTaskNames();
    }
  },
};
</script>
