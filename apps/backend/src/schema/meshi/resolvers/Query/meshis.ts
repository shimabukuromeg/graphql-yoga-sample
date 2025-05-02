import type { QueryResolvers } from './../../../types.generated'
export const meshis: NonNullable<QueryResolvers['meshis']> = async (
  _parent,
  _arg,
  ctx,
) => {
  return ctx.prisma.meshi.findMany({
    orderBy: {
      publishedDate: 'desc',
    },
  })
}
