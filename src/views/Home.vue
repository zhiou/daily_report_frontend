<!--
 * @Author: your name
 * @Date: 2021-09-22 17:30:02
 * @LastEditTime: 2021-09-26 18:42:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Home.vue
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <a-button @click="logout">Log out</a-button>
    <a-button @click="report">Create Report</a-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    logout() {
      this.$store
            .dispatch("user/logout")
            .catch((error) => {
              console.log("logout error", error)
              this.$message.error(error, 3);
            })
            .finally(() => {
              this.$router.push("login")
            });
    },
    report() {
      this.$router.push("/report")
    }
  }
}
</script>
