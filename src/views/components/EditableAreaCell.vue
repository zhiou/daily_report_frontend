<!--
 * @Author: your name
 * @Date: 2021-09-28 14:37:52
 * @LastEditTime: 2021-09-28 18:05:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/components/EditableCell.vue
-->
<template>
  <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-input
        type="textarea"
        ref="area"
        v-model="value"
        :autoSize="true"
        :allowClear="false"
        @change="handleChange"
        @blur="check"
      /><a-icon type="check" class="editable-cell-icon-check" @click="check" />
    </div>
    <div v-else class="editable-cell-text-wrapper"  @click="edit">
      <pre>{{ value || " " }}</pre>
      <a-icon type="edit" class="editable-cell-icon" @click="edit" />
    </div>
  </div>
</template>

<script>
export default {
  name: "EditableAreaCell",
  props: { text: String},
  data() {
    return {
      value: this.text,
      editable: false,
    };
  },
  methods: {
    handleChange(e) {
      const value = e.target.value;
      this.value = value;
    },
    check() {
      this.editable = false;
      console.log('area value', this.value)
      this.$emit("change", this.value);
    },
    edit() {
      this.editable = true;
      this.$nextTick(() => {
        console.log(this.$refs, this.$refs.area);
        this.$refs.area.focus();
      });
    },
  },
};
</script>

<style scoped>
.editable-cell {
  position: relative;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
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

#pre{
  white-space: pre-wrap;       /* css-3 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  overflow: auto;
  word-break: break-all;
  word-wrap: break-word;
}
</style>