<!--
 * @Author: your name
 * @Date: 2021-09-26 17:06:32
 * @LastEditTime: 2021-11-22 14:52:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/components/TaskForm.vue
-->
<template>
  <div id="project-modal-form">
    <a-modal
      :visible="visible"
      :title="$t('project.title')"
      :okText="$t('project.button.create')"
      :cancelText="$t('project.button.cancel')"
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
        <a-form-item :label="$t('project.form.number')">
          <a-input
            v-decorator="[
              'number',
              {
                rules: [
                  {
                    required: true,
                    message: $t('project.tips.number'),
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('project.form.name')">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: true,
                    message: $t('project.tips.name'),
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('project.form.manager')">
          <a-select
            style="width: 120px"
            v-decorator="[
              'manager_number',
              {
                rules: [
                  {
                    required: true,
                    message: $t('project.tips.manager'),
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
        <a-form-item :label="$t('project.form.status')">
          <a-select
           style="width: 120px"
            v-decorator="[
              'status',
              {
                rules: [
                  {
                    required: true,
                    message: $t('project.tips.status'),
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
        <a-form-item :label="$t('project.form.remark')">
          <a-input
            type="textarea"
            v-decorator="[
              'remark',
              {
                rules: [
                  {
                    required: false,
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
