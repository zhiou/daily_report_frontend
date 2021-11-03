<!--
 * @Author: your name
 * @Date: 2021-11-02 13:54:56
 * @LastEditTime: 2021-11-03 15:15:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Product.vue
-->
<template>
  <div id="product" v-title data-title="产品信息">
    <a-table :columns="columns" :data-source="datasource">
      <template slot="name" slot-scope="text, record">
        <editable-cell
          :text="text"
          @change="onCellChange(record.key, 'name', $event)"
        />
      </template>
      <template slot="in_line" slot-scope="text, record">
        <editable-cell
          :text="text"
          @change="onCellChange(record.key, 'in_line', $event)"
        />
      </template>
      <template slot="remark" slot-scope="text, record">
        <editable-cell
          :text="text"
          @change="onCellChange(record.key, 'remark', $event)"
        />
      </template>
      <span slot="state" slot-scope="tag, record">
        <editable-tag-cell
          :tag="tag"
          :options="productState"
          @change="onCellChange(record.key, 'status', $event)"
        />
      </span>
    </a-table>
  </div>
</template>

<script>
import EditableCell from "./components/EditableCell.vue";
import EditableTagCell from "./components/EditableTagCell.vue";
const productState = ["设计", "研发", "发布", "终止"];

const columns = [
  {
    dataIndex: "number",
    key: "number",
    title: "产品编号",
  },
  {
    dataIndex: "name",
    key: "name",
    title: "产品名",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "产品线",
    key: "in_line",
    dataIndex: "in_line",
    scopedSlots: { customRender: "in_line" },
  },
  {
    title: "产品状态",
    key: "status",
    dataIndex: "status",
    scopedSlots: { customRender: "state" },
  },
  {
    title: "备注",
    key: "remark",
    dataIndex: "remark",
    scopedSlots: { customRender: "remark" },
  },
];

export default {
  name: "Product",
  components: {
    EditableCell,
    EditableTagCell,
  },
  data: function () {
    return {
      columns,
      productState,
    };
  },
  beforeCreate() {
    this.$store.dispatch("product/list");
  },
  computed: {
    datasource() {
      return this.$store.state.product.all.map((product) => {
        return { ...product, key: product.number };
      });
    },
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      console.log("on product changed", key, dataIndex, value);
      const products = [...this.datasource];
      const target = products.find((item) => item.key === key);
      if (target && target[dataIndex] !== value) {
        console.log("on cell change", key, dataIndex, value);
        target[dataIndex] = value;
        console.log("target = ", target);
        // this.tasks = tasks;
      }
    },
  },
};
</script>