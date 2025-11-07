import { Module } from '@nestjs/common'
import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'
import { IngestModule } from './ingest/ingest.module.js'
import { HealthModule } from './health/health.module.js'

@Module({
  imports: [IngestModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
