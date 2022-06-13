<template>
  <div id="chart"></div>
</template>

<script>
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { TitleComponent } from "echarts/components";
import { ORDERCONDITION } from "@/graphql/dashboard/queries";
echarts.use([GridComponent, BarChart, CanvasRenderer, TitleComponent]);
export default {
  data() {
    return {
      chart: null,
      orderCondition: {},
      attr: [],
      value: [],
    };
  },
  mounted() {
    this.initCharts();
    this.setoption(this.attr, this.value);
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(this.$el);
    },
    setoption(attr, value) {
      if (this.chart) {
        this.chart.setOption({
          title: {
            text: "订单概况",
          },
          xAxis: {
            type: "category",
            data: attr,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: value,
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(180, 180, 180, 0.2)",
              },
            },
          ],
        });
      }
    },
    changeAttrName(name) {
      switch (name) {
        case "ALL":
          return "全部";
        case "SHIPPING":
          return "运输中";
        case "WAITPAY":
          return "待支付";
        case "FINISH":
          return "完成";
        case "WAITSHIP":
          return "待发货";
        case "CANCEL":
          return "已取消";
      }
    },
  },
  watch: {
    orderCondition: {
      handler(newValue) {
        for (let i in newValue) {
          this.attr.push(this.changeAttrName(newValue[i].status));
          this.value.push(newValue[i].count);
        }

        this.setoption(this.attr, this.value);
      },
      deep: true,
    },
  },
  apollo: {
    orderCondition: {
      query: ORDERCONDITION,
    },
  },
};
</script>

<style>
#chart {
  width: 500px;
  height: 300px;
  margin-left: 20px;
}
</style>