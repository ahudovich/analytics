import { Module } from '@nestjs/common'
import { IngestModule } from './ingest/ingest.module.js'
import { HealthModule } from './health/health.module.js'

@Module({
  imports: [IngestModule, HealthModule],
})
export class AppModule {}
