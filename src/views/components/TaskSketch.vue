<!--
 * @Author: your name
 * @Date: 2021-09-26 16:52:56
 * @LastEditTime: 2021-09-26 18:42:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/components/Tasks.vue
-->
<template>
    <div id="task-sketch">
       <a-row type="flex">
      <a-col :span="6">
        <a-input placeholder="Task Name" :value="task.name" />
      </a-col>
      <a-col :span="6">
        <a-input placeholder="Task Cost" :value="task.cost" />
      </a-col>
      <a-col :span="6">
         <a-dropdown v-decorator="['project']">
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            Select Project <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item v-for="project in projects" :key="project.number">{{
              project.name
            }}</a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-col>
      <a-col :span="6">
         <a-dropdown v-decorator="['product']">
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            Select Product <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item v-for="product in products" :key="product.number">{{
              product.name
            }}</a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-col>
    </a-row>
    </div>
</template>

<script>
let task = {
  name: "写代码",
  cost: 7,
  project: { number: "0", name: "未立项" },
  product: { number: "0", name: "自定义" }
}

let projects = [
  { number: "0", name: "未立项" },
  { number: "项目1编号", name: "项目1" },
  { number: "项目2编号", name: "项目2" },
];

let products = [
  { number: "0", name: "自定义" },
  { number: "产品1编号", name: "产品1" },
  { number: "产品2编号", name: "产品2" },
];

export default {
  name: "TaskSketch",
  data() {
    return {
      task,
      projects,
      products
    }
  },
  components: {

  },
};
</script>
