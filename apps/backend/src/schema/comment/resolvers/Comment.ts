import type { CommentResolvers } from './../../types.generated';
export const Comment: CommentResolvers = {
  /* Implement Comment resolver logic here */
  id: (parent) => parent.id,
  body: (parent) => parent.body,
  link(parent, args, context) {
    return context.prisma.link.findUnique({
      where: {
        id: parseInt(parent.link?.id as string)
      }
    });
  },
  postedBy(parent, args, context) {
    return context.prisma.comment.findUnique({
      where: {
        id: parseInt(parent.postedBy?.id as string)
      }
    }).postedBy();
  }
};