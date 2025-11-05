import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'
import { UAParser } from 'ua-parser-js'
import { isBot } from 'ua-parser-js/helpers'

const HOST = 'localhost'
const PORT = 3000

const server = fastify({
  logger: true,
})

server.register(fastifyCors, {
  origin: '*',
})

server.get('/ping', (request, reply) => {
  return reply.send({ message: 'pong' })
})

server.post('/ingest', async (request, reply) => {
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
})

async function start() {
  try {
    await server.listen({ host: HOST, port: PORT }, (error, address) => {
      if (error) {
        server.log.error(error)
        process.exit(1)
      }

      server.log.info(`Server listening at ${address}`)
    })
  } catch (error: unknown) {
    server.log.error(error)
    process.exit(1)
  }
}

start()
