import type { QueryResolvers } from './../../../types.generated';
export const municipalities: NonNullable<QueryResolvers['municipalities']> =
  async (_parent, _arg, ctx) => {
    return ctx.prisma.municipality.findMany();
  };
