<!--
 * @Author: your name
 * @Date: 2021-09-26 17:06:32
 * @LastEditTime: 2021-11-22 15:31:05
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
        <a-form-item :label="$t('project.form.parent')">
          <a-select
              show-search
              ref="selector"
              option-filter-prop="children"
              :filter-option="filterOption"
              style="width:100%;"
              @change="onParent"
              v-decorator="[
              'parent_number',
              {
                rules: [
                  {
                    required: false,
                    message: $t('project.tips.parent'),
                  },
                ],
              },
            ]"
          >
            <a-select-option v-for="project in root_projects" :key="project.number">
              {{ project.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
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
        <a-space>
        <a-form-item :label="$t('project.form.manager')">
          <a-select
              show-search
              option-filter-prop="children"
              :filter-option="filterOption"
              style="width: 200px"
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
              style="width: 200px"
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
        </a-space>
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
  computed: {
    staffs() {
      return this.$store.state.user.all
    },
    root_projects() {
      return this.$store.state.project.all
          .filter(project => project.parent == null)
    },
  },
  components: {},
  data() {
    return {
      options,
    };
  },
  methods: {
    onParent(number) {

      let parent = this.root_projects.find(proj => proj.number === number)
      console.log('parent selected', parent)
      this.form.setFieldsValue({
        number: parent.number,
        manager_number: parent.manager_number,
        status: parent.status
      })
    },
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
