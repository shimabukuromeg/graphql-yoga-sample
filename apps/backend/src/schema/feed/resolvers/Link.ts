import type { LinkResolvers } from './../../types.generated';
export const Link: LinkResolvers = {
  comments(parent, args, context) {
    return context.prisma.comment.findMany({
      where: {
        linkId: parent.id,
      },
    });
  },
  postedBy(parent, _args, context) {
    return context.prisma.link
      .findUnique({
        where: {
          id: parent.userId,
        },
      })
      .postedBy();
  },
};
