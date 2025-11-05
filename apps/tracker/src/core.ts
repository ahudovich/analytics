import { EventType } from '@repo/enums/events'
import type { IEvent } from '@repo/types/events'

function init() {
  document.addEventListener('DOMContentLoaded', () => {
    sendEvent(EventType.PageView, {
      url: window.location.href,
      referrer: document.referrer,
      language: navigator.language,
      screen: {
        width: screen.width,
        height: screen.height,
      },
    })
  })
}

async function sendEvent(
  eventType: EventType,
  data: Omit<IEvent, 'type' | 'timestamp'>
) {
  try {
    const payload: IEvent = {
      type: eventType,
      timestamp: new Date().toISOString(),
      ...data,
    }

    await fetch(`${import.meta.env.VITE_API_BASE_URL}/ingest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    })
  } catch (error: unknown) {
    console.error(error)
  }
}

export { init, sendEvent }
