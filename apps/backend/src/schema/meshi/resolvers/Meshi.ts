import type { MeshiResolvers } from './../../types.generated'
export const Meshi: MeshiResolvers = {
  municipality: (parent, arg, ctx) => {
    return ctx.prisma.meshi
      .findUnique({
        where: { id: parent.id },
      })
      .municipality()
  },
}
