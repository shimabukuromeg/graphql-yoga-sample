import { GraphQLContext } from '../../../context';
import type { LinkResolvers } from './../../types.generated';
export const Link: LinkResolvers = {
  /* Implement Link resolver logic here */
  id: (parent) => parent.id,
  description: (parent) => parent.description,
  url: (parent) => parent.url,
  comments(parent, args: {}, context) {
    return context.prisma.comment.findMany({
      where: {
        linkId: parseInt(parent.id as string)
      }
    })
  },
  postedBy(parent, args: {}, context) {
    return context.prisma.link.findUnique({
      where: {
        id: parseInt(parent.id as string)
      }
    }).postedBy()
  }
};