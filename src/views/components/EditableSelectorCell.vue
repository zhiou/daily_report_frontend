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
      <a-space align="baseline">
        <a-select
            show-search
            :dropdownMatchSelectWidth="false"
            ref="selector"
            option-filter-prop="children"
            :filter-option="filterOption"
            style="width:150px"
            @change="handleChange"
            @blur="check"
        >
          <a-select-option v-for="option in options" :key="option.number">
            {{ option.name + (option.model ? '-' + option.model : '') }}
          </a-select-option>
        </a-select>
        <a-icon type="check" class="editable-cell-icon-check" @click="check"/>
      </a-space>

    </div>

    <div v-else class="editable-cell-text-wrapper" @click="edit">
      {{ this.name || "其他" }}
      <a-icon type="edit" class="editable-cell-icon" @click="edit"/>
    </div>

  </div>
</template>

<script>
export default {
  name: "EditableTagCell",
  props: ["default_value", 'options'],
  data() {
    return {
      value: this.default_value,
      editable: false,
    };
  },
  computed: {
    name() {
      let option = this.options.find((target) => target.number === this.value);
      return option ? option.name + (option.model ? '-' + option.model : '') : "";
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
      this.$nextTick(() => {
        console.log(this.$refs, this.$refs.selector);
        this.$refs.selector.focus();
      });
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
.editable-selector-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 0;
  width: 150px;
}

.editable-cell-icon {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}
.editable-cell-icon-check {
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

.editable-selector-cell:hover .editable-cell-icon {
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