import type { QueryResolvers } from './../../../types.generated';
export const link: NonNullable<QueryResolvers['link']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  /* Implement Query.link resolver logic here */
  const link = await _ctx.prisma.link.findUnique({
    where: { id: Number.parseInt(_arg.id) },
  });
  return link;
};
