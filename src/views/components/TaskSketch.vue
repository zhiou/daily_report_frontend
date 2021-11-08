<!--
 * @Author: your name
 * @Date: 2021-09-26 16:52:56
 * @LastEditTime: 2021-11-08 10:17:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/components/Tasks.vue
-->
<template>
  <div id="task-sketch" style="width: 100%">
    <a-row type="flex" justify="space-between">
      <a-col :xs="6" :sm="6">
        <a-input
          addonBefore="Name"
          :value="current.name"
          @change="onNameChanged"
        />
      </a-col>
      <a-col :xs="5" :sm="5">
        <a-input
          addonBefore="Cost"
          addonAfter="H"
          :value="current.cost"
          @change="onCostChanged"
        />
      </a-col>
      <a-col :xs="6" :sm="6">
        <a-select
          v-decorator="['project']"
          v-model="current.project"
          @change="onProjectChanged"
        >
          <a-select-option v-for="(project, index) in projects" :key="index">
            {{ project.name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="6" :sm="6">
        <a-select
          v-decorator="['product']"
          v-model="current.product"
          @change="onProductChanged"
        >
          <a-select-option v-for="(product, index) in products" :key="index">
            {{ product.name }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
  </div>
</template>

<script>
let projects = [
  { number: "0", name: "未立项" },
  { number: "项目1编号", name: "项目1" },
  { number: "项目2编号", name: "项目2" },
];

let productTable = {
  0: [{ number: "0", name: "自定义" }],
  项目1编号: [
    { number: "0", name: "自定义" },
    { number: "产品1编号", name: "产品1" },
  ],
  项目2编号: [
    { number: "0", name: "自定义" },
    { number: "产品2编号", name: "产品2" },
  ],
};

export default {
  name: "TaskSketch",
  props: ["task"],
  model: {
    prop: "task",
    event: "change",
  },
  data() {
    return {
      projects,
      products: productTable[projects[this.task.project].number],
      current: this.task,
    };
  },
  components: {},
  methods: {
    onProjectChanged(index) {
      this.products = productTable[projects[index].number];
      this.current = { ...this.current, product: 0 };
    },
    onProductChanged(index) {
      this.current = { ...this.current, product: index };
    },
    onNameChanged(e) {
      const name = e.target.value;
      this.current = { ...this.current, name };
    },
    onCostChanged(e) {
      const cost = e.target.value;
      this.current = { ...this.current, cost };
    },
  },
  watch: {
    current: function () {
      this.$emit("change", this.current);
    },
  },
};
</script>

<style scoped>

</style>