import type { QueryResolvers } from './../../../types.generated'
export const municipality: NonNullable<QueryResolvers['municipality']> = async (
  parent,
  arg,
  ctx,
) => {
  return await ctx.prisma.municipality.findUnique({
    where: { id: Number.parseInt(arg.id) },
  })
}
