import graphene
from graphql_jwt.decorators import login_required
from ...product.models import Products
from django.core.exceptions import ObjectDoesNotExist
from ...collection.models import Collection


class AddCollection(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        slug = graphene.String(required=True, description="产品的Slug。")

    class Meta:
        description = "商品添加收藏。"

    @classmethod
    @login_required
    def mutate(cls, root, info, slug):
        try:
            product = Products.objects.get(
                slug=slug, is_delete=False, published=True)
        except ObjectDoesNotExist:
            raise ValueError("商品不存在或未上架。")
        user = info.context.user
        collection = Collection.objects.create(
            user=user,
            product=product
        )
        collection.save()
        return AddCollection(success=True)


class CancelCollection(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        slug = graphene.String(required=True, description="商品的Slug。")

    class Meta:
        description = "取消商品收藏。"

    @classmethod
    @login_required
    def mutate(cls, root, info, slug):
        try:
            product = Products.objects.get(slug=slug)
        except ObjectDoesNotExist:
            raise ValueError("商品不存在或未上架。")
        user = info.context.user
        Collection.objects.filter(user=user, product=product).delete()
        return CancelCollection(success=True)
