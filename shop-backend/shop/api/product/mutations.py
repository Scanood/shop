import graphene
from graphene_file_upload.scalars import Upload
from graphql_jwt.decorators import staff_member_required
from ...category.models import Category
from django.core.exceptions import ObjectDoesNotExist
from ..utils import (
    add_hash_to_file_name,
    valid_upload_image,
    generate_unique_slug
)
from .types import ProductsType, ProductVariantsType
from ...product.models import Products, ProductVariants


# product


class ProductInput(graphene.InputObjectType):
    name = graphene.String(required=True, description="商品名称。")
    description = graphene.String(description="商品描述。")
    category_slug = graphene.String(required=True, description="种类的Slug。")
    product_image = Upload(description="商品图片。")


class BaseProductMutation(graphene.Mutation):
    success = graphene.Boolean()
    product = graphene.Field(ProductsType, description="变更之后的商品信息。")

    @classmethod
    def search_category(cls, root, info, input):
        category_slug = input.get('category_slug')
        try:
            category = Category.objects.get(
                slug=category_slug, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError("所选种类不存在或已删除。")
        return category

    @classmethod
    def valid_info(cls, root, info, input):
        if input.get("product_image") is not None:
            image_data = input.get("product_image")
            valid_upload_image(image_data)
            add_hash_to_file_name(image_data)

    @classmethod
    def mutate(cls, root, info, **data):
        pass


class ProductCreate(BaseProductMutation):
    class Arguments:
        input = ProductInput(required=True, description="产品信息。")

    class Meta:
        description = "管理员创建一个新的产品。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, input):
        cls.valid_info(root, info, input)
        category = cls.search_category(root, info, input)
        name = input.get('name')
        slug = generate_unique_slug(Products, name, "slug")
        product = Products.objects.create(
            name=name,
            slug=slug,
            description=input.get('description'),
            product_image=input.get('product_image'),
            category=category
        )
        product.save()
        return ProductCreate(success=True, product=product)


class ProductUpdate(BaseProductMutation):
    class Arguments:
        input = ProductInput(required=True, description="产品信息。")
        slug = graphene.String(required=True, description="商品的Slug。")

    class Meta:
        description = "管理员修改一个产品。"

    @classmethod
    def search_product(cls, root, info, slug):
        try:
            product = Products.objects.get(slug=slug, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError("商品找不到或已删除。")
        return product

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, input, slug):
        cls.valid_info(root, info, input)
        category = cls.search_category(root, info, input)
        product = cls.search_product(root, info, slug)
        name = input.get('name')
        if product.name != name:
            slug = generate_unique_slug(Products, name, "slug")
        product.name = name
        product.slug = slug
        product.description = input.get('description')
        if input.get('product_image'):
            product.product_image = input.get('product_image')
        product.category = category
        product.save()
        return ProductUpdate(success=True, product=product)


class ProductDelete(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        slug = graphene.String(required=True, description="要删除的商品的slug。")

    class Meta:
        description = "管理员删除一个产品。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, slug):
        try:
            product = Products.objects.get(slug=slug, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError("商品找不到或已删除。")
        product.is_delete = True
        product.save()
        return ProductDelete(success=True)


class ProductPublish(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        slug = graphene.String(required=True, description="要上架的商品信息。")

    class Meta:
        description = "管理员上架一个产品。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, slug):
        try:
            product = Products.objects.get(slug=slug, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError("商品找不到或已删除。")
        if product.productVariants.filter(is_delete=False).count() == 0:
            raise ValueError("缺少商品规格信息，商品无法上架。")
        else:
            product.published = True
            product.save()
        return ProductPublish(success=True)


class ProductUnpublish(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        slug = graphene.String(required=True, description="要下架的商品信息。")

    class Meta:
        description = "管理员下架一个产品。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, slug):
        try:
            product = Products.objects.get(slug=slug, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError("商品找不到或已删除。")
        product.published = False
        product.save()
        return ProductUnpublish(success=False)


# productVariant


class ProductVariantInput(graphene.InputObjectType):
    product_slug = graphene.String(required=True, description="商品ID。")
    name = graphene.String(required=True, description="商品规格名称。")
    price = graphene.Float(required=True, description="商品规格价格。")
    stock = graphene.Int(required=True, description="商品规格库存。")
    description = graphene.String(description="商品规格描述。")
    productVariant_image = Upload(description="商品规格图片。")


class BaseProductVariantMutation(graphene.Mutation):
    success = graphene.Boolean()
    productVariant = graphene.Field(
        ProductVariantsType, description="变更新的商品规格信息。")

    @classmethod
    def valid_info(cls, root, info, input):
        if input.get('productVariant_image'):
            image_data = input.get('productVariant_image')
            valid_upload_image(image_data)
            add_hash_to_file_name(image_data)
        if input.get('price') and input.get('price') < 0:
            raise ValueError("价格信息不能小于0。")
        if input.get('stock') and input.get('stock') < 0:
            raise ValueError("库存信息不能小于0。")

    @classmethod
    def search_product(cls, root, info, input):
        slug = input.get('product_slug')
        try:
            product = Products.objects.get(slug=slug, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError(f"找不到slug为{slug}的商品信息。")
        return product

    @classmethod
    def mutate(cls, root, info, input):
        pass


class ProductVariantCreate(BaseProductVariantMutation):
    class Arguments:
        input = ProductVariantInput(required=True, description="商品规格信息。")

    class Meta:
        description = "管理员添加商品规格。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, input):
        cls.valid_info(root, info, input)
        product = cls.search_product(root, info, input)
        name = input.get('name')
        slug = generate_unique_slug(ProductVariants, name, "slug")
        productVariant = ProductVariants.objects.create(
            product=product,
            name=name,
            slug=slug,
            price=round(input.get('price'), 2),
            stock=input.get('stock'),
            description=input.get('description'),
            productVariant_image=input.get('productVariant_image')
        )
        productVariant.save()
        return ProductVariantCreate(success=True, productVariant=productVariant)


class ProductVariantUpdate(BaseProductVariantMutation):
    class Arguments:
        input = ProductVariantInput(required=True, description="商品规格的详细信息。")
        slug = graphene.String(required=True, description="要修改的子商品的Slug。")

    class Meta:
        description = "管理员更新商品规格。"

    @classmethod
    def search_productVariant(cls, root, info, slug):
        try:
            productVariant = ProductVariants.objects.select_related('product').get(
                slug=slug, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError(f"找不到slug为{slug}的商品规格。")
        return productVariant

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, input, slug):
        productVariant = cls.search_productVariant(root, info, slug)
        if productVariant.product.slug != input.get('product_slug'):
            product_id = cls.search_product(root, info, input).pk
        else:
            product_id = productVariant.product.id
        cls.valid_info(root, info, input)
        name = input.get('name')
        if productVariant.name != name:
            slug = generate_unique_slug(ProductVariants, name, "slug")
        productVariant.name = name
        productVariant.slug = slug
        productVariant.price = round(input.get('price'), 2)
        productVariant.stock = input.get('stock')
        productVariant.description = input.get('description')
        if input.get('productVariant_image'):
            productVariant.productVariant_image = input.get('productVariant_image')
        productVariant.product_id = product_id
        productVariant.save()
        return ProductVariantUpdate(success=True, productVariant=productVariant)


class ProductVariantDelete(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        slug = graphene.String(required=True, description="要删除的商品规格的slug。")

    class Meta:
        description = "管理员删除商品规格。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, slug):
        try:
            productVariant = ProductVariants.objects.select_related('product').get(
                slug=slug, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError(f"找不到slug为{slug}的商品规格。")
        product = productVariant.product
        productVariant.is_delete = True
        productVariant.save()

        # 若商品规格为0 则当前商品下架

        if product.productVariants.filter(is_delete=False).count() == 0:
            product.published = False
            product.save()
        return ProductVariantDelete(success=True)
