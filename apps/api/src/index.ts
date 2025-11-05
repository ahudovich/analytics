import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { ingestRoute } from '@/routes/ingest'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const HOST = 'localhost'
const PORT = 3000

const server = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyCors, {
  origin: '*',
})

server.register(ingestRoute)

server.get('/ping', (request, reply) => {
  return reply.send({ message: 'pong' })
})

async function start() {
  try {
    await server.listen({ host: HOST, port: PORT })
  } catch (error: unknown) {
    server.log.error(error)
    process.exit(1)
  }
}

start()
