<template>
  <div id="oauth">

  </div>
</template>

<script>
export default {
  name: "OAuth",
  mounted() {
    let code = this.$route.query.code
    let appid = this.$route.query.appid
    this.wwlogin({code, appid})
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    wwlogin(ctx) {
      this.loading = true;

      this.$store
          .dispatch("user/wwlogin", ctx)
          .then(() => {
            this.$message.success(this.$t("error.tips.login.success"), 3);
            this.$router.replace("/")
          })
          .catch((error) => {
            if (typeof error === 'string') {
              this.$message.error(error, 3)
            } else {
              this.$message.error(this.$t('error.tips.login.failed'), 3);
            }
            // this.$router.replace("/login")
          })
          .finally(() => {
            this.loading = false;
          });
    },
  },
};
</script>