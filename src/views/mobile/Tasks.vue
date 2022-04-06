<template>
  <div id="mobile-taks">
    <van-nav-bar title="创建任务" left-arrow @click-left="$router.back()"/>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="task.task_name"
            name="任务名"
            label="任务名"
            :rules="[{ required: true, message: '请填写任务名' }]"
        />
        <van-field
            v-model="task.task_detail"
            name="任务详情"
            label="任务详情"
            :rules="[{ required: true, message: '请填写任务详情' }]"
        />
        <van-field
            name="任务耗时"
            label="任务耗时"
            :rules="[{ required: true, message: '请选择任务耗时' }]"
        >
          <template #input>
            <van-stepper v-model="task.task_cost" step="0.5" min="0.5" max="12"/>
          </template>
        </van-field>
        <van-field
            v-model="dateString"
            is-link
            readonly
            name="calendar"
            label="日历"
            placeholder="点击选择日期"
            @click="showCalendar = true"
        />
        <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
        <van-field
            v-model="task.project_name"
            is-link
            readonly
            name="项目选择"
            label="项目选择"
            placeholder="点击选择项目"
            @click="showProjects = true"
        />
        <van-popup v-model:show="showProjects" position="bottom">
          <van-cascader
              v-model="task.project_number"
              title="请选择所属项目"
              :options="projects"
              @close="showProjects = false"
              @finish="onProjectSelected"
          />
        </van-popup>
        <van-field
            v-model="task.product_name"
            is-link
            readonly
            name="产品选择"
            label="产品选择"
            placeholder="点击选择产品"
            @click="showProducts = true"
        />
        <van-popup v-model:show="showProducts" position="bottom">
          <van-cascader
              v-model="task.product_number"
              title="请选择所属产品"
              :options="products"
              @close="showProducts = false"
              @finish="onProductSelected"
          />
        </van-popup>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import moment from "moment";
import {random_int} from "@/utils/helper";
import {Toast} from "vant";

export default {
  name: "Tasks",
  data() {
    return {
      show: false,
      date: new Date(),
      tasks: [],
      showCalendar: false,
      showProjects: false,
      showProducts: false,
      task: {
        task_name: "",
        task_detail: "",
        task_cost: 0,
        project_number: null,
        project_name: "",
        product_number: null,
        product_name: "",
      }
    }
  },
  mounted() {
    if (this.projects.length === 0) {
      this.$store.dispatch("project/list").catch((error) => Toast.fail("获取项目列表失败"));
    }
    if (this.products.length === 0 ) {
      this.$store.dispatch("product/list").catch((error) => {
        Toast.fail("获取产品列表失败");
      });
    }
    this.fetchData()
    if (this.$route.params.copied) {
      this.task = this.$route.params.copied;
      this.date = moment(this.$route.params.date).toDate();
      console.log('copied', this.date, this.task);
    }
  },
  computed: {
    dateString() {
      return moment(this.date).format("YYYY-MM-DD");
    },
    minDate() {
      return moment().subtract(1, "month").toDate();
    },
    maxDate() {
      return moment().add(1, 'days').toDate();
    },
    author() {
      return this.$store.state.user.name;
    },
    projects() {
      return this.$store.state.project.all
    },
    products() {
      let groupedByLine = this.$_.groupBy(this.$store.state.product.all, "in_line");
      return Object.keys(groupedByLine).map((key) => {
        return {
          text: key,
          value: key,
          children: groupedByLine[key]
        }
      });
    },
  },
  methods: {
    day(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    genKey() {
      const keys = new Set(this.tasks.map((item) => item.key));
      let key = random_int(1, 100000);
      while (keys.has(key)) {
        key = random_int(1, 100000);
      }
      return key;
    },
    onConfirm(date) {
      this.showCalendar = false;
      this.date = date;
      this.fetchData()
    },
    onProjectSelected({selectedOptions}) {
      console.log(selectedOptions);
      this.showProjects = false;
      let proj = selectedOptions[selectedOptions.length - 1];
      this.task.project_number = proj.number;
      this.task.project_name = proj.name;
    },
    onProductSelected({selectedOptions}) {
      console.log(selectedOptions);
      this.showProducts = false;
      let prod = selectedOptions[selectedOptions.length - 1];
      this.task.product_number = prod.number;
      this.task.product_name = prod.name + "(" + prod.model + ")";
    },
    onSubmit() {
      let tasks = [...this.tasks, {...this.task, key: this.genKey()}]
      console.log('submit',tasks, [...this.tasks], this.task);
      this.$store
          .dispatch("report/update", {
            tasks,
            on_day: moment(this.date).format("YYYY-MM-DD"),
            author: this.author,
            status: 1,
          })
          .then(() => {
            Toast.success('创建成功');
            this.tasks = tasks;
            this.$router.go(-1);
          })
          .catch((error) => {
            Toast.fail('创建失败');
          })
          .finally(() => {
          });
    },
    fetchData() {
      this.$store.dispatch("report/selfQuery", {
        from: moment(this.date).format("YYYY-MM-DD"),
        to: moment(this.date).add(1, "days").format("YYYY-MM-DD"),
      })
          .then((tasks) => {
            this.tasks = tasks.map((task) => {
              return {...task, key: this.genKey()};
            });
            console.log('fetch', this.tasks)
          })
          .catch((e) => {
            console.log('fetchData', e);
          });
    },
  },
}
</script>

<style scoped>

</style>