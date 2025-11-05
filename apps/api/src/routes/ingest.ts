import { eventSchema } from '@repo/types/events'
import { UAParser } from 'ua-parser-js'
import { isBot } from 'ua-parser-js/helpers'
import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const ingestRoute: FastifyPluginAsyncZod = async (
  fastify: FastifyInstance
) => {
  fastify.route({
    method: 'POST',
    url: '/ingest',
    schema: {
      body: eventSchema,
    },
    handler: async (request, reply) => {
      const body = request.body
      const ip = request.ip
      const userAgent = request.headers['user-agent']

      const isBotDetected = isBot(userAgent ?? '')

      if (isBotDetected) {
        return reply.send({
          ip,
          body,
          isBot: true,
        })
      }

      const parsedUserAgent = await UAParser(userAgent).withClientHints()

      const os = {
        name: parsedUserAgent.os.name,
        version: parsedUserAgent.os.version,
      }

      const browser = {
        name: parsedUserAgent.browser.name,
        version: parsedUserAgent.browser.version,
      }

      const device = {
        model: parsedUserAgent.device.model,
        vendor: parsedUserAgent.device.vendor,
      }

      return reply.send({
        ip,
        body,
        os,
        browser,
        device,
      })
    },
  })
}
