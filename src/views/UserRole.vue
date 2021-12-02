<template>
  <div id="user-role" v-title data-title="用户角色">
    <a-spin :spinning="spinning">
      <a-table
          :columns="columns"
          :data-source="userRoles"
          style="margin: 16px"
          :defaultExpandedRowKeys="[0]"
      >
        <template slot="check_box_pmo" slot-scope="check,record">
          <a-checkbox :checked="check" @change="e=>onCheck(e.target.checked, record.work_code, 'pmo')"></a-checkbox>
        </template>
        <template slot="check_box_dm" slot-scope="check,record">
          <a-checkbox :checked="check" @change="e=>onCheck(e.target.checked, record.work_code, 'dm')"></a-checkbox>
        </template>
        <template slot="check_box_pm" slot-scope="check,record">
          <a-checkbox :checked="check" @change="e=>onCheck(e.target.checked, record.work_code, 'pm')"></a-checkbox>
        </template>
      </a-table>
    </a-spin>
  </div>
</template>

<script>
import i18n from "@/i18n";

const columns = [
  {
    title: i18n.t("user_role.column.number"),
    dataIndex: "work_code",
    key: "work_code",
    scopedSlots: {customRender: "text"},
  },
  {
    title: i18n.t("user_role.column.name"),
    dataIndex: "name",
    key: "name",
    scopedSlots: {customRender: "text"},
  },
  {
    title: i18n.t("user_role.column.depart"),
    dataIndex: "department",
    key: "department",
    scopedSlots: {customRender: "text"},
  },
  {
    title: i18n.t("user_role.column.is_pmo"),
    dataIndex: "is_pmo",
    key: "is_pmo",
    scopedSlots: {customRender: "check_box_pmo"},
  },
  {
    title: i18n.t("user_role.column.is_dm"),
    dataIndex: "is_dm",
    key: "is_dm",
    scopedSlots: {customRender: "check_box_dm"},
  },
  {
    title: i18n.t("user_role.column.is_pm"),
    dataIndex: "is_pm",
    key: "is_pm",
    scopedSlots: {customRender: "check_box_pm"},
  },
];
export default {
  name: "UserRole",
  mounted() {
    this.fetchUsers()
  },
  data() {
    return {
      spinning: false,
      columns,
    }
  },
  computed: {
    userRoles() {
      return this.$store.state.user.all.map((user) => {
        let is_pmo, is_dm, is_pm = false
        if (user.roles) {
          is_pmo = user.roles.indexOf('pmo') > -1
          is_dm = user.roles.indexOf('dm') > -1
          is_pm = user.roles.indexOf('pm') > -1
        }
        return {...user, key: user.work_code, is_pmo, is_dm, is_pm}
      })
    },
  },
  methods: {
    fetchUsers() {
      this.spinning = true
      this.$store.dispatch('user/list')
          .catch((error) => {
            this.$message.error(error, 3);
          })
          .finally(() => {
            this.spinning = false
            console.log('users list refreshed')
          })
    },
    onCheck(check, work_code, role_name) {
      console.log('checkbox', check, work_code, role_name)
      let operation = check ? 'user/add_role' : 'user/del_role';
      this.$store.dispatch(operation, {
        work_code,
        role_name
      })
          .then(() => {
            this.fetchUsers()
          })
          .catch((e) => {
            this.$message.error(e, 3)
          })
    },
  }
}
</script>

<style scoped>

</style>