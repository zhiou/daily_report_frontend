<template>
  <div id="mobile-report">
    <van-nav-bar :title="title">
      <template #left>
        <van-icon name="calendar-o" size="20" @click="show = true"/>
      </template>
      <template #right>
        <van-icon name="plus" size="20" @click="onCreate">
        </van-icon>
      </template>
    </van-nav-bar>
    <van-cell-group v-for="report in reports"
                    :title="report.group_name"
                    :key="report.group_name">
      <van-swipe-cell v-for="(task, idx) in report.content" :key="idx">
        <van-cell :title="task.tc"
                  :is-link="true"
                  @click="onCopy(report.group_name, task)">
          <template #label>
            <p v-html="task.td"></p>
          </template>
        </van-cell>
        <template #right>
          <van-button square type="danger" text="删除" class="cell-btn"
                      @click="onDelete(report.group_name, task, report.work_code)"/>
          <van-button square type="primary" text="复制" class="cell-btn" @click="onCopy(report.group_name, task)"/>
        </template>
      </van-swipe-cell>

    </van-cell-group>
    <van-calendar v-model="show" type="single" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm"/>
  </div>
</template>

<script>
import moment from "moment";
import {conform} from "@/utils/taskUtils";
import {Toast} from "vant";
import {random_int} from "@/utils/helper";
import { Dialog } from 'vant';

export default {
  name: "Reports",
  data() {
    return {
      tasks: [],
      show: false,
      date: new Date(),
    }
  },
  mounted() {
    this.getReports(this.today, this.tomorow);
  },
  computed: {
    today() {
      return moment(this.date).format("YYYY-MM-DD");
    },
    tomorow() {
      return moment(this.date).add(1, "days").format("YYYY-MM-DD");
    },
    reports() {
      let reports = conform('report_date', this.tasks, false);
      console.log('reports', reports);
      return reports;
    },
    minDate() {
      return moment().subtract(1, "month").toDate();
    },
    maxDate() {
      return moment().add(1, 'days').toDate();
    },
    title() {
      return '工作日报' + moment(this.date).format("YYYY-MM-DD");
    }
  },
  methods: {
    day(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    nextDay(date) {
      return moment(date).add(1, "days").format("YYYY-MM-DD");
    },
    genKey() {
      const keys = new Set(this.tasks.map((item) => item.key));
      let key = random_int(1, 100000);
      while (keys.has(key)) {
        key = random_int(1, 100000);
      }
      return key;
    },
    onCreate() {
      this.$router.push({name: "MobileTasks"});
    },
    onConfirm(date) {
      this.show = false;
      console.log('selected date', date);
      this.date = date;
      this.getReports(this.day(date), this.nextDay(date));
    },
    getReports(from, to) {
      this.$store
          .dispatch("report/selfQuery", {
            from,
            to
          })
          .then((tasks) => {
            this.tasks = tasks.map((task) => {
              return {...task, key: this.genKey()};
            });
          })
          .catch((error) => {
            console.log(error);
          });
    },
    onDelete(date, task, author) {
      Dialog.confirm({
        title: '提示',
        message:
            '是否确认删除此任务？',
      })
          .then(() => {
            let tasks = [...this.tasks].filter((item) => item.key !== task.key);
            console.log('delete report', date, task, author);
            console.log('left tasks', tasks.map((item) => item.key));
            this.update(0, date, author, tasks)
          })
          .catch(() => {
          });

    },
    onCopy(date, task) {
      let target = [...this.tasks].find((item) => item.key === task.key);
      this.$router.push({name: "MobileTasks", params: {copied: target, date: date}});
    },
    update(status, on_day, author, tasks) {
      this.$store
          .dispatch("report/update", {
            tasks,
            on_day,
            author,
            status,
          })
          .then(() => {
            Toast.success('删除成功');
            this.tasks = tasks;
          })
          .catch((error) => {
            Toast.fail('删除失败');
          })
          .finally(() => {
          });
    },
  }
}
</script>

<style scoped>
.cell-btn {
  height: 100%;
}
</style>