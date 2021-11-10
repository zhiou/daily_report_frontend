<!--
 * @Author: your name
 * @Date: 2021-09-28 14:37:52
 * @LastEditTime: 2021-09-28 18:05:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/components/EditableCell.vue
-->
<template>
  <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-input-number
        :min="0.5"
        :max="12"
        :value="value"
        :allowClear="false"
        @change="handleChange"
        @pressEnter="check"
        @blur="check"
      /><a-icon type="check" class="editable-cell-icon-check" @click="check" />
    </div>
    <div v-else class="editable-cell-text-wrapper">
      {{ value || " " }}
      <a-icon type="edit" class="editable-cell-icon" @click="edit" />
    </div>
  </div>
</template>

<script>
export default {
  name: "EditableNumberCell",
  props: { number: Number },
  data() {
    return {
      value: this.number,
      editable: false,
    };
  },
  methods: {
    handleChange(value) {
      this.value = value;
    },
    check() {
      this.editable = false;
      this.$emit("change", this.value);
    },
    edit() {
      this.editable = true;
    },
  },
};
</script>

<style scoped>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 0px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 23px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>