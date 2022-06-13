import graphene
from ..basetype import BasePaginatorType
from .types import ProductsType, ProductVariantsType
from .resolvers import (
    resolve_products_published,
    resolve_product_category_published,
    resolve_product_slug_published,
    resolve_products,
    resolve_product_category,
    resolve_product_slug,
    resolve_productVariants,
    resolve_variant_slug,
    resolve_search_published_products)
from graphql_jwt.decorators import staff_member_required
from .mutations import (
    ProductCreate,
    ProductDelete,
    ProductPublish,
    ProductUnpublish,
    ProductUpdate,
    ProductVariantCreate,
    ProductVariantUpdate,
    ProductVariantDelete
)
# Paginator Type


class productsInfo(BasePaginatorType):
    products = graphene.List(ProductsType, description="商品信息。")


class ProductVariantInfo(BasePaginatorType):
    productVariants = graphene.List(ProductVariantsType, description="商品子条目。")


class ProductQueries(graphene.ObjectType):
    products_published = graphene.Field(
        productsInfo,
        per_count=graphene.Int(required=True, description="每页展示的商品信息数量。"),
        number=graphene.Int(description="当前要查询的页码。", default_value=1),
        description="查询所有的商品信息。")

    product_category_published = graphene.Field(
        productsInfo,
        slug=graphene.String(required=True, description="种类的Slug。"),
        per_count=graphene.Int(required=True, description="每页展示的商品信息数量。"),
        number=graphene.Int(description="当前要查询的页码。", default_value=1),
        description="根据种类的slug查询该种类下的商品。")

    product_slug_published = graphene.Field(
        ProductsType,
        slug=graphene.String(required=True, description="商品的Slug。"),
        description="根据商品的Slug查询商品信息。")

    products = graphene.Field(
        productsInfo,
        per_count=graphene.Int(required=True, description="每页展示的商品信息数量。"),
        number=graphene.Int(description="当前要查询的页码。", default_value=1),
        keyword=graphene.String(description="产品名称的关键字。",
                                required=False, default_value=""),
        description="查询所有的商品信息。")

    product_category = graphene.Field(
        productsInfo,
        slug=graphene.String(required=True, description="种类的Slug。"),
        per_count=graphene.Int(required=True, description="每页展示的商品信息数量。"),
        number=graphene.Int(description="当前要查询的页码。", default_value=1),
        description="根据种类的slug查询该种类下的商品。")

    product_slug = graphene.Field(
        ProductsType,
        slug=graphene.String(required=True, description="商品的Slug。"),
        description="根据商品的Slug查询商品信息。")
    productVariants = graphene.Field(
        ProductVariantInfo,
        slug=graphene.String(required=True, description="商品的Slug。"),
        per_count=graphene.Int(required=True, description="每页展示的商品信息数量。"),
        number=graphene.Int(description="当前要查询的页码。", default_value=1),
        description="根据商品的Slug查询商品子条目的信息。")
    variant_slug = graphene.Field(
        ProductVariantsType,
        slug=graphene.String(required=True, description="商品子条目的Slug。"),
        description="根据商品条目的Slug查询商品条目的信息。"
    )
    search_published_products = graphene.Field(
        productsInfo,
        keyword=graphene.String(required=True, description="要查找的关键词。"),
        per_count=graphene.Int(required=True, description="每页展示的商品信息数量。"),
        number=graphene.Int(description="当前要查询的页码。", default_value=1),
        description="根据商品的名称查找已发布的相关商品。"
    )

    def resolve_products_published(self, info, per_count, number):
        return resolve_products_published(per_count, number)

    def resolve_product_category_published(self, info, slug, per_count, number):
        return resolve_product_category_published(slug, per_count, number)

    def resolve_product_slug_published(self, info, slug):
        return resolve_product_slug_published(slug)

    @staff_member_required
    def resolve_products(self, info, per_count, number, keyword):
        return resolve_products(per_count, number, keyword)

    @staff_member_required
    def resolve_product_category(self, info, slug, per_count, number):
        return resolve_product_category(slug, per_count, number)

    @staff_member_required
    def resolve_product_slug(self, info, slug):
        return resolve_product_slug(slug)

    def resolve_productVariants(self, info, slug, per_count, number):
        return resolve_productVariants(slug, per_count, number)

    def resolve_variant_slug(self, info, slug):
        return resolve_variant_slug(slug)

    def resolve_search_published_products(self, info, keyword, per_count, number):
        return resolve_search_published_products(keyword, per_count, number)


class ProductMutations(graphene.ObjectType):
    ProductCreate = ProductCreate.Field()
    ProductDelete = ProductDelete.Field()
    ProductUpdate = ProductUpdate.Field()
    ProductPublish = ProductPublish.Field()
    ProductUnpublish = ProductUnpublish.Field()

    ProductVariantCreate = ProductVariantCreate.Field()
    ProductVariantUpdate = ProductVariantUpdate.Field()
    ProductVariantDelete = ProductVariantDelete.Field()
