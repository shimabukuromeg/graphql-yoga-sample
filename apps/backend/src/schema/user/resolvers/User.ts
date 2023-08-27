import { GraphQLContext } from '../../../context';
import type { UserResolvers } from './../../types.generated';
export const User: UserResolvers = {
  comments: (parent, arg, ctx) => { /* User.comments resolver is required because User.comments exists but User_Mapper.comments does not */
    return ctx.prisma.user.findUnique({
      where: {
        id: parent.id
      }
    }).comments()
  },
  links: (parent, arg, ctx) => { /* User.links resolver is required because User.links exists but User_Mapper.links does not */
    return ctx.prisma.user.findUnique({
      where: {
        id: parent.id
      }
    }).links()
  }
};
