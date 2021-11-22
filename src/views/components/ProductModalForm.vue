<!--
 * @Author: your name
 * @Date: 2021-09-26 17:06:32
 * @LastEditTime: 2021-11-22 14:54:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/components/TaskForm.vue
-->
<template>
  <div id="product-modal-form">
    <a-modal
      :visible="visible"
      :title="$t('product.title')"
      :okText="$t('product.button.create')"
      :cancelText="$t('product.button.cancel')"
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
        <a-form-item :label="$t('product.form.number')">
          <a-input
            v-decorator="[
              'number',
              {
                rules: [
                  {
                    required: true,
                    message: $t('product.tips.number'),
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('product.form.name')">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: true,
                    message: $t('product.tips.name'),
                  },
                ],
              },
            ]"
          />
        </a-form-item>

        <a-form-item :label="$t('product.form.status')">
          <a-select
           style="width: 120px"
            v-decorator="[
              'status',
              {
                rules: [
                  {
                    required: true,
                    message: $t('product.tips.status'),
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
        <a-form-item :label="$t('product.form.line')">
          <a-input
            v-decorator="[
              'in_line',
              {
                rules: [
                  {
                    required: false,
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('product.form.remark')">
          <a-input
            type="textarea"
            v-decorator="[
              'remark',
              {
                rules: [
                  {
                    required: false,
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
