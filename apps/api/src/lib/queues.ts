import { Queue } from 'bullmq'
import { redisClient } from '@/lib/redis'
import type { IEvent } from '@repo/types/events'

const eventsQueue = new Queue('events', {
  connection: redisClient,
})

export async function addEventToQueue(event: IEvent) {
  await eventsQueue.add('event', event)
}
