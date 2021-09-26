<!--
 * @Author: your name
 * @Date: 2021-09-26 15:34:38
 * @LastEditTime: 2021-09-26 18:53:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Report.vue
-->
<template>
  <div class="report">
    <a-form
      id="components-form-create-report"
      :form="form"
      class="report-form"
      @submit="submit"
    >
      <a-form-item>
        <a-date-picker @change="onDayChange" />
      </a-form-item>
      <a-form-item>
        <task-sketch
          v-for="(k, index) in form.getFieldValue('task_keys')"
          :key="k"
          v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
        />
        <a-icon
          v-if="form.getFieldValue('task_keys').length > 1"
          class="dynamic-delete-button"
          type="minus-circle-o"
          :disabled="form.getFieldValue('task_keys').length === 1"
          @click="() => remove(k)"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="dashed" style="width: 60%" @click="add">
          <a-icon type="plus" /> Add Task
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button">
          {{ $t("report.button.submit") }}
        </a-button>
      </a-form-item>
    </a-form>
    <task-modal-form
      ref="collectionForm"
      :visible="visible"
      @cancel="hideTaskForm"
      @create="handleCreateTask"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import TaskModalForm from "./components/TaskModalForm.vue";
import TaskSketch from "./components/TaskSketch.vue";

let id = 0;

export default {
  name: "Home",
  components: {
    TaskModalForm,
    TaskSketch,
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.form.getFieldDecorator("task_keys", {
      initialValue: [],
      preserve: true,
    });
  },
  data() {
    return {
      visible: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();
    },
    save(e) {
      e.preventDefault();
    },
    prepare() {},
    showTaskForm() {
      this.visible = true;
    },
    hideTaskForm() {
      this.visible = false;
    },
    handleCreateTask() {
      const modalForm = this.$refs.collectionForm.form;
      modalForm.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        modalForm.resetFields();
        this.visible = false;
        const { form } = this;
        // can use data-binding to get
        const keys = form.getFieldValue("task_keys");
        console.log("keys", keys)
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
          task_keys: nextKeys,
        });
      });
    },
    remove(k) {
      const { form } = this;
      // can use data-binding to get
      const keys = form.getFieldValue("task_keys");
      // We need at least one passenger
      if (keys.length === 1) {
        return;
      }

      // can use data-binding to set
      form.setFieldsValue({
        task_keys: keys.filter((key) => key !== k),
      });
    },

    add() {
      this.showTaskForm();
    },
    onDayChange(date) {
        console.log("select", date)
    }
  },
};
</script>