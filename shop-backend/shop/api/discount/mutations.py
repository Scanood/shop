import graphene
from shop.discount.models import Discount
from .types import DiscountInfo, DiscountValueTypeEnum
from graphql_jwt.decorators import staff_member_required
from ..utils import validate_end_is_after_start, generate_unique_slug
from ...product.models import Products
from ...category.models import Category
from django.core.exceptions import ObjectDoesNotExist


class DiscountInput(graphene.InputObjectType):
    name = graphene.String(required=True, description="折扣名称。")
    type = DiscountValueTypeEnum(description="折扣类型。")
    value = graphene.Float(required=True, description="折扣值。")
    products = graphene.List(
        graphene.String, description="要折扣的商品。"
    )
    categories = graphene.List(
        graphene.String,
        description="要折扣的商品种类。",
    )
    start_date = graphene.types.datetime.DateTime(
        description="折扣开始时间。"
    )
    end_date = graphene.types.datetime.DateTime(
        description="折扣结束时间。"
    )


class DiscountCreate(graphene.Mutation):
    success = graphene.Boolean()
    discount = graphene.Field(
        DiscountInfo,
        description="管理员创建折扣。"
    )

    class Arguments:
        input = DiscountInput(required=True, description="创建折扣需要的字段。")

    class Meta:
        description = "管理员创建一个新的折扣信息。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, input):
        start_date = input.get('start_date')
        end_date = input.get('end_date')
        validate_end_is_after_start(start_date, end_date)
        name = input.get('name')
        slug = generate_unique_slug(Discount, name, 'slug')
        discount = Discount.objects.create(
            name=name,
            type=input.get('type'),
            slug=slug,
            value=input.get('value'),
            end_date=end_date
        )
        if start_date:
            discount.start_date = start_date
        products = input.get('products')
        categories = input.get('categories')
        for item in products:
            try:
                product = Products.objects.get(slug=item, is_delete=False)
            except ObjectDoesNotExist:
                raise ValueError(f"slug为{item}的商品信息不存在或已删除。")
            discount.products.add(product)
        for item in categories:
            try:
                catrgory = Category.objects.get(slug=item, is_delete=False)
            except ObjectDoesNotExist:
                raise ValueError(f"slug为{item}的商品种类不存在。")
            discount.categories.add(catrgory)
        discount.save()
        return DiscountCreate(success=True, discount=discount)


class DiscountUpdate(graphene.Mutation):
    success = graphene.Boolean()
    discount = graphene.Field(
        DiscountInfo,
        description="管理员更新折扣。"
    )

    class Arguments:
        input = DiscountInput(required=True, description="更新折扣需要的字段。")
        slug = graphene.String(required=True, description="要更新的折扣的slug。")

    class Meta:
        description = "管理员更新折扣信息。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, slug, input):
        try:
            discount = Discount.objects.get(slug=slug, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError(f"slug为'{slug}'的折扣信息不存在。")
        start_date = input.get('start_date')
        end_date = input.get('end_date')
        validate_end_is_after_start(start_date, end_date)
        type = input.get('type')
        value = input.get('value')
        name = input.get('name')
        if name != discount.name:
            slug = generate_unique_slug(Discount, name, 'slug')
        discount.name = name
        discount.slug = slug
        discount.end_date = end_date
        discount.type = type
        discount.value = value
        if start_date:
            discount.start_date = start_date
        discount.categories.clear()
        discount.products.clear()
        products = input.get('products') or []
        categories = input.get('categories') or []
        for item in products:
            try:
                product = Products.objects.get(slug=item, is_delete=False)
            except ObjectDoesNotExist:
                raise ValueError(f"slug为{item}的商品信息不存在或已删除。")
            discount.products.add(product)
        for item in categories:
            try:
                catrgory = Category.objects.get(slug=item, is_delete=False)
            except ObjectDoesNotExist:
                raise ValueError(f"slug为{item}的商品种类不存在。")
            discount.categories.add(catrgory)
        discount.save()
        return DiscountUpdate(success=True, discount=discount)


class DiscountDelete(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        slug = graphene.String(required=True, description="商品的Slug。")

    class Meta:
        description = "管理员删除折扣信息。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, slug):
        try:
            discount = Discount.objects.get(slug=slug, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError(f"slug为{slug}折扣信息不存在。")
        discount.is_delete = True
        discount.save()
        return DiscountDelete(success=True)
