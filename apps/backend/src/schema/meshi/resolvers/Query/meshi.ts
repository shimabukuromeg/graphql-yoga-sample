import type { QueryResolvers } from './../../../types.generated';
export const meshi: NonNullable<QueryResolvers['meshi']> = async (_parent, _arg, ctx) => {
        return ctx.prisma.meshi.findUnique({
                where: {
                        id: _arg.id
                }
        })
};