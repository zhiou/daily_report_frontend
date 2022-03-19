<template>
  <div id="oauth">

  </div>
</template>

<script>
export default {
  name: "OAuth",
  mounted() {
    let code = this.$route.query.code
    let app_id = this.$route.query.appid
    this.auth({app_id, code})
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    auth(ctx) {
      this.loading = true;
      console.log('ctx', ctx)
      this.$store
          .dispatch("user/auth", ctx)
          .then(() => {
            this.$router.replace("/")
            this.$message.success(this.$t("error.tips.login.success"), 3)
          })
          .catch((error) => {
            this.$router.replace("/login")
            if (typeof error === 'string') {
              this.$message.error(error, 3)
            } else {
              this.$message.error(this.$t('error.tips.login.failed'), 3);
            }

          })
          .finally(() => {
            this.loading = false;
          });
    },
  },
};
</script>