<!--
 * @Author: your name
 * @Date: 2021-06-24 14:42:06
 * @LastEditTime: 2021-10-13 10:59:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /soft-otp-admin/src/views/home/UserSettings.vue
-->
<template>
  <a-modal
    :title="$t('settings.password.title')"
    :visible="modalShow"
    :confirm-loading="confirmLoading"
    :okText="$t('button.modify')"
    :cancelText="$t('button.cancel')"
    destroyOnClose
    @ok="onSubmit"
    @cancel="onCancel"
  >
    <a-row>
      <a-col :span="1" />
      <a-col :span="22">
        <a-form :form="form">
          <a-form-item
            v-bind="formItemLayout"
            :label="$t('settings.password.label.origin')"
            has-feedback
          >
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: this.$t('settings.password.placeholder.origin'),
                    },
                    {
                      validator: validateToNextPassword,
                    },
                  ],
                },
              ]"
              type="password"
            />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            :label="$t('settings.password.label.newp')"
            has-feedback
          >
            <a-input
              v-decorator="[
                'new_password',
                {
                  rules: [
                    {
                      required: true,
                      message: this.$t('settings.password.placeholder.newp'),
                    },
                    {
                      validator: compareToOriPassword,
                    },
                  ],
                },
              ]"
              type="password"
            />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            :label="$t('settings.password.label.confirm')"
            has-feedback
          >
            <a-input
              v-decorator="[
                'confirm',
                {
                  rules: [
                    {
                      required: true,
                      message: this.$t('settings.password.placeholder.confirm'),
                    },
                    {
                      validator: compareToNewPassword,
                    },
                  ],
                },
              ]"
              type="password"
              @blur="handleConfirmBlur"
            />
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="1" />
    </a-row>
  </a-modal>
</template>

<script>
export default {
  name: "PasswordDialog",
  model: {
    prop: "visible",
    event: "change",
  },
  props: ["visible"],
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data: function () {
    return {
      confirmLoading: false,
      modalShow: this.visible,
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
    };
  },
  watch: {
    visible(val) {
      this.modalShow = val;
    },
    modalShow(val) {
      this.$emit("change", val);
    },
  },
  methods: {
    onSubmit(e) {
      this.confirmLoading = true;
      this.form.validateFields((err, values) => {
        console.log("password", values, e);
        this.$store
          .dispatch("account/update", {
            origin: values.password,
            newone: values.new_password,
          })
          .then(() => {
            this.modalShow = false;
            this.confirmLoading = false;
          })
          .catch((e) => {
            this.$message.error(e);
            this.confirmLoading = false;
          });
      });
    },
    onCancel(e) {
      console.log("Clicked cancel button", e);
      this.modalShow = false;
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToOriPassword(rule, value, callback) {
      const form = this.form;
      if (value && value === form.getFieldValue("password")) {
        callback(this.$t("settings.password.tips.diff"));
      } else {
        callback();
      }
    },
    compareToNewPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("new_password")) {
        callback(this.$t("settings.password.tips.same"));
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
  },
};
</script>
