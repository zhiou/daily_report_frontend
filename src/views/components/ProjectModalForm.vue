<!--
 * @Author: your name
 * @Date: 2021-09-26 17:06:32
 * @LastEditTime: 2021-11-03 18:41:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/components/TaskForm.vue
-->
<template>
  <div id="project-modal-form">
    <a-modal
      :visible="visible"
      title="Create a new Project"
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
        <a-form-item label="Project Number">
          <a-input
            v-decorator="[
              'number',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input the number of project!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="Project Name">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input the name of project!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="Project Manager">
          <a-select
            style="width: 120px"
            v-decorator="[
              'manager_number',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please select manager of project!',
                  },
                ],
              },
            ]"
          >
            <a-select-option v-for="staff in staffs" :key="staff.number">
              {{ staff.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Status">
          <a-select
           style="width: 120px"
            v-decorator="[
              'status',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please select status of project!',
                  },
                ],
              },
            ]"
          >
            <a-select-option v-for="(option, index) in options" :key="index">
              {{ option }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Remark">
          <a-input
            type="textarea"
            v-decorator="[
              'remark',
              {
                rules: [
                  {
                    required: false,
                    message: 'Please input the remark of task!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
let staffs = [{ name: "周煌", number: "ES0092" },
{ name: "刘纳", number: "ES0150" },
{ name: "刘淼淼", number: "ES0256" },
];
const options = ["激活", "结项", "暂停", "取消"];
export default {
  name: "ProjectModalForm",
  props: ["visible"],
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.form.getFieldDecorator("manager", {
      initialValue: [0],
      preserve: true,
    });
  },
  components: {},
  data() {
    return {
      staffs,
      options,
    };
  },
};
</script>
