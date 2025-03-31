import { GraphQLError } from 'graphql';
import type { QueryResolvers } from './../../../types.generated';
export const feed: NonNullable<QueryResolvers['feed']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  /* Implement Query.feed resolver logic here */

  const where = _arg.filterNeedle
    ? {
        OR: [
          { description: { contains: _arg.filterNeedle } },
          { url: { contains: _arg.filterNeedle } },
        ],
      }
    : {};

  const take = applyTakeConstraints({
    min: 1,
    max: 50,
    value: _arg.take ?? 30,
  });

  const skip = applySkipConstraints({
    min: 0,
    value: _arg.skip ?? 0,
  });

  return _ctx.prisma.link.findMany({ where, skip, take });
};

const applyTakeConstraints = (params: {
  min: number;
  max: number;
  value: number;
}) => {
  if (params.value < params.min || params.value > params.max) {
    throw new GraphQLError(
      `'take' argument value '${params.value}' is outside the valid range of '${params.min}' to '${params.max}'.`,
    );
  }
  return params.value;
};

const applySkipConstraints = (params: { min: number; value: number }) => {
  if (params.value < params.min) {
    throw new GraphQLError(
      `'skip' argument value '${params.value}' is outside the valid range of '${params.min}'.`,
    );
  }
  return params.value;
};
