import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const healthRoute: FastifyPluginAsyncZod = async (
  fastify: FastifyInstance
) => {
  fastify.route({
    method: 'GET',
    url: '/health',
    handler: async (request, reply) => {
      return reply.send({ status: 'ok' })
    },
  })
}
