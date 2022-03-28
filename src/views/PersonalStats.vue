<!--
 * @Author: your name
 * @Date: 2021-11-04 10:56:50
 * @LastEditTime: 2021-11-22 14:19:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Personal.vue
-->
<template>
  <div id='personal_stats' v-title data-title="个人工时统计" style="width: 100%; height: 100%">
    <a-range-picker
      @change="onDataChanged"
      v-model="dateRange"
      style="margin: 16px 16px"
    />
    <div id="work-time-line" class="charts" />
    <div id="task-distribute-pie" class="charts" />
    <div id="project-distribute-pie" class="charts" />
    <div id="product-distribute-pie" class="charts" />
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "PersonalStats",
  data() {
    return {
      dateRange: this.lastMonth(),
      reports: [],
      taskLineChart: null,
      taskPieChart: null,
      projectPieChart: null,
      productPieChart: null,
    };
  },
  mounted() {
    this.fetchReport();
  },
  computed: {
    taskLineData() {
      let data = this.$_.groupBy(this.reports, "report_date");
      return this.$_.mapValues(data, (tasks) => {
        let total = this.$_.reduce(
          tasks,
          (sum, task) => sum + task.task_cost,
          0
        );
        return total;
      });
    },
    taskPieData() {
      return this.makePie("task_name");
    },
    projectPieData() {
      return this.makePie("project_name");
    },
    productPieData() {
      return this.makePie("product_name");
    },
  },
  methods: {
    makePie(prop) {
      let data = this.$_.groupBy(this.reports, prop);
      let axis = [];
      let grouped = this.$_.mapValues(data, (tasks) => {
        let total = this.$_.reduce(
          tasks,
          (sum, task) => sum + task.task_cost,
          0
        );
        return total;
      });
      this.$_.forIn(grouped, (value, key) => {
        axis.push({ value: value, name: key === 'null' ? '其他' : key });
      });
      return axis;
    },
    render() {
      if (this.taskLineChart) {
        this.taskLineChart.dispose();
        this.taskLineChart = null;
      }
      if (this.taskPieChart) {
        this.taskPieChart.dispose();
        this.taskPieChart = null;
      }
      if (this.projectPieChart) {
        this.projectPieChart.dispose();
        this.projectPieChart = null;
      }
      if (this.productPieChart) {
        this.productPieChart.dispose();
        this.productPieChart = null;
      }

      this.drawLine();
      this.drawTaskPie();
      this.drawProjectPie();
      this.drawProductPie();
    },
    onDataChanged(date, dateString) {
      this.fetchReport();
    },
    fetchReport() {
      this.$store
        .dispatch("report/selfQuery", {
          from: this.dateRange[0].format('yyyy-MM-DD'),
          to: this.dateRange[1].format('yyyy-MM-DD'),
        })
        .then((data) => {
          this.reports = data;
          this.render();
        })
        .catch((error) => {
          this.$message.error(error, 3);
        });
    },
    lastMonth() {
      let startDate = moment()
        .startOf("month");
      let endDate = moment()
        .add(1, 'day')
        console.log('start date', startDate, endDate, moment().month())
      return [startDate, endDate];
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let line = this.$echarts.init(document.getElementById("work-time-line"));
      let axis = this.taskLineData;
      // 绘制图表
      line.setOption({
        title: { text: "本周每日工时" },
        tooltip: {},
        xAxis: {
          data: this.$_.keys(axis), //["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {},
        series: [
          {
            name: "工时",
            type: "bar",
            data: this.$_.values(axis),
          },
        ],
      });
      this.taskLineChart = line;
    },
    drawTaskPie() {
      let pie = this.$echarts.init(
        document.getElementById("task-distribute-pie")
      );
      let axis = this.taskPieData;
      pie.setOption({
        title: {
          text: "任务工时分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "工时分布",
            type: "pie",
            radius: "60%",
            data: axis,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      this.taskPieChart = pie;
    },
    drawProjectPie() {
      let pie = this.$echarts.init(
        document.getElementById("project-distribute-pie")
      );

      let axis = this.projectPieData;
      pie.setOption({
        title: {
          text: "项目工时分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "工时分布",
            type: "pie",
            radius: "60%",
            data: axis,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      this.projectPieChart = pie;
    },
    drawProductPie() {
      let pie = this.$echarts.init(
        document.getElementById("product-distribute-pie")
      );
      let axis = this.productPieData;
      pie.setOption({
        title: {
          text: "产品工时分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "工时分布",
            type: "pie",
            radius: "60%",
            data: axis,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      this.productPieChart = pie;
    },
  },
};
</script>

<style scoped>
.charts {
  width: 50%;
  height: 50%;
}

#task-distribute-pie {
  position: relative;
  left: 50%;
  top: -50%;
}

#project-distribute-pie {
  position: relative;
  top: -50%;
}

#product-distribute-pie {
  position: relative;
  left: 50%;
  top: -100%;
}
</style>