import { createServer } from 'http'
import { createYoga, createSchema } from 'graphql-yoga'
import { createContext } from './context'
import { typeDefs } from './schema/typeDefs.generated'
import { resolvers } from './schema/resolvers.generated'
import { applyMiddleware } from "graphql-middleware"

// fastify 導入した。
// 参考: https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-fastify
import fastify, { FastifyReply, FastifyRequest } from 'fastify'



function main() {
    // This is the fastify instance you have created
    const app = fastify({ logger: true })

    // TODO: スキーマ読み込み
    const yoga = createYoga<{
        req: FastifyRequest
        reply: FastifyReply
    }>({
        schema: applyMiddleware(createSchema({
            typeDefs, resolvers
        })),
        context: createContext,
        // Integrate Fastify logger
        logging: {
            debug: (...args) => args.forEach(arg => app.log.debug(arg)),
            info: (...args) => args.forEach(arg => app.log.info(arg)),
            warn: (...args) => args.forEach(arg => app.log.warn(arg)),
            error: (...args) => args.forEach(arg => app.log.error(arg))
        }
    })


    app.route({
        // Bind to the Yoga's endpoint to avoid rendering on any path
        url: yoga.graphqlEndpoint,
        method: ['GET', 'POST', 'OPTIONS'],
        handler: async (req, reply) => {
            // Second parameter adds Fastify's `req` and `reply` to the GraphQL Context
            const response = await yoga.handleNodeRequest(req, {
                req,
                reply
            })
            response.headers.forEach((value, key) => {
                reply.header(key, value)
            })

            reply.status(response.status)

            reply.send(response.body)

            return reply
        }
    })

    console.info("starting http server")
    app.listen({ port: 4000 }, (err, address) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.info(`server listening on ${address}`)
    })
}

main()



