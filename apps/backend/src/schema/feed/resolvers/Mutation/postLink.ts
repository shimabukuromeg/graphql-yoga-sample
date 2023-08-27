import type { MutationResolvers } from './../../../types.generated';
export const postLink: NonNullable<MutationResolvers['postLink']> = async (_parent, _arg, _ctx) => {
        /* Implement Mutation.postLink resolver logic here */
        const newLink = await _ctx.prisma.link.create({
                data: {
                        url: _arg.url,
                        description: _arg.description,
                }
        })

        return newLink
};