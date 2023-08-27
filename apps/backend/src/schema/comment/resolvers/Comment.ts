import type { CommentResolvers } from './../../types.generated';
export const Comment: CommentResolvers = {
  link(parent, args, context) {
    return context.prisma.link.findUnique({
      where: {
        id: parent.linkId
      }
    });
  },
  postedBy(parent, args, context) {
    return context.prisma.comment.findUnique({
      where: {
        id: parent.userId
      }
    }).postedBy();
  }
};