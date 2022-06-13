from django.http import HttpResponse
from alipay.aop.api.util.SignatureUtils import verify_with_rsa, get_sign_content
from django.conf import settings
from .models import Payment
from . import PaymentMethodType
from ..order import OrderStatus
from ..order.models import Order
from django.views.decorators.http import require_http_methods
from django.db import transaction

alipay_public_key = settings.ALIPAY_PUBLIC_KEY


# 支付宝支付的回调
@require_http_methods(['POST'])
@transaction.atomic
def alipay_check_order(request):
    response = request.POST.dict()
    sign = response.pop('sign', None)
    response.pop('sign_type', None)
    message = get_sign_content(response).encode()
    status = verify_with_rsa(alipay_public_key, message, sign)
    if status:
        trade_no = response.get('trade_no')
        out_trade_no = response.get('out_trade_no')
        receipt_amount = response.get('receipt_amount')
        Payment.objects.filter(out_trade_no=out_trade_no).update(
            method=PaymentMethodType.ALIPAY,
            out_trade_no=out_trade_no,
            trade_no=trade_no,
            money=receipt_amount,
            paid=True
        )
        Order.objects.filter(payment__out_trade_no=out_trade_no).update(
            status=OrderStatus.FULFILLED
        )
        # 支付宝收到该响应后不会重复调用该接口
        return HttpResponse('success')
    return HttpResponse('failure')
