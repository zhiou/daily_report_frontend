<!--
 * @Author: your name
 * @Date: 2021-11-02 13:54:56
 * @LastEditTime: 2021-11-22 16:25:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/Product.vue
-->
<template>
  <div id="product" v-title data-title="产品信息">
    <a-spin :spinning="spinning">
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
        <a-icon type="plus" /> {{ $t("product.button.add") }}
      </a-button>
    </a-spin>
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
    };
  },
  mounted() {
    this.$store
      .dispatch("product/list")
      .catch((error) => {
        this.$message.error(error, 3);
      });
  },
  computed: {
    spinning() {
      return this.$store.state.product.spinning;
    },
    products() {
      return this.$store.state.product.all.map((product) => {
        return { ...product, key: product.number };
      });
    },
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      const products = [...this.products];
      const target = products.find((item) => item.key === key);
      if (target && target[dataIndex] !== value) {
        target[dataIndex] = value;
        this.$store.dispatch("product/update", target).catch((error) => {
          console.error(error);
          this.$message.error(error, 3);
        });
      }
    },
    onCreate() {
      const modalForm = this.$refs.productForm.form;
      modalForm.validateFields((err, product) => {
        if (err) {
          return;
        }
        modalForm.resetFields();
        this.visible = false;

        this.$store.dispatch("product/create", product).catch((error) => {
          console.error(error);
          this.$message.error(error, 3);
        });
      });
    },
    onDelete(key) {
      this.$store.dispatch("product/remove", { numbers: [key] }).catch((e) => {
        console.log(e);
        this.$message.error(e, 3);
      });
    },
    onSave() {
      this.$store.dispatch("product/update", this.products).catch((e) => {
        console.log(e);
        this.$message.error(e, 3);
      });
    },
  },
};
</script>