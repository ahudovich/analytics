import { Event } from '@repo/enums/events'

function init() {
  document.addEventListener('DOMContentLoaded', () => {
    sendEvent(Event.PageView, {
      screen: {
        width: screen.width,
        height: screen.height,
      },
      language: navigator.language,
      url: window.location.href,
    })
  })
}

async function sendEvent(event: Event, data: Record<string, unknown>) {
  try {
    const payload = {
      event,
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
