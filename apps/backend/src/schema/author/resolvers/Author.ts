import type { AuthorResolvers } from './../../types.generated';
export const Author: AuthorResolvers = {
  blogs: async (parent, arg, ctx) => {
    const { data } = await ctx.microCms.blog.list({
      filters: `author[equals]${parent.id}`,
    });
    return data.contents;
  },
};
