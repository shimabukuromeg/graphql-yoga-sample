import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLContext } from './context'

const typeDefinitions = /* GraphQL */ `
  type Query {
    info: String!
    feed: [Link!]!
    comment(id: ID!): Comment
    link(id: ID): Link
  }

  type Mutation {
    postLink(url: String!, description: String!): Link!
    postCommentOnLink(linkId: ID!, body: String!): Comment!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
    comments: [Comment!]!
  }

type Comment {
  id: ID!
  body: String!
  link: Link
}
`
type Link = {
    id: string
    url: string
    description: string
}

type Comment = {
    id: string
    body: string
    linkId: string
}

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (_parent: unknown, _args: {}, context: GraphQLContext) => {
            return context.prisma.link.findMany()
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
            const newComment = await context.prisma.comment.create({
                data: {
                    linkId: parseInt(args.linkId),
                    body: args.body
                }
            })

            return newComment
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
        }
    }
}

export const schema = makeExecutableSchema({
    resolvers: [resolvers],
    typeDefs: [typeDefinitions]
})
