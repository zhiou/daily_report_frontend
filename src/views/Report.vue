<!--
 * @Author: your name
 * @Date: 2021-09-26 15:34:38
 * @LastEditTime: 2021-09-27 17:26:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Report.vue
-->
<template>
  <div id="report" v-title data-title="工作日志-周煌-2021.09-27">
    <div class="report-frame">
      <h1>{{ "工作日志-周煌-2021.09-27" }}</h1>
      <a-form
        id="components-form-create-report"
        :form="form"
        class="report-form"
        @submit="submit"
      >
        <a-form-item>
          <a-date-picker
            style="float: left"
            v-decorator="[
              'on_day',
              { initialValue: moment() },
              {
                rules: [
                  {
                    required: true,
                    message: 'Please select the date of report!',
                  },
                ],
              },
            ]"
            @change="onDayChange"
          />
          <a-space style="float: right">
            <a-button html-type="submit">
              {{ $t("report.button.save") }}
            </a-button>
            <a-button type="primary" html-type="submit">
              {{ $t("report.button.submit") }}
            </a-button>
          </a-space>
        </a-form-item>
        <a-form-item
          v-for="k in form.getFieldValue('task_keys')"
          :key="k"
        >
          <a-space>
            <task-sketch v-model="tasks[k]" />
            <a-icon
              v-if="form.getFieldValue('task_keys').length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="form.getFieldValue('task_keys').length === 1"
              @click="() => remove(k)"
            />
          </a-space>
        </a-form-item>
        <a-form-item>
          <a-button type="dashed" style="width: 40%" @click="add">
            <a-icon type="plus" /> Add Task
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
  </div>
</template>

<script>
// @ is an alias to /src
import TaskModalForm from "./components/TaskModalForm.vue";
import TaskSketch from "./components/TaskSketch.vue";
import moment from "moment";

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
      moment,
      visible: false,
      tasks: [],
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("submit report", this.tasks, values.on_day.format());
      });
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

        this.tasks[id] = values;
        // can use data-binding to get
        const keys = form.getFieldValue("task_keys");
        console.log("keys", keys);
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
      console.log("select", date);
    },
  },
};
</script>

<style scoped>
.report-frame {
  position: absolute;
  width: 70%;
  height: 100%;
  background-color: white;
  padding: 30px;
  margin: 30px;
  min-width: 700px;
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
</style>