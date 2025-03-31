import type { MutationResolvers } from './../../../types.generated';
import { GraphQLError } from 'graphql';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const parseIntSafe = (value: string): number | null => {
  if (/^(\d+)$/.test(value)) {
    return Number.parseInt(value, 10);
  }
  return null;
};

export const postCommentOnLink: NonNullable<
  MutationResolvers['postCommentOnLink']
> = async (parent, arg, ctx) => {
  /* Implement Mutation.postCommentOnLink resolver logic here */
  const linkId = parseIntSafe(arg.linkId);
  if (linkId === null) {
    return Promise.reject(
      new GraphQLError(
        `Cannot post comment on non-existing link with id '${arg.linkId}'.`,
      ),
    );
  }

  const comment = await ctx.prisma.comment
    .create({
      data: {
        body: arg.body,
        linkId: Number.parseInt(arg.linkId),
      },
    })
    .catch((err: unknown) => {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2003'
      ) {
        return Promise.reject(
          new GraphQLError(
            `Cannot post comment on non-existing link with id '${arg.linkId}'.`,
          ),
        );
      }
      return Promise.reject(err);
    });

  return comment;
};
