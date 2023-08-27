import { GraphQLContext } from '../../../context';
import type { UserResolvers } from './../../types.generated';
export const User: UserResolvers = {
  /* Implement User resolver logic here */
  id: (parent) => parent.id,
  name: (parent) => parent.name,
  email: (parent) => parent.email,
  links(parent, args: {}, context) {
    return context.prisma.user.findUnique({
      where: {
        id: parseInt(parent.id as string)
      }
    }).links()
  },
  comments(parent, args: {}, context: GraphQLContext) {
    return context.prisma.user.findUnique({
      where: {
        id: parseInt(parent.id as string)
      }
    }).comments()
  }
};