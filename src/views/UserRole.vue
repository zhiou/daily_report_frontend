<template>
  <div id="user-role" v-title data-title="用户角色">
    <a-row :gutter="16">
      <a-col :offset="22" :span="2">
        <a-button :loading="loading" type="primary" :disabled="nochanges" @click="onConfirm">{{
            $t('button.save')
          }}
        </a-button>
      </a-col>
    </a-row>

    <a-spin :spinning="spinning">
      <a-table
          :columns="columns"
          :data-source="userRoles"
          style="margin: 16px"
          :pagination="{ pageSize: 9 }"
      >
        <template slot="check_box_pmo" slot-scope="flag, record">
          <a-checkbox
              :checked="(flag & 0x4) !== 0"
              @change="(e) => onCheck(e.target.checked, record.work_code, 'pmo')"
          ></a-checkbox>
        </template>
        <template slot="check_box_dm" slot-scope="flag, record">
          <a-checkbox
              :checked="(flag & 0x2) !== 0"
              @change="(e) => onCheck(e.target.checked, record.work_code, 'dm')"
          ></a-checkbox>
        </template>
        <template slot="check_box_pm" slot-scope="flag, record">
          <a-checkbox
              :checked="(flag & 0x1) !== 0"
              @change="(e) => onCheck(e.target.checked, record.work_code, 'pm')"
          ></a-checkbox>
        </template>
        <template slot="check_box_cm" slot-scope="flag, record">
          <a-checkbox
              :checked="(flag & 0x8) !== 0"
              @change="(e) => onCheck(e.target.checked, record.work_code, 'cm')"
          ></a-checkbox>
        </template>
        <div
            slot="filterDropdown"
            slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
            style="padding: 8px"
        >
          <a-input
              v-ant-ref="c => (searchInput = c)"
              :placeholder="`Search ${column.dataIndex}`"
              :value="selectedKeys[0]"
              style="width: 188px; margin-bottom: 8px; display: block;"
              @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
              @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
              type="primary"
              icon="search"
              size="small"
              style="width: 90px; margin-right: 8px"
              @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            Search
          </a-button>
          <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
            Reset
          </a-button>
        </div>
        <a-icon
            slot="filterIcon"
            slot-scope="filtered"
            type="search"
            :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <template slot="customRender" slot-scope="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
            >{{ fragment }}</mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
          <template v-else>
            {{ text }}
          </template>
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
    scopedSlots: {customRender: "text"}
  },
  {
    title: i18n.t("user_role.column.name"),
    dataIndex: "name",
    key: "name",
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) =>
        record.name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
  },
  {
    title: i18n.t("user_role.column.depart"),
    dataIndex: "department",
    key: "department",
    scopedSlots: {customRender: "text"},
  },
  {
    title: i18n.t("user_role.column.is_pmo"),
    dataIndex: "role_flag",
    key: "role_flag_pmo",
    scopedSlots: {customRender: "check_box_pmo"},
  },
  {
    title: i18n.t("user_role.column.is_dm"),
    dataIndex: "role_flag",
    key: "role_flag_dm",
    scopedSlots: {customRender: "check_box_dm"},
  },
  {
    title: i18n.t("user_role.column.is_pm"),
    dataIndex: "role_flag",
    key: "role_flag_pm",
    scopedSlots: {customRender: "check_box_pm"},
  },
  {
    title: i18n.t("user_role.column.is_cm"),
    dataIndex: "role_flag",
    key: "role_flag_cm",
    scopedSlots: {customRender: "check_box_cm"},
  },
];
export default {
  name: "UserRole",
  mounted() {
    if (!this.originUserRoles.length) {
      this.fetchUsers()
    } else {
      this.userRoles = this.originUserRoles
    }
  },
  data() {
    return {
      spinning: false,
      columns,
      user_changes: {},
      userRoles: [],
      loading: false,
      searchText: '',
      searchInput: null,
      searchedColumn: '',
    }
  },
  computed: {
    nochanges() {
      console.log('changed', Object.keys(this.user_changes).length, this.user_changes)
      return Object.keys(this.user_changes).length === 0
    },
    originUserRoles() {
      return this.$store.state.user.all.map((user) => {
        let role_flag = 0
        if (user.roles) {
          role_flag |= user.roles.indexOf("cm") > -1 ? 8 : 0;
          role_flag |= user.roles.indexOf("pmo") > -1 ? 4 : 0;
          role_flag |= user.roles.indexOf("dm") > -1 ? 2 : 0;
          role_flag |= user.roles.indexOf("pm") > -1 ? 1 : 0;
        }
        return {...user, role_flag};
      });
    },
  },
  methods: {
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
    fetchUsers() {
      this.spinning = true;
      this.$store
          .dispatch("user/list")
          .then(() => {
            this.userRoles = this.originUserRoles
          })
          .catch((error) => {

            this.$message.error(error, 3);
          })
          .finally(() => {
            this.spinning = false;
            console.log("users list refreshed");
          });
    },
    onCheck(check, work_code, role_name) {
      console.log("checkbox", check, work_code, role_name);
      let records = [...this.userRoles]
      const record = records.find((userRole) => userRole.work_code === work_code)
      let flag = role_name === 'cm' ? 8 : role_name === 'pmo' ? 4 : role_name === 'dm' ? 2 : 1
      let mask = role_name === 'cm' ? 7 : role_name === 'pmo' ? 11 : role_name === 'dm' ? 13 : 14
      record.role_flag = record.role_flag & mask | (check ? flag : 0)
      this.userRoles = records;
      console.log('current role  change', {work_code, flag: record.role_flag})
      let changes = {...this.user_changes}
      changes[work_code] = record.role_flag
      this.user_changes = changes
      console.log('all changes', this.user_changes)
    },
    onConfirm() {
      this.loading = true
      console.log('change', Object.keys(this.user_changes))
      let keys = Object.keys(this.user_changes)

      console.log('keys', keys)
      this.$store
          .dispatch("user/modify_roles", keys.map((key) => {
            console.log("entry", key, this.user_changes[key])
            return {work_code: key, role_flag: this.user_changes[key]}
          }))
          .then(() => {
            this.user_changes = {}
            this.fetchUsers();
          })
          .catch((e) => {
            this.$message.error(e, 3);
          })
          .finally(() => {
            this.loading = false
          });
    }
  },
};
</script>

<style scoped>
</style>