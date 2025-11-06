import z from 'zod'
import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const healthRoute: FastifyPluginAsyncZod = async (
  fastify: FastifyInstance
) => {
  fastify.route({
    method: 'GET',
    url: '/health',
    logLevel: 'silent',
    schema: {
      response: {
        200: z.object({
          status: z.literal('ok'),
        }),
      },
    },
    handler: (request, reply) => {
      return reply.send({ status: 'ok' })
    },
  })
}
