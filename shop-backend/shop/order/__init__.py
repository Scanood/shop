class OrderStatus:
    UNFULFILLED = "unfulfilled"  # 未付款
    FULFILLED = "fulfilled"  # 已付款
    CANCELED = "canceled"  # 已取消
    REFUND = "refund" # 已退款
    SHIPPED = "shipped"  # 已发货
    RECEIVED = "received"  # 已收货

    CHOICES = [
        (UNFULFILLED, "unfulfilled"),
        (FULFILLED, "fulfilled"),
        (CANCELED, "canceled"),
        (SHIPPED, "shipped"),
        (REFUND, "refund"),
        (RECEIVED, "received")
    ]
