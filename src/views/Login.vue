<template>
  <div id="login" v-title :data-title="$t('login.title')">
    <div class="me-login-box me-login-box-radius">
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
          <!-- <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              },
            ]"
          >
            {{ $t("login.label.remember") }}
          </a-checkbox> -->
          <!-- <a class="login-form-forgot" href=""> Forgot password </a>
           -->
          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button"
            :loading="loading"
          >
            {{ $t("login.button.login") }}
          </a-button>
          <!-- Or -->
          <!-- <a href=""> register now! </a> -->
          <!-- <router-link to="/register">{{
            $t("login.link.register")
          }}</router-link> -->
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      loading: false,
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
                that.$router.push({ name: redirect_name });
              } else {
                that.$router.push("/");
              }
            })
            .catch((error) => {
              that.$message.error(error, 3);
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

.me-login-box {
  position: absolute;
  width: 300px;
  height: 260px;
  background-color: white;
  margin-top: 150px;
  margin-left: -180px;
  left: 50%;
  padding: 30px;
}

.me-login-box-radius {
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
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
