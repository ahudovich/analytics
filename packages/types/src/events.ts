import { EventType } from '@repo/enums/events'
import { z } from 'zod'

export const eventSchema = z.object({
  type: z.enum(EventType),
  timestamp: z.string(),
  url: z.string(),
  referrer: z.string(),
  language: z.string(),
  screen: z.object({
    width: z.number(),
    height: z.number(),
  }),
})

export type IEvent = z.infer<typeof eventSchema>
