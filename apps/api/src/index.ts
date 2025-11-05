import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'

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
  console.log(request.body)
  return reply.send('ok')
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
