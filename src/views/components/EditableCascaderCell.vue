<!--
 * @Author: your name
 * @Date: 2021-09-28 14:37:52
 * @LastEditTime: 2021-11-22 17:16:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /daily-report-frontend/src/views/components/EditableCell.vue
-->
<template>
  <div class="editable-cascader-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-space align="baseline">
        <a-cascader
            change-on-select
            :show-search="{ filterOption }"
            ref="selector"
            :options="options"
            option-filter-prop="children"
            :filter-option="filterOption"
            style="width:150px"
            @change="handleChange"
            @blur="check"
        />
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
      let option = this.getProjectFrom(this.value);
      return option ? option.name : "其他";
    },
  },
  methods: {
    handleChange(number) {
      console.log("project changed", number)
      let rest
      [this.value, ...rest] = [...number].reverse();
      console.log("project selected", this.value)
    },
    getProjectFrom(number) {
      if (!number) {
        return null
      }
      for (let proj of this.options) {
        if (proj.number === number) {
          return proj;
        } else if (proj.children && proj.children.length > 0) {
          for (let sp of proj.children) {
            if (sp.number === number) {
              return sp;
            }
          }
        }
      }
      return null;
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
.editable-cascader-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 0px;
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