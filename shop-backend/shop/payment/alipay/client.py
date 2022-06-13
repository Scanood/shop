#!/usr/bin/env python
# -*- coding: utf-8 -*-
import logging
import traceback
from alipay.aop.api.AlipayClientConfig import AlipayClientConfig
from alipay.aop.api.DefaultAlipayClient import DefaultAlipayClient
from alipay.aop.api.domain.AlipayTradePagePayModel import AlipayTradePagePayModel
from alipay.aop.api.request.AlipayTradePagePayRequest import AlipayTradePagePayRequest

from alipay.aop.api.domain.AlipayTradeRefundModel import AlipayTradeRefundModel
from alipay.aop.api.request.AlipayTradeRefundRequest import AlipayTradeRefundRequest

import json
from django.conf import settings

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s',
    filemode='a',)
logger = logging.getLogger('')
# 实例化客户端
alipay_client_config = AlipayClientConfig()
alipay_client_config.server_url = 'https://openapi.alipaydev.com/gateway.do'
alipay_client_config.app_id = '2021000119610848'
alipay_client_config.app_private_key = settings.APP_PRIVATE_KEY
alipay_client_config.alipay_public_key = settings.ALIPAY_PUBLIC_KEY
alipay_client_config.sign_type = "RSA2"
client = DefaultAlipayClient(alipay_client_config, logger)


def alipay_generate_payment_url(out_trade_no, subject, body, total_amount, goods_detail=None) -> str:
    # 构造请求参数对象
    """生成支付链接。
    out_trade_no:订单号
    subject:订单标题
    body:订单描述信息
    total_amount:订单总金额 单位:元
    goods_detail:list 订单详情

    """
    model = AlipayTradePagePayModel()
    model.out_trade_no = out_trade_no
    model.subject = subject
    model.body = body
    model.total_amount = total_amount
    model.product_code = "FAST_INSTANT_TRADE_PAY"
    model.goods_detail = goods_detail
    request = AlipayTradePagePayRequest(biz_model=model)
    request.notify_url = settings.ALIPAY_CHECKOUT_ORDER
    request.return_url = "https://www.baidu.com"
    # 执行API调用
    return client.page_execute(request, http_method="GET")


def alipay_refund(out_trade_no, refund_amount, refund_reason=None):
    """
    out_trade_no:订单号
    refund_amount:退款金额
    refund_reason:退款原因
    """
    model = AlipayTradeRefundModel()
    model.out_trade_no = out_trade_no
    model.refund_amount = refund_amount
    model.refund_reason = refund_reason
    request = AlipayTradeRefundRequest(biz_model=model)
    response = None
    try:
        response = client.execute(request)
    except Exception as e:
        print(traceback.format_exc())
    return json.loads(response)
