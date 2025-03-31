import type { QueryResolvers } from './../../../types.generated';
export const blog: NonNullable<QueryResolvers['blog']> = async (
  _parent,
  arg,
  ctx,
) => {
  const { data } = await ctx.microCms.blog.get({
    id: arg.id,
  });
  return data;
};
