import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLContext } from './context'

const typeDefinitions = /* GraphQL */ `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Mutation {
    postLink(url: String!, description: String!): Link!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`
type Link = {
    id: string
    url: string
    description: string
}

const links: Link[] = [
    {
        id: 'link-0',
        url: 'https://graphql-yoga.com',
        description: 'The easiest way of setting up a GraphQL server'
    }
    , {
        id: 'link-1',
        url: 'https://graphql-yoga.com',
        description: 'The easiest way of setting up a GraphQL server'
    }
]

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (_parent: unknown, _args: {}, context: GraphQLContext) => {
            return context.prisma.link.findMany()
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
        }
    },
    Link: {
        id: (parent: Link) => parent.id,
        description: (parent: Link) => parent.description,
        url: (parent: Link) => parent.url
    }
}

export const schema = makeExecutableSchema({
    resolvers: [resolvers],
    typeDefs: [typeDefinitions]
})
