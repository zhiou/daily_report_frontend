<template>
  <div id="cmt-stats" v-title data-title="提交统计">
    <div class="report-frame">
      <a-space>
      <a-range-picker
          @change="onDataChanged"
          v-model="dateRange"
          style="margin: 16px 16px"
      />
      <a-button
          type="primary"
          :disabled="!datasource || datasource.length === 0"
          :loading="downloading"
          @click="onExport"
      >
        {{ $t("button.export") }}
      </a-button>
      </a-space>
      <a-spin :spinning="spinning">
        <a-table :columns="columns" :data-source="datasource" :scroll="scroll"
                 :pagination="{ pageSize: 8 }">
          <template slot="text" slot-scope="text">
            <span>
              {{ text || "未提交" }}
            </span>
          </template>
        </a-table>
      </a-spin>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import i18n from "@/i18n";

const base_columns = [
  {title: '部门', width: 150, dataIndex: 'department', key: 'department', prop: 'department', fixed: 'left', label:"部门"},
  {title: '姓名', width: 100, dataIndex: 'name', prop: 'name', key: 'name', fixed: 'left', label:"姓名"},
];

export default {
  name: "CommitStats",
  mounted() {
    this.fetchReport()
  },
  data() {
    return {
      dateRange: [moment().subtract(1, 'days'), moment()],
      datasource: [],
      spinning: false,
      downloading: false,
    }
  },
  computed: {
    scroll() {
      return { x: 120 * this.columns.length }
    },
    columns() {
      let start = moment(this.dateRange[0])
      const end = this.dateRange[1]
      let cols = []
      while(start.isBefore(end)) {
        let ts = start.format("yyyy-MM-DD")
        cols.push({'title': ts, 'dataIndex': ts, 'prop': ts, 'key': ts, 'label': ts, 'width': 100, scopedSlots: {customRender: "text"},})
        start = start.add(1, 'days')
      }
      return base_columns.concat(cols)
    },
  },
  methods: {
    onDataChanged(date, range) {
      if (!range.length) {
        return
      }
      this.fetchReport();
    },
    fetchReport() {
      if (this.dateRange.length === 0) {
        return;
      }
      this.spinning = true
      this.$store
          .dispatch("report/stats", {
            from: this.dateRange[0].format('yyyy-MM-DD'),
            to: this.dateRange[1].format('yyyy-MM-DD'),
          })
          .then((data) => {
            this.datasource = data;
          })
          .catch((error) => {
            this.$message.error(error, 3);
          })
      .finally(() => {
        this.spinning = false
      });
    },
    onExport() {
      this.downloading = true;
      this.$export
          .excel({
            columns: this.columns,
            data: this.datasource,
          })
          .catch((e) => console.log("导出失败" + e))
          .finally(() => {
            this.downloading = false;
          });
    },
  }
}
</script>

<style scoped>
.report-frame {
  background-color: white;
  margin: 8px 8px;
  padding: 8px 8px;
}
</style>