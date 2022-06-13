import graphene
from ...checkout.models import Checkout, CheckoutLine
from graphql_jwt.decorators import login_required
from ...product.models import ProductVariants
from django.core.exceptions import ObjectDoesNotExist


class AddVariantToCheckout(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        variant_slug = graphene.String(
            required=True, description="商品子条目的Slug。")
        quantity = graphene.Int(required=True, description="商品子条目的数量。")

    class Meta:
        description = "将商品添加到购物车。"

    @classmethod
    @login_required
    def mutate(cls, root, info, variant_slug, quantity):
        user = info.context.user
        if quantity <= 0:
            raise ValueError("商品数量必须大于1")
        try:
            variant = ProductVariants.objects.get(
                slug=variant_slug, is_delete=False)
            product = variant.product
            if product.is_delete == True or product.published == False:
                raise ValueError("商品不存在或未上架。")
        except ObjectDoesNotExist:
            raise ValueError("商品条目不存在或已删除。")
        checkout, _ = Checkout.objects.get_or_create(user=user)
        line, line_created = CheckoutLine.objects.get_or_create(
            variant=variant, checkout=checkout)
        if line_created:
            line.quantity = quantity
        else:
            line.quantity = line.quantity + quantity
            quantity = line.quantity
        if quantity > variant.stock:
            if line_created:
                line.delete()
            raise ValueError("商品数量超出库存容量。")
        line.save()
        return AddVariantToCheckout(success=True)


class DeleteVariantInCheckout(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        id = graphene.ID(required=True, description="要删除的购物车商品ID。")

    class Meta:
        description = "删除购物车中的商品。"

    @classmethod
    @login_required
    def mutate(cls, root, info, id):
        user = info.context.user
        checkout, created = Checkout.objects.get_or_create(user=user)
        if created:
            raise ValueError("购物车中不存在该商品。")
        try:
            checkout.lines.get(pk=id).delete()
        except ObjectDoesNotExist:
            raise ValueError("购物车中不存在该商品。")
        return DeleteVariantInCheckout(success=True)


class UpdateVariantInCheckout(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        id = graphene.ID(required=True, description="要修改的购物车商品ID。")
        quantity = graphene.Int(required=True, description="新的商品数量。")

    class Meta:
        description = "更新加入购物车单个商品的数量。"

    @classmethod
    @login_required
    def mutate(cls, root, info, id, quantity):
        user = info.context.user
        if quantity <= 0:
            raise ValueError("商品数量必须大于1")
        checkout, created = Checkout.objects.get_or_create(user=user)
        if created:
            raise ValueError("购物车中不存在该商品。")
        try:
            line = checkout.lines.select_related('variant').get(pk=id)
        except ObjectDoesNotExist:
            raise ValueError("购物车中不存在该商品。")
        variant = line.variant
        if quantity > variant.stock:
            raise ValueError("库存不足，无法更新。")
        line.quantity = quantity
        line.save()
        return UpdateVariantInCheckout(success=True)


class ClearCheckout(graphene.Mutation):
    success = graphene.Boolean()

    class Meta:
        description = "清空购物车中的所有商品。"

    @classmethod
    @login_required
    def mutate(cls, root, info):
        user = info.context.user
        checkout, created = Checkout.objects.get_or_create(user=user)
        if not created:
            checkout.lines.all().delete()
        return ClearCheckout(success=True)
