<template>
  <div class="mb-10">
    <div class="flex flex-row justify-evenly">
      <OrderTable
        :lines="this.orderDetail.lines"
        class="w-8/12 bg-white shadow-md rounded-2xl"
      />
      <Note
        class="w-3/12 bg-white shadow-md rounded-2xl"
        :note="this.orderDetail.note"
      />
    </div>
    <br />
    <div class="flex flex-row justify-evenly">
      <PaymentBar
        class="w-8/12 bg-white shadow-md rounded-2xl"
        :payment="this.orderDetail.payment"
        :staffFill="this.orderDetail.staffFill"
      />
      <Addressbar
        :address="this.orderDetail.address"
        class="w-3/12 bg-white shadow-md rounded-2xl"
      />
    </div>
    <br />
    <div class="flex flex-row justify-evenly">
      <Delivery
        class="w-8/12 bg-white shadow-md rounded-2xl"
        :status="this.orderDetail.status"
        :token="this.orderDetail.token"
        :shipping="this.orderDetail.shipping"
      />
    </div>
  </div>
</template>
<script>
import OrderTable from "@/components/order/orderTable";
import Note from "@/components/order/note";
import Addressbar from "@/components/order/address";
import PaymentBar from "@/components/order/payment";
import Delivery from "@/components/order/delivery";
import { ORDERTETAIL } from "@/graphql/order/queries";
export default {
  data() {
    return {
      uuid: "",
      orderDetail: {
        note: "",
        lines: [],
        address: {
          province: "",
          city: "",
          streetAddress: "",
          phone: "",
        },
        token: "",
      },
    };
  },
  components: {
    OrderTable,
    Note,
    Addressbar,
    PaymentBar,
    Delivery,
  },
  created() {
    this.uuid = this.$route.params.uuid;
    // 避免参数未完成初始化造成无效请求
    this.$apollo.queries.orderDetail.start();
  },
  apollo: {
    orderDetail: {
      query: ORDERTETAIL,
      variables() {
        return {
          token: this.uuid,
        };
      },
      skip: true,
    },
  },
};
</script>

<style>
</style>