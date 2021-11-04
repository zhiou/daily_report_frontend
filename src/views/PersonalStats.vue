<!--
 * @Author: your name
 * @Date: 2021-11-04 10:56:50
 * @LastEditTime: 2021-11-04 13:49:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Personal.vue
-->
<template>
  <div style="width: 100%; height: 100%; margin: 16px 16px;">
    <div id="work-time-line" class="charts" />
    <div id="task-distribute-pie" class="charts" />
    <div id="project-distribute-pie" class="charts" />
    <div id="product-distribute-pie" class="charts" />
  </div>
</template>

<script>
export default {
  name: "PersonalStats",
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
    this.drawTaskPie();
    this.drawProjectPie();
    this.drawProductPie();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let line = this.$echarts.init(document.getElementById("work-time-line"));
      // 绘制图表
      line.setOption({
        title: { text: "本周每日工时" },
        tooltip: {},
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {},
        series: [
          {
            name: "工时",
            type: "bar",
            data: [7, 8, 7, 8, 6, 0, 0],
          },
        ],
      });
    },
    drawTaskPie() {
      let pie = this.$echarts.init(
        document.getElementById("task-distribute-pie")
      );
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
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
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
    },
    drawProjectPie() {
      let pie = this.$echarts.init(
        document.getElementById("project-distribute-pie")
      );
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
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
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
    },
    drawProductPie() {
      let pie = this.$echarts.init(
        document.getElementById("product-distribute-pie")
      );
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
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
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