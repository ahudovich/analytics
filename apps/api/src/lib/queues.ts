import { Queue } from 'bullmq'
import { QueueJobName, QueueName } from '@/enums/queues'
import { redisClient } from '@/lib/redis'
import type { IEvent } from '@repo/types/events'

const eventsQueue = new Queue(QueueName.Events, {
  connection: redisClient,
})

export async function addEventToQueue(event: IEvent) {
  await eventsQueue.add(QueueJobName.Event, event)
}
