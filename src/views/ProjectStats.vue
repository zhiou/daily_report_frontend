<!--
 * @Author: your name
 * @Date: 2021-11-04 10:56:50
 * @LastEditTime: 2021-11-22 14:20:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Personal.vue
-->
<template>
  <div id="project-stats" style="width: 100%; height: 100%; margin: 16px 16px">
    <a-row :gutter="16">
      <a-col :span="4">
        <!-- <a-input :value="projectName" addonBefore="Project" disabled /> -->
        <a-cascader
            change-on-select
            :options="projects"
            option-filter-prop="children"
            :filter-option="filterOption"
            style="width:400px"
            @change="handleChange"
        />
      </a-col>

      <a-col :span="20"> </a-col>
    </a-row>
    <div id="work-time-line" class="charts" />
    <div id="member-distribute-pie" class="charts" />
  </div>
</template>

<script>

export default {
  name: "ProjectStats",
  data() {
    return {
      lineChart: null,
      reports: [],
    };
  },
  mounted() {
    this.fetchProjects();
  },
  computed: {
    projects() {
      return this.$store.state.user.projects;
    },
    lineAxisX() {
      let set = new Set(this.$_.map(this.reports, "report_date"));
      return [...set].sort();
    },
    lineAxisY() {
      let grouped = this.$_.groupBy(this.reports, "staff_name");
      return this.$_.mapValues(grouped, (tasks) => {
        let report = this.$_.groupBy(tasks, "report_date");
        return this.$_.map(this.lineAxisX, (x) => {
          if (report[x]) {
            return this.$_.reduce(
                report[x],
                (sum, task) => sum + task.task_cost,
                0
            );
          }
          return 0;
        });
      });
    },
    lineData() {
      let xAxis = this.lineAxisX;
      let yAxis = this.lineAxisY;

      let grid = this.$_.map(yAxis, (v, k) => {
        return [k, ...v];
      });
      console.log('grid', grid, this.$_.concat([["工时", ...xAxis]], grid))
      return this.$_.concat([["工时", ...xAxis]], grid);
    },
    pieData() {
      let grouped = this.$_.groupBy(this.reports, "staff_name");
      let totals = this.$_.mapValues(grouped, (tasks) => {
        let total = this.$_.reduce(
          tasks,
          (sum, task) => sum + task.task_cost,
          0
        );
        return total;
      });
      let axis = [];
      this.$_.forIn(totals, (value, key) => {
        axis.push({ value: value, name: key === 'null' ? '其他' : key });
      });
      return axis;
    },
  },
  methods: {
    handleChange(numbers) {
      if (numbers.length === 0) {
        this.reports = []
        this.render();
        return
      }
      const [projectNumber, ...rest] = [...numbers].reverse();
      this.fetchData(projectNumber);
    },
    fetchProjects() {
      if (this.projects.length === 0) {
        this.$store.dispatch("user/info").finally(() => {
          console.log("user info fetched");
        });
      }
    },
    fetchData(projectNumber) {
      this.$store
        .dispatch("report/pmQuery", {
          project_number: projectNumber
        })
        .then((data) => {
          this.reports = data;
          this.render();
        })
        .catch((error) => {
          this.$message.error(error, 3);
        });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    render() {
      if (this.lineChart) {
        this.lineChart.dispose();
        this.lineChart = null;
      }
      this.drawLine();
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let line = this.$echarts.init(document.getElementById("work-time-line"));

      let dbview = this.lineData;
      let pieData = this.pieData;
      let lineAxises = this.lineAxisX
      line.on("updateAxisPointer", function (event) {
        const xAxisInfo = event.axesInfo[0];

        if (xAxisInfo) {
          const dimension = lineAxises[xAxisInfo.value];
          line.setOption({
            series: {
              id: "pie",
              label: {
                formatter: "{b}: {@[" + (xAxisInfo.value+1) + "]} ({d}%)",
              },
              encode: {
                value: dimension,
                tooltip: dimension,
              },
            },
          });
        }
      });
      // 绘制图表
      line.setOption({
        legend: {},
        tooltip: {
          trigger: "axis",
          showContent: false,
        },
        dataset: {
          source: dbview,
        },
        xAxis: { type: "category" },
        yAxis: { gridIndex: 0 },
        grid: { top: "55%" },
        series: [
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          },
          {
            type: "pie",
            id: "pie",
            radius: "30%",
            center: ["33%", "25%"],
            emphasis: {
              focus: "self",
            },
            label: {
              formatter: "{b}: {@1} ({d}%)",
            },
            encode: {
              itemName: "工时",
              value: dbview[0][1],
              tooltip: dbview[0][1],
            },
          },
          {
            type: "pie",
            radius: ["15%", "30%"],
            center: ["67%", "25%"],
            label: {
              show: false,
              position: "center",
              formatter: "{b}\n{d}%",
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            labelLine: {
              show: false,
            },
            data: pieData,
          },
        ],
      });
      this.lineChart = line;
    },
  },
};
</script>

<style scoped>


.charts {
  width: 100%;
  height: 100%;
}
</style>