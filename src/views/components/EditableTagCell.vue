<!--
 * @Author: your name
 * @Date: 2021-09-28 14:37:52
 * @LastEditTime: 2021-11-03 15:13:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/components/EditableCell.vue
-->
<template>
  <div class="editable-tag-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-select :default-value="value" @change="handleChange" @blur="check">
        <a-select-option v-for="(option, index) in options" :key="index">
          {{ option }}
        </a-select-option>
      </a-select>
    </div>
    <div v-else >
      <a-tag
        :color="tagColor"
        @click="edit"
      >
        {{ options[value] || " " }}
      </a-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditableTagCell",
  props: ["tag", "options"],
  data() {
    return {
      value: this.tag,
      editable: false,
    };
  },
  computed: {
    tagColor() {
      const colors = ['green', 'geekblue', 'volcano', 'gray']
      return colors[this.value]
    },
  },
  methods: {
    handleChange(tag) {
      console.log("tag selected", tag)
      this.value = tag;
    },
    check() {
      this.editable = false;
      this.$emit("change", this.value);
    },
    edit(checked) {
      this.editable = true;
    },
  },
};
</script>

<style scoped>
.editable-tag-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  white-space: nowrap;
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
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