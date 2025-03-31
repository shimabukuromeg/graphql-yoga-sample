import type { BlogResolvers } from './../../types.generated';
export const Blog: BlogResolvers = {
  /* Implement Blog resolver logic here */
  author: async (parent, arg, ctx) => {
    /* Blog.author resolver is required because Blog.author and Blog_Mapper.author are not compatible */
    const { data } = await ctx.microCms.author.get({
      id: parent.author.id,
    });
    return data;
  },
  category: async (parent, arg, ctx) => {
    const { data } = await ctx.microCms.category.get({
      id: parent.category.id,
    });
    return data;
  },
};
