import graphene


class BasePaginatorType(graphene.ObjectType):
    count = graphene.Int(description="信息的总数。")
    pages = graphene.Int(description="信息的总页数。")
    has_previous = graphene.Boolean(description="是否存在上一页。")
    has_next = graphene.Boolean(description="是否存在下一页。")
    number = graphene.Int(description="当前的页码。")
