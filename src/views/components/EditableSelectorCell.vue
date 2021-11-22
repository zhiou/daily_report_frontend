<!--
 * @Author: your name
 * @Date: 2021-09-28 14:37:52
 * @LastEditTime: 2021-11-22 17:16:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/components/EditableCell.vue
-->
<template>
  <div class="editable-selector-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-select
        show-search
        option-filter-prop="children"
        :filter-option="filterOption"
        style="width: 120px"
        @change="handleChange"
        @blur="check"
      >
        <a-select-option v-for="staff in employers" :key="staff.number">
          {{ staff.name }}
        </a-select-option>
      </a-select>
    </div>
    <div v-else>
      <span @click="edit">
        {{ this.name || " " }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditableTagCell",
  props: ["number"],
  data() {
    return {
      value: this.number,
      editable: false,
    };
  },
  computed: {
    name() {
      let staff = this.employers.find((target) => target.number === this.value);
      return staff ? staff.name : "";
    },
    employers() {
      return this.$store.state.user.all.map((worker) => {
        return { ...worker, key: worker.work_code, number: worker.work_code };
      });
    },
  },
  methods: {
    handleChange(number) {
      this.value = number;
    },
    check() {
      this.editable = false;
      this.$emit("change", this.value);
    },
    edit(checked) {
      this.editable = true;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
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