import { Injectable } from '@nestjs/common'
import { UAParser } from 'ua-parser-js'
import { isBot } from 'ua-parser-js/helpers'
import type { IEvent } from '@repo/types/events'

interface IngestInput {
  body: IEvent
  ip: string
  userAgent: string | undefined
}

@Injectable()
export class IngestService {
  async saveEvent({ body, ip, userAgent }: IngestInput) {
    const isBotDetected = isBot(userAgent ?? '')

    if (isBotDetected) {
      return {
        ip,
        body,
        isBot: true,
      }
    }

    const parsed = await UAParser(userAgent).withClientHints()

    return {
      ip,
      body,
      os: {
        name: parsed.os.name,
        version: parsed.os.version,
      },
      browser: {
        name: parsed.browser.name,
        version: parsed.browser.version,
      },
      device: {
        model: parsed.device.model,
        vendor: parsed.device.vendor,
      },
    }
  }
}
