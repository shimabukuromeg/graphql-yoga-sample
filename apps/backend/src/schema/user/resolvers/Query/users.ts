import type { QueryResolvers } from './../../../types.generated';
export const users: NonNullable<QueryResolvers['users']> = async (_parent, _arg, _ctx) => {
        /* Implement Query.users resolver logic here */
        const users = await _ctx.prisma.user.findMany()
        return users
};