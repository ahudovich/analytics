import fastifyCors from '@fastify/cors'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module.js'

const HOST = '0.0.0.0'
const PORT = 3000

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  app.register(fastifyCors, {
    origin: '*',
  })

  await app.listen({ host: HOST, port: PORT })
}

bootstrap()
