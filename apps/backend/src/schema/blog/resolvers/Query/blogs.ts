import type { QueryResolvers } from './../../../types.generated';
export const blogs: NonNullable<QueryResolvers['blogs']> = async (_parent, arg, ctx) => {
        const { data } = await ctx.microCms.blog.list({
        })
        return data.contents
};
