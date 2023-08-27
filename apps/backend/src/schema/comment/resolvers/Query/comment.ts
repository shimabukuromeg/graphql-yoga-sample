import type { QueryResolvers } from './../../../types.generated';
export const comment: NonNullable<QueryResolvers['comment']> = async (_parent, _arg, _ctx) => {
        /* Implement Query.comment resolver logic here */
        const comment = await _ctx.prisma.comment.findUnique({
                where: { id: parseInt(_arg.id) }
        })
        return comment
};