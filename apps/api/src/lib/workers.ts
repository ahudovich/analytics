import { Job, Worker } from 'bullmq'
import { UAParser } from 'ua-parser-js'
import { isBot } from 'ua-parser-js/helpers'
import { redisClient } from '@/lib/redis'
import type { IEvent } from '@repo/types/events'

export const eventsWorker = new Worker(
  'events',
  async (job: Job<IEvent>) => {
    const isBotDetected = isBot(job.data.userAgent ?? '')

    if (isBotDetected) {
      console.log('Bot detected')
      return
    }

    const parsedUserAgent = await UAParser(job.data.userAgent).withClientHints()

    const os = {
      name: parsedUserAgent.os.name,
      version: parsedUserAgent.os.version,
    }

    const browser = {
      name: parsedUserAgent.browser.name,
      version: parsedUserAgent.browser.version,
    }

    const device = {
      model: parsedUserAgent.device.model,
      vendor: parsedUserAgent.device.vendor,
    }

    console.log(os, browser, device)
    return
  },
  {
    autorun: false,
    connection: redisClient,
  }
)

eventsWorker.on('completed', (job: Job<IEvent>) => {
  console.log(`Job ${job.id} completed`)
})

eventsWorker.on('failed', (job: Job<IEvent> | undefined, error: Error) => {
  console.log(`Job ${job?.id} failed: ${error.message}`)
})
