import { fastify } from 'fastify'

const HOST = '127.0.0.1'
const PORT = 3000

const server = fastify({
  logger: true,
})

server.get('/ping', async (request, reply) => {
  return reply.send({ message: 'pong' })
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
