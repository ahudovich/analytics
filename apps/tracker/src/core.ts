function init() {
  document.addEventListener('DOMContentLoaded', () => {
    sendEvent({
      screen: {
        width: screen.width,
        height: screen.height,
      },
      language: navigator.language,
    })
  })
}

async function sendEvent(data: Record<string, unknown>) {
  try {
    await fetch('#', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      keepalive: true,
    })
  } catch (error: unknown) {
    console.error(error)
  }
}

export { init, sendEvent }
