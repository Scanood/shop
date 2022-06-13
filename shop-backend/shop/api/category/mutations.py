import graphene

from shop.product.models import Products
from .types import CategoryType
from graphene_file_upload.scalars import Upload
from graphql_jwt.decorators import staff_member_required
from ..utils import add_hash_to_file_name, valid_upload_image, generate_unique_slug
from ...category.models import Category
from django.core.exceptions import ObjectDoesNotExist


class CategoryBaseMutation(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        name = graphene.String(required=True, description="种类名称。")
        description = graphene.String(description="种类的描述。")
        background_image = Upload(description="种类的背景图片。")
        parent_slug = graphene.String(description="父级种类的slug。")

    @classmethod
    def valid_info(cls, root, info, **data):
        if data.get("background_image"):
            image_data = data['background_image']
            valid_upload_image(image_data)
            add_hash_to_file_name(image_data)
        parent = None
        slug = data.get("parent_slug")
        if slug:
            try:
                parent = Category.objects.get(slug=slug, is_delete=False)
            except ObjectDoesNotExist:
                raise ValueError("父级种类不存在或已删除！")
            if parent.parent:
                raise ValueError("二级种类不可继续创建子种类！")
        return parent

    @classmethod
    def mutate(cls, root, info, **data):
        pass


class CategoryCreate(CategoryBaseMutation):
    category = graphene.Field(CategoryType, description="创建的新的种类！")

    class Meta:
        description = "管理员创建一个新的产品种类。"

    @classmethod
    def save(cls, root, info, parent, **data):
        name = data.get("name")
        slug = generate_unique_slug(Category, name, "slug")
        category = Category.objects.create(
            name=name,
            slug=slug,
            description=data.get("description"),
            background_image=data.get("background_image"),
            parent=parent
        )
        category.save()
        return category

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, **data):
        parent = cls.valid_info(root, info, **data)
        category = cls.save(root, info, parent, **data)
        return CategoryCreate(success=True, category=category)


class CategoryDelete(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        slug = graphene.String(required=True, description="要删除的种类的Slug。")

    class Meta:
        description = "管理员根据一个slug删除一个种类。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, slug):
        try:
            category = Category.objects.get(slug=slug, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError("要删除的商品种类不存在！")
        category.is_delete = True
        # 父级种类删除子类一并删除
        if category.children.filter(is_delete=False).count() > 0:
            category.children.filter(is_delete=False).update(is_delete=True)
        category.save()
        # 对应种类下的商品也一并删除
        Products.objects.filter(
            category__is_delete=True).update(is_delete=True)

        return CategoryDelete(success=True)


class CategoryUpdate(CategoryBaseMutation):
    category = graphene.Field(CategoryType, description="更新后的种类信息。")

    class Arguments:
        name = graphene.String(required=True, description="种类名称。")
        description = graphene.String(description="种类的描述。")
        background_image = Upload(description="种类的背景图片。")
        slug = graphene.String(description="种类的slug。")
        parent_slug = graphene.String(description="父级种类的slug。")

    class Meta:
        description = "管理员更新一个新的产品种类。"

    @classmethod
    def save(cls, root, info, parent, **data):
        name = data.get("name")
        slug = data.get("slug")
        parent_slug = data.get("parent_slug")
        if slug == parent_slug:
            raise ValueError("父级种类设置错误，请重新设置！")
        try:
            category = Category.objects.get(slug=slug, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError("要更新的种类不存在或已删除！")
        if category.children.count() > 0 and parent_slug != "" and parent_slug is not None:
            raise ValueError("一级种类不可以设置父级种类。")

        """
        传入parent_slug
            与数据库不同，则修改
            与数据库相同，保持
        不传入parent_slug或parent_slug==""
            修改为None
        """
        if not parent_slug or parent_slug == "":
            category.parent = None
        else:
            category.parent = parent

        if category.name != name:
            slug = generate_unique_slug(Category, name, "slug")
        category.name = name
        category.slug = slug
        category.description = data.get("description")
        if data.get("background_image"):
            category.background_image = data.get("background_image")
        category.save()
        return category

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, **data):
        parent = cls.valid_info(root, info, **data)
        category = cls.save(root, info, parent, **data)
        return CategoryUpdate(success=True, category=category)
