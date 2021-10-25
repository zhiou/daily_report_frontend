<!--
 * @Author: your name
 * @Date: 2021-09-22 17:30:02
 * @LastEditTime: 2021-10-13 13:55:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Home.vue
-->
<template>
  <div class="calendar">
    <a-calendar
      class="calendar-frame"
      @select="onSelect"
      v-model="value"
      @panelChange="onChange"
      :mode="mode"
    >
      <ul slot="dateCellRender" slot-scope="value" class="events">
        <li v-for="(item, index) in getListData(value)"  :key="item.content" >
          <a-badge v-if="index<2" :status="item.type" :text="item.content" />
          <a-badge v-if="index==3" :status="item.type" :text="other" />
        </li>
      </ul>
      <template slot="monthCellRender" slot-scope="value">
        <div v-if="getMonthData(value)" class="notes-month">
          <section>{{ getMonthData(value) }}</section>
          <span>Backlog number</span>
        </div>
      </template>
    </a-calendar>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";

export default {
  name: "Calendar",
  components: {},
  data() {
    return {
      mode: "month",
      value: moment(),
      tasks: [],
      other:"......",
    };
  },
  computed: {
    author() {
      return this.$store.state.user.name ? this.$store.state.user.name : "周煌";
    },
  },
  beforeCreate() {
    this.$store
      .dispatch("report/queryMonth", {
        author: this.author,
        on_day: this.value,
      })
      .then((reports) => {
        this.tasks = new Array(12);
        reports["reports"].forEach((report) => {
          //TODO: 只用date有问题, 目前是测试数据, 用实际数据后再改
          let day = moment(report.on_day).date();
          if (this.tasks[day] == undefined) {
            this.tasks[day] = new Set();
          }
          report.tasks.forEach((task) => {
            this.tasks[day].add({ type: "success", content: task.name });
          });
        });
      });
  },
  methods: {
    getListData(value) {
      return this.tasks[value.date()];
    },
    getMonthData(value) {
      console.log("month data", value);
      if (value.month() === 8) {
        return 1394;
      }
    },
    onSelect(date) {
      console.log("calendar", date.format("yyyy-MM-DD"));
      if (this.mode === "month") {
        this.$router.push("/report/" + date.format("yyyy-MM-DD"));
      } else {
        this.mode = "month";
        this.value = date;
      }
    },
    onChange(date, mode) {
      this.mode = mode;
    },
  },
};
</script>

<style scoped>

.calendar-frame {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
}

.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>
