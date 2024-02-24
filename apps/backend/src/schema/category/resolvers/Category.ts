import type { CategoryResolvers } from './../../types.generated';
export const Category: CategoryResolvers = {
  blogs: async (parent, arg, ctx) => {
    const { data } = await ctx.microCms.blog.list({
      filters: `category[equals]${parent.id}`
    })
    return data.contents
  }
};