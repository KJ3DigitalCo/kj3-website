export function trackEvent(eventName, params = {}) {
  if (window.fbq) {
    window.fbq('track', eventName, params)
  }
}
