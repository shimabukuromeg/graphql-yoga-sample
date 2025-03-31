import type { QueryResolvers } from './../../../types.generated';
export const meshi: NonNullable<QueryResolvers['meshi']> = async (
  _parent,
  arg,
  ctx,
) => {
  return ctx.prisma.meshi.findUnique({
    where: {
      id: Number(arg.id),
    },
  });
};
