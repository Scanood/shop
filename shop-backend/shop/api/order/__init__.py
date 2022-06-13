from ...order import OrderStatus as OrderStatusType
allow_user = [
    OrderStatusType.CANCELED,
    OrderStatusType.RECEIVED
]
allow_staff = [
    OrderStatusType.CANCELED,
    OrderStatusType.FULFILLED,
    OrderStatusType.REFUND,
    OrderStatusType.SHIPPED,
    OrderStatusType.RECEIVED
]

allow_canceled = [
    OrderStatusType.UNFULFILLED,
    OrderStatusType.FULFILLED
]

allow_fulfilled = [
    OrderStatusType.UNFULFILLED
]

allow_refunded = [
    OrderStatusType.CANCELED
]
allow_shipped = [
    OrderStatusType.FULFILLED
]
allow_received = [
    OrderStatusType.SHIPPED
]
allow_delete = [
    OrderStatusType.RECEIVED,
    OrderStatusType.REFUND,
    OrderStatusType.CANCELED
]
