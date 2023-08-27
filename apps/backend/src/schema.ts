import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLContext } from './context'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { GraphQLError } from 'graphql'


const typeDefinitions = /* GraphQL */ `
  type Query {
  }
`

type Link = {
    id: string
    url: string
    description: string
    postedById: string
}

type Comment = {
    id: string
    body: string
    linkId: string
    authorId: string
}

type User = {
    id: string
    name: string
    email: string
    links: Link[]
    comments: Comment[]
}


const parseIntSafe = (value: string): number | null => {
    if (/^(\d+)$/.test(value)) {
        return parseInt(value, 10)
    }
    return null
}

const applyTakeConstraints = (params: { min: number; max: number; value: number }) => {
    if (params.value < params.min || params.value > params.max) {
        throw new GraphQLError(
            `'take' argument value '${params.value}' is outside the valid range of '${params.min}' to '${params.max}'.`
        )
    }
    return params.value
}

const applySkipConstraints = (params: { min: number; value: number }) => {
    if (params.value < params.min) {
        throw new GraphQLError(
            `'skip' argument value '${params.value}' is outside the valid range of '${params.min}'.`
        )
    }
    return params.value
}

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (_parent: unknown,
            args: { filterNeedle?: string; skip?: number; take?: number },
            context: GraphQLContext) => {



            const where = args.filterNeedle
                ? {
                    OR: [
                        { description: { contains: args.filterNeedle } },
                        { url: { contains: args.filterNeedle } }
                    ]
                }
                : {}

            const take = applyTakeConstraints({
                min: 1,
                max: 50,
                value: args.take ?? 30
            })

            const skip = applySkipConstraints({
                min: 0,
                value: args.skip ?? 0
            })

            return context.prisma.link.findMany({ where, skip, take })
        },
        async comment(parent: unknown, args: { id: string }, context: GraphQLContext) {
            const comment = await context.prisma.comment.findUnique({
                where: { id: parseInt(args.id) }
            })
            return comment
        },
        async link(parent: unknown, args: { id: string }, context: GraphQLContext) {
            const link = await context.prisma.link.findUnique({
                where: { id: parseInt(args.id) }
            })
            return link
        },
        async user(parent: unknown, args: { id: string }, context: GraphQLContext) {
            const user = await context.prisma.user.findUnique({
                where: { id: parseInt(args.id) }
            })
            return user
        },
        async users(parent: unknown, args: {}, context: GraphQLContext) {
            const users = await context.prisma.user.findMany()
            return users
        }
    },
    Mutation: {
        postLink: async (parent: unknown, args: { description: string; url: string }, context: GraphQLContext) => {


            const newLink = await context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description,
                }
            })

            return newLink
        },
        async postCommentOnLink(
            parent: unknown,
            args: { linkId: string; body: string },
            context: GraphQLContext
        ) {
            const linkId = parseIntSafe(args.linkId)
            if (linkId === null) {
                return Promise.reject(
                    new GraphQLError(`Cannot post comment on non-existing link with id '${args.linkId}'.`)
                )
            }

            const comment = await context.prisma.comment
                .create({
                    data: {
                        body: args.body,
                        linkId: parseInt(args.linkId)
                    }
                })
                .catch((err: unknown) => {
                    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2003') {
                        return Promise.reject(
                            new GraphQLError(`Cannot post comment on non-existing link with id '${args.linkId}'.`)
                        )
                    }
                    return Promise.reject(err)
                })

            return comment
        }
    },
    Link: {
        id: (parent: Link) => parent.id,
        description: (parent: Link) => parent.description,
        url: (parent: Link) => parent.url,
        comments(parent: Link, args: {}, context: GraphQLContext) {
            return context.prisma.comment.findMany({
                where: {
                    linkId: parseInt(parent.id)
                }
            })
        },
        postedBy(parent: Link, args: {}, context: GraphQLContext) {
            return context.prisma.link.findUnique({
                where: {
                    id: parseInt(parent.id)
                }
            }).postedBy()
        }
    },
    Comment: {
        id: (parent: Comment) => parent.id,
        body: (parent: Comment) => parent.body,
        link(parent: Comment, args: {}, context: GraphQLContext) {
            return context.prisma.link.findUnique({
                where: {
                    id: parseInt(parent.linkId)
                }
            })
        },
        postedBy(parent: Comment, args: {}, context: GraphQLContext) {
            return context.prisma.comment.findUnique({
                where: {
                    id: parseInt(parent.id)
                }
            }).postedBy()
        }
    },
    User: {
        id: (parent: User) => parent.id,
        name: (parent: User) => parent.name,
        email: (parent: User) => parent.email,
        links(parent: User, args: {}, context: GraphQLContext) {
            return context.prisma.user.findUnique({
                where: {
                    id: parseInt(parent.id)
                }
            }).links()
        },
        comments(parent: User, args: {}, context: GraphQLContext) {
            return context.prisma.user.findUnique({
                where: {
                    id: parseInt(parent.id)
                }
            }).comments()
        }
    }
}

export const schema = makeExecutableSchema({
    resolvers: [resolvers],
    typeDefs: [typeDefinitions]
})
