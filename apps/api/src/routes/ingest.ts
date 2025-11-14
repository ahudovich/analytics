import { browserEventSchema } from '@repo/types/events'
import { addEventToQueue } from '@/lib/queues'
import type { IBrowserEvent } from '@repo/types/events'
import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const ingestRoute: FastifyPluginAsyncZod = async (
  fastify: FastifyInstance
) => {
  fastify.route({
    method: 'POST',
    url: '/ingest',
    schema: {
      body: browserEventSchema,
    },
    handler: async (request, reply) => {
      const body = request.body as IBrowserEvent
      const ip = request.ip
      const userAgent = request.headers['user-agent']

      await addEventToQueue({
        ...body,
        ip,
        userAgent,
      })

      return reply.send('ok')
    },
  })
}
