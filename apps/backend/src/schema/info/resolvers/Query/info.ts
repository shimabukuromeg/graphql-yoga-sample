import type { QueryResolvers } from './../../../types.generated';
export const info: NonNullable<QueryResolvers['info']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  /* Implement Query.info resolver logic here */
  const info = 'This is the API of a Hackernews Clone';
  return info;
};
