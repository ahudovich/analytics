import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { eventsWorker } from '@/lib/workers'
import { healthRoute } from '@/routes/health'
import { ingestRoute } from '@/routes/ingest'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const HOST = '0.0.0.0'
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
server.register(healthRoute)

async function start() {
  try {
    await server.listen({ host: HOST, port: PORT })
    await eventsWorker.run()
  } catch (error: unknown) {
    server.log.error(error)
    process.exit(1)
  }
}

start()
