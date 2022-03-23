<!--
 * @Author: your name
 * @Date: 2021-09-22 17:30:02
 * @LastEditTime: 2021-12-01 15:54:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Home.vue
-->
<template>
  <div class="calendar">
    <a-spin :spinning="spinning">
      <a-calendar
          class="calendar-frame"
          @select="onSelect"
          :default-value="value"
          @panelChange="onChange"
          :mode="mode"
      >
        <ul slot="dateCellRender" slot-scope="value" class="events">
          <li v-for="(item, index) in getListData(value)" :key="index">
            <a-badge
                v-if="index <= 2"
                :status="item.type"
                :text="item.content"
            />
            <a-badge v-if="index > 2" :status="item.type" :text="other"/>
          </li>
        </ul>
        <template slot="monthCellRender" slot-scope="value">
          <div v-if="getMonthData(value)" class="notes-month">
            <section>{{ getMonthData(value) }}</section>
            <span>Backlog number</span>
          </div>
        </template>
      </a-calendar>
    </a-spin>
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
      taskNames: [],
      other: "......",
    };
  },
  computed: {
    author() {
      return this.$store.state.user.name ? this.$store.state.user.name : "周煌";
    },
    spinning() {
      return this.$store.state.report.spinning;
    }
  },
  mounted() {
    this.fetchData(this.value);
  },
  methods: {
    firstDayOfMonth(month) {
      return moment(month).startOf("month").format("yyyy-MM-DD");
    },
    fetchData(month) {
      const startDate = this.firstDayOfMonth(month);
      // 这里必须用moment包裹一下,否则month的值会发生改变导致控件显示有问题
      const endDate = this.firstDayOfMonth(moment(month).add(1, "month"));
      this.$store
          .dispatch("report/selfQuery", {
            from: startDate,
            to: endDate,
          })
          .then((tasks) => {
            let taskNames = [];
            tasks.forEach((task) => {
              let date = moment(task.report_date)
              let commitDate = moment(task.commit_date)
              let commitLate = date.isBefore(commitDate, 'day')
              let fakeReport = moment().isBefore(date, 'day')
              let type = fakeReport ? 'error' : (commitLate ? 'warning' : 'success');
              let day = date.format('yyyy-MM-DD');
              if (taskNames[day] == undefined) {
                taskNames[day] = new Set();
              }
              taskNames[day].add({type: type, content: task.task_name});
            });
            this.taskNames = taskNames;
          })
          .catch((e) => {
            this.$message.error(e);
          });
    },
    getListData(value) {
      return this.taskNames[value.format('yyyy-MM-DD')];
    },
    getMonthData(value) {

    },
    onSelect(date) {
      if (this.mode === "month") {
        console.log('select day', date.format("yyyy-MM-DD"))
        this.$router.push({
          name: "Report", params: {
            name: this.author,
            mode: 'day',
            date: date,
            from: 'calendar',
          }
        });
      } else {
        this.mode = "month";
        this.value = date;
      }
    },
    onChange(date, mode) {
      this.mode = mode;
      this.value = date
      this.fetchData(date);
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
