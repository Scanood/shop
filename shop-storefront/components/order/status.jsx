import style from "@/components/order/status.module.css";
export default function OrderStatus(props) {
  function status() {
    switch (props?.status) {
      case "UNFULFILLED":
        return "未付款";
      case "FULFILLED":
        return "已付款";
      case "CANCELED":
        return "已取消";
      case "REFUND":
        return "已退款";
      case "SHIPPED":
        return "已发货";
      case "RECEIVED":
        return "已收货";
    }
  }

  function tagStyle() {
    switch (props?.status) {
      case "UNFULFILLED":
        return style.danger;
      case "FULFILLED":
        return style.success;
      case "CANCELED":
        return style.warning;
      case "REFUND":
        return style.info;
      case "SHIPPED":
        return style.success;
      case "RECEIVED":
        return style.success;
    }
  }
  function tagBackgroundStyle() {
    switch (props?.status) {
      case "UNFULFILLED":
        return style.dangerBackground;
      case "FULFILLED":
        return style.successBackground;
      case "CANCELED":
        return style.warningBackground;
      case "REFUND":
        return style.infoBackground;
      case "SHIPPED":
        return style.successBackground;
      case "RECEIVED":
        return style.successBackground;
    }
  }
  return (
    <span className={tagBackgroundStyle()}>
      <span aria-hidden className={tagStyle()}></span>
      <span className="relative">{status()}</span>
    </span>
  );
}
