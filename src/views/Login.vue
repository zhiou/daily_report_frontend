<template>
  <div id="login" v-title data-title="OA登录">

    <div v-show="ww_login" id="ww_login" class="we-login-box we-login-box-radius"/>
    <div v-show="!ww_login" class="me-login-box me-login-box-radius">
      <img src="@/assets/logo.png" alt=""/>
      <h1>{{ $t("login.title") }}</h1>

      <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
              v-decorator="[
              'username',
              {
                rules: [
                  { required: true, message: this.$t('login.tips.username') },
                ],
              },
            ]"
              :placeholder="$t('login.placeholder.username')"
          >
            <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
              v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: this.$t('login.tips.password') },
                ],
              },
            ]"
              type="password"
              :placeholder="$t('login.placeholder.password')"
          >
            <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
              :loading="loading"
          >
            {{ $t("login.button.login") }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-button v-if="ww_login" class="switch_btn" type="link" @click="(e) => ww_login=false">账号密码登录<a-icon type="right" /> </a-button>
    <a-button v-else type="link" class="switch_btn" @click="(e) => ww_login = true"> 企业微信登录<a-icon type="right" /></a-button>
  </div>
</template>

<script>
import WwLogin from '@/static/wwLogin-1.2.5.js'
import {is_mobile} from "@/utils/helper";

export default {
  name: "Login",
  beforeCreate() {
    this.form = this.$form.createForm(this);

  },
  mounted() {
    console.log("WwLogin", WwLogin);
    this.login = new WwLogin({
      "id": "ww_login",
      "appid": "ww363977121f1c3158",
      "agentid": "1000032",
      "redirect_uri": encodeURIComponent("http://daily-report.excelsecu.com/#/oauth"),
      "state": "",
      "href": "",
      "lang": "zh",
    });
  },
  data() {
    return {
      loading: false,
      ww_login: true,
      login: WwLogin,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      let that = this;
      this.loading = true;
      this.form.validateFields((err, values) => {
        if (!err) {
          that.$store
              .dispatch("user/login", {
                account: values["username"],
                password: values["password"],
              })
              .then(() => {
                that.$message.success(this.$t("error.tips.login.success"), 3);
                let redirect_name = that.$route.query.redirect;
                if (redirect_name) {
                  that.$router.push({name: redirect_name});
                } else {
                  if (is_mobile()){
                    that.$router.push("/mobile");
                  } else {
                    that.$router.push("/");
                  }
                }
              })
              .catch((error) => {
                if (typeof error === 'string') {
                  that.$message.error(error, 3)
                } else {
                  that.$message.error(this.$t('error.tips.login.failed'), 3);
                }
              })
              .finally(() => {
                this.loading = false;
              });
        }
      });
    },
  },
};
</script>

<style scoped>
#login {
  min-width: 100%;
  min-height: 100%;
}

img {
  border: 0;
  margin-bottom: 16px;
}

.me-video-player {
  background-color: transparent;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  position: absolute;
  left: 0;
  z-index: 0;
  top: 0;
}

.switch_btn {
  position: absolute;
  width: 120px;
  height: 60px;
  margin-top: 100px;
  /*margin-left: -60px;*/
  left: 53%;
}

.we-login-box {
  position: absolute;
  width: 360px;
  height: 420px;
  background-color: #F0F2F5;
  margin-top: 150px;
  margin-left: -180px;
  left: 50%;
  padding: 30px;
}

.we-login-box-radius {
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.3);
}

.me-login-box {
  position: absolute;
  width: 360px;
  height: 320px;
  background-color: white;
  margin-top: 150px;
  margin-left: -180px;
  left: 50%;
  padding: 30px;
}

.me-login-box-radius {
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.3);
}

.me-login-box h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  vertical-align: middle;
}

.me-login-design {
  text-align: center;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
}

.me-login-design-color {
  color: #5fb878 !important;
}

.me-login-button {
  text-align: center;
}

.me-login-button button {
  width: 100%;
}
</style>
