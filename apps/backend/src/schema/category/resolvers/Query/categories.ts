import type { QueryResolvers } from './../../../types.generated';
export const categories: NonNullable<QueryResolvers['categories']> = async (
  _parent,
  _arg,
  ctx,
) => {
  const { data } = await ctx.microCms.category.list({});
  return data.contents;
};
