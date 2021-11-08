<!--
 * @Author: your name
 * @Date: 2021-06-24 14:42:06
 * @LastEditTime: 2021-11-08 10:19:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /soft-otp-admin/src/views/home/UserSettings.vue
-->
<template>
  <a-modal
    :title="$t('settings.info.title')"
    :visible="modalShow"
    :confirm-loading="confirmLoading"
    :okText="$t('button.commit')"
    :cancelText="$t('button.cancel')"
    @ok="onUserSettingChanged"
    @cancel="onUserInfoModalCancel"
  >
    <a-row>
      <a-col :span="2" />
      <a-col :span="4">
        <a-avatar :size="64" icon="user" :src="avatar" />
      </a-col>
      <a-col :span="16">
        <a-space size="large" direction="vertical" style="width: 100%">
          <a-input
            ref="userNameInput"
            v-model="name"
            :placeholder="$t('settings.info.placeholder.name')"
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
          <a-input
            ref="mobileInput"
            v-model="mobile"
            :placeholder="$t('settings.info.placeholder.mobile')"
          >
            <a-icon slot="prefix" type="mobile" />
          </a-input>
          <a-input
            ref="userNameInput"
            v-model="mail"
            :placeholder="$t('settings.info.placeholder.mail')"
          >
            <a-icon slot="prefix" type="mail" />
          </a-input>
          <a-textarea
            :placeholder="$t('settings.info.placeholder.desc')"
            auto-size
            v-model="intro"
          />
        </a-space>
      </a-col>
      <a-col :span="2" />
    </a-row>
  </a-modal>
</template>

<script>
export default {
  name: "UserSettings",
  model: {
    prop: "visible",
    event: "change",
  },
  props: ["visible"],
  data: function () {
    return {
      confirmLoading: false,
      modalShow: this.visible,
      name: "",
      mobile: "",
      mail: "",
      avatar: "",
      intro: "",
      state: "",
    };
  },
  watch: {
    visible(val) {
      this.modalShow = val;
    },
    modalShow(val) {
      this.$emit("change", val);
    },
    userInfo(val) {
      this.name = val.name;
      this.mobile = val.mobile;
      this.mail = val.mail;
      this.avatar = val.avatar;
      this.intro = val.intro;
      this.state = val.state;
    },
  },
  methods: {
    onUserSettingChanged(e) {
      this.confirmLoading = true;
      this.$store
        .dispatch("users/update", {
          name: this.name,
          mobile: this.mobile,
          mail: this.mail,
          desc: this.intro,
          state: this.state,
        })
        .then(() => {
          this.modalShow = false;
          this.confirmLoading = false;
        })
        .catch((e) => {
          this.$message.error(e);
          this.confirmLoading = false;
        });
    },
    onUserInfoModalCancel(e) {
      this.modalShow = false;
    },
  },
};
</script>
