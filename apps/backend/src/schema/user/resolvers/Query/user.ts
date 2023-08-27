import type { QueryResolvers } from './../../../types.generated';
export const user: NonNullable<QueryResolvers['user']> = async (_parent, _arg, _ctx) => {
        /* Implement Query.user resolver logic here */
        const user = await _ctx.prisma.user.findUnique({
                where: { id: parseInt(_arg.id) }
        })
        return user
};