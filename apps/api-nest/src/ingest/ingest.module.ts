import { Module } from '@nestjs/common'
import { IngestController } from './ingest.controller.js'
import { IngestService } from './ingest.service.js'

@Module({
  controllers: [IngestController],
  providers: [IngestService],
})
export class IngestModule {}
