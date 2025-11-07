import { Body, Controller, Headers, Ip, Post } from '@nestjs/common'
import { IngestService } from './ingest.service.js'
import type { IEvent } from '@repo/types/events'

@Controller('ingest')
export class IngestController {
  constructor(private readonly ingestService: IngestService) {}

  @Post()
  async ingest(
    @Body() body: IEvent,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string | undefined
  ) {
    return this.ingestService.saveEvent({
      body,
      ip,
      userAgent,
    })
  }
}
