<!--
 * @Author: your name
 * @Date: 2021-11-02 13:54:56
 * @LastEditTime: 2021-11-03 18:47:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Product.vue
-->
<template>
  <div id="product" v-title data-title="产品信息">
    <a-row :gutter="16">
      <a-col :span="2" :offset="22">
        <a-button :disabled="notChanged" type="primary" @click="onSave">
          {{ $t("product.button.save") }}
        </a-button>
      </a-col>
    </a-row>
    <a-table
      :columns="columns"
      :data-source="products"
      style="margin: 16px"
      :defaultExpandedRowKeys="[0]"
      :pagination="false"
    >
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
      <template slot="operation" slot-scope="text, record">
        <a-button
          type="danger"
          shape="circle"
          icon="delete"
          v-if="products.length"
          @click="() => onDelete(record.key)"
        />
      </template>
    </a-table>
    <a-button
      type="dashed"
      style="width: 40%; margin-top: 8px; margin-left: 30%"
      @click="() => (visible = true)"
    >
      <a-icon type="plus" /> Add Product
    </a-button>
    <product-modal-form
      ref="productForm"
      :visible="visible"
      @create="onCreate"
      @cancel="() => (visible = false)"
    />
  </div>
</template>

<script>
import EditableCell from "./components/EditableCell.vue";
import EditableTagCell from "./components/EditableTagCell.vue";
import ProductModalForm from "./components/ProductModalForm.vue";

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
  {
    title: "",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  name: "Product",
  components: {
    EditableCell,
    EditableTagCell,
    ProductModalForm,
  },
  data: function () {
    return {
      visible: false,
      columns,
      productState,
      origin: [],
      products: [],
    };
  },
  beforeCreate() {
    this.$store.dispatch("product/list").then(()=>{
      this.refresh()
    });
  },
  computed: {
    notChanged() {
      return this.$_.isEqual(this.products, this.origin);
    },
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      console.log("on product changed", key, dataIndex, value);
      const products = [...this.products];
      const target = products.find((item) => item.key === key);
      if (target && target[dataIndex] !== value) {
        console.log("on cell change", key, dataIndex, value);
        target[dataIndex] = value;
        console.log("target = ", target);
        this.products = products;
      }
    },
    onCreate() {
      const modalForm = this.$refs.productForm.form;
      modalForm.validateFields((err, product) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", product);
        modalForm.resetFields();
        this.visible = false;
        this.$store
          .dispatch("product/create", product)
          .then(() => {
            this.refresh();
          });
      });
    },
    onDelete(key) {
      const products = [...this.products];
      this.products = products.filter((item) => item.key !== key);
    },
    onSave() {
      console.log("save products");
      this.$store.dispatch("product/update", this.products).finally(() => {
        this.refresh();
      });
    },
    refresh() {
      this.origin = this.$store.state.product.all.map((product) => {
        return { ...product, key: product.number };
      });
      this.products = this.$store.state.product.all.map((product) => {
        return { ...product, key: product.number };
      });
      console.log("products refreshed", this.products);
    },
  },
};
</script>