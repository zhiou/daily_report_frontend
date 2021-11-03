<!--
 * @Author: your name
 * @Date: 2021-09-26 17:06:32
 * @LastEditTime: 2021-11-03 18:42:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/components/TaskForm.vue
-->
<template>
  <div id="product-modal-form">
    <a-modal
      :visible="visible"
      title="Create a new Product"
      okText="Create"
      @cancel="
        () => {
          $emit('cancel');
        }
      "
      @ok="
        () => {
          $emit('create');
        }
      "
    >
      <a-form layout="vertical" :form="form">
        <a-form-item label="Product Number">
          <a-input
            v-decorator="[
              'number',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input the number of product!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="Product Name">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input the name of product!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>

        <a-form-item label="Status">
          <a-select
           style="width: 120px"
            v-decorator="[
              'status',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please select status of product!',
                  },
                ],
              },
            ]"
          >
            <a-select-option v-for="(option, index) in options" :key="index">
              {{ option }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Product Line">
          <a-input
            v-decorator="[
              'in_line',
              {
                rules: [
                  {
                    required: false,
                    message: 'Please input the product line!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="Remark">
          <a-input
            type="textarea"
            v-decorator="[
              'remark',
              {
                rules: [
                  {
                    required: false,
                    message: 'Please input the remark of product!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
const options = ["设计", "研发", "发布", "终止"];
export default {
  name: "ProductModalForm",
  props: ["visible"],
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  components: {},
  data() {
    return {
      options,
    };
  },
};
</script>
